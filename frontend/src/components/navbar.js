import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css';
import axios from 'axios'

class Navbar extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault()
        axios.post('/user/logout').then(response => { //sends a post request to log user out of current session
          if (response.status === 200) {
            this.props.updateUser({
              loggedIn: false,
              username: null
            })
          }
        }).catch(error => {
            console.log('Logout error', error)
        })
      }

    render() {
        const loggedIn = this.props.loggedIn;
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="col-4" >
                    {loggedIn ? (
                        <section className="navbar-section">
                            <Link to="#" className="btn text-info" onClick={this.logout}>
                            <h5>logout</h5></Link>
                        </section>
                    ) : (
                        <section className="navbar-section">
                            <Link to="/" className="btn text-info">
                                <h5>home</h5>
                            </Link>
                            <Link to="/login" className="btn text-info">
                                <h5>login</h5>
                            </Link>
                            <Link to="/signup" className="btn text-info">
                                <h5>sign up</h5>
                            </Link>
                        </section>
                    )}
                </div>
            </nav>
        );
    }
}

export default Navbar