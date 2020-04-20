import React, { Component } from "react";
import PropTypes from "prop-types";
class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 1232
    };
  }
  render() {
    const { name } = this.props;
    return (
      <div>{name}</div>
    );
  }
}

Test.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Test;
