import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Auth from './pages/auth'
import Dashboard from './pages/dashboard'
import Main from './pages/main'
import Products from './pages/products'
import NavBar from './components/ui/NavBar'

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/catalog/:productId?" component={Products} />
        <Route exact path="/" component={Main} />
        <Redirect to='/'/>
      </Switch>
    </>
  )
}

export default App
