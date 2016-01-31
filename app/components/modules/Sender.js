import React, { Component } from 'react';
import { Input, Button } from 'react-bootstrap';
import Module from './Module';

import styles from './modules.module.css';

const defaultJson = (definition) => {
  return JSON.stringify(definition.get('fields').reduce((v, field) => {
    v.payload.data[field.get('name')] = field.get('type') == 'string' ? '' : 0;
    return v;
  }, {type: definition.get('type'), payload: {identifier: definition.get('identifier'), data: {}}}), null, 4);
};

export default class Sender extends Component {

  constructor(props) {
    super(props);

    this.state = {json: defaultJson(props.definition)};
  }

  render() {
    return (
      <Module {...this.props}>
        <Input ref='json'
               type="textarea"
               label={this.props.definition.get('identifier')}
               value={this.state.json}
               onChange={() => this._handleChange()} />
        <Button onClick={() => this._handleClick()}>Send</Button>
      </Module>
    );
  }

  _handleChange() {
    this.setState({json: this.refs.json.getValue()});
  }

  _handleClick() {

  }
}
