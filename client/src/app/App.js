import React from 'react'
import { ToastContainer } from 'react-bootstrap'
import { Redirect, Route, Switch } from 'react-router-dom'
import ProtectedRoute from './components/common/protectedRoute'
import AppLoader from './components/ui/hoc/appLoader'
import NavBar from './components/ui/NavBar'
import Bascket from './layouts/basket'
import Catalog from './layouts/catalog'
import Dashboard from './layouts/dashboard'
import Login from './layouts/login'
import LogOut from './layouts/logOut'

function App() {
  return (
    <>
      <AppLoader>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Catalog} />
          <Route path="/product/:productId?" component={Catalog} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/logout" component={LogOut} />
          <Route path="/basket" component={Bascket} />
          <ProtectedRoute>
            <Route path="/dashboard" component={Dashboard} />
          </ProtectedRoute>
          <Redirect to="/" />
        </Switch>
      </AppLoader>
      <ToastContainer />
    </>
  )
}

export default App
