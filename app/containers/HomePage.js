import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button } from 'react-bootstrap';
import styles from './HomePage.module.css';

import * as actions from '../actions/rotonde';

class Home extends Component {

  componentWillReceiveProps(newProps) {
    if (newProps.connected) {
      this.props.history.push('/rotonde');
    }
  }

  render() {
    let connectButton;
    if (!this.props.connecting) {
      connectButton = (
        <Button onClick={(e) => this._handleConnect(e)}>Connect</Button>
      );

    }
    return (
      <div className={styles.container}>
        <form onSubmit={(e) => this._handleConnect(e)}>
          <Input  ref='connectInput'
                  className={styles.input}
                  type='text'
                  placeholder='ws://127.0.0.1:4224'
                  defaultValue='ws://127.0.0.1:4224'
                  buttonAfter={ connectButton } />
        </form>
      </div>
    );
  }

  _handleConnect(e) {
    e.preventDefault();
    this.props.dispatch(actions.connect(this.refs.connectInput.getValue()));
  }
}

Home = connect((state) => {
  return {
    connecting: state.getIn(['rotonde', 'connecting']),
    connected: state.getIn(['rotonde', 'connected']),
  };
})(Home);

class HomePage extends Component {
  render() {
    return (
      <Home {...this.props} />
    );
  }
}

export default HomePage;
