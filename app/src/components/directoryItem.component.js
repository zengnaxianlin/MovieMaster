import React, { Component } from 'react';

class DirectoryItem extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="direcotry-item">
        Item -
        {this.props.data.name}
      </div>
    )
  }
}

export default DirectoryItem;