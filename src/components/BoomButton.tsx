import { Component } from 'react';

interface State {
  explode: boolean;
}

export class BoomButton extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { explode: false };
  }

  handleClick = () => {
    this.setState({ explode: true });
  };

  render() {
    if (this.state.explode) {
      throw new Error('Boooom');
    }

    return (
      <button onClick={this.handleClick} style={{ padding: 10, fontSize: 16 }}>
        BoomButton
      </button>
    );
  }
}
