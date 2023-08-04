
import { useState , useEffect} from 'react';
import ratInMaze from '../Algorithms/ratInMaze';

import Cell from './Cell';
function Visualizer() {
    const [state , setState]  = useState({
            matrix :[],
    });
    const x = [-1 , 0 , 1 ,0]
    const y = [0 , 1 , 0 ,-1]
    const myMap = new Map();


    myMap.set( 'U', 0);
    myMap.set('R' ,1 );
    myMap.set('D' ,2);
    myMap.set('L' ,3);
    const n = 6;
    const SRC_ROW = 0;
    const SRC_COL = 0;
    const DEST_ROW = n-1;
    const DEST_COL = n-1;
    function createCell(row , col){
        return{
            row ,
            col ,
            isSource : row === SRC_ROW && col === SRC_COL ,
            isDest  : row === DEST_ROW && col === DEST_COL,
            isWall:false,
            isPath:false,
        } 
    }
    function generateMatrix(){
        let grid = []
        for(let r =0 ;r<n;r++){
            let t =[]
            for(let c=0;c<n;c++){
                t.push(createCell(r , c));
            }
            grid.push(t);
        }
        return grid;
    }
    useEffect(()=>{
        const matrix = generateMatrix();
        setState({matrix:matrix});
    } , [])
    
    const {matrix} = state
    const getNewGridWithWallToggled = (row, col) => {
        const node = matrix[row][col];
        const newNode = {
          ...node,
          isWall: !node.isWall,
        };
        matrix[row][col] = newNode;
        return matrix;
      };
    const handleMouseUp = (row, col) => {
        console.log(row+" "+col);
        const newGrid = getNewGridWithWallToggled(row, col);
        // console.log(row, col)
        setState({ matrix: newGrid });
      };
      
    function handleStart(){
        let si=0;
        let sj=0;
        const {matrix} = state
        const answer = ratInMaze(matrix , 0 , 0 , n);
        
        if(answer.length===0){
            alert("No Solution Found!!")
        }
        else{
            const path= answer[0]

            
            for(let i=0;i<path.length;i++){
                setTimeout(()=>{
                    const pos = path[i];
                    const dir = myMap.get(pos);
                    // they will be in reverese
                    si= si + x[dir];
                    sj = sj + y[dir];
                        
                    const cell = matrix[sj][si];
                    
                    const newCell = {
                        ...cell,
                        isPath:true
                    }
                    matrix[sj][si] =newCell;
                    setState({matrix:matrix})
                    if(si===n-1 && sj===n-1){
                        alert("Hurray!! I got the cheese 😋😋")
                    }
                } , 1000*i)
            }
        } 
    }
    
    function handleReset(){
        window.location.reload();
    }
  return (
    <>
        <div className="flex justify-center mt-10">
            {
                matrix && matrix.map((row , row_id)=>{
                    return(
                    
                        <div key={row_id}>
                            {
                                row.map((cell , col_id)=>{
                                    const {row ,
                                        col ,
                                        isSource ,
                                        isDest ,
                                        isWall,
                                        isPath} = cell;
                                        return(
                                            <Cell
                                                key ={col_id}
                                                row ={row}
                                                col ={col}
                                                isSource = {isSource}
                                                isDest = {isDest}
                                                isWall ={isWall}
                                                isPath = {isPath}
                                                onMouseUp={handleMouseUp}
                                            />
                                        )
                                })
                            }
                        </div>
                        
                    )
                })
            }
        </div>
        <p className='label'>Click on cells to add walls and click start!!</p>
        <div className='buttons'>
            <button className='bg-red-400 hover:bg-red-700 font:bold py-2 px-4 rounded' onClick={handleStart} >Start</button>
            <button className='bg-blue-400 hover:bg-blue-700 font:bold py-2 px-4  rounded' onClick={handleReset} >Reset</button>
        </div>
    </>
  )
}

export default Visualizer
