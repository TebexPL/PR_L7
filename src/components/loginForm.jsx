import React, {Component} from "react";
const axios = require('axios');

class LoginForm extends Component {

  state = {
    account: {
      username: "",
      password: ""
    },
    errors: {}
  };

  handleChangeRoute = () => {
    this.props.history.push('/');
  }

  validate = () => {
    const errors = {};
    const {account} = this.state;
    if(account.username.trim() === ''){
      errors.username = 'Username is required!';
    }
    if(account.password.trim() === ''){
      errors.password = 'Password is required!';
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const errors = this.validate();
    this.setState({errors: errors || {}});
    if(errors) return;
    axios({
      method: 'post',
      url: 'http://localhost:3001/api/user/auth',
      data:{
        login: this.state.account.username,
        password: this.state.account.password
      }
    }).then((response) => {
      localStorage.setItem('token', response.data.token);
      this.handleChangeRoute();
    }).catch((error) => {
      const errors = {};
      errors.password = 'Given username doesn\'t exist or password is wrong!';
      this.setState({errors: errors || {}});
      console.log(error);
    })
  };

  handleChange = (event) => {
    const account = {...this.state.account};
    account[event.currentTarget.name] = event.currentTarget.value;
    this.setState({account});
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username"> Email address: </label>
            <input  name="username" type="text"
                    className="form-control"
                    id="username"
                    aria-describedby="emailHelp"
                    placeholder="Username"
                    value={this.state.account.username}
                    onChange={this.handleChange}/>
                    {this.state.errors.username && <div className="alert alert-danger"> {this.state.errors.username} </div> }
          </div>
          <div className="form-group">
            <label htmlFor="password"> Password: </label>
            <input  name="password"
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={this.state.account.password}
                    onChange={this.handleChange}/>
                    {this.state.errors.password && <div className="alert alert-danger"> {this.state.errors.password} </div> }
          </div>
          <button className="btn btn-primary">Log in</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
