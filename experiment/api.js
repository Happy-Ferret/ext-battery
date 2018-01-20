"use strict";
const { classes: Cc, interfaces: Ci, results: Cr, utils: Cu } = Components;

const wm = Cc["@mozilla.org/appshell/window-mediator;1"]
  .getService(Ci.nsIWindowMediator);
const browserWindow = wm.getMostRecentWindow("navigator:browser");

function toTime(sec) {
  sec = parseInt(sec, 10);

  var hours = Math.floor(sec / 3600),
    minutes = Math.floor((sec - (hours * 3600)) / 60),
    seconds = sec - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = '0' + hours; }
  if (minutes < 10) { minutes = '0' + minutes; }
  if (seconds < 10) { seconds = '0' + seconds; }

  return hours + ':' + minutes;
}

class API extends ExtensionAPI {
  getAPI(context) {
    return {
      battery: {

        async getLevel() {
          var batteryLevel = browserWindow.navigator.getBattery().then(function (battery) {
            return (battery.level * 100).toFixed(2);
          });
          return batteryLevel;
        },
        async getStatus() {
          var batteryStatus = browserWindow.navigator.getBattery().then(function (battery) {
            return battery.charging ? "Plugged-in/charging" : "Running on battery"
          });
          return batteryStatus;
        },
        async getTime() {
          var batteryTime = browserWindow.navigator.getBattery().then(function (battery) {
            if (battery.charging
              && battery.chargingTime == "Infinity") {
              return "Calculating...";
            }
            else if (battery.chargingTime != "Infinity") {
              return toTime(battery.chargingTime);
            }
            else {
              return "---";
            }
          });
          return batteryTime;
        },
        async getTimeLeft() {
          var batteryTime = browserWindow.navigator.getBattery().then(function (battery) {
            if (!battery.charging
              && battery.dischargingTime == "Infinity") {
              return "Calculating...";
            }
            else if (battery.dischargingTime != "Infinity") {
              return toTime(battery.dischargingTime);
            }
            else {
              return "---";
            }
          });
          return (batteryTime);
        }
      }
    }
  };
}