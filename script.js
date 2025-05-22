const downloadCtx = document.getElementById("downloadGauge").getContext("2d");
const uploadCtx = document.getElementById("uploadGauge").getContext("2d");

function drawFullGauge(ctx, percent, color) {
  const centerX = 110;
  const centerY = 110;
  const radius = 90;

  ctx.clearRect(0, 0, 220, 220);

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 16;
  ctx.stroke();

  const angle = (percent / 100) * 2 * Math.PI;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, -Math.PI / 2, angle - Math.PI / 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 16;
  ctx.lineCap = "round";
  ctx.stroke();
}

function detectDevice() {
  const ua = navigator.userAgent;
  if (/iPhone/.test(ua)) return "iPhone";
  if (/Android/.test(ua)) return "Android";
  if (/Windows/.test(ua)) return "Windows PC";
  if (/Mac/.test(ua)) return "Mac";
  return "Tidak Dikenal";
}

document.getElementById("device").textContent = `Perangkat: ${detectDevice()}`;
fetch("https://ipinfo.io/json?token=db955ecd23c16c")
  .then(res => res.json())
  .then(data => {
    document.getElementById("isp").textContent = `ISP: ${data.org} - ${data.city}`;
  });

let s;

function startTest() {
  document.getElementById("finalResult").classList.remove("show");
  document.getElementById("restartBtn").style.display = "none";

  s = new Speedtest();
  s.onupdate = function(data) {
    if (data.downloadStatus) {
      const val = parseFloat(data.downloadStatus);
      drawFullGauge(downloadCtx, Math.min(val, 100), "#3b82f6");
      document.getElementById("downloadSpeed").textContent = val.toFixed(1);
    }
    if (data.uploadStatus) {
      const val = parseFloat(data.uploadStatus);
      drawFullGauge(uploadCtx, Math.min(val, 100), "#facc15");
      document.getElementById("uploadSpeed").textContent = val.toFixed(1);
    }
    if (data.pingStatus) {
      document.getElementById("ping").textContent = parseFloat(data.pingStatus).toFixed(1);
    }
    if (data.jitterStatus) {
      document.getElementById("jitter").textContent = parseFloat(data.jitterStatus).toFixed(1);
    }
  };

  s.onend = function() {
    document.getElementById("downloadResult").textContent = document.getElementById("downloadSpeed").textContent;
    document.getElementById("uploadResult").textContent = document.getElementById("uploadSpeed").textContent;
    document.getElementById("finalResult").classList.add("show");
    document.getElementById("restartBtn").style.display = "inline-block";
  };

  s.start();
}

document.getElementById("restartBtn").addEventListener("click", () => {
  s.abort();
  startTest();
});

startTest();