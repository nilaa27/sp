// Konfigurasi server LibreSpeed
const settings = {
  server: {
    download: "https://speedtest.wifire.io/garbage.php",
    upload: "https://speedtest.wifire.io/empty.php",
    ping: "https://speedtest.wifire.io/empty.php"
  }
};

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
  return fetch(settings.server.ping + "?r=" + Math.random())
    .then(() => performance.now() - start);
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
    xhr.open("GET", settings.server.download + "?r=" + Math.random(), true);
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
    xhr.open("POST", settings.server.upload + "?r=" + Math.random(), true);
    xhr.send(blob);
  });
}

// Speedometer animasi
function animateSpeed(value) {
  let percent = Math.min(value / 1000, 1);
  let angle = percent * 180;
  let radians = (angle * Math.PI) / 180;
  let x = 100 + 90 * Math.cos(radians);
  let y = 100 - 90 * Math.sin(radians);
  let arc = `M10,100 A90,90 0 ${angle > 180 ? 1 : 0},1 ${x},${y}`;
  document.getElementById("arc").setAttribute("d", arc);
  document.getElementById("speedValue").textContent = value.toFixed(1);
}

// Get IP & ISP
fetch("https://ipapi.co/json/")
  .then(res => res.json())
  .then(data => {
    document.getElementById("ip").textContent = data.ip;
    document.getElementById("isp").textContent = data.org;
  });

// Get perangkat
function getDevice() {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "Android";
  if (/iPad|iPhone|iPod/.test(ua)) return "iOS";
  if (/Macintosh/.test(ua)) return "macOS";
  if (/Windows/.test(ua)) return "Windows";
  if (/Linux/.test(ua)) return "Linux";
  return "Lainnya";
}
document.getElementById("device").textContent = getDevice();