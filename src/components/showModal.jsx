import React from 'react'

function ShowModal({editingTodo,setEditingTodo,setShowModal,handleSaveEdit}) {
  return (
    <div className='modal-wrapper'>
        <div className="edit-modal">
            <h4>Edit ToDo</h4>
            <input type="text"
            value={editingTodo.title}
            onChange={(e)=>{ // title değişirmek için yazdık
                setEditingTodo({...editingTodo,
                title:e.target.value,
                date:new Date().toLocaleString()})
                
            }} />
            <div>
            <button className='btn btn-success m-3'
            onClick={handleSaveEdit}>Save</button>
            <button className='btn btn-danger '
            onClick={()=>{setShowModal(false)}}>Cancel</button>

            </div>
        </div>
    </div>
  )
}

export default ShowModal