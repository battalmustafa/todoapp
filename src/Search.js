import { useState } from "react";
import { useDispatch } from "react-redux";
import { filter, search,sort } from "./TodoSlice";
const Search = () => {
      const dispatch = useDispatch();
 
    const options = [
        {
          id:0,
          label: "Priority (all)",
          value: "",
        },
        {
          id:1,

          label: "Urgent",
          value: "Urgent",
      
        },
        {
          id:2,

          label: "Regular",
          value: "Regular",
      
        },
        {
          id:3,

          label: "Trivial",
          value: "Trivial",
      
        },
        {
          id:4,

          label: "Sort by Name",
          value: "Sort by Name",
      
        },
      ];

  
     // const [query, setQuery] = useState("");
      
      
    
        const todoList = window.localStorage.getItem('todoList');
        let todoListArr =[];
if(todoList){todoListArr = JSON.parse(todoList);
  console.log(todoListArr,todoList);}
       
        
        const [selectedTitle, setSelectedTitle] = useState("");   
        let [sortedList, setSortedList] = useState(todoListArr);   

        let [FilteredList, setFilteredList] = useState(todoListArr); 

        const priorities = ['Urgent', 'Regular', 'Trivial'];
      
        
        let arr = todoListArr.sort( (a, b) => (priorities.indexOf(a.priority) - priorities.indexOf(b.priority)));
        //console.log(arr);

        const handleTitleChange = (event) => {
                    
          setSelectedTitle(event.target.value);
          console.log(selectedTitle);
          

          if(event.target.value === 'Sort by Name'){
               sortedList = [...arr].sort((a, b) =>
              a.title > b.title ? 1 : -1,);
              setSortedList(sortedList);
              console.log(arr);
                console.log(sortedList);
                dispatch(sort(sortedList)); 
            
           }
        else{
             FilteredList = arr.filter(
              (data) => data.priority.indexOf(event.target.value) !== -1
            );  
            setFilteredList(FilteredList)
            console.log( FilteredList);    
               
            dispatch(filter(FilteredList));       
   
            
          };
                       
        
      };     
      const handleSearch = (query) => {

console.log(query);
const  searchedList =  arr.filter( (data) => data.title.toLowerCase().includes(query));
console.log(searchedList);
dispatch(search(searchedList));
      }
          
          //  const  searchedList =  arr.filter( (data) => data.title.toLowerCase().includes(query));
          return(
    
            <div className="search">
         
         
            
        
               <input 
               className="input"
               type="text" 
                    
                     placeholder="Job Name" 
                    onChange={(e) => handleSearch(e.target.value)} 
                     />
                      
                <select 
              value={selectedTitle}
              onChange={handleTitleChange}
                 className="select"  >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
        )
};         

export default Search;