'use strict';

import _ from 'lodash';

import React, { Component } from 'react';
import { Table, Button, Glyphicon } from 'react-bootstrap';

import styles from './Definitions.module.css';

class DefinitionsList extends Component {

  render() {
    const definitions = this.props.definitions.map((definition) => <DefinitionItem key={definition.get('identifier')}
                                                                                   definition={definition}
                                                                                   selected={definition.get('identifier') == this.props.selected}
                                                                                   onClick={() => this.props.onClick(definition)}
                                                                                   onModuleSelected={this.props.onModuleSelected} />);
    return (
      <div className={styles.listContainer}>
        <h3>{this.props.name}</h3>
        <div className={styles.tableContainer}>
          <Table className={styles.table} striped bordered condensed hover>
            <tbody>
              {definitions}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }

}

class DefinitionItem extends Component {

  render() {
    let detail = this.props.selected ? <DefinitionDetails onModuleSelected={this.props.onModuleSelected} definition={this.props.definition} /> : null;
    return (
      <tr key={this.props.definition.get('identifier')}>
        <td onClick={this.props.onClick}>
          <p>{this.props.definition.get('identifier')}</p>
          {detail}
        </td>
      </tr>
    );
  }

}

class DefinitionDetails extends Component {

  render() {
    const fields = this.props.definition.get('fields').map((field) => {
      const get = (path) => field.get(path, 'n/a') || 'n/a';
      return (
        <tr key={field.get('name')}>
          <td>{get('name')}</td><td>{get('type')}</td><td>{get('units')}</td>
        </tr>
      );
    });
    return (
      <div onClick={(e) => e.stopPropagation()}>
        <p>Fields</p>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Name</th><th>Type</th><th>Units</th>
            </tr>
          </thead>
          <tbody>
            {fields}
          </tbody>
        </Table>
        <Button onClick={(e) => this._handleModuleSelected(e, 'sender', this.props.definition)}><Glyphicon glyph='share-alt' /></Button>
        <Button onClick={(e) => this._handleModuleSelected(e, 'viewer', this.props.definition)}><Glyphicon glyph='eye-open' /></Button>
      </div>
    );
  }

  _handleModuleSelected(e, module, definition) {
    e.preventDefault();
    this.props.onModuleSelected(module, definition);
  }

}

export default class Definitions extends Component {

  constructor(props) {
    super(props);

    this.state = {selected: null};
  }

  render() {
    return (
      <div className={styles.container}>
        <DefinitionsList name='Events'
                         definitions={this.props.definitions.get('event')}
                         onClick={(definition) => this._handleEventClick(definition)}
                         onModuleSelected={this.props.onModuleSelected}
                         selected={this.state.selected} />
        <DefinitionsList name='Actions'
                         definitions={this.props.definitions.get('action')}
                         onClick={(definition) => this._handleActionClick(definition)}
                         onModuleSelected={this.props.onModuleSelected}
                         selected={this.state.selected} />
      </div>
    );
  }

  _handleEventClick(definition) {
    if (this.state.selected == definition.get('identifier')) {
      this.setState({selected: null});
      return;
    }
    this.setState({selected: definition.get('identifier')});
  }

  _handleActionClick(definition) {
    if (this.state.selected == definition.get('identifier')) {
      this.setState({selected: null});
      return;
    }
    this.setState({selected: definition.get('identifier')});
  }

}
