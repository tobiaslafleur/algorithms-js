import Head from 'next/head'

import Node from '../components/Node'
import BreadthFirstSearch from '../algorithms/bfs'

const HomePage = ({ grid }) => {
    const startSearch = async () => {
        let start
        let end

        for(let row = 0; row < 25; row++) {
            for(let col = 0; col < 40; col++) {
                if(grid[row][col].start) start = grid[row][col].id
                if(grid[row][col].end) end = grid[row][col].id
            }
        }

        const algo = BreadthFirstSearch(grid, start, end)
        await algo.bfs()
    }

    return(
        <>
            <Head>
                <title>Algorithms-js</title>
                <meta name='keywords' content='Datastructures and Algorithms'></meta>
            </Head>

            <button onClick={startSearch}>Breadth-first search</button>
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

const newNode = (row, col) => {
    const _checkIfEdge = (row, col) => {
        if(row === 0 || row === 24 || col === 39 || col === 0) return true
        return false
    }

    const node = {
        id: (row * 40) + col,
        row: row,
        col: col,
        start: row === 4 && col === 4,
        end: row === 21 && col === 37,
    }

    return node
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