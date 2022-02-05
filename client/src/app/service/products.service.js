import httpService from './http.service'

const productsEndPoint = 'product/'

const productsService = {
  get: async () => {
    const { data } = await httpService.get(productsEndPoint)
    return data
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      productsEndPoint + payload._id,
      payload
    )
    return data
  },
  create: async (payload) => {
    const { data } = await httpService.put(productsEndPoint + payload._id, payload)
    return data
  },
  delete: async (productId) => {
    const { data } = await httpService.delete(productsEndPoint + productId)
    return data
  }
}

export default productsService
