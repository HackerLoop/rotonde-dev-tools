'use strict';

import React, { Component } from 'react';
import { Modal, Button, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';

import styles from './RotondePage.module.css';

import Definitions from '../components/Definitions';

import { pushLayout, removeLayout } from '../actions/dashboard';
import modules from '../components/modules';

class Rotonde extends Component {

  constructor(props) {
    super(props);
    this.state = {showDefinitions: false};
  }

  render() {
    let definitions;
    if (this.state.showDefinitions) {
      definitions = (
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Available Events and Actions</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Definitions className definitions={this.props.definitions} onModuleSelected={(module, definition) => this._handleModuleSelected(module, definition)} />
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => this.setState({showDefinitions: false})}>Close</Button>
          </Modal.Footer>
        </Modal.Dialog>
      );
    }

    let grid;
    let moduleViews
    if (this.props.layout.size) {
      moduleViews = this.props.layout.map(item => {
        const Module = modules[item.get('module')];
        return (
          <Module key={item.get('identifier')}
                  identifier={item.get('identifier')}
                  definition={item.get('definition')}
                  onCloseModule={(identifier) => this._handleCloseModule(identifier)} />
        );
      });
    }
    return (
      <div className={styles.container}>
        <div className={styles.dashboard}>
          {moduleViews}
        </div>
        <Button className={styles.showDefinitionsButton}
                bsStyle='success'
                onClick={() => this.setState({showDefinitions: true})}>
          <Glyphicon glyph='plus' />
        </Button>
        {definitions}
      </div>
    );
  }

  _handleModuleSelected(module, definition) {
    this.props.dispatch(pushLayout(module, definition));
  }

  _handleCloseModule(identifier) {
    this.props.dispatch(removeLayout(identifier));
  }

  _handleLayoutChange(layout) {
    console.log(layout);
  }
}

Rotonde = connect((state) => {
  return {
    definitions: state.getIn(['rotonde', 'definitions']),
    layout: state.getIn(['dashboard', 'layout']),
  };
})(Rotonde);

export default class RotondePage extends Component {

  render() {
    return (
      <Rotonde {...this.props} />
    );
  }

};
