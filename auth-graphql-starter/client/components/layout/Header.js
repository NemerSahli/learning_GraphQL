import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import userQuery from '../../queries/CurrentUser';
import logoutMutation from '../../mutations/logout';
class Header extends Component {
  onLogout() {
    this.props.mutate({
      refetchQueries: [
        {
          query: userQuery
        }
      ]
    });
  }
  render() {
    const { loading, user } = this.props.data;
    if (loading) return <div />;
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          <ul className="right">
            {user ? (
              <li>
                <a onClick={this.onLogout.bind(this)}>Logout</a>
              </li>
            ) : (
              <div>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}
export default graphql(logoutMutation)(graphql(userQuery)(Header));
