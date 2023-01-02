import { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "./TodoSlice";
import uuid from "react-uuid";
import { FiPlus } from "react-icons/fi";

const options = [
  {
    label: "Choose",
    value: "",
  },
  {
    label: "Urgent",
    value: "Urgent",

  },
  {
    label: "Regular",
    value: "Regular",

  },
  {
    label: "Trivial",
    value: "Trivial",

  },
];
const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const dispatch = useDispatch();

  const onSave = () => {
    if (title && priority) {
      dispatch(add({title, priority, id: uuid()}));
      setTitle("");
      setPriority("")
      
     
    } 
    else {
      alert("You must enter a name for your task");
    }
  };
  


  return (<div className="container">
    <div className="form">
      <input
      className="input"
        maxLength={255}
        placeholder=""
        name="title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
       <select className="select"  value={priority} onChange={(e) => setPriority(e.currentTarget.value)}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
      <button className="btn" onClick={onSave}><FiPlus ></FiPlus>Create  </button>
    </div>
    </div>
  );
};
export default TodoForm;