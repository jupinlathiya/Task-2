import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
// import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
// import { register } from "../../actions/userActions";
import MainScreen from '../mainScreen'
import './registerScreen.css'
import { useSelector } from 'react-redux'
import { register } from '../../actions/adminUserActions'
import { useDispatch } from 'react-redux'

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [firstname, setName] = useState('')
  const [lastname, setLastName] = useState('')

  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userRegister = useSelector(state => state.userRegister)
  const { userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      navigate('/home')
    }
  })

  const submitHandler = async e => {
    // console.log('Inside submitHandler')
    e.preventDefault()
    if (password !== confirmpassword) {
      setMessage('password do not match')
    } else {
      dispatch(register(firstname, lastname, email, password))
    }
  }

  return (
    <MainScreen title='REGISTER'>
      <div className='loginContainer'>
        {message && <div className='error-message'>{message}</div>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type='name'
              value={firstname}
              placeholder='Enter name'
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='name'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='name'
              value={lastname}
              placeholder='Enter name'
              onChange={e => setLastName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              value={email}
              placeholder='Enter email'
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              value={password}
              placeholder='Password'
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              value={confirmpassword}
              placeholder='Confirm Password'
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Register
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            Have an Account ? <Link to='/login'>Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  )
}

export default RegisterScreen
