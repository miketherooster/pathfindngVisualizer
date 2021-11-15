function Astar(startNode, endNode) {
    
    //array of nodes to visit
    let openSet = [];
    //array of nodes visited
    let closedSet = [];
    //array tracking path for finding shortest path
    let path = [];

    //starting at start node and pushing to openSet array
    openSet.push(startNode);
    
    //algorithm to get lowest f value = leastIndex
    while(openSet.length > 0) {
        let leastIndex = 0;
        for(let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[leastIndex].f) {
                leastIndex = i;
            }
        }

        let current = openSet[leastIndex];

        if (current === endNode) {
            console.log(`Finished! Found Path!`);
        }
        
        //remove current element from openSet
        openSet = openSet.filter((ele) => ele !== current);
        //add current element to closedSet
        closedSet.push(current);

        //algorithm for determining if neighbor(4x) has been visited
        let neighbors = current.neighbors;
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
            if (!closedSet.includes(neighbor)) {
                let tempG = current.g + 1;
                let newPath = false;
                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        newPath = true;
                    }
                } else {
                    
                    neighbor.g = tempG;
                    newPath = true;
                    openSet.push(neighbor);
                }

                if(newPath) {
                    neighbor.h = heuristic(neighbor, endNode);
                    neighbor.f = neighbor.h + neighbor.g;
                    neighbor.previous = current;
                }

            }
        }

    }
}

const heuristic = (a,b) => {
    let d = Math.abs(a.x - a.y) + Math.abs(b.x - b.y);
    return d;
}

export default Astar;