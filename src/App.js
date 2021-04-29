import React from 'react';
import logo from './tictactoe.png'
import './App.css'

 function Square(props){
   return (
   <button className={"btn1"+(props.isWinning?" winner":null)}  onClick={()=>{props.onClick()}}>
     <h1>{props.value}</h1>
   </button>
   );
 }

 class Row extends React.Component{
   constructor(props){
     super(props);
     this.state={
       squares: Array(9).fill(null),
       xIsNext: true,
     }
   }

  renderSquare(i){
    let val;
    const cells=this.props.winnerCell;
    if(cells)
      val=cells.includes(i);
    else
    val=null
  
     return <Square isWinning={val}  value={this.props.squares[i]} onClick={()=>this.props.onClick(i)}  />;
   }
   render(){
     const items=[];
     for(let i=1;i<10;i++){
       items.push(this.renderSquare(i));
     }

   return(
     <div>
        {items}
     </div>
    );
   }
 }

 class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      history:[{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0,
    }
  }

  
  handleClick(i){
    const history=this.state.history.slice(0, this.state.stepNumber+1);
    const current=history[history.length-1]
    const squares=current.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i]=this.state.xIsNext?'X': 'O';
    this.setState({
      history: history.concat([{
        squares:squares
      }]), 
      xIsNext:!this.state.xIsNext,
      stepNumber: history.length
    });
   }

   restart(){
    this.setState({ history:[{squares: Array(9).fill(null)}], stepNumber: 0, xIsNext:true})
   }

   jumpTo(step){
     this.setState({
       stepNumber:step,
       xIsNext:(step%2)===0
     })
   }

   render(){
    const history=this.state.history;
    const current=history[this.state.stepNumber]
    const winner = calculateWinner(current.squares);
    console.log(history.length);
    let msg;
    
    if(winner){
        msg="Winner is: "+winner.player+" @ "+winner.line;
    }
    else if(history.length===10)
    msg="Game Draw";
    else
        msg="Next turn: "+(this.state.xIsNext?"X":"O");
     

    const moves=history.map((step, move)=>{
      const desc= move?"Go to step #"+move:"Go to start";
      return(
        <li key={move}>
          <button className="label" onClick={()=>this.jumpTo(move)}>{desc}</button>
        </li>
      );
    })

    
    return(
      
      <div >
        {/* <img className="center" src={logo} width='100' height='100' alt='game' /> */}
        
        <div className="container">
        <div><h1>{msg}</h1></div>
        <Row winnerCell={winner?winner.line:null} squares={current.squares} onClick={(i)=>this.handleClick(i)}  />
        <div className="left">
          <button className="btn" onClick={()=> this.restart()}><span>Restart</span></button>
        </div>

        <div className="right">{moves}</div>
        </div>
        
      </div>
      
    );
   }
   }
   function calculateWinner(squares){
     const lines=[
       [1,2,3],
       [4,5,6],
       [7,8,9],
       [1,4,7],
       [2,5,8],
       [3,6,9],
       [1,5,9],
       [3,5,7],
     ];
     for(let i=0;i<lines.length;i++){
       const[a,b,c]=lines[i];
       if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
       return {player:squares[a], line:[a,b,c]};
       }
     }
     return null;
   }

  
 export default App;