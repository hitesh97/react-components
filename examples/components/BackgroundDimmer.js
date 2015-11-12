import React from 'react';
import BackgroundDimmer from '../../src/background-dimmer/BackgroundDimmer';

const Example = React.createClass({

  propTypes: {},

  getInitialState() {
    return {
      alpha: 0.5
    };
  },

  getTemplate() {
    return (
      <div style={{ height: 2000, width: '100%' }}>
        <BackgroundDimmer color='gray' alpha={this.state.alpha} stopScrollPropagation onClickOutside={() => this.setState({ alpha: 0 })}>
          <div style={{ backgroundColor: 'white', height: 120, width: 200 }} />
        </BackgroundDimmer>
      </div>
    );
  },

  render() {
    return this.getTemplate();
  }

});

export default Example;