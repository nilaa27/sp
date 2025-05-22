const downloadCtx = document.getElementById("downloadGauge").getContext("2d");
const uploadCtx = document.getElementById("uploadGauge").getContext("2d");

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

let downloadChart = new Chart(downloadCtx, {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [0, 100],
      backgroundColor: ['#3b82f6', '#1e293b'],
      borderWidth: 0
    }]
  },
  options: { cutout: '80%', responsive: true }
});

let uploadChart = new Chart(uploadCtx, {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [0, 100],
      backgroundColor: ['#facc15', '#1e293b'],
      borderWidth: 0
    }]
  },
  options: { cutout: '80%', responsive: true }
});

async function measureDownload() {
  const start = performance.now();
  try {
    await fetch("https://speed.hetzner.de/100MB.bin");
    const duration = (performance.now() - start) / 1000;
    const bits = 100 * 8 * 1024 * 1024;
    const mbps = bits / duration / 1e6;
    return mbps;
  } catch {
    return 0;
  }
}

async function measureUpload() {
  const start = performance.now();
  const data = new Uint8Array(5 * 1024 * 1024); // 5MB dummy
  try {
    await fetch("https://httpbin.org/post", {
      method: "POST",
      body: data
    });
    const duration = (performance.now() - start) / 1000;
    const bits = data.length * 8;
    const mbps = bits / duration / 1e6;
    return mbps;
  } catch {
    return 0;
  }
}

async function measurePing() {
  const samples = [];
  for (let i = 0; i < 5; i++) {
    const start = performance.now();
    await fetch("https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png");
    samples.push(performance.now() - start);
  }
  const avg = samples.reduce((a,b) => a + b, 0) / samples.length;
  const jitter = samples.map(x => Math.abs(x - avg)).reduce((a,b) => a + b, 0) / samples.length;
  return { ping: avg.toFixed(1), jitter: jitter.toFixed(1) };
}

async function startTest() {
  const dl = await measureDownload();
  document.getElementById("downloadSpeed").textContent = dl.toFixed(1);
  downloadChart.data.datasets[0].data[0] = Math.min(dl, 100);
  downloadChart.data.datasets[0].data[1] = 100 - Math.min(dl, 100);
  downloadChart.update();

  const ul = await measureUpload();
  document.getElementById("uploadSpeed").textContent = ul.toFixed(1);
  uploadChart.data.datasets[0].data[0] = Math.min(ul, 100);
  uploadChart.data.datasets[0].data[1] = 100 - Math.min(ul, 100);
  uploadChart.update();

  const pingData = await measurePing();
  document.getElementById("ping").textContent = pingData.ping;
  document.getElementById("jitter").textContent = pingData.jitter;
}
