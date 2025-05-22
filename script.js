
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
  const testDownloadSpeed = Math.floor(Math.random() * 100 + 20); // Simulasi
  const testUploadSpeed = Math.floor(Math.random() * 50 + 10);
  const ping = Math.floor(Math.random() * 30 + 5);
  const jitter = Math.floor(Math.random() * 10 + 2);

  animateSpeed(testDownloadSpeed);
  document.getElementById("download").innerText = testDownloadSpeed;
  document.getElementById("upload").innerText = testUploadSpeed;
  document.getElementById("ping").innerText = ping;
  document.getElementById("jitter").innerText = jitter;
}

// Fetch IP Info
fetch("https://ipinfo.io/json?token=demo")
  .then(res => res.json())
  .then(data => {
    document.getElementById("ipInfo").innerText = `${data.org} (${data.ip}) - ${data.city}`;
  })
  .catch(() => {
    document.getElementById("ipInfo").innerText = "Gagal memuat informasi IP";
  });
