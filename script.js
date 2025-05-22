
// Fungsi untuk deteksi nama perangkat dari user agent
function getDeviceInfo() {
  const ua = navigator.userAgent;
  let os = "Tidak diketahui";

  if (ua.indexOf("Win") !== -1) os = "Windows";
  else if (ua.indexOf("Mac") !== -1) os = "macOS";
  else if (ua.indexOf("Linux") !== -1) os = "Linux";
  else if (/Android/.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS";

  let browser = "Tidak diketahui";
  if (ua.indexOf("Firefox") !== -1) browser = "Firefox";
  else if (ua.indexOf("Chrome") !== -1) browser = "Chrome";
  else if (ua.indexOf("Safari") !== -1 && ua.indexOf("Chrome") === -1) browser = "Safari";
  else if (ua.indexOf("Edg") !== -1) browser = "Edge";

  return `${browser} di ${os}`;
}

// Ambil IP, ISP, dan lokasi dari ipinfo.io
fetch("https://ipinfo.io/json?token=demo")
  .then(res => res.json())
  .then(data => {
    const isp = data.org || "ISP tidak diketahui";
    const ip = data.ip || "IP tidak diketahui";
    const city = data.city || "Lokasi tidak diketahui";
    const device = getDeviceInfo();

    document.getElementById("ipInfo").innerHTML = `
      <strong>ISP:</strong> ${isp}<br>
      <strong>IP:</strong> ${ip}<br>
      <strong>Lokasi:</strong> ${city}<br>
      <strong>Perangkat:</strong> ${device}
    `;
  })
  .catch(() => {
    document.getElementById("ipInfo").innerText = "Gagal memuat informasi IP & perangkat.";
  });

let speed = 0;
let interval;
const canvas = document.getElementById("speedometer");
const ctx = canvas.getContext("2d");

function drawMeter(speed) {
  const angle = (speed / 1000) * Math.PI * 1.5;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 120;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0.75 * Math.PI, 2.25 * Math.PI);
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 20;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0.75 * Math.PI, 0.75 * Math.PI + angle);
  ctx.strokeStyle = "#00bfff";
  ctx.lineWidth = 20;
  ctx.stroke();

  const needleLength = radius - 30;
  const needleAngle = 0.75 * Math.PI + angle;
  const x = centerX + needleLength * Math.cos(needleAngle);
  const y = centerY + needleLength * Math.sin(needleAngle);

  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(x, y);
  ctx.strokeStyle = "#ff0000";
  ctx.lineWidth = 3;
  ctx.stroke();
}

function animateSpeed(finalSpeed) {
  clearInterval(interval);
  let current = 0;
  interval = setInterval(() => {
    if (current >= finalSpeed) {
      clearInterval(interval);
    } else {
      current += 1;
      drawMeter(current);
      document.getElementById("speedValue").innerText = current.toFixed(1) + " Mbps";
    }
  }, 10);
}

function startTest() {
  const testDownloadSpeed = Math.floor(Math.random() * 100 + 20);
  const testUploadSpeed = Math.floor(Math.random() * 50 + 10);
  const ping = Math.floor(Math.random() * 30 + 5);
  const jitter = Math.floor(Math.random() * 10 + 2);

  animateSpeed(testDownloadSpeed);
  document.getElementById("download").innerText = testDownloadSpeed;
  document.getElementById("upload").innerText = testUploadSpeed;
  document.getElementById("ping").innerText = ping;
  document.getElementById("jitter").innerText = jitter;
}
