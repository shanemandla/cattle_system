document.addEventListener('DOMContentLoaded', () => {
  const ctxOverview = document.getElementById('overviewChart').getContext('2d');
  const ctxDetailed = document.getElementById('detailedChart').getContext('2d');

  const overviewChart = new Chart(ctxOverview, {
    type: 'pie',
    data: {
      labels: ['Bulls', 'Cows', 'Calves'],
      datasets: [{
        data: [10, 20, 5],
        backgroundColor: ['#2e7d32', '#1565c0', '#ffa000']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Cattle Distribution'
        }
      }
    }
  });

  const detailedChart = new Chart(ctxDetailed, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Bulls',
        data: [3, 2, 1, 5, 2, 3, 4, 2, 3, 4, 2, 1],
        backgroundColor: '#2e7d32'
      }, {
        label: 'Cows',
        data: [5, 6, 5, 4, 5, 6, 5, 4, 5, 6, 5, 4],
        backgroundColor: '#1565c0'
      }, {
        label: 'Calves',
        data: [1, 0, 2, 1, 1, 2, 1, 0, 1, 2, 1, 0],
        backgroundColor: '#ffa000'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Monthly Cattle Records'
        }
      }
    }
  });
});