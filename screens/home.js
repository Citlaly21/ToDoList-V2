import React from "react";
import { useState, useEffect } from 'react';
import {  StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import TodoList from '../components/TodoList';
import { todosData } from "../data/todos";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {hideCompletedReducer, setTodosReducer } from '../redux/todosSlice';
export default function Home() {

    const todos = useSelector(state => state.todos.todos);
    //const [localData, setLocalData] =useState(
      //  todosData.sort((a,b)=>{return a.isCompleted -b.isCompleted})
    //);

    const navigation=useNavigation();
    const dispatch = useDispatch();
    useEffect(() =>{
      const getTodos =async()=>{
        try{
          const todos = await AsyncStorage.getItem("@Todos");
          if(todos !== null){
            dispatch(setTodosReducer(JSON.parse(todos)));
          }
        }catch (e){
          console.log (e);
        } 
      }
      getTodos();
    }, []); //el array para que no se vuelva a repetirjs);

    return (
    <View style={styles.container} >
        <Image
            source={{uri:'https://i.pinimg.com/564x/8e/0a/5f/8e0a5f6d1b4e2d23d3e2b60f5be44bba.jpg'}}
            style={styles.pic}
            />
        <Text style={styles.title}>Lista de tareas</Text>
        <TodoList todosData={todos.filter(todo =>todo)}/>

        <TouchableOpacity onPress={() => navigation.navigate("AddTodo")} style={styles.button}>
            <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:70,
    paddingHorizontal:15,
  },

  pic:{
    width:52,
    height:52,
    borderRadius: 21,
    top:60,
    alignSelf:'flex-end'
  },

  title:{
    fontSize:34,
    fontWeight:'bold',
    marginBottom:35,
    marginTop:10,
  },
  button:{
    width:42,
    height:42,
    borderRadius:21,
    backgroundColor: '#000',
    position:'absolute',
    bottom:50,
    right:20,
    shadowColor:'#000',
    shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity: .5,
        shadowRadius:5,
        elevation:5,
  },
  plus:{
    fontSize:40,
    color:'#fff',
    position:'absolute',
    top: -6,
    left: 9,
  },
});
