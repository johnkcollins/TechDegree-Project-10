import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    errors: [],
  };

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      errors,
    } = this.state;

    let errorObject;
    console.log(errors.length);
    if (this.state.errors.length <= 1) {
      errorObject = errors
    } else {
      errorObject = errors.map(error => <li key={error}>{error}</li>)
    }

    return (
        <div className="bounds">
          <div className="grid-33 centered signin">
            <h1>Sign Up</h1>
            <ul className="validation--errors--label">
              {
                errorObject
              }
            </ul>
            <Form
                cancel={this.cancel}
                submit={this.submit}
                submitButtonText="Sign Up"
                elements={() => (
                    <React.Fragment>
                      <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={firstName}
                          onChange={this.change}
                          placeholder="First Name"/>
                      <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={lastName}
                          onChange={this.change}
                          placeholder="Last Name"/>
                      <input
                          id="emailAddress"
                          name="emailAddress"
                          type="text"
                          value={emailAddress}
                          onChange={this.change}
                          placeholder="Email Address"/>
                      <input
                          id="password"
                          name="password"
                          type="password"
                          value={password}
                          onChange={this.change}
                          placeholder="Password"/>
                    </React.Fragment>
                )}/>
            <p>
              Already have a user account? <Link to="/signin">Click here</Link> to sign in!
            </p>
          </div>
        </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  submit = async () => {
    const {context} = this.props;

    const {
      firstName,
      lastName,
      emailAddress,
      password,
      errors
    } = this.state;

    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
      errors
    };


    try {
      let response = await context.data.createUser(user);
      if (response.status === 400) {
        await response.json()
            .then(data =>
                Promise.resolve(this.setState({
                  errors: [data.errors]
                })));

      } else if (response.status === 201) {
        await context.actions.signIn(emailAddress, password)
            .then(this.props.history.push('/signin'))
            .catch(err => {
              console.log(err);
              this.props.history.push('/error');
            });
      }
    } catch (error) {
      console.log(error);
      this.props.history.push('/error')
    }
  };

  cancel = () => {
    this.props.history.push('/');
  };
}
