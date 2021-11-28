import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './layouts/login'
import Dashboard from './layouts/dashboard'
// import Main from './pages/main'
import NavBar from './components/ui/NavBar'
import Catalog from './layouts/catalog'

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/login/:type?" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/catalog/:productId?" component={Catalog} />
        <Route exact path="/" component={Catalog} />
        <Redirect to='/'/>
      </Switch>
    </>
  )
}

export default App
