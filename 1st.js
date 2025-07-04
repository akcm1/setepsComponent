<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SIP Calculator</title>
  <style>
    * {
      box-sizing: border-box;
      font-family: 'Segoe UI', sans-serif;
    }
    body {
      background: #161616;
      color: #fff;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .container {
      background: linear-gradient(#160025, #310057);
      padding: 20px;
      border-radius: 20px;
      width: 320px;
      box-shadow: 0 0 20px rgba(143, 0, 255, 0.3);
    }
    h2 {
      margin: 0 0 20px;
    }
    .chart {
      display: flex;
      justify-content: center;
      margin: 20px 0;
    }
    .slider-group {
      margin: 15px 0;
    }
    .slider-group label {
      font-size: 0.9rem;
      display: block;
      margin-bottom: 5px;
    }
    .slider-group input[type=range] {
      width: 100%;
    }
    .output {
      margin-top: 20px;
      font-size: 0.9rem;
    }
    .output p {
      margin: 4px 0;
    }
    .btn {
      margin-top: 20px;
      width: 100%;
      background: linear-gradient(to right, #C070FF, #8F00FF);
      border: none;
      color: white;
      padding: 10px;
      border-radius: 10px;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .btn:hover {
      transform: scale(1.05);
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>SIP Calculator</h2>
    <div class="chart">
      <canvas id="sipChart" width="180" height="180"></canvas>
    </div>
    <div class="slider-group">
      <label>Monthly Investment</label>
      <input type="range" min="1000" max="100000" value="60000" id="monthlyInvestment">
    </div>
    <div class="slider-group">
      <label>Expected Return Rate (p.a)</label>
      <input type="range" min="1" max="20" value="10" id="returnRate">
    </div>
    <div class="slider-group">
      <label>Time Period (Years)</label>
      <input type="range" min="1" max="30" value="10" id="timePeriod">
    </div>

    <div class="output">
      <p>Monthly Investment: <span id="miOutput">60,000</span></p>
      <p>Est. Returns: <span id="returnOutput">0</span></p>
      <p><strong>Total: <span id="totalOutput">0</span></strong></p>
    </div>

    <button class="btn">Invest Now</button>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script>
    const miSlider = document.getElementById('monthlyInvestment');
    const rrSlider = document.getElementById('returnRate');
    const tpSlider = document.getElementById('timePeriod');

    const miOutput = document.getElementById('miOutput');
    const returnOutput = document.getElementById('returnOutput');
    const totalOutput = document.getElementById('totalOutput');

    const ctx = document.getElementById('sipChart').getContext('2d');
    let sipChart;

    function calculateSIP() {
      const P = parseInt(miSlider.value);
      const r = parseFloat(rrSlider.value) / 100 / 12;
      const n = parseInt(tpSlider.value) * 12;

      const futureValue = P * ((Math.pow(1 + r, n) - 1) * (1 + r)) / r;
      const investedAmount = P * n;
      const estReturns = futureValue - investedAmount;

      miOutput.textContent = P.toLocaleString();
      returnOutput.textContent = Math.round(estReturns).toLocaleString();
      totalOutput.textContent = Math.round(futureValue).toLocaleString();

      updateChart(investedAmount, estReturns);
    }

    function updateChart(invested, returns) {
      if (sipChart) sipChart.destroy();
      sipChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Invested Amount', 'Est Returns'],
          datasets: [{
            data: [invested, returns],
            backgroundColor: ['#D9D9D9', '#8F00FF'],
            borderWidth: 0
          }]
        },
        options: {
          cutout: '70%',
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                color: '#fff'
              }
            }
          }
        }
      });
    }

    miSlider.addEventListener('input', calculateSIP);
    rrSlider.addEventListener('input', calculateSIP);
    tpSlider.addEventListener('input', calculateSIP);

    // Initial load
    calculateSIP();
  </script>
</body>
</html>
