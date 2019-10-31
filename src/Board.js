import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nRows: 5,
    nCols: 5,
    chanceLightStartsOn: 0.25
  }
  constructor(props) {
    super(props);
    this.state = {
      board: this.createBoard(),
      hasWon: false
    }
  }

  createBoard() {
    let board = [];
    let {nRows, nCols ,chanceLightStartsOn} = this.props
    for (let y=0; y<nRows; y++) {
      let row = [];
      for (let x=0; x<nCols; x++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      board.push(row);
    }
    return board;
  }

  flipCellsAround(coord) {
    let {nCols, nRows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    
    function flipCell(y, x) {

      if (x >= 0 && x < nCols && y >= 0 && y < nRows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y, x);
    flipCell(y, x-1);
    flipCell(y, x+1);
    flipCell(y-1, x);
    flipCell(y+1, x);

    let hasWon = board.every(row => row.every(cell => !cell))
    this.setState({board , hasWon});
  }
  render() {
    if (this.state.hasWon) {
      return (
        <div class="Winner">
          <div class="neon">YOU </div>
          <div class="flux">WIN! </div>
        </div>
      )
    }
    let tblBoard = [];
    for (let y=0; y<this.props.nRows; y++) {
      let row = [];
      for (let x=0; x<this.props.nCols; x++) {
        let coord = `${y}-${x}`;
        row.push(<Cell key={coord}  isLit={this.state.board[y][x]} flipCellsAroundMe={() => this.flipCellsAround(coord)} />)
      }
      tblBoard.push(<tr>{row}</tr>);
    }
    return (
      <div>
        <div class="Container">
          <div class="neon">LIGHTS </div>
          <div class="flux">OUT </div>
        </div>
        <table className="Board">
          <tbody>{tblBoard}</tbody>
        </table>
      </div>
    )
  }
}


export default Board;
