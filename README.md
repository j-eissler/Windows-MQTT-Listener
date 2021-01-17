# Windows-MQTT-Listener
This application allows you to shut down your windows computer with an mqtt message.
It was written to be used with a Home Assistant smart home.

# How to use
<ol>
  <li>Download 'app.exe' and 'config.json' and place them in the same directory (i.e. 'C:\mqtt_listener\)</li>
  <li>Open 'config.json' and enter your settings. Every setting is explained below:
    <ul>
      <li>mqtt_user:            Username required to log into your MQTT broker.</li>
      <li>mqtt_password:        Password required to log into your MQTT broker.</li>
      <li>mqtt_broker_hostname: Hostname of your MQTT broker</li>
      <li>hostname:             Hostname of the computer this application is running on. This is used to set the topic this app listens to.<br>
                            Example:<br>
                            Hostname is 'mycomputer'. The shutdown topic is then set to 'mycomputer/shutdown' so this is where you have to publish the shutdown message to.</li>
    </ul>
  </li>
  <li>Add this application to windows task scheduler. This allows it to run even before a user is logged in. Use the following settings to make sure it works:
    <ul>
      <li>Run as User: SYSTEM</li>
      <li>Trigger: On Startup</li>
      <li>Action:
        <ul>
          <li>Run Program</li>
          <li>Enter path to 'app.exe'</li>
          <li><strong>IMPORTANT:</strong> Enter the directory the 'app.exe' file is in to 'Start in (optional)'. Otherwise the process wont start.</li>
        </ul>
      </li>
    </ul>
    </li>
  <li>Send an MQTT message to the shutdown topic and watch your pc shut down.</li>
</ol>
