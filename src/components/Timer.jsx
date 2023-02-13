import React, { Component } from 'react';
import { connect } from 'react-redux';

class Timer extends Component {
  state = { time: 30 };

  componentDidMount() {
    this.setState({ time: 30 });
  }

  componentDidUpdate(prevState) {
    if (prevState !== this.state) this.timer();
  }

  timer = () => {
    const { time } = this.state;
    if (time > 0) {
      const oneSecond = 1000;
      setTimeout(() => {
        this.setState({
          time: time - 1,
        });
      }, oneSecond);
    }
  };

  render() {
    const { time } = this.state;
    return (
      <div data-testid="settings-title">
        <p>{ `Tempo restante: ${time}` }</p>
      </div>
    );
  }
}
export default connect()(Timer);
