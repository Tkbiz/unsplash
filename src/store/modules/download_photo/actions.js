import axios from 'axios'

export default {
  async downloadPhoto({}, url) {
    try {
      const response = await axios.get(url, {responseType: 'blob'})
      const link = document.createElement('a')
      const blob = new Blob([response.data])
      link.href = URL.createObjectURL(blob)
      link.download = 'image.jpg'
      link.click()
      URL.revokeObjectURL(link.href)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
}
