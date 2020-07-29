import React, { Component } from 'react'
import { Link, Redirect} from 'react-router-dom'
import ThrowError from "./throw-error"
import axios from 'axios'

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			email:'',
			password: '',
			confirmPassword: '',
			errors: []

		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value // updates state with input
		})
	}
	handleSubmit(event) {
		let errors = this.state.errors
		event.preventDefault()

		// checks if form is filled out
		if (!this.state.username || !this.state.email || !this.state.password || this.state.confirmPassword ) {
			errors.push("Please Fill out the entire form")
			this.setState({errors})
        //creates a new user based of this state 
		} else{
			axios.post('/user/', {
				username: this.state.username,
				password: this.state.password
			})
			.then(response => {
				if (!response.data.errmsg) {
					this.setState({ //redirect to login page
						redirectTo: '/login'
					})
				} else {
					errors.push("username is already taken") //throw error notifaction
					this.setState({errors})
				}
			}).catch(error => {
				console.log(error)

			})
		}
	}
	renderErrors() { //maps all of the errors in the error state array and makes a dismissable notifaction 
		return this.state.errors.map((i,index) =>{ 
		  return (<ThrowError message={i} key={index}/>)
		}) 
	  }
	  
render() {
	if (this.state.redirectTo) {
		return <Redirect to={{pathname: this.state.redirectTo}} />
	}
	return (
		<div className="row mt-5">
		<div className="col-md-6 m-auto">
		  <div className="card card-body">
			<h1 className="text-center mb-3"><i className="fas fa-user-plus"></i> Signup</h1>
			<form onSubmit={this.handleSubmit}>
			  <div className="form-group">
				{this.renderErrors()}
				<label htmlFor="name">Name</label>
				<input type="name" onChange={e => this.handleChange(e)} value={this.state.name} id="name" name="name" className="form-control" placeholder="Enter Name" />
			  </div>
			  <div className="form-group">
				<label htmlFor="email">Email</label>
				<input type="email" onChange={e => this.handleChange(e)} value={this.state.email} id="email" name="email" className="form-control" placeholder="Enter Email"/>
			  </div>
			  <div className="form-group">
				<label htmlFor="password">Password</label>
				<input type="password"   onChange={e => this.handleChange(e)} value={this.state.password}  id="password" name="password" className="form-control" placeholder="Enter Password" />
			  </div>
			  <div className="form-group">
				<label htmlFor="password2">Confirm Password</label>
				<input type="password"   onChange={e => this.handleChange(e)} value={this.state.confirmPassword}  id="confirmPassword" name="confirmPassword" className="form-control" placeholder="Re-Enter Password" />
			  </div>
			  <button type="submit" className="btn btn-primary btn-block">Signup</button>
			</form>
			<p className="lead mt-4">Have An Account? <Link to="/login">Login</Link></p>
		  </div>
		 </div>
		</div> 
	
	)
}
}
 
export default Signup
