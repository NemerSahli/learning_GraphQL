import React, { Component } from 'react';
import AuthForm from './AuthForm';
import loginMutation from '../mutations/login';
import { graphql } from 'react-apollo';
import userQuery from '../queries/CurrentUser';
import { hashHistory } from 'react-router';
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillUpdate(nextProps) {
    //this.props the old, current set of this.props
    //nextProps the next set of props that will be in
    //place when the component will update
    if (!this.props.data.user && nextProps.data.user) {
      //redirect to dashboard!
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
        <h3>Login</h3>
        <AuthForm errors={this.state.errors} onSubmitHandler={this.onSubmit} />
      </div>
    );
  }
}
export default graphql(userQuery)(graphql(loginMutation)(LoginForm));
