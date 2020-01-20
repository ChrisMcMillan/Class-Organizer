from tkinter.ttk import Progressbar
import Scheduler as sch
from tkinter import *
from tkinter import messagebox
from os import path

# Put all the elements associated with an input field into one class
class InputField:

    def __init__(self, gui, name, r, c, px=0, py=0):
        self.name = name
        self.input_label = Label(gui, text=name, font=("bold", 14), padx=px, pady=py)
        self.input_label.grid(row=r, column=c, sticky=W)
        self.input_text = StringVar()
        self.input_entry = Entry(gui, textvariable=self.input_text)
        self.input_entry.grid(row=r, column=(c + 1))

    def get_input_text(self):
        return self.input_text.get()

window = Tk()

# Input fields
# Row 0
input_file_path = InputField(window, "Input File Path:", 0, 0, 10, 10)
university_name = InputField(window, "University Name:", 0, 2, 10, 0)

# Load Button goes in Row 1

# Row 2
output_file_path = InputField(window, "Output File Path:", 2, 0, 10, 10)
class_count = InputField(window, "Class Count:", 2, 2, 10, 0)

# Row 3
online_limit = InputField(window, "Online Class Limit:", 3, 0, 10, 10)

# Create Schedule Button goes in Row 4

# Progress bar Row 5
progress = Progressbar(window, orient=HORIZONTAL, length=100, mode='determinate')
progress.grid(row=1, column=1)
progress['maximum'] = 100
progress['value'] = 0
progress.update()

# Input validation
input_error_title = "Input Error"

# Makes sure that there is an input for a field
def input_entered(input):
    if input.get_input_text() == "":
        messagebox.showerror(input_error_title, "No input for " + input.name)
        return False

    return True

# Makes sure that an input is a number
def number_input_vaild(input):
    if not input_entered(input):
        return False
    if not input.get_input_text().isnumeric():
        messagebox.showerror(input_error_title, input.name + " contains a non-numeric input")
        return False

    return True

# Makes sure that a file path exist for an input
def file_path_vaild(input):
    if not input_entered(input):
        return False
    if not path.exists(input.get_input_text()):
        messagebox.showerror(input_error_title, "File not found for " + input.name)
        return False

    return True

# Schedule creation event

# Holds the loaded class data
class_data = None

# This function is called when the user press load button and
# it loads the class data
def load_class_data():

    if not file_path_vaild(input_file_path):
        return

    if not input_entered(university_name):
        return

    global class_data

    class_data = sch.extract_data(input_file_path.get_input_text(), university_name.get_input_text(), progress)

    messagebox.showinfo("Data loaded", "Data successfully loaded.")


# This function is called when the user presses the create schedule button,
# it makes sure the inputs are valid, and then it creates the schedule
def create_schedule_event():

    if not file_path_vaild(output_file_path):
        return

    if not number_input_vaild(class_count):
        return

    if not number_input_vaild(online_limit):
        return

    if not class_data:
        messagebox.showerror("No class data loaded", "No class data loaded. Press load data button.")
        return

    sch.create_schedule(class_data, int(class_count.get_input_text()), int(online_limit.get_input_text()),
                        output_file_path.get_input_text(), [], [])

    messagebox.showinfo("Schedule Created", "Schedule created in " + output_file_path.get_input_text())

# Buttons
create_sch_btn = Button(window, text="Create Schedule", width=12, command=create_schedule_event)
create_sch_btn.grid(row=4, column=0, pady=20)

load_data_btn = Button(window, text="Load Data", width=12, command=load_class_data)
load_data_btn.grid(row=1, column=0, pady=20)

window.geometry("700x350")
window.title("Class Organizer")

window.mainloop()