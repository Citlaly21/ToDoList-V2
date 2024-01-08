import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import {Entypo} from '@expo/vector-icons';
import { updateTodoReducer } from '../redux/todosSlice';
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
//AsyncStorage es para guardar datos de formar local

export default function Checkbox({ //componente funcional
    id,
    text,
    isCompleted,
    hour
}){
    const dispatch= useDispatch(); //para despechar las acciones
    const listTodos = useSelector(state => state.todos.todos); //para acceder al estado de redux  y traer la lista de tareas

    const handleCheckbox =() =>{
        try{
            dispatch(updateTodoReducer({id, isCompleted}));
            AsyncStorage.setItem("@Todos", JSON.stringify(
                listTodos.map(todo =>{ //utilizamos map para crear el array que esta en la lista de tareas
                    if (todo.id === id){
                        return {...todo, isCompleted: !todo.isCompleted }
                    } //este fragmento hace que cambien las propiedades de la tarea, a completada o no completada
                    return todo;
                })
            )) //guardar nuestros todos de forma local
                console.log('Se guardo correctamente');
        }catch (e){
            console.log(e);
        }
    }
    return(
        <TouchableOpacity onPress={handleCheckbox} style={isCompleted ? styles.checked : styles.unchecked}>
            {isCompleted && <Entypo name="check" size={16} color="#FAFAFA"/>}
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    checked:{
        width:20,
        height:20,
        marginRight:13,
        borderRadius:6,
        backgroundColor: '#262626',
        alignItems: 'center',
        justifyContent:'center',
        marginLeft:15,
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity: .3,
        shadowRadius:5,
        elevation:5,
    },
    unchecked:{
        width:20,
        height:20,
        marginRight:13,
        borderWidth:2,
        borderColor: '#E8E8E8',
        borderRadius:6,
        backgroundColor: '#fff',
        marginLeft:15,
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity: .1,
        shadowRadius:5,
        elevation:5,
    }
})

