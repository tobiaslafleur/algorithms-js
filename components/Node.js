const Node = ({ id, row, col, start, end }) => {
    let style

    if(start) style = 'node start'
    else if(end) style = 'node end'
    else style = 'node unmarked'

    return (
        <div id={'node-' + id} className={style}></div>
    )
}

export default Node