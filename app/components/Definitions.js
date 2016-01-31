'use strict';

import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import styles from './Definitions.module.css';

class DefinitionsList extends Component {
  render() {
    return (
      <div className={styles.listContainer}>
        <h3>{this.props.name}</h3>
        <div className={styles.tableContainer}>
          <Table className={styles.table} striped bordered condensed hover>
            <tbody>
              {this.props.children}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

class DefinitionDetails extends Component {
  render() {
    const fields = this.props.definition.fields.map((field) => {
      return (
        <div>
          {field.name} {field.type} {field.units}
        </div>
      );
    });
    return (
      <div>
        {fields}
      </div>
    );
  }
}

export default class Definitions extends Component {

  constructor(props) {
    super(props);

    this.state = {selected: null};
  }

  render() {
    const events = this.props.definitions.get('event').map((definition) => {
      let detail = this.state.selected == definition.identifier ? <DefinitionDetails definition={definition} /> : null;
      return (
        <tr key={definition.identifier}>
          <td onClick={() => this._handleEventClick(definition)}>{definition.identifier}
            {definition.identifier}
            {detail}
          </td>
        </tr>
      );
    });

    const actions = this.props.definitions.get('action').map((definition) => {
      let detail = this.state.selected == definition.identifier ? <DefinitionDetails definition={definition} /> : null;
      return (
        <tr key={definition.identifier}>
          <td onClick={() => this._handleActionClick(definition)}>
            {definition.identifier}
            {detail}
          </td>
        </tr>
      );
    });

    return (
      <div className={styles.container}>
        <DefinitionsList name='Events'>
          {events}
        </DefinitionsList>
        <DefinitionsList name='Actions'>
          {actions}
        </DefinitionsList>
      </div>
    );
  }

  _handleEventClick(definition) {
    if (this.state.selected == definition.identifier) {
      this.setState({selected: null});
      return;
    }
    this.setState({selected: definition.identifier});
  }

  _handleActionClick(definition) {
    if (this.state.selected == definition.identifier) {
      this.setState({selected: null});
      return;
    }
    this.setState({selected: definition.identifier});
  }

}
