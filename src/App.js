import { useState } from 'react'
import Todo from './components/todo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShowModal from './components/showModal';
import './index.css';

function App() {
  const [todos, setTodos] = useState([])
  const [todoText, setTodoText] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingTodo, setEditingTodo] = useState([])
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!todoText) {
      toast.warn('Please Add a ToDo', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      return;
    }

    //Todo için gerekli bilgileri içeren obje oluşturduk
    const newTodo = {
      id: new Date().getTime(),
      title: todoText,
      date: new Date().toLocaleString(),
      isDone: false
    };
    //oluşturduğumuz todoları state aktarıyoruz
    setTodos([...todos, newTodo]);

    setTodoText("");// eleman eklenince input sıfırlanır
  };

  //todo dizisini gezer ve id silinecek todo id eşit olmayanları döndürür
  const handleDelete = (deletedTodo) => {
    const filtered = todos.filter((i) => i.id !== deletedTodo.id)
    setTodos(filtered) // ekrana basmak için setTodos yeni değeri filtered oldu
  
    toast.error('ToDo Deleded', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }

  const handleDone = (doneTodo) => {
    const index = todos.findIndex((i) => i.id === doneTodo.id)
    const newValue = !todos[index].isDone;
    const changedTodo = { ...doneTodo, isDone: newValue };

    const newTodos = [...todos];//todonun klonu

    newTodos.splice(index, 1, changedTodo);
    setTodos(newTodos);
  };
  //edit de değeri değişen objeyi diziye aktardık
  const handleSaveEdit = ()=>{
    if(!editingTodo.title){
      toast.warn('Please Add a ToDo', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        return;
    }
    //dizideki yerini buluyoruz
    const saveIndex= todos.findIndex((i)=>i.id=== editingTodo.id)
    //todo dizisinin kopyasını oluşturuyoruz
    const cloneTodos=[...todos];
    //güncellenecek todoyu çıkarıp yerine yeni todoyu ekledik
    cloneTodos.splice(saveIndex,1,editingTodo);
    //ekrana bastığımız diziyi güncelledik
    setTodos(cloneTodos);

    setShowModal(false)//ekrandan götürmek için

    toast.success('todo updated successfuly', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }

  return (
    <div className='main-todo'>
      <h1 className='title-todo pt-3'>To Do List</h1>
      <div className="container p-3">
        <form onSubmit={handleSubmit} className="d-flex gap-3">
          <input className="form-control"
            type="text"
            placeholder="Add Todo"
            value={todoText}
            onChange={(e) => { setTodoText(e.target.value) }} // her değiştiğinde setTodo değişir
          />
          <button className="btn btn-success">Add</button>
        </form>
        <div className='d-flex flex-column gap-3 py-5'>
          {/* {
            todos.length === 0 && ("Please Add a ToDo")
          } */}
          {todos.map((item,index) => (//index=eleman sayısı
            
            <Todo
            key={index}//buradaki index yukarda yazan 
             handleDelete={handleDelete} //burada ihtiyacı olan elemanları props gönderiyoruz
             item={item}
             handleDone={handleDone}
             setShowModal={setShowModal}
             setEditingTodo={setEditingTodo}/>
          ))}
        </div>
      </div>
      <ToastContainer/>
      {showModal && (<ShowModal editingTodo={editingTodo}
      setEditingTodo={setEditingTodo}
      setShowModal={setShowModal}
      handleSaveEdit={handleSaveEdit}/>)}
      
    </div>
  );
}

export default App;
