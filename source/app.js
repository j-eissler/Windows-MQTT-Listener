const { Console } = require('console');
const fs = require('fs');
const mqtt = require('mqtt');
const nodeCmd = require('node-cmd');
const { exit } = require('process');

// Read config file
var config;
try {
    let rawData = fs.readFileSync('./config.json');
    config = JSON.parse(rawData);
    console.log("Config read successfully");
} catch(err){
    console.log("Error while reading config file: " + err);
    ExitProgram();
}

// Topics and commands
var shutdownTopic = config.hostname + '/shutdown'
var shutdownCmd = 'cmd.exe /c "shutdown -s -t 0"'                // Executed on message in shutdownTopic

// Connect to mqtt broker
console.log("Connecting to mqtt broker on '" + config.mqtt_broker_hostname  + "'...");
const client = mqtt.connect('mqtt://' + config.mqtt_broker_hostname);
client.options.username = config.mqtt_user;
client.options.password = config.mqtt_password;
client.on('connect', () => {
    client.subscribe(shutdownTopic, (err) => {
        if(err){
            console.log('Error while trying to connect to MQTT broker ' + err);
            ExitProgram();
        } else {
            console.log('Successfully connected to MQTT broker');
            console.log("You can shut this device down by publishing a message with any payload on topic '" + shutdownTopic + "'");
        }
    });
});

// Listeners for messages on subscribed topics
client.on('message', function (topic, message) {
    console.log(new Date().toLocaleString() + " [MQTT] " + message.toString());
    console.log('Shutting down...');
    nodeCmd.runSync(shutdownCmd);
});


function ExitProgram(){
    console.log("Exiting program");
    exit();
}