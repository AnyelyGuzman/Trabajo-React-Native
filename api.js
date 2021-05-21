import axios from 'axios'
const http = axios.create({
  baseURL: 'http://192.168.0.3:4000'
})

http.interceptors.response.use(null, error => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500
  if (!expectedError) {
    return Promise.reject(error)
  }
})

const Api = {

  //Productos
  async getProductos() {
    try {
      return await http.get('/productos')
    } catch (error) {
      console.error(error)
    }
  },

  async getProductosId(id) {
    try {
      return await http.get('/productos/' + id)
    } catch (error) {
      console.error(error)
    }
  },
  async editarProductos(obj) {
    try {
      return await http.put('/productos', obj)
    } catch (error) {
      console.error(error)
    }
  },


}

export default Api