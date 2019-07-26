import React, { Component } from 'react';
import userQuery from '../queries/CurrentUser';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

export default WrapedComponent => {
  class requireAuth extends Component {
    componentDidUpdate() {
      if (!this.props.data.loading && !this.props.data.user) {
        hashHistory.push('/login');
      }
    }
    render() {
      return <WrapedComponent {...this.props} />;
    }
  }
  return graphql(userQuery)(requireAuth);
};
