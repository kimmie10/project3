import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import classnames from "classnames";
import "./LoginComponent.css";

class LoginComponent extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);    
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    }
// How I had it before
    axios
    .post('/api/users/login', user)
    .then(res => {
      //console.log(res.data);
      this.props.userBecameAuthed();       
      })
    .catch(err => console.log(err));
    // .catch(err => this.setState({ errors: err.response.data }));
  }
  
  render() {
    const { errors } = this.state;
    console.log(this.props.auth);
    return this.props.auth.isAuthenticated ? <Redirect to ="/library"/> : (
      <div className="LoginComponent">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your Read With Me account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors
                    })}
                    placeholder="Email Address"
                    name="email"
                    value = {this.state.email}
                    onChange = {this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value = {this.state.password}
                    onChange = {this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginComponent;