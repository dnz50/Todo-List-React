import React from 'react'

function Todo({ item, handleDelete, handleDone, setEditingTodo, setShowModal }) { // buraya ihtiyaç duyulan propsları ekledik
  return (
    <div className='added-todo rounded shadow p-3 d-flex justify-content-between'>
      <div>
        <h5 style={{ textDecoration: item.isDone ? "line-through" : "none" }}>{item.title}</h5>
        <p>{item.date}</p>
      </div>
      <div className='todo-btn'>
        <button className='btn btn-outline-primary m-1'
          onClick={() => {
            setShowModal(true);
            setEditingTodo(item)
          }}>Edit</button>
        <button className={item.isDone ? 'btn btn-success m-1' : 'btn btn-outline-success m-1'}
          onClick={() => { handleDone(item) }}
        >
          {item.isDone ? "Done" : "Not Done"}</button>
        <button className='btn btn-outline-danger m-1' onClick={() => { handleDelete(item) }}>Delete</button>
      </div>
    </div>

  )
}

export default Todo