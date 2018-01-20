async function Display() {
document.getElementById("batteryLevel").textContent += await browser.battery.getLevel() + "%";
document.getElementById("batteryStatus").textContent += await browser.battery.getStatus();
document.getElementById("batteryTime").textContent += await browser.battery.getTime();
document.getElementById("batteryDischargeTime").textContent += await browser.battery.getTimeLeft();
}

Display()