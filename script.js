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
fetch("https://ipinfo.io/json?token=demo") // Ganti "demo" dengan token asli jika dibutuhkan
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