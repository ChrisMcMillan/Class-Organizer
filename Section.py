class Section:

    # A section is category of classes from which only
    # limited a number of classes can be picked
    def __init__(self, sec_name, max_allocation, class_options):
        self.section_name = sec_name
        self.allocation_count = 0
        self.max_allocation = max_allocation
        self.class_options = class_options

    # Check if a class is contained within a section
    def class_in_section(self, class_name):
        if class_name in self.class_options:
            return True

        return False

    # Check is a section has reached its allocation limit
    def can_allocate(self):
        if self.allocation_count < self.max_allocation:
            return True

        return False

    # Adds to the count of allocated classes
    def increment_allocation_count(self):
        self.allocation_count += 1
        if self.allocation_count > self.max_allocation:
            print("Error: Allocating classes beyond section limit.")
            self.allocation_count = self.max_allocation