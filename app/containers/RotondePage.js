'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './RotondePage.module.css';

import Definitions from '../components/Definitions';

class Rotonde extends Component {
  render() {
    return (
      <div className={styles.definitions}>
        <Definitions definitions={this.props.definitions} />
      </div>
    );
  }
}

Rotonde = connect((state) => {
  return {
    definitions: state.getIn(['rotonde', 'definitions']),
  };
})(Rotonde);

export default class RotondePage extends Component {

  render() {
    return (
      <Rotonde {...this.props} />
    );
  }

};
