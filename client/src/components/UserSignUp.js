import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FormWrapper = styled.div`
  @media (max-width: 1000px) {
    width: 100%;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  @media (max-width: 330px) {
    button {
      font-size: 1em;
    }
  }
`;

class UserSignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    errors: [],
  };

  // Handles value change in input fields
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  // Submit Handler
  submit = (event) => {
    event.preventDefault();
    const { context } = this.props;
    if (this.state.password === this.state.confirmPassword) {
      const { firstName, lastName, emailAddress, password } = this.state;
      const user = {
        firstName,
        lastName,
        emailAddress,
        password,
      };
      // Calls createUser() from data passed to context
      context.userData
        .createUser(user)
        .then((errors) => {
          if (errors.length) {
            this.setState({ errors });
          } else {
            // Signs new user in and redirects them to main page
            context.actions.signIn(emailAddress, password).then(() => {
              this.props.history.push("/");
            });
          }
        })
        .catch((err) => {
          // Handle rejected promises
          console.log(err);
          this.props.history.push("/error"); // push error to history stack
        });
    } else {
      this.setState({
        errors: [...this.state.errors, "Passwords need to match"],
      });
    }
  };

  // Cancel button handler
  cancel = (event) => {
    event.preventDefault();
    this.props.history.push("/");
  };

  // Displays validation errors
  ErrorsDisplay = ({ errors }) => {
    let errorsDisplay = null;
    if (errors.length) {
      errorsDisplay = (
        <div>
          <h2 className="validation--errors--label">Validation errors</h2>
          <div className="validation-errors">
            <ul>
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    return errorsDisplay;
  };

  render() {
    return (
      <div className="bounds">
        <FormWrapper className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <this.ErrorsDisplay errors={this.state.errors} />
            <form onSubmit={this.submit}>
              <div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className=""
                  placeholder="First Name"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className=""
                  placeholder="Last Name"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  className=""
                  placeholder="Email Address"
                  value={this.state.emailAddress}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className=""
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className=""
                  placeholder="Confirm Password"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                />
              </div>
              <ButtonWrapper className="grid-100 pad-bottom">
                <button className="button" type="submit">
                  Sign Up
                </button>
                <button
                  className="button button-secondary"
                  onClick={this.cancel}
                >
                  Cancel
                </button>
              </ButtonWrapper>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to
            sign in!
          </p>
        </FormWrapper>
      </div>
    );
  }
}

export default UserSignUp;
