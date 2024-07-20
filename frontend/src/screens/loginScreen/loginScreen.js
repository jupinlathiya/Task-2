import React, { useState, useEffect } from 'react'
import MainScreen from '../mainScreen'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/adminUserActions'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      navigate('/home')
    }
  })

  const submitHandler = async e => {
    e.preventDefault()
    // console.log(email, password);
    dispatch(login(email, password))
  }

  return (
    <MainScreen title='LOGIN'>
      <div className='loginContainer'>
        {error && <div className='error-message'>{error}</div>}
        <Form onSubmit={submitHandler}>
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
              placeholder='Enter password'
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            New Customer ? <Link to='/'>Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  )
}

export default LoginScreen
