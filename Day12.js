const fs = require('fs');
const util = require('./util.js');
const DorelUtil = require('./DorelUtil.js');

class Node
{
    constructor(aName)   
    {
        this.mName = aName;
        this.mEdges = new Array();
        this.mIsSmallCave = this.mName.toLowerCase() == aName;
    }
    AddEdge(aOtherNode)
    {
        this.mEdges.push(aOtherNode);
    }
    CountPathsTo(aEndNode)
    {
        let visitedNodes = new Array();
        visitedNodes.push(this);

        gPathsCount = 0;
        this.AddChildren(aEndNode, visitedNodes);

        return gPathsCount;
       
    }
    AddChildren(aEndNode, aVisitedNodes)
    {
        for (const node of this.mEdges)
        {
           if(node.mIsSmallCave && ( aVisitedNodes.indexOf( node) != -1 ))
             continue;
            
             if(node == aEndNode)
             {
                 console.log( "Path fom start to end:     " + aVisitedNodes.map( (a) => a.mName ).join("---"));
             
                 gPathsCount++;
             }

            aVisitedNodes.push(node);

            node.AddChildren(aEndNode, aVisitedNodes);

            aVisitedNodes.pop();
        }
    }
    PrintAll(aVisitedNodes)
    {
        if (aVisitedNodes == undefined)
        {
            aVisitedNodes= new Array();
        }
        aVisitedNodes.push(this);

        for (const node of this.mEdges)
        {
            if (aVisitedNodes.indexOf( node) != -1 )
               continue;

            console.log( this.mName.toString(5) + "----" + node.mName);
            node.PrintAll(aVisitedNodes);
        }
    }
}

let inputLines = fs.readFileSync('input12.txt', 'utf8').split(/\r?\n/);

let gAllNodes = new Map();

let gPathsCount = 0;

function computeGraph()
{
    for(const edge of inputLines)
    {
        let pair = edge.split('-');
        let nodeName1 = pair[0];
        let nodeName2 = pair[1];

        let node1 = gAllNodes.get(nodeName1);
        if(node1 == undefined)
        {
          node1 = new Node(nodeName1);
          gAllNodes.set( nodeName1, node1 );
        }
        let node2 = gAllNodes.get(nodeName2);
        if(node2 == undefined)
        {
          node2 = new Node(nodeName2);
          gAllNodes.set( nodeName2, node2 );
        }
        node1.AddEdge(node2);
        node2.AddEdge(node1);
    }
}

computeGraph();

part1();

//part2();

function part1() {
 
    
    let startNode = gAllNodes.get("start");
    let endNode   = gAllNodes.get("end");
    startNode.PrintAll();
    let pathsCount = startNode.CountPathsTo(endNode);
    console.log("1: Total number of paths from start to end is: " + pathsCount);
}

function part2() {

    console.log("2: Step at which al octopuses flashsimulataneously is: " );  
}
