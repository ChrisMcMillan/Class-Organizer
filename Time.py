class Time:

    MAX_HOUR = 12
    MIN_HOUR = 1

    MAX_MINUTE = 60
    MIN_MINUTE = 0

    # The time object is used to organize classes by time.
    def __init__(self, h, m, am):
        self.hour = h
        self.min = m
        self.AM = am

    # Calculates a class's time score, with minutes being the
    # base unit. If a class is in the noon, then it has 12 added
    # to its hours.
    def time_score(self):
        # Online Class
        if self.hour == 0:
            return 0
        # 12:00AM
        elif self.hour == Time.MAX_HOUR and self.AM:
            hours = 0
        # 12:00PM
        elif self.hour == Time.MAX_HOUR and not self.AM:
            hours = Time.MAX_HOUR
        elif self.hour != Time.MAX_HOUR and self.AM:
            hours = self.hour
        else:
            hours = Time.MAX_HOUR + self.hour

        total_score = (hours * Time.MAX_MINUTE) + self.min

        return total_score

    # Prints info about the time, which also be returned as a string
    def print_time(self, returnString = False):

        if self.AM:
            midday = "AM"
        else:
            midday = "PM"

        s = str(self.hour) + ":" + str(self.min) + midday

        if not returnString:
            print(s)
        else:
            return s
