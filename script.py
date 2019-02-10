# Passenger — Visualizing & broadcasting a virtual crowd
# Author: Giuliano Mozzillo
# -*- coding: utf-8-unix -*-


import serial
import board
import busio

import datetime
import time
import csv

import threading
import sys
import os
import platform
import subprocess
import json
import time
import random
import requests


# ——————
# SETTING PRINTER
# ——————
import serial
import board
import busio
import adafruit_thermal_printer

u = '█'



    

ThermalPrinter = adafruit_thermal_printer.get_printer_class(2.69)
uart = serial.Serial("/dev/serial0", baudrate=9600, timeout=3000)
printer = ThermalPrinter(uart, auto_warm_up=True)

printer._set_code_page(10)

# WARM UP THE PRINTER
printer.warm_up()


url = 'https://maker.ifttt.com/trigger/passenger/with/key/nE2U3yqpZu1i-Azc6WdE7vpplsCRz48_Hoxqxjxueav'
needPaper = '{"value1": "Printer need paper"}'
systemOk = '{"value1": "Device is OK}'
headers = {'Content-type': 'application/json', 'Accept-Charset': 'UTF-8'}


def time_in_range(start, end, x):
    """Return true if x is in the range [start, end]"""
    if start <= end:
        return start <= x <= end
    else:
        return start <= x or x <= end


    
# Original test case from OP
    
# CONTROL PAPER
def checkPaper():
    
    if not printer.has_paper():
        print('PRINTER NEED PAPER')
        requests.post(url, data=needPaper, headers=headers)        

# WAITING FOR PACKETS
printer.size = adafruit_thermal_printer.SIZE_SMALL
foundMacs = []
censorMacs = []


# CENSORSHIP FOR PRIVACY
def censor(text,index=0,replacement=''):
    position = [0, 1, 3, 4, 6, 7, 9, 10, 12, 13, 15, 16]
    index = random.choice(position)
    return '%s%s%s'%(text[:index],replacement,text[index+1:])


printer.justify = adafruit_thermal_printer.JUSTIFY_CENTER


## MAIN
def main():
    
    hasOpened = False

    while True:

        start = datetime.time(0, 0, 0)
        end = datetime.time(18, 0, 0)
        now = datetime.datetime.now().time()

        

        if time_in_range(start, end, datetime.datetime.now().time()):
            requests.post(url, data=systemOk, headers=headers)

        while time_in_range(start, end, datetime.datetime.now().time()) and printer.has_paper():
            time.sleep(2)
            hasOpened = False
            # CHECK PAPER 
            checkPaper()

            # COMMAND TSHARK
            command = [
                'tshark',
                '-i',
                'wlan1',
                '-T',
                'fields',
                '-e',
                'wlan.sa',
                '-a',
                'duration: 1',
            ]


            run_tshark = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
            output, nothing = run_tshark.communicate()



            for line in output.decode('utf-8').split('\n'):
                if line.strip() == '':
                    continue
                mac = line.split()[0].strip().split(',')[0]
                dats = line.split()
                if len(dats) < 2:
                    if ':' in dats[0]:  
                        if mac not in foundMacs:
                            foundMacs.append(mac)
                            mac = censor(mac,5, u)
                            subprocess.call('sh ./print.sh ' + mac, shell=True)
                            time.sleep(1)
                            print(mac)
                            censorMacs.append(mac)
                            with open('dataset.csv','a') as fd:
                                fd.write(mac) 

        else:
            if not hasOpened:
                print("[SLEEPING]")
                hasOpened = True
        
        
    
                    
try:
    main()
except KeyboardInterrupt:
    print("— STOP —")
finally:  
    printer.feed(5)