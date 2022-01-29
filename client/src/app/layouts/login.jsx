import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../components/common/container'
import LoginForm from '../components/ui/loginForm'
import RegisterForm from '../components/ui/registerForm'

const Login = () => {
  const { type } = useParams()
  const [typeForm, setTypeForm] = useState(type === 'register' ? type : 'login')

  const toggleFormType = () => {
    setTypeForm((prevState) => (prevState === 'register' ? 'login' : 'register'))
  }

  return (
    <main>
      <Container>
        <div className="row mt-5">
          <div className="col-md-6 offset-md-3 p-4 shadow">
            {typeForm === 'register' ? (
              <>
                <h3 className="mb-4">Регистрация</h3>
                <RegisterForm />
                <p>
                  Уже есть аккаунт?
                  <a role="button" className="text-primary ms-2" onClick={toggleFormType}>
                    Войти
                  </a>
                </p>
              </>
            ) : (
              <>
                <h3 className="mb-4">Войти</h3>
                <LoginForm />
                <p>
                  Нет аккаунта?
                  <a role="button" className="text-primary ms-2" onClick={toggleFormType}>
                    Регистрация
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      </Container>
    </main>
  )
}

export default Login
