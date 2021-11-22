import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from './routes/main'
import routes from './routes/routes'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        {routes.map((route, key) => (
          <Route path={route.path} element={route.component} key={key} />
        ))}
      </Route>
      <Route path="*" element={<Main />} />
    </Routes>
  )
}

export default App
