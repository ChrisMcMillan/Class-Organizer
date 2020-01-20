import Time as tim

class ClassInfo:

    # Used to check if a class is online or not
    online = "Online"

    # Puts all the data, associated with a class, into one object.
    def __init__(self, className, day, startTime, endTime, instructor, rmp_score):
        self.className = className
        self.day = day
        self.startTime = startTime
        self.endTime = endTime
        self.instructor = instructor
        self.rmp_score = rmp_score

    # Combines the start time and end time to create the time interval score,
    # which is used to put the classes in order from morning to noon.
    def get_time_interval_score(self):

        if self.day == ClassInfo.online:
            return 0

        return self.startTime.time_score() + self.endTime.time_score()

    # Can print info, about the class, to the console and
    # can also return that same info, as a string.
    def print_class_data(self, returnString = False):

        if self.startTime == ClassInfo.online:
            st = ClassInfo.online
        else:
            st = self.startTime.print_time(True)

        if self.endTime == ClassInfo.online:
            et = ClassInfo.online
        else:
            et = self.endTime.print_time(True)

        s = (self.className + ", " + self.day + " " +
              st + " - " +
              et + ", " +
             "RMP Score: " + str(self.rmp_score) + ", " +
              self.instructor)

        if not returnString:
            print(s)
        else:
            return s

    # Check if two classes' times overlap with each other
    @staticmethod
    def time_overlap(c1, c2):

        if c1.day == ClassInfo.online or c2.day == ClassInfo.online:
            return False

        if (c1.startTime.time_score() <= c2.endTime.time_score() and
                c1.endTime.time_score() >= c2.startTime.time_score()):
            return True

        return False

    # Check if two classes' days overlap with each other
    @staticmethod
    def day_overlap(c1, c2):
        if c1.day == c2.day:
            return True
        elif c1.day in c2.day or c2.day in c1.day:
            return True

        return False

