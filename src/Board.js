import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


class Board extends Component {
  static defaultProps = {
    nrows:5,
    ncols:5,
    chanceLightStartsOn:0
  }
  constructor(props) {
    super(props);
    this.state = {
      hasWon : false,
      board : this.createBoard()
    }
  }


  createBoard() {
    let board = [];
    for(let y = 0;y<this.props.nrows;y++){
      let row = [];
          for(let x =0;x<this.props.ncols;x++){
              row.push(Math.random() < this.props.chanceLightStartsOn)
          }
          board.push(row)
    }

    return board
  }


  flipCellsAround(coord) {
    console.log('Flipping')
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    

    function flipCell(y, x) {

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(y,x);
    flipCell(y,x-1);
    flipCell(y,x+1);
    flipCell(y-1,x);
    flipCell(y+1,x);

    let hasWon = board.every(row => row.every(cell =>!cell));

    this.setState({hasWon,board});
  }
  render() {
    if(this.state.hasWon){
      return <h1 className = 'neon'>YOU Won </h1>
    }
    let tblBoard = []
    for(let y =0;y<this.props.nrows;y++){
        let row = [];
        for(let x =0;x<this.props.ncols;x++){
          let coord = `${y}-${x}`
          row.push(<Cell key ={coord} isLit = {this.state.board[y][x]} flipCellsAroundMe = {()=>this.flipCellsAround(coord)} />);    
        }
        tblBoard.push(<tr key ={y}>{row}</tr>)
      
    }
    return(
      <div>
        <h1 className = 'neon'>Lights <span className = 'flux'>Off</span></h1>
        <table className = 'Board'>
            <tbody>
              {tblBoard}
            </tbody>
        </table>
      </div>
     
    )
  }
}


export default Board;
