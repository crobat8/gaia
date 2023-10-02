import React, { useState,useRef, useEffect  } from "react";
import "./style.scss"

function App() {
  const [gridLength,setGridLength] = useState(20);
  const [gridHeight,setGridHeight] = useState(20);
  const [cells,setCells] = useState([[0,0,0],[0,0,0],[0,0,0]])
  const [delay,setDelay] = useState(1000)            
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  var cellHeight= ((windowSize.current[1]-100)/gridHeight)-2
  var cellWidth = (windowSize.current[0]/gridLength)-2
  const filled = {
    "backgroundColor":"lime",
    "height":cellHeight,
    "width":cellWidth
  }
  const empty = {
    "backgroundColor":"#202020",
    "height":cellHeight,
    "width":cellWidth
  }
  

  function year(){
    
    const temp = [];
    var border = new Array(gridLength+2).fill(0)
    temp.push(border)
    for(var x=1;x<gridHeight+1;x++){
      var tempRow = new Array();
      tempRow.push(0)
      for(var y=1;y<gridLength+1;y++){
        var count = 0
        count = cells[x-1][y-1]+cells[x-1][y]+cells[x-1][y+1]+
                cells[x][y-1]  +0            +cells[x][y+1]  +
                cells[x+1][y-1]+cells[x+1][y]+cells[x+1][y+1]
        if(cells[x][y] == 1){
          if(count==2||count==3){
            tempRow.push(1)
          }else{
            tempRow.push(0)
          }
        }else{
          if(count==3){
            tempRow.push(1)
          }else{
            tempRow.push(0)
          }
        }
        
      }
      tempRow.push(0)
      temp.push(tempRow);
    }
    temp.push(border)
    
    setCells(temp)
    
  }
  
  function reset(){
    const temp = [];
    var border = new Array(gridLength+2).fill(0)
    temp.push(border)
    for(var x=0;x<gridHeight;x++){
      var tempRow = new Array();
      tempRow.push(0)
      for(var y=0;y<gridLength;y++){
        if(Math.random()<0.5){
          tempRow.push(0)
        }else{
          tempRow.push(1)
        }
      }
      tempRow.push(0);
      temp.push(tempRow);
    }
    temp.push(border)
    setCells(temp)
  }

  function flip(x,y){
    const temp= cells
    if(temp[x][y]==1){
      temp[x][y]=0
      setCells([...temp])
    }else{
      temp[x][y]=1
      setCells([...temp])
    }
    
  }

  useEffect(()=>{
    reset();
  },[])
  
  return (
    <div className="App">
      <header className="navbar">
        <button onClick={()=>year()}>
          next year
        </button>
        <button onClick={()=>reset()}>
          reset
        </button>
      </header>
      <main className="focus">
        <div className="table">
          {cells.map((row,x)=>{

            return(
              <div className="row" key={x} >
                {row.map((cell,y)=>{
                  if(x==0||x==gridLength+1||y==0||y==gridHeight+1){

                  }else{
                    return(
                      <div className="cell" onClick={()=>flip(x,y)} style={!!cell?filled:empty}/>
                    )
                  }
                  
                })} 
              </div>
            )
              
            
            
            
          })}

        </div>
      </main>
    </div>
  );
}

export default App;
