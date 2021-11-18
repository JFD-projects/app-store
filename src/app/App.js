import React from 'react';
import routes from './routes';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/ui/NavBar';
// import Container from './components/common/container';

const getRoutes = (routes) => {
  return routes.map((prop, key) => {
    return <Route path={prop.path} element={prop.component} key={key} />;
  });
};

function App() {
  return (
    <>
      <NavBar />
      {/* <Container> */}
        <Routes>{getRoutes(routes)}</Routes>
      {/* </Container> */}
    </>
  );
}

export default App;
