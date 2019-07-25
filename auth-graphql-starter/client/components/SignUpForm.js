import React, { Component } from 'react';
import AuthForm from './AuthForm';
import userQuery from '../queries/CurrentUser';
import signupMutation from '../mutations/signup';
import { graphql } from 'react-apollo';
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query: userQuery }]
    });
  }
  render() {
    return (
      <div>
        <h3>Signup</h3>
        <AuthForm onSubmitHandler={this.onSubmit} />
       
      </div>
    );
  }
}
export default graphql(signupMutation)(LoginForm);
