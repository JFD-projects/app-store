import React from 'react'
import Container from '../components/common/container'
import useMockData from '../utils/mockData'
import { ProgressBar } from 'react-bootstrap'

const Main = () => {
  const { error, initialize, progress, status } = useMockData()

  const handleClick = () => {
    initialize()
  }
  
  return (
    <Container>
      <h1> Main Page</h1>
      <h3>Инициализация данных в FireBase</h3>
      <ul>
        <li>Status: {status}</li>
        <li>
          <ProgressBar animated now={progress} label={`${progress}%`} />
        </li>
        {error && <li>error: {error}</li>}
      </ul>
      <button className="btn btn-primary" onClick={handleClick}>
        Инициализировать
      </button>
    </Container>
  )
}

export default Main
