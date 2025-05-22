let downloadChart, uploadChart;

function setupGauge(ctx, color) {
  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [0, 100],
        backgroundColor: [color, "#1e293b"],
        borderWidth: 0
      }]
    },
    options: {
      cutout: '80%',
      responsive: true,
      animation: false,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function updateGauge(chart, value) {
  chart.data.datasets[0].data[0] = Math.min(value, 100);
  chart.data.datasets[0].data[1] = 100 - Math.min(value, 100);
  chart.update();
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
      updateGauge(downloadChart, val);
      document.getElementById("downloadSpeed").textContent = val.toFixed(1);
    }
    if (data.uploadStatus) {
      const val = parseFloat(data.uploadStatus);
      updateGauge(uploadChart, val);
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

window.onload = () => {
  downloadChart = setupGauge(document.getElementById("downloadGauge").getContext("2d"), "#3b82f6");
  uploadChart = setupGauge(document.getElementById("uploadGauge").getContext("2d"), "#facc15");
  startTest();
};