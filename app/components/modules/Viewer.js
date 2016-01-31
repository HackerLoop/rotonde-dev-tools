import React, { Component } from 'react';
import Module from './Module';

import styles from './modules.module.css';

export default class Viewer extends Component {
  render() {
    return (
      <Module {...this.props}>
      </Module>
    );
  }
};
