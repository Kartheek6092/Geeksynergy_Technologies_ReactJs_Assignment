import {Component} from 'react'

import './index.css'

class Signup extends Component {
    state = {name: '', password: '', email: '', phoneNo: '', profession: '', showErr: false, errMsg: ''}

    onChangeName = event => {
        this.setState({name: event.target.value})
    }

    onChangePassword = event => {
        this.setState({password: event.target.value})
    }

    onChangeEmail = event => {
        this.setState({email: event.target.value})
    }

    onChangePhoneNo = event => {
        this.setState({phoneNo: event.target.value})
    }

    onChangeProfession = event => {
        this.setState({profession: event.target.value})
    }

    toLogInPage = () =>{
        window.location.href='/login';
    }

    onSignup = event => {
        event.preventDefault()
        const {name, password} = this.state

        const existingUsers = JSON.parse(localStorage.getItem('users')) || []
        if(existingUsers.length > 0){
            let unmatched = 0
            for(let i of existingUsers){
                if (i.username === name && i.password === password) {
                    this.setState({showErr: true, errMsg: 'User already exists. Please login'})
                }else{
                    unmatched = unmatched + 1
                }
            }
            if(unmatched === existingUsers.length){
                existingUsers.push({ username: name, password })
                localStorage.setItem('users', JSON.stringify(existingUsers))
            }
        }else{
            existingUsers.push({ username: name, password })
            localStorage.setItem('users', JSON.stringify(existingUsers))
        }
        console.log(existingUsers)
    }

    render(){
        const {showErr, errMsg} = this.state

        return(
            <div className="sign-up-container">
                <form className='signup-form' onSubmit={this.onSignup}>
                    <h1>Sign Up</h1>
                    <label htmlFor="name" >Name: </label>
                    <input type="text" onChange={this.onChangeName} name="name" id="name" placeholder='Enter name' /><br />
                    <label htmlFor="password" >Password: </label>
                    <input type="password" onChange={this.onChangePassword} name="password" id="password" placeholder='Enter password'/><br />
                    <label htmlFor="email" >Email Address: </label>
                    <input type="email" onChange={this.onChangeEmail} name="email" id="email" placeholder='Enter email address'/><br />
                    <label htmlFor="phone-no" >Phone No: </label>
                    <input type="tel" onChange={this.onChangePhoneNo} name="phone-no" id="phone-no" placeholder='Enter Phone Number' pattern='[0-9]{10}' /><br />
                    <label htmlFor='profession'>Profession: </label>
                    <select id='proffession' className='select-profession' onChange={this.onChangeProfession}>
                        <option value='IT Employe'>IT Employe</option>
                        <option value='Manager'>Manager</option>
                        <option value='Admin'>Admin</option>
                        <option value='Contractor'>Contractor</option>
                        <option value='farmer'>Farmer</option>
                        <option value='student'>Student</option>
                        <option vallue='other'>Other</option>
                    </select><br />
                    <button type='sunbmit' className='sigup-btn' >Sign Up</button><br />

                    {showErr ? <p className='err-msg'>*{errMsg}</p> : null}

                    <p className='already-user'>Already a User? <button type='button' className='login-btn' onClick={this.toLogInPage} >Login</button></p>
                </form>
            </div>
        )
    }
}

export default Signup