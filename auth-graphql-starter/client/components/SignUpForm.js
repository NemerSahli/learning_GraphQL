import React, { Component } from 'react';
import AuthForm from './AuthForm';
import userQuery from '../queries/CurrentUser';
import signupMutation from '../mutations/signup';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard');
    }
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
        <h3>Signup</h3>
        <AuthForm errors={this.state.errors} onSubmitHandler={this.onSubmit} />
      </div>
    );
  }
}

export default graphql(userQuery)(graphql(signupMutation)(LoginForm));
