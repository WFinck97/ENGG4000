#import the GPIO and time package
import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BOARD)
GPIO.setup(15, GPIO.OUT)
# loop through 50 times, on/off for 1 second
for i in range(1):
    GPIO.output(15,True)
    time.sleep(3)
    GPIO.output(15,False)
    time.sleep(1)
GPIO.cleanup()