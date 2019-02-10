#!/bin/bash

# set monitor mode
sudo iw dev wlan0 set monitor none
sudo iw dev wlan1 set monitor none

#init PA:SS:EN:GE:RS
sudo python3 ./passengers/init.py
