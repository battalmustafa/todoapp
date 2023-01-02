import { useState,useEffect } from "react";
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

  
      const [query, setQuery] = useState("");
      
      
    
        const todoList = window.localStorage.getItem('todoList');

       const todoListArr = JSON.parse(todoList);
        
        
        const [selectedTitle, setSelectedTitle] = useState("");   
        let [sortedList, setSortedList] = useState(todoListArr);   

        const [FilteredList, setFilteredList] = useState(todoListArr); 


        const priorities = ['Urgent', 'Regular', 'Trivial'];
      
        
        let arr = todoListArr.sort( (a, b) => (priorities.indexOf(a.priority) - priorities.indexOf(b.priority)));
        //console.log(arr);

        const handleTitleChange = (event) => {
            setSelectedTitle(event.target.value);
            
            
          };
         
          const FilterByTitle = (filteredData) => {
            if (!selectedTitle) {
              return filteredData;
            }
           if(selectedTitle === 'Sort by Name'){
               sortedList = [...arr].sort((a, b) =>
              a.title > b.title ? 1 : -1,);
              setSortedList(sortedList);
              console.log(arr);
                console.log(sortedList);
            
           }
        
            const filteredTitle = filteredData.filter(
              (data) => data.priority.indexOf(selectedTitle) !== -1
            );            

            return filteredTitle;
            
          };
                       

        useEffect(() => {
           
             
              var filteredData = FilterByTitle(todoListArr);
              setFilteredList(filteredData);
               
        
            
            
          }, [selectedTitle]);
         
          useEffect(()=> {
         
            dispatch(filter(FilteredList));
          }, [FilteredList]);
          
          useEffect(()=> {
         
            dispatch(sort(sortedList));
          }, [sortedList]);
          
          
      let searchedList = [];
       
          searchedList =  FilteredList.filter( (data) => data.title.toLowerCase().includes(query));

        useEffect(()=> {
          
       
          searchedList =  arr.filter( (data) => data.title.toLowerCase().includes(query));
          dispatch(search(searchedList));
        }, [query]);
       
        
  
       
 
 

 //console.log(FilteredList);



    return(
    
        <div className="search">
     
     
        
    
           <input 
           className="input"
           type="text" 
                
                 placeholder="Job Name" 
                onChange={(e) => setQuery(e.target.value)} 
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