
from threading import Thread
import time
import requests #for https stuff
import RPi.GPIO as GPIO #for GPIO stuff
import csv
import board
import busio
import adafruit_ina260

global cycle
cycle = 0.0

global dataAggRate
dataAggRate = 60 #60 second rate?

global volt #update this value every voltage reading. will be read by the routing switch thread to open or close the switch
global gridConnect #update this when checking state of smart contract. will be read by routing switch thread
global SMState
global dataStored
dataStored = '/test/measured-data.csv'


class DataAggComm:  
    def __init__(self):
        self._running = True

    def terminate(self):  
        self._running = False  

    def run(self):
        global cycle
        # set up network connection stuff
        dbURL = 'http://1.1.1.1'
        APIcalls = {}
        
        while self._running:
            time.sleep(dataAggRate)
            # send data to the data aggregator



class RouteSwitchingControl:  
    def __init__(self):
        self._running = True

    def terminate(self):  
        self._running = False  

    def run(self):
        global cycle
        # set up GPIO stuff?
        while self._running:
            time.sleep(5) #Five second delay
            # check voltage level as well as the network set up from blockchain
            # open or close the switch depending on above two states

class SmartContractMonitor:  
    def __init__(self):
        self._running = True

    def terminate(self):  
        self._running = False  

    def run(self):
        global cycle
        # set up network connection stuff for blockchain
        while self._running:
            time.sleep(5) #Five second delay
            # read state of blockchain and act accordingly

class EnergyTxnMonitor:  
    def __init__(self):
        self._running = True

    def terminate(self):  
        self._running = False  

    def run(self):
        global cycle
        while self._running:
            time.sleep(sampleRate) #Five second delay
            # monitor energy production/consumption during txn

#Create Classes
DataAgg = DataAggComm()
SwitchControl = RouteSwitchingControl()
SCMonitor = SmartContractMonitor()
EnergyMonitor = EnergyTxnMonitor()

#Create Threads
DataAggThread = Thread(target=DataAgg.run)
SwitchControlThread = Thread(target=SwitchControl.run)
SCMonitorThread = Thread(target=SCMonitor.run)
EnergyMonitorThread = Thread(target=EnergyMonitor.run)

#Start Threads 
DataAggThread.start()
SwitchControlThread.start()
SCMonitorThread.start()
EnergyMonitorThread.start()

sampleRate = 1 # sample rate in seconds

i2c = board.I2C()
ina260 = adafruit_ina260.INA260(i2c)

while True:
    volt = ina260.voltage
    curr = ina260.current
    pwr = ina260.power

    
    time.sleep(SampleRate)

Exit = False #Exit flag
while Exit==False:
    # measure data from the sensor and store in CSV
    time.sleep(sampleRate)
    voltage = I2C.read()
    current = I2C.read()

    power = voltage * current


DataAgg.terminate()
SwitchControl.terminate()
SCMonitor.terminate()
EnergyMonitor.terminate()