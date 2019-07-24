import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';
class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
    this.onLyricSubmit.bind(this);
  }

  onLyricSubmit(event) {
    event.preventDefault();
    if (this.state.content === '') return;
    this.props
      .mutate({
        variables: { songId: this.props.id, content: this.state.content }
      })
      .then(() => {
        this.setState({ content: '' });
      });
  }

  render() {
    return (
      <form onSubmit={this.onLyricSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input
          onChange={event => this.setState({ content: event.target.value })}
          value={this.state.content}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String!, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;
export default graphql(mutation)(LyricCreate);
