import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import styles from './modules.module.css';

export default class Module extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.insideContainer}>
          <button onClick={() => this.props.onCloseModule(this.props.identifier)} className={styles.closeButton}>
            <Glyphicon glyph='remove' />
          </button>
          {this.props.children}
        </div>
      </div>
    );
  }
}
