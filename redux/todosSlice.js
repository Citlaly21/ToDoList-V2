import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos : []
} //cada que creamos un slice tenemos que pasar un estado inicial

export const todosSlice = createSlice({ //función de redux createSlice
    name: 'todos', //todos es el nombre de los slices
    initialState,
    reducers: {
        //se agregan tareas
        setTodosReducer: (state, action) => {
            state.todos = action.payload;
            console.log(state.todos);
        },
        addTodoReducer:(state,action) =>{
            state.todos.push(action.payload)
        },
        hideCompletedReducer:(state) =>{
            state.todos=state.todos.filter(todo => !todo.isCompleted)
        },
        updateTodoReducer:(state, action)=>{
            state.todos = state.todos.map(todo =>{
                if(todo.id===action.payload.id){
                    todo.isCompleted = !todo.isCompleted
                }
                return todo;
            })
        //actualiza el estado
        },
        deleteTodoReducer:(state,action)=>{
            const id =action.payload
            state.todos= state.todos.filter(todo => todo.id !==id);
            }
            //elimina una tarea
    },
});

export const {
    setTodosReducer,
    addTodoReducer,
    updateTodoReducer,
    hideCompletedReducer,
    deleteTodoReducer
} = todosSlice.actions;

export default todosSlice.reducer;