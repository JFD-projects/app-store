import { useState, useEffect } from 'react'
import groups from '../mockData/groups.json'
import products from '../mockData/products.json'
import httpService from '../service/http.service'

const useMockData = () => {
  const statusConsts = {
    idle: 'Not started',
    pending: 'In process',
    successed: 'Ready',
    error: 'Error occured'
  }

  const [error, setError] = useState(null)
  const [status, setStatus] = useState(statusConsts.idle)
  const [progress, setProgress] = useState(0)
  const [count, setCount] = useState(0)
  const summuryCount = products.length + groups.length

  const incrementCount = () => {
    setCount(prevState => prevState + 1)
  }

  const updateProgress = () => {
    if (count !== 0 && status === statusConsts.idle) {
      setStatus(statusConsts.pending)
    }
    const newProgress = Math.floor((count / summuryCount) * 100)
    if (progress < newProgress) {
      setProgress(() => newProgress)
    }
    if (newProgress === 100) {
      setStatus(statusConsts.successed)
    }
  }

  useEffect(() => {
    updateProgress()
  }, [count])

  async function initialize() {
    try {
      for (const product of products) {
        await httpService.put('product/' + product._id, product)
        incrementCount()
      }
      for (const group of groups) {
        await httpService.put('group/' + group._id, group)
        incrementCount()
      }
    } catch (error) {
      setError(error)
      setStatus(statusConsts.error)
    }
  }

  return { error, initialize, status, progress }
}

export default useMockData
