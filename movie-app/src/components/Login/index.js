import {Component} from 'react'

import './index.css'

class Login extends Component {
    state = {name: '', password: '', showErr: false, errMsg: ''}

    onChangeName = event => {
        this.setState({name: event.target.value})
    }

    onChangePassword = event => {
        this.setState({password: event.target.value})
    }

    toSignupPage = () =>{
        window.location.href='/signup';
    }

    onLoginUser = event => {
        event.preventDefault();
        const {name,  password} = this.state
        const usersList = JSON.parse(localStorage.getItem('users')) || []

        let unmatched = 0

        for(let i of usersList){
            if (i.username === name && i.password === password) {
                window.location.href='./home'
                }else if(i.username === name && i.password !== password){
                    this.setState({errMsg: 'Incorrect password', showErr: true})
                    break
                }else{
                    unmatched++
                }
        if(unmatched === usersList.length){
                this.setState({showErr: true, errMsg: 'Invalid Credentials Please Signup'})
            }

        }
    }

    render(){
        const {showErr, errMsg} = this.state

        return(
            <div className="login-container">
                <form className='login-form' onSubmit={this.onLoginUser}>
                    <h1>Login</h1>

                    <label htmlFor='name'>Name: </label>
                    <input type='text' onChange={this.onChangeName} name='name' id='name'/><br />
                    <label htmlFor='password'>Password: </label>
                    <input type='password' onChange={this.onChangePassword} name='password' id='password'/><br />

                    <button type='submit' className='login-button'>Login</button><brv />
                    {showErr ? <p className='err-msg'>{errMsg}</p> : null}

                    <p className='already-user'>Not a registered User? <button type='button' className='signup-button' onClick={this.toSignupPage} >SignUp</button></p>
                </form>
            </div>
        )
    }
}

export default Login