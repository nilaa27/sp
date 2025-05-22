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

fetch("https://ipinfo.io/json?token=db955ecd23c16c")
  .then(res => res.json())
  .then(data => {
    document.getElementById("isp").innerText = data.org || "Tidak diketahui";
    document.getElementById("lokasi").innerText = data.city || "Tidak diketahui";
    document.getElementById("ip").innerText = data.ip || "Tidak diketahui";
    document.getElementById("perangkat").innerText = getDeviceInfo();
  })
  .catch(() => {
    document.getElementById("isp").innerText = "Gagal";
    document.getElementById("lokasi").innerText = "Gagal";
    document.getElementById("ip").innerText = "Gagal";
    document.getElementById("perangkat").innerText = "Gagal";
  });

const canvas = document.getElementById("speedometer");
const ctx = canvas.getContext("2d");

function drawMeter(speed) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 120;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background arc
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0.75 * Math.PI, 2.25 * Math.PI);
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 20;
  ctx.stroke();

  // Draw progress arc
  const angle = (speed / 1000) * Math.PI * 1.5;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0.75 * Math.PI, 0.75 * Math.PI + angle);
  ctx.strokeStyle = "#00bfff";
  ctx.lineWidth = 20;
  ctx.stroke();

  // Draw needle
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

  // Draw scale labels
  const steps = [0, 250, 500, 750, 1000];
  steps.forEach(val => {
    const a = 0.75 * Math.PI + (val / 1000) * Math.PI * 1.5;
    const lx = centerX + (radius + 20) * Math.cos(a);
    const ly = centerY + (radius + 20) * Math.sin(a);
    ctx.fillStyle = "#ccc";
    ctx.font = "12px sans-serif";
    ctx.fillText(val, lx - 10, ly + 5);
  });
}

let currentSpeed = 0;
let animationInterval;

function animateSpeed(targetSpeed) {
  clearInterval(animationInterval);
  animationInterval = setInterval(() => {
    if (currentSpeed >= targetSpeed) {
      clearInterval(animationInterval);
    } else {
      currentSpeed += (targetSpeed - currentSpeed) * 0.05;
      if (targetSpeed - currentSpeed < 0.5) currentSpeed = targetSpeed;
      drawMeter(currentSpeed);
      document.getElementById("speedValue").innerText = currentSpeed.toFixed(1) + " Mbps";
    }
  }, 16);
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
