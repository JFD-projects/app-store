import React from 'react'

const Loader = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0, 0.3)'
      }}
      className="d-flex justify-content-center align-items-center">
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Загрузка...</span>
      </div>
      
    </div>
  )
}

export default Loader
