import React, { Component } from 'react';
import AuthForm from './AuthForm';
import loginMutation from '../mutations/login';
import { graphql } from 'react-apollo';
import userQuery from '../queries/CurrentUser';
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({ email, password }) {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query: userQuery }]
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(err => err.message);
        this.setState({ errors });
      });
  }
  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm errors={this.state.errors} onSubmitHandler={this.onSubmit} />
      </div>
    );
  }
}
export default graphql(loginMutation)(LoginForm);
