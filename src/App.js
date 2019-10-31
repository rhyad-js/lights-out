import React, { Component } from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

class App extends Component {
  static defaultProps = {
    return: this.restartGame
  }
  constructor(props) {
    super(props);
    this.state = {
      beginner: false,
      intermediate: false,
      expert: false
    }
  }
  handleBeginner = () => {
    this.setState({beginner: true})
  }
  handleIntermediate = () => {
    this.setState({intermediate: true})
  }
  handleExpert = () => {
    this.setState({expert: true})
  }
  restartGame = () => {
    this.setState({
      beginner: false,
      intermediate: false,
      expert: false
    })
  }
  render() {
    if (this.state.beginner) {
      return <div>
        <Board nCols={3} nRows={3} />
        <button onClick={this.restartGame} className="App-restart">Return</button>
      </div>
    } else if (this.state.intermediate) {
      return <div>
        <Board />
        <button onClick={this.restartGame} className="App-restart">Return</button>
      </div>
    } else if (this.state.expert) {
      return <div>
        <Board nCols={7} />
        <button onClick={this.restartGame} className="App-restart">Return</button>
      </div>
    }
    return (
      <div className='App'>
        <div className="Start">
          <div class="neon">LIGHTS </div>
          <div class="flux">OUT </div>
        </div>
        <div className="App-buttons">
          <button onClick={this.handleBeginner}>BEGINNER</button>
          <button onClick={this.handleIntermediate}>INTERMEDIATE</button>
          <button onClick={this.handleExpert}>EXPERT</button>
        </div>
      </div>
    );
  }
}

export default App;
