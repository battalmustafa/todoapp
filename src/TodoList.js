import { useDispatch } from "react-redux";
import {
 
  remove, updateTodo,
} from "./TodoSlice";
import { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";


const TodoList = ({ todos }) => {
  const dispatch = useDispatch();
  //const getList = window.localStorage.getItem('todoList');
  //const todoListArr = JSON.parse(getList);
  //console.log(todoListArr);
 // const [priority, setPriority] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updatemodalIsOpen, setupdateModalIsOpen] = useState(false);
  let [itemId, setItemId] = useState(null);
  let [itemPriority, setitemPriority] = useState(null);
  let [itemTitle, setitemTitle] = useState(null);
  const onDeleteTodo = () => {
    dispatch(remove(itemId));
   console.log(itemId);
    setModalIsOpen(false);

  };
  const onUpdateTodo = ({id,priority}) => {
    //e.stopPropagation();
    dispatch(updateTodo({id,priority}));
    console.log(id,priority);

    setupdateModalIsOpen(false);
  };

 
  function closeModalHandler(){
    setModalIsOpen(false);
    setupdateModalIsOpen(false);
  }
  
  const handleDelete = (id) => {
    setModalIsOpen(true)
    itemId = setItemId(id);
     
  };
  const handleUpdate = (id) => {
    setupdateModalIsOpen(true)
    itemId = setItemId(id.id);
   itemPriority =setitemPriority(id.priority);
     console.log(id.priority, id.id);
itemTitle = setitemTitle(id.title);
  };

  
  return (

    <div className="container">
      <div className="headertable">
      <div>Name</div>
  <div>Priority</div>
  <div>Actions</div>
                </div>
                <div className="listcontainer">
    <ul>
      {todos.todoList.map((todo) => {
        const { id, title, priority} = todo;

  

        return (

          
          <li  className="container"
          key={todo.id}>
            

            <div className="list">
          
             
          
              
              
               <div> {title}</div>
                <div className={priority}>{priority}</div>
<div>
<div className="actions">
<FiEdit2
              color="black"
              size="16"
             onClick={(e) => handleUpdate({id, priority, title})}
            
            />
             {updatemodalIsOpen && (<UpdateModal onCancel={closeModalHandler} pass={{itemId,itemPriority,itemTitle}} onConfirm={()=> onUpdateTodo({id, priority})}  />)}
</div>
<div className="actions">
  <FiTrash2
              color="black"
              size="16"
              onClick={(e) => handleDelete(id)               }
            />
             {modalIsOpen && (<DeleteModal onCancel={closeModalHandler}onConfirm={()=> onDeleteTodo(id)} />)}
              
             </div>
            </div>
            </div>
            <span></span>

            
          </li>
         
        );
      })}
       
    </ul>
    </div>
    </div>
  );
};

export default TodoList;