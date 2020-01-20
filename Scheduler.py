import ClassInfo as ci
import Time as tim
import robobrowser as rob

# Goes on ratemyprofessor.com and gets the overall score for a professor.
def obtain_rmp_score(prof_name, school_name):
    # this value is return if the function fails to find score
    default_value = 2.5
    n_list = prof_name.split()
    base_url = "https://www.ratemyprofessors.com/search.jsp?query="
    first_name = n_list[0]
    last_name = n_list[1]

    # This url is used to search for professors, with the same name
    final_url = base_url + first_name + "+" + last_name

    print()
    print(first_name + " " + last_name)

    br = rob.RoboBrowser(parser='html.parser')
    # Travels to the constructed url
    br.open(final_url)

    # Gets all the html elements that contain information about the professors
    p_list = br.find_all(class_="listing PROFESSOR")
    data_list = []

    # Loops through all the html elements and gets the
    # professor's name, School name, and the link to the professor's page.
    for p in p_list:
        p_name = p.find(class_="main").get_text()
        s_name = p.find(class_="sub").get_text()
        link = p.find("a")
        data_list.append((p_name, s_name, link))

    # Loops through the data list and tries to see if the school name,
    # that the user gives, is contained within the school name that is
    # associated with a professor
    prof_page_data = None
    for d in data_list:
        if school_name in d[1]:
            prof_page_data = d
            break

    # If no match is found then the default value is returned
    if not prof_page_data:
        print("Failed to find school name in links.")
        return default_value

    print(prof_page_data[1])

    # Goes to the matching professor's page
    br.follow_link(prof_page_data[2])

    # Gets the over all score
    score = br.find(class_="RatingValue__Numerator-qw8sqy-2 gxuTRq").get_text()

    # If the score is found then it is returned as float
    if score:
        print("Score:", score)
        url = br.find("meta", property="og:url")
        if url:
            print("URL: ", url)
        else:
            print("Failed to get url")

        return float(score)

    # Returns default value if score is not found
    print("Failed to find score")
    return default_value

# Builds a time object from data read from the input file
def extract_time(arg):
    temp = ""
    data = []
    A = "A"
    P = "P"

    # Extracts the hour, min, AM/PM value by
    # adding each value to a list.
    for i in range(len(arg) - 1):

        # Temp is used to add values to the list. Values are
        # only added to temp if that are digit or are "A" or "P"
        # Numbers might be more then one digit, like with minutes,
        # so that is why we need to cumulatively add values to temp.
        if arg[i].isdigit() or arg[i] == A or arg[i] == P:
            temp += arg[i]

        # When the next values it not a digit, this is when we know
        # we need to add temp to the data list and reset to temp to an
        # empty string.
        if (not arg[i + 1].isdigit() and temp.isdigit()):
            data.append(temp)
            temp = ""
        elif temp == A or temp == P:
            data.append(temp)
            temp = ""

    # Converts the hours, and mins, to int values
    data[0] = int(data[0])
    data[1] = int(data[1])

    # Coverts AM, or PM, into a boolean value.
    # A boolean values is used because of the binary
    # nature of AM and PM.
    if data[2] == A:
        data[2] = True
    else:
        data[2] = False

    t = tim.Time(data[0], data[1], data[2])

    return t


# Builds a tuple from the string data passed into the function.
def extract_date_time(arg):

    s = arg.split()
    # Gets the string value, used to indicate an online class, from
    # the ClassInfo file.
    online = ci.ClassInfo.online

    # If the class is an online class, then
    # these default values are returned
    if s[0] == online:
        date = online
        startTime = tim.Time(0, 0, True)
        endTime = tim.Time(0, 0, True)

        return date, startTime, endTime

    date = s[0]
    startTime = extract_time(s[1])
    endTime = extract_time(s[3])

    return date, startTime, endTime

# Converts text data, from the input file, into a dictionary
def extract_data(inputFile, school_name, progress):
    f = open(inputFile, "r")
    classDic = {}
    rmp_dic = {}
    progress['value'] = 0

    # Max count, and count, is used to determine how much width the
    # progress bar should display. For example, count = 7, and max count = 10,
    # 7 / 10 = .7, 70% of the progress bar's width should be displayed.
    count = 0
    max_count = 0

    # Need to determine max count by counting the number of inputs,
    # in the input file.
    for x in f:
        max_count += 1

    # Need to reset file reading in order read from the start
    # of the file
    f.close()
    f = open(inputFile, "r")

    # Goes through each line of the input file, and builds ClassInfo objects from
    # the text data. These ClassInfo objects are placed into lists, within a dictionary, based
    # on the time the class takes place. This dictionary is then placed within another dictionary,
    # based on the day the class takes place. This is done so the days, with the most times slots,
    # can be prioritized over days with less time slots. This is used to minimize the number of
    # days the user needs to go to school.
    for x in f:
        a = x.split(", ")

        if not a or len(a) != 3:
            continue

        className = a[0]
        instructor = a[2]
        dt = extract_date_time(a[1])
        days = dt[0]
        start_time = dt[1]
        end_time = dt[2]

        # Checks to see if the rate my professor score has already been found
        # for a professor.
        if instructor not in rmp_dic:
            rmp_dic[instructor] = obtain_rmp_score(instructor, school_name)

        c_info = ci.ClassInfo(className, days, start_time, end_time, instructor, rmp_dic[instructor])

        # If the a day is not a already a key, then a new sub
        # dictionary is created
        if days not in classDic:
            classDic[days] = {}

        # Time interval score is used organize the classes into time slots.
        time_key = c_info.get_time_interval_score()

        # If the time interval score is not already a key, then a new list is created
        if time_key not in classDic[days]:
            classDic[days][time_key] = []

        classDic[days][time_key].append(c_info)

        # Updates the progress bar
        count += 1
        completion = int((count / max_count) * 100)
        print("completion: ", completion)
        progress['value'] = completion
        progress.update()

    # Resets progress bar
    progress['value'] = 0
    progress.update()

    f.close()
    return classDic

# Finds the day that has the most time intervals and
# hasn't been used yet
def find_largest_key(class_dic, used_keys):
    largest_size = -1
    largest_key = None

    for key in class_dic:

        # Online classes are prioritize because they don't effect
        # the number of days the user has to show up to school
        if key == ci.ClassInfo.online and key not in used_keys:
            used_keys.append(key)
            return key

        # Gets the size of the sub dictionary.
        # So the number of time intervals, not total number of classes
        cur_dic_size = len(class_dic[key])

        if cur_dic_size > largest_size and key not in used_keys:
            largest_size = cur_dic_size
            largest_key = key

    if largest_key:
        used_keys.append(largest_key)

    return largest_key

# Checks if a class time overlap with classes already
# in the schedule
def schedule_conflict(c, schedule_list):

    for s in schedule_list:

        if (ci.ClassInfo.day_overlap(c, s) and
                (ci.ClassInfo.time_overlap(c, s) or c.className == s.className)):
            return True

    return False

# A section is category of classes from which only
# limited a number of classes can be picked.
# For example, math could be a section and
# there could be 4 different math classes to pick from, but
# you are only allowed to pick 2. This function helps enforce
# section limits.
def sections_conflict(c, sections):

    # If there are no sections, then return false
    if not sections:
        return False

    for s in sections:
        if s.class_in_section(c.className):
            if not s.can_allocate():
                return True
            else:
                s.increment_allocation_count()
                return False

    # If the class is not a section, then return false
    return False

# Helper function that is used to sort ClassInfo objects by
# rate my professor scores
def get_rmp_score_helper(x):
    return x.rmp_score

# Picks a class from a list of classes, with the same time slot.
def pick_class_for_timeslot(possible_classes, schedule_list, priority_classes = None, sections = None):

    # Classes with a higher rate my professor score are given a higher priority.
    picks = sorted(possible_classes, key=get_rmp_score_helper, reverse=True)

    for p in picks:

        # Makes sure the classes, in the priority list, are allocated first.
        if priority_classes:
            if p.className in priority_classes:
                if not schedule_conflict(p, schedule_list) and not sections_conflict(p, sections):

                    priority_classes.remove(p.className)
                    return p

        # If there is no conflict, then the class is returned.
        else:
            if not schedule_conflict(p, schedule_list) and not sections_conflict(p, sections):
                return p

    return None


# Creates a schedule by writing it to an output file. Attempts so prioritize classes with higher
# rate my professor scores, minimize the number of days, and tries to make sure priority_classes
# are allocated first. In addition, it makes sure sections classes are not allocated beyond their limit.
def create_schedule(class_data, classCount, online_class_limit, outputFileName, priority_classes = None, sections = None):
    schedule_list = []
    class_dic = class_data
    used_keys = []
    allocated_online_classes = 0

    # If there are no priority classes, then allocate_priority_classes
    # can be set to false to skip this step.
    if priority_classes:
        allocate_priority_classes = True
    else:
        allocate_priority_classes = False

    # Limits the number of classes to be allocated based on
    # class count
    while not len(schedule_list) == classCount:

        # Finds the day with the most time slots
        largest_key = find_largest_key(class_dic, used_keys)

        # If the user allows class count to be a number larger then
        # the number of inputs, in the input file, then this will prevent
        # the program from being trapped in an infinite loop.
        if not largest_key:
            break

        cur_dic = class_dic[largest_key]
        # Sorts the time slots based on time score
        # Starts from morning to afternoon
        key_order = sorted(cur_dic)

        # Goes through each time slot
        for k in key_order:

            # Limits the number of online classes that can be allocated
            if allocated_online_classes < online_class_limit and largest_key == ci.ClassInfo.online:

                # Makes sure the iterator starts at the number of allocated online classes
                i = allocated_online_classes

                # This while loop is needed if more then one online class is being allocated
                while i < online_class_limit:
                    new_class = pick_class_for_timeslot(cur_dic[k], schedule_list, priority_classes, sections)

                    if new_class:
                        schedule_list.append(new_class)
                        allocated_online_classes += 1

                    i += 1

            else:
                # Normal class allocation for non-online classes
                new_class = pick_class_for_timeslot(cur_dic[k], schedule_list, priority_classes, sections)

                if new_class:
                    schedule_list.append(new_class)

            # Once the required classes have been allocated the
            # used key needs to be reset so class_dic can be iterated
            # through from the start.
            if allocate_priority_classes and not priority_classes:
                allocate_priority_classes = False
                used_keys = []

            # Checks if class allocation limit has been reached
            if len(schedule_list) == classCount:
                break

    # Write schedule to output file
    f = open(outputFileName, "w")

    for c in schedule_list:
        c.print_class_data()
        f.write(c.print_class_data(True))

    f.close()













