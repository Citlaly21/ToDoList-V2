import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { addTodoReducer } from "../redux/todosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddTodo(){
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date());
    const listTodos = useSelector(state => state.todos.todos);
    const dispatch= useDispatch();
    const navigation = useNavigation();

    const AddTodo = async () =>{
        const newTodo={
            id: Math.floor(Math.random()*100000),
            text: name,
            hour: date.toString(),
            isCompleted: false,
        }
        try{
            
            await AsyncStorage.setItem("@Todos", JSON.stringify([...listTodos, newTodo]));
            dispatch(addTodoReducer(newTodo));
            console.log('Todo esta correcto');
            navigation.goBack();
        }catch (e){
            console.log(e);
        }
    }
    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Agregar Tarea
            </Text>
            <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Nombre</Text>
            <TextInput
                style={styles.textInput} placeholder="Tarea..." placeholderTextColor="#00000030" onChangeText={(text)=>{setName(text)}} />
            </View>
            <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Hora</Text>
                <DateTimePicker 
                value={date}
                mode={'time'}
                is24Hour={true}
                onChange={(event, selectedDate )=> setDate(selectedDate || date)}
                style={{width: '80%'}}
                />
            </View>

            <TouchableOpacity onPress={AddTodo} style={styles.button}>
                <Text style={{color: 'white'}}>Listo</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles= StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#F7F8FA',
        paddingHorizontal:30
    },

    title:{
        fontSize:34,
        fontWeight:'bold',
        marginBottom:35,
        marginTop:10,
    },
    inputTitle:{
        fontSize:20,
        fontWeight:'600',
        lineHeight:24
    },
    textInput:{
        borderBottomColor: '#00000030',
        borderBottomWidth: 1,
        width: '80%'
    },
    inputContainer:{
        justifyContent:'space-between',
        flexDirection:'row',
        paddingBottom:30,
    },
    button:{
        marginTop:30,
        marginBottom:15,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#000000',
        height:46,
        borderRadius:11,
    }
})