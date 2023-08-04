import React from 'react'
const x = [-1 , 0 , 1 ,0]
const y = [0 , 1 , 0 ,-1]
const myMap = new Map();


myMap.set(0, 'U');
myMap.set(1, 'R');
myMap.set(2, 'D');
myMap.set(3, 'L');
let paths=[];
let path;
const ratInMaze = (grid , i , j , n) => {
    //visited  array
    const vis = create2DArray(n , n);
    path=""
    const res = solve(i , j ,n, grid ,vis);
    // if(res)
    //     console.log(path);
    // else
    //     console.log("no path");
    console.log(path);
    console.log(res);
    return paths;
}
function create2DArray(m, n) {
    var result = [];
    for (var i = 0; i < n; i++) {
      result.push(new Array(m).fill(0));
    }
    return result;
  }
  
const solve = (i , j ,n, grid ,vis)=>{
    if(i=== n-1 && j=== n-1){
        paths.push(path);
        return true;
    }
    // console.log(i+" "+j);
    // console.log(path);
    vis[i][j] = 1;
    for (let d = 0; d < 4; d++) {
        const x_ = i + x[d];
        const y_ = j + y[d];
        if(!isValid(n ,x_, y_)) continue;
        //console.log(i+" "+j+" is wall/not"+ grid[i][j].isWall);
        if(grid[y_][x_].isWall) continue; 
        if(vis[x_][y_] !== 0) continue;
        path = path + myMap.get(d); // go in this direction
        
        if(solve(x_, y_, n, grid, vis)) return true;
        path = path + myMap.get((d+2)%4) // come back 
    }
    vis[i][j] = 0;
    return false;   
}

function isValid(n, x_, y_) {
    if (x_ < 0 || x_ >= n || y_ < 0 || y_ >= n) return false;
    return true;
}

export default ratInMaze