import React, { Component } from 'react';
import { graphql } from 'react-apollo';

class LyricList extends Component {
  render() {
    return (
      <div>
        <ul className="collection">
          {this.props.lyrics &&
            this.props.lyrics.map(({ id, content }) => {
              return (
                <li key={id} className="collection-item">
                  <h6>{content}</h6>
                  <i className="material-icons">like</i>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default LyricList;
