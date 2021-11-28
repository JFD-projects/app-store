import React from 'react'
import Container from '../components/common/container'
import CreateForm from '../components/ui/createForm'

const Dashboard = () => {
  return (
    <main>
      <Container>
        <div className="row d-flex">
          <div className="col-md-4 col-sm mb-4">
            <CreateForm/>
          </div>
          <div className="col-md-8 col-sm flex-grow-1">
            Table
          </div>
        </div>
      </Container>
    </main>
  )
}

export default Dashboard
