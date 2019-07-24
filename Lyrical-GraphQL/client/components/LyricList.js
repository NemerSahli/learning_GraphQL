import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricList extends Component {
  onLike(id, likes) {
    this.props.mutate({
      variables: { id: id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id: id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    });
  }
  render() {
    return (
      <div>
        <ul className="collection">
          {this.props.lyrics &&
            this.props.lyrics.map(({ id, content, likes }) => {
              return (
                <li key={id} className="collection-item">
                  <h6>{content}</h6>
                  <div className="vote-box">
                    <i
                      className="material-icons"
                      onClick={() => this.onLike(id, likes)}
                    >
                      thumb_up
                    </i>
                    <i>{likes > 9 ? likes : likes + ' '}</i>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
