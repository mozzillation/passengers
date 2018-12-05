import time
import datetime
import argparse
import netaddr
import sys
import logging
from scapy.all import *
from pprint import pprint
from logging.handlers import RotatingFileHandler


result = subprocess.check_output("sudo airmon-ng start wlan1", shell=True)
if ARGS.verbose > 2: print "Result: ", result
m = re.search("\(monitor mode enabled on (.+?)\)", result)
if m:
    monitorIface = m.groups()[0]
else:
    logging.critical("Something went wrong enabling monitor mode.")
    print "Something went wrong enabling monitor mode."
    sys.exit(0)