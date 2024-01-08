import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice";

export const store = configureStore({
    reducer:{
        todos: todosReducer,
    }
})
//configureStore lo ocupamos para crear la store
//agregamos un reduces que esta vinculado con el slice
//todos slice, esta tiene  una clave todos