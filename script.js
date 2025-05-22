document.getElementById("startBtn").addEventListener("click", () => {
  simulateTest();
});

function simulateTest() {
  let down = randomSpeed();
  let up = randomSpeed();
  let ping = Math.floor(Math.random() * 100) + 1;

  animateSpeed(down);
  document.getElementById("download").textContent = down;
  document.getElementById("upload").textContent = up;
  document.getElementById("ping").textContent = ping;
}

function randomSpeed() {
  return (Math.random() * 200 + 10).toFixed(1);
}

function animateSpeed(value) {
  let percent = Math.min(value / 1000, 1);
  let angle = percent * 180;
  let radians = (angle * Math.PI) / 180;
  let x = 100 + 90 * Math.cos(radians);
  let y = 100 - 90 * Math.sin(radians);
  let arc = `M10,100 A90,90 0 ${angle > 180 ? 1 : 0},1 ${x},${y}`;
  document.getElementById("arc").setAttribute("d", arc);
  document.getElementById("speedValue").textContent = value;
}

// Get IP and ISP
fetch("https://ipapi.co/json/")
  .then(res => res.json())
  .then(data => {
    document.getElementById("ip").textContent = data.ip;
    document.getElementById("isp").textContent = data.org;
  });

// Get device info
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