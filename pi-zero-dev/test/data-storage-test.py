# store voltage, current, power, and time stamp in csv file

import time
import csv
cycle = 0

with open('measured-data.csv', mode='w') as data_file:
    employee_writer = csv.writer(data_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    Exit = False #Exit flag
    while Exit==False:
        cycle = cycle + 1 
        if (cycle > 5): Exit = True #Exit Program
        employee_writer.writerow(['John Smith', 'Accounting', time.time()])
        employee_writer.writerow(['Erica Meyers', 'IT', 'March'])