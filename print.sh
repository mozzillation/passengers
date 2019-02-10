#!/bin/bash
sudo echo $1 | iconv -f UTF-8 -t CP850 > /dev/serial0