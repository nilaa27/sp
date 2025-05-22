let s;

function initSpeedTest() {
  if (typeof Speedtest === 'undefined') {
    console.error("Speedtest.js belum termuat.");
    return;
  }

  s = new Speedtest();

  s.onupdate = function(data) {
    if (data.download) {
      document.getElementById("downloadSpeed").textContent = (data.download / 1e6).toFixed(2);
    }
    if (data.upload) {
      document.getElementById("uploadSpeed").textContent = (data.upload / 1e6).toFixed(2);
    }
  };

  s.onend = function(aborted) {
    console.log("Speedtest selesai.");
  };

  s.start();
}

window.addEventListener('load', () => {
  const interval = setInterval(() => {
    if (typeof Speedtest !== 'undefined') {
      clearInterval(interval);
      initSpeedTest();
    }
  }, 300);
});