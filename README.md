# Windows-MQTT-Listener
This application allows you to shut down your windows computer with an mqtt message.
It was written to be used with a Home Assistant smart home.

# How to use
1. Open 'config.json' and enter the following settings:

Once you entered your settings in 'config.json', you can shutdown your computer by publishing a message with any payload to 'hostname/shutdown'.
