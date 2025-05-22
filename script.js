// Konfigurasi server LibreSpeed
const settings = {
  telemetry_level: "basic",
  server: {
    name: "LibreSpeed",
    download: "https://speedtest.wifire.io/garbage.php",
    upload: "https://speedtest.wifire.io/empty.php",
    ping: "https://speedtest.wifire.io/empty.php",
  },
};

let xhr;
document.getElementById("startBtn").addEventListener("click", startTest);

function startTest() {
  resetUI();

  testPing().then(ping => {
    document.getElementById("ping").textContent = ping.toFixed(0);
  });

  testDownload().then(speed => {
    document.getElementById("download").textContent = speed.toFixed(1);
    animateSpeed(speed);
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
    xhr = new XMLHttpRequest();
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
    const blob = new Blob(["a".repeat(2000000)], { type: "application/octet-stream" });
    const start = performance.now();
    xhr = new XMLHttpRequest();
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

// Fungsi animasi speedometer
function animateSpeed(speed) {
  const maxSpeed = 1000; // anggap maksimum 1000 Mbps
  const percent = Math.min(speed / maxSpeed, 1);
  const degrees = percent * 180;

  const fill = document.querySelector('.gauge-fill');
  const text = document.querySelector('.gauge-text');

  if (fill) fill.style.transform = `rotate(${degrees}deg)`;
  if (text) text.textContent = speed.toFixed(1);
}

// Reset UI sebelum tes baru
function resetUI() {
  document.getElementById("ping").textContent = "--";
  document.getElementById("download").textContent = "--";
  document.getElementById("upload").textContent = "--";

  const fill = document.querySelector('.gauge-fill');
  const text = document.querySelector('.gauge-text');

  if (fill) fill.style.transform = `rotate(0deg)`;
  if (text) text.textContent = "0";
}