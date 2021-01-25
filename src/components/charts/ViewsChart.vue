<script>
import {Bar} from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    photoViews: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.renderChart({
      labels: this.photoViews.historical.values.map(date => date.date),
      datasets: [
        {
          label: 'Photo\'s views',
          data: this.photoViews.historical.values.map(value => value.value),
          fill: false,
          borderColor: '#57a773',
          backgroundColor: '#57a773',
          borderWidth: 1
        }
      ]
    }, {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            display: true
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          }
        }]
      },
      legend: {
        display: true
      },
      responsive: true,
      maintainAspectRatio: false
    })
  }
}
</script>
