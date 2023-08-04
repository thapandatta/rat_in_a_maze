import React, { useEffect } from 'react'

const Cell = ({row ,
    col ,
    isSource ,
    isDest ,
    isWall,
    isPath ,onMouseUp}) => {
       
        const extraClass = isDest
        ? "cellDest"
        : isSource
        ? "cellSource"
        : isWall
        ? "cellWall"
        : isPath
        ? "cellPath"
        : ""; 
          
  return (
    <div id = {`cell-${row}-${col}`}
        className={`cell ${extraClass}`}  onMouseUp={()=> onMouseUp(row , col)}>
    </div>
  )
}

export default Cell