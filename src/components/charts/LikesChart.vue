<script>
import {Line} from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    photoLikes: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.renderChart({
      labels: this.photoLikes.historical.values.map(date => date.date),
      datasets: [
        {
          label: 'Photo\'s likes',
          data: this.photoLikes.historical.values.map(value => value.value),
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
