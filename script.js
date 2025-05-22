// Detect IP, ISP, and Device
fetch("https://ipapi.co/json/")
  .then(res => res.json())
  .then(data => {
    document.getElementById("ip").textContent = data.ip || "-";
    document.getElementById("isp").textContent = data.org || "-";
  });

const device = navigator.userAgent;
let deviceName = "Tidak diketahui";

if (/android/i.test(device)) deviceName = "Android";
else if (/iPhone|iPad|iPod/i.test(device)) deviceName = "iOS";
else if (/Mac/i.test(device)) deviceName = "MacOS";
else if (/Windows/i.test(device)) deviceName = "Windows";
else if (/Linux/i.test(device)) deviceName = "Linux";

document.getElementById("device").textContent = deviceName;

// Speed Test Setup
const speedElem = document.getElementById("speed");
const gaugeElem = document.querySelector(".gauge-fill");

document.getElementById("startBtn").addEventListener("click", startTest);

function startTest() {
  testPing().then(ping => {
    document.getElementById("ping").textContent = ping.toFixed(0);
  });

  testDownload().then(speed => {
    animateSpeed(speed);
    document.getElementById("download").textContent = speed.toFixed(1);
  });

  testUpload().then(speed => {
    document.getElementById("upload").textContent = speed.toFixed(1);
  });
}

function testPing() {
  const start = performance.now();
  return fetch("https://speedtest.wifire.io/empty.php?r=" + Math.random())
    .then(() => performance.now() - start)
    .catch(() => 0);
}

function testDownload() {
  return new Promise(resolve => {
    const start = performance.now();
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = () => {
      const duration = (performance.now() - start) / 1000;
      const bitsLoaded = xhr.response.size * 8;
      const speedMbps = bitsLoaded / duration / 1024 / 1024;
      resolve(speedMbps);
    };
    xhr.onerror = () => resolve(0);
    xhr.open("GET", "https://speedtest.wifire.io/garbage.php?r=" + Math.random(), true);
    xhr.send();
  });
}

function testUpload() {
  return new Promise(resolve => {
    const blob = new Blob(["a".repeat(2 * 1024 * 1024)], { type: "application/octet-stream" });
    const start = performance.now();
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const duration = (performance.now() - start) / 1000;
      const bitsSent = blob.size * 8;
      const speedMbps = bitsSent / duration / 1024 / 1024;
      resolve(speedMbps);
    };
    xhr.onerror = () => resolve(0);
    xhr.open("POST", "https://speedtest.wifire.io/empty.php?r=" + Math.random(), true);
    xhr.send(blob);
  });
}

function animateSpeed(speed) {
  const angle = Math.min(100, speed) * 1.8; // 180deg max
  gaugeElem.style.transform = `rotate(${angle}deg)`;
  speedElem.textContent = speed.toFixed(1);
}