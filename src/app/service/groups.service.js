import httpService from './http.service'

const groupsEndPoint = 'group/'

const groupsService = {
  get: async () => {
    const { data } = await httpService.get(groupsEndPoint)
    return data
  }
}

export default groupsService
