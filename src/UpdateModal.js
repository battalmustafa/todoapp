import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTodo } from "./TodoSlice";

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


const UpdateModal = (props) => {
  function cancelHandler() {
    props.onCancel();
  }
  let [id, setId] = useState("");

  const [priority, setPriority] = useState("");
  const dispatch = useDispatch();
  
  useEffect(() => {
           
     setId(props.pass.itemId);
   
  
}, [props, priority]);
  const onSave = () => {
    if (priority) {
      
      dispatch(updateTodo({ priority, id}));
     
      setPriority(props.pass.itemId);
     
      props.onCancel();
     
    } 
    else {
      alert("You must select a priority for your task");
    }
    
      

     
    
  };
  
 


//console.log(props.pass.itemId);
  return (
    <div className="backdrop">
    <div className="modal">
      <h1>Job Edit</h1>
      <div className="modal1">
        <span>Job Name</span>

        <input
        className="select1"
      readOnly
        maxLength={255}
        placeholder={props.pass.itemTitle}
        name="title"

      />
      </div>
      <div className="modal1">
  <p>Job Priority</p>
       <select className="select1"  value={priority} onChange={(e) => setPriority(e.currentTarget.value)}>
            {options.map((option) => (
              <option className="option" key={option.value}  value={option.value}>{option.label}</option>
            ))}
          </select>
          </div>
          <span>
     
      <button className="btnmodal btn--alt" onClick={cancelHandler}>Cancel</button>
      <button className="btnmodal" onClick={onSave}>Save</button>
      </span>
    </div>
    </div>
  );
  
};
export default UpdateModal;