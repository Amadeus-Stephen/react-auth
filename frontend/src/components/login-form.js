import React, { Component } from 'react'
import { Redirect , Link} from 'react-router-dom'
import ThrowError from "./throw-error"
import axios from 'axios'

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null,
            errors: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
  
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value //updates the states with the inputs value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        let errors = this.state.errors
        console.log('handleSubmit')
        if (!this.state.username || !this.state.password) { //makes sure the form is filled 
            errors.push("Please Fill out the entire form") //if not i will throw a disable error message to the user
            this.setState({errors})
        } else {
            axios
            .post('/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    })
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/'
                    })
                }
            }).catch(err => {
                console.log(err)
                errors.push("incorrect username or password") // if the axios request responds with a error
                // it will be assumed to because of a 401 error throw by incorrect and throw a error message 
                // feel free to add a bit better error handling in your projects
                this.setState({errors})
            })

        }
    }
    renderErrors() { // throws the dissmisable error  messages based of error list in this componets state
        return this.state.errors.map((i, idx) =>{ 
          return (<ThrowError message={i} key={idx}/>)
      }) 
    }
    render() {
        if (this.state.redirectTo) { // will redirect user if this.state.redirectTo returns true
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div className="row mt-5">
                <div className="col-md-6 m-auto">
                  <div className="card card-body">
                    <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i>Login</h1>
                      <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                          {this.renderErrors()}
                          <label htmlFor="username">username</label>
                          <input type="input" onChange={e => this.handleChange(e)} value={this.state.username} id="username" name="username" className="form-control" placeholder="Enter username"/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <input type="password"   onChange={e => this.handleChange(e)} value={this.state.password}  id="password" name="password" className="form-control" placeholder="Enter Password" />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                      </form>
                      <p className="lead mt-4">Dont have an account? <Link to="/signup">Signup </Link></p>
                    </div>
                  </div>
                </div>  
            )
        }
    }
}

 
export default LoginForm