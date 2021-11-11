import React, { useState, useEffect } from "react";
import Node from "./node/Node";
import "./PathfindingVis.css";

const cols = 25;
const rows = 10;

//Variables for start and End
//Start -First diagnal
const NODE_START_ROW = 0;
const NODE_START_COL = 0;
//End -last diagnal
const NODE_END_ROW = rows - 1;
const NODE_END_COL = cols - 1;

const PathFind = () => {
  const [Grid, setGrid] = useState([]);

  useEffect(() => {
    initalizeGrid();
  }, []);

  // Create Grid
  const initalizeGrid = () => {
    const grid = new Array(rows);

    for (let i = 0; i < rows; i++) {
      grid[i] = new Array(cols);
    }

    createSpot(grid);

    setGrid(grid);

    addNeighbors(grid);
  };

  //Create Spot
  const createSpot = (grid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }
  };

  //Add neighbors
  const addNeighbors = (grid) => {
    for( let i = 0; i < rows; i++) {
      for( let j = 0; j < cols; j++) {
        grid[i][j].addNeighbors(grid);
      }
    }
  }


  //Spot Constructor
  function Spot(i, j) {
    this.x = i;
    this.y = j;
    //If x and y have start node, isStart. if end, isEnd.
    this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
    this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
    this.g = 0;
    this.f = 0;
    this.h = 0;
    //create neighbor recognition
    this.neighbors = [];
    this.previous;
    this.addNeighbors = function(grid) {
        
        let i = this.x;
        let j = this.y;
        //add horizontal neighbors to array
        if (i > 0) this.neighbors.push(grid[i-1][j]);
        if (i < rows - 1) this.neighbors.push(grid[i+1][j]);
        //add vertical neighbors to array
        if (j > 0) this.neighbors.push(grid[i][j-1]);
        if (j < cols - 1) this.neighbors.push(grid[i][j+1]);
    }
  }

  //Node + Grid
  const gridWithNode = (
    <div>
      {Grid.map((row, rowIndex) => {
        return (
          <div className="rowWrapper" key={rowIndex}>
            {row.map((col, colIndex) => {
              const { isStart, isEnd } = col; //destructure isStart & isEnd
              return (
                <Node
                  key={colIndex}
                  isStart={isStart}
                  isEnd={isEnd}
                  row={rowIndex}
                  col={colIndex}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );

  console.log(Grid);
  return (
    <div className="wrapper">
      <h1>Pathfind Component</h1>
      {gridWithNode}
    </div>
  );
};

export default PathFind;
