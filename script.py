# Passenger — Visualizing & broadcasting a virtual crowd
# Author: Giuliano Mozzillo

import serial
import board
import busio

# SETTING PRINTER
import adafruit_thermal_printer
ThermalPrinter = adafruit_thermal_printer.get_printer_class(2.69)
uart = serial.Serial("/dev/serial0", baudrate=9600, timeout=3000)
printer = ThermalPrinter(uart, auto_warm_up=False)

# WARM UP THE PRINTER
printer.warm_up()

# CONTROL PAPER
if printer.has_paper():
    print('PRINTER HAS PAPER')
else:
    print('PRINTER NEED PAPER')
    sys.exit(0)
    

result = subprocess.check_output("sudo airmon-ng start wlan1", shell=True)
if ARGS.verbose > 2: print "Result: ", result
m = re.search("\(monitor mode enabled on (.+?)\)", result)
if m:
    monitorIface = m.groups()[0]
else:
    logging.critical("Something went wrong enabling monitor mode.")
    print "Something went wrong enabling monitor mode."
    sys.exit(0)
    
    
# GET DATE
now = datetime.datetime.now()
today = now.strftime("%Y/%m/%d")

# PRINT DATE
printer.justify = adafruit_thermal_printer.JUSTIFY_CENTER
printer.inverse = True
printer.size = adafruit_thermal_printer.SIZE_MEDIUM
printer.print("  " + today + "  ")
printer.inverse = False


# WAITING FOR PACKETS
printer.size = adafruit_thermal_printer.SIZE_SMALL
