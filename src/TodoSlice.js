import { createSlice } from "@reduxjs/toolkit";

//const initialState = [];

const getInitialTodo = () => {
    // getting todo list
    const localTodoList = window.localStorage.getItem('todoList');
    // if todo list is not empty
    if (localTodoList) {
        return JSON.parse(localTodoList);
    }
    window.localStorage.setItem('todoList', []);
    return [];
};

const initialValue = {

    todoList: getInitialTodo(),
};
const priorities = ['Urgent', 'Regular', 'Trivial'];


export const todoSlice = createSlice({
    name: "todos",
    initialState: initialValue,
    reducers: {
        add: (state, action) => {
            state.todoList.push(action.payload);
            const todoList = window.localStorage.getItem('todoList');
            if (todoList) {
                const todoListArr = JSON.parse(todoList);

                todoListArr.push({
                    ...action.payload,
                });
                todoListArr.sort((a, b) => (priorities.indexOf(a.priority) - priorities.indexOf(b.priority)));


                window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
                state.todoList = todoListArr;
            } else {

                window.localStorage.setItem(
                    'todoList',
                    JSON.stringify([{
                        ...action.payload,
                    }, ])
                );

            }
        },
        remove: (state, action) => {
            // return state.filter((todo) => todo.id !== action.payload);
            const todoList = window.localStorage.getItem('todoList');
            if (todoList) {
                const todoListArr = JSON.parse(todoList);
                todoListArr.forEach((todo, index) => {
                    if (todo.id === action.payload) {
                        todoListArr.splice(index, 1);
                        console.log(todo.id);
                    }
                });
                window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
                state.todoList = todoListArr;
            }
        },
        updateTodo: (state, action) => {
            const todoList = window.localStorage.getItem('todoList');
            if (todoList) {
                const todoListArr = JSON.parse(todoList);
                todoListArr.forEach((todo) => {
                    if (todo.id === action.payload.id) {
                        todo.priority = action.payload.priority
                            // todo.title = action.payload.title;

                    }
                });
                window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
                state.todoList = todoListArr;
            }

        },
        filter: (state, action) => {
            const todoList = window.localStorage.getItem('todoList');
            if (todoList) {
                let todoListArr = JSON.parse(todoList);
                todoListArr = action.payload;

                //window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
                state.todoList = [...todoListArr];
            }
        },
        search: (state, action) => {
            const todoList = window.localStorage.getItem('todoList');
            if (todoList) {
                let todoListArr = JSON.parse(todoList);
                todoListArr = action.payload;

                state.todoList = [...todoListArr];
            }
        },
        sort: (state, action) => {
            const todoList = window.localStorage.getItem('todoList');
            if (todoList) {
                let todoListArr = JSON.parse(todoList);
                todoListArr = action.payload;

                state.todoList = [...todoListArr];
                console.log(todoList);
            }
        },

    },
});

export const {
    add,
    updateTodo,
    remove,
    filter,
    search,
    sort,
    update,
} = todoSlice.actions;

export default todoSlice.reducer;