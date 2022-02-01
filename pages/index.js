import Head from 'next/head'
import { useState } from 'react'

import Node from '../components/Node'
import { BreadthFirstSearch, DepthFirstSearch } from '../algorithms'
import { Digraph } from '../utils'

const HomePage = ({ grid }) => {
    const [isRunning, setIsRunning] = useState(false)
    const [isClear, setIsClear] = useState(true)

    const graph = createGraph(grid)

    const startSearch = async (selection) => {
        let start
        let end

        setIsClear(false)
        setIsRunning(true)

        for(let row = 0; row < 25; row++) {
            for(let col = 0; col < 40; col++) {
                if(grid[row][col].start) start = grid[row][col].id
                if(grid[row][col].end) end = grid[row][col].id
            }
        }

        switch(selection) {
            case 'breadth':
                await BreadthFirstSearch(graph, start, end)
                break
            case 'depth':
                await DepthFirstSearch(graph, start, end)
                break
            case 'clear-grid':
                await clearGrid()
                setIsClear(true)
                break
        }

        setIsRunning(false)
    }

    return(
        <>
            <Head>
                <title>Algorithms-js</title>
                <meta name='keywords' content='Datastructures and Algorithms'></meta>
            </Head>

            <button disabled={!isClear} onClick={() => startSearch('breadth')}>Breadth-first search</button>
            <button disabled={!isClear} onClick={() => startSearch('depth')}>Depth-first search</button>
            <button disabled={isRunning} onClick={() => startSearch('clear-grid')}>Clear the grid</button>
            <div className='grid'>
                {grid.map((row, rowIndex) => {
                    return(
                        <div key={rowIndex} className='row'>
                            {row.map((node) => { return <Node key={node.id} id={node.id} row={node.row} col={node.col} start={node.start} end={node.end} />} )}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

const createGraph = (grid) => {
    const graph = Digraph(grid.length * grid[0].length)

    for(let row = 0; row < grid.length; row++) {
        for(let col = 0; col < grid[0].length; col++) {
            if(grid[row - 1] !== undefined) graph.addEdge(grid[row][col].id, grid[row - 1][col].id)
            if(grid[row + 1] !== undefined) graph.addEdge(grid[row][col].id, grid[row + 1][col].id)
            if(grid[row][col - 1] !== undefined) graph.addEdge(grid[row][col].id, grid[row][col - 1].id)
            if(grid[row][col + 1] !== undefined) graph.addEdge(grid[row][col].id, grid[row][col + 1].id)
        }
    }

    return graph
}

const newNode = (row, col) => {
    const node = {
        id: (row * 40) + col,
        row: row,
        col: col,
        start: row === 4 && col === 4,
        end: row === 23 && col === 37,
    }

    return node
}

const clearGrid = async () => {
    for(let row = 0; row < 25; row++) {
        for(let col = 0; col < 40; col++) {
            let element = document.getElementById('node-' + ((row * 40) + col))

            if(!element.classList.contains('start') || !element.classList.contains('end')) {
                element.classList.remove('marked')
                element.classList.remove('path')
                element.classList.add('unmarked')
            }
        }
    }
}

export const getStaticProps = () => {
    let grid = []

    for(let row = 0; row < 25; row++) {
        let gridRow = []
        for(let col = 0; col < 40; col++) {
            gridRow.push(newNode(row, col))
        }
        grid.push(gridRow)
    }

    return {
        props: {
            grid: grid,
        }
    }
}

export default HomePage