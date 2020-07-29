import React, { Component } from 'react';

class ThrowError extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
    this.state = { active: true }
  }
  handleClick() {
    this.setState({active:false}) //sets the css property "display" : none
  }
  render() { 
    return (   
    <div className={`alert alert-warning alert-dismissible fade show  ${this.state.active ? "" : "false"}`}>
      <strong>{this.props.message}</strong>
      <button type="button" className="close" onClick={this.handleClick} >
        <span >&times;</span>
      </button>
    </div>
);
  }
}

export default ThrowError