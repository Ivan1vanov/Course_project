import React, { useEffect, useState } from 'react'

import whiteMode from './auth.module.scss'
import darkMode from './authDark.module.scss'

import { BsFillEyeFill,  BsFillEyeSlashFill } from "react-icons/bs";
import { Container, Button } from 'react-bootstrap';

import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, registrationAction, loginWithFacebookAction } from '../../store/actions/userAction';
import { useLocation, useNavigate } from 'react-router-dom';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import {AiOutlineFacebook } from "react-icons/ai";

 

const AuthPage = () => {

    const [isHidenPassword, setIsHidenPassword] = useState<boolean>(true)
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const [inputData, setInputData] = useState<any>({
        name: "",
        email: "",
        password: "",
        confirmPassword: ''
    })
    const [validError, setValidError] = useState('')

    const dispatch: any = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const {error} = useSelector((state: any) => state.user)

    const info = localStorage.getItem('profile')
    const token = info !== null ? JSON.parse(info).token : ''

    useEffect(() => {
        if(token) {
            navigate('/')
        }
    }, [location, token])

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        })
    }

    const submitDataHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        if(isLogin) {
            if(!validator.isEmail(inputData.email)) {
                setValidError('Invalid email')
            } else {
                setValidError('')
                dispatch(loginAction(inputData))
            }
        } else {
            if(inputData.password !== inputData.confirmPassword) {
                setValidError('Password does not match')
            } else if(!validator.isEmail(inputData.email)) {
                setValidError('Invalid email')
            } else {
                setValidError('')
                dispatch(registrationAction(inputData))
            }
        }
    }

    const responseFacebook = (res: any) => {
        // console.log(res)
        dispatch(loginWithFacebookAction(res))
    }

    const {color} = useSelector((state: any) => state.settings)
    const isWhite: boolean = color === 'white'

    const styles = isWhite ? whiteMode : darkMode

  return (
      <div className={styles.body}>
    <Container className={styles.container}>
    <form>
    {isLogin ? (
        <React.Fragment>
    <div className="form-group">
    <label>Email address</label>
    <input type="email" name='email' className="form-control" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChangeHandler}/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>


  <label>Password</label>
    <div className={styles.passwordWrapper}> 
    <input name='password' type={isHidenPassword ?"password" : "text"} className="form-control" placeholder="Password" onChange={onChangeHandler}/>
    
    <Button variant='light' className={styles.allSeeingEye} onClick={() => setIsHidenPassword(!isHidenPassword)}>
               {isHidenPassword ? (   
             <BsFillEyeSlashFill style={{fontSize: '25px'}} />
               ) : (
            <BsFillEyeFill style={{fontSize: '25px'}}/>
               )}
         
           </Button>
    </div>
        </React.Fragment>

    ) : (

        <React.Fragment>

    <label>Name</label>
    <input type="text" name='name' className="form-control" aria-describedby="emailHelp" placeholder="Enter Your name" onChange={onChangeHandler}/>
            
              <div className="form-group">
    <label >Email address</label>
    <input type="email" name='email' className="form-control" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChangeHandler}/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>


  <label >Password</label>
    <div className={styles.passwordWrapper}> 
    <input name='password' type={isHidenPassword ?"password" : "text"} className="form-control" placeholder="Password" onChange={onChangeHandler}/>
    
    <Button variant='light' className={styles.allSeeingEye} onClick={() => setIsHidenPassword(!isHidenPassword)}>
               {isHidenPassword ? (   
             <BsFillEyeSlashFill style={{fontSize: '25px'}} />
               ) : (
            <BsFillEyeFill style={{fontSize: '25px'}}/>
               )}
         
           </Button>
    </div>

    <label >Confirm Password</label>
    <input name='confirmPassword' type={isHidenPassword ?"password" : "text"} className="form-control" placeholder="Password" onChange={onChangeHandler}/>
        </React.Fragment>

    )}
</form>
{validError && (
        <div className="alert alert-danger mt-3 w-5" role="alert">
        {validError}
      </div>
    )}
{error && (
     <div className="alert alert-danger mt-3 w-5" role="alert">
     {error}
   </div>
)}
  
<div className={styles.actionFooter}>
  <Button onClick={submitDataHandler} type="submit" className="btn btn-primary mt-3">
      {isLogin ? (
          <span>
              Login
          </span>
      ) : (
          <span>
              Register
          </span>
      )}
  </Button>

  <div>
      <p>{isLogin ? (
          <span>
              Do not have an account? - <Button onClick={() => setIsLogin(false)} variant={isWhite ? 'light' : 'dark'}>
                  Register
                  </Button>
          </span>
      ): (
        <span>
        Allready have an account? - <Button onClick={() => setIsLogin(true)} variant={isWhite ? 'light' : 'dark'}>
            Login
            </Button>
        </span>
      )}
      </p>
      
      <FacebookLogin
        appId="376697931065454"
        autoLoad={false}
        callback={responseFacebook} 
        render={renderProps => (
            <Button className={styles.facebookButton} onClick={renderProps.onClick}>
                <div className={styles.iconFacebook}>
                <AiOutlineFacebook/>
                </div>
                Login with Facebook
            </Button>
          )}
        />
  </div>

  </div>
    </Container>
    </div>
  )
}

export default AuthPage