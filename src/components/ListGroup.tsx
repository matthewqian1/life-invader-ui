import React from 'react'

function ListGroup() {
    let items = ["1", "2", "3"];
    return <ul className="list-group">
        {items.map((i) => (
            <li key={i}>
                {i}
            </li>
        ))}
  </ul>
}

export default ListGroup;