import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Checkbox from "./Checkbox";
import moment from "moment";

export default function Todo({ //se define un componente funcional y acepta las siguientes 
    //propiedades 
    id,
    text,
    isCompleted,
    hour
}){

    const [localHour, setLocalHour] = useState(new Date(hour)); //utilizamos un hook para crear un estado local,
    //se usa para manejar la hora 
    return(
        //renderizamos
        <View style={styles.container}> 
        <Checkbox 
            id={id}
            text={text}
            isCompleted={isCompleted}
            hour={hour}
            />

            <View>
                <Text style={
                    isCompleted 
                    ?[styles.text, {textDecorationLine:'line-through', color:'#73737330'}]
                    :styles.text
                    }>{text}</Text>
                <Text style={
                        isCompleted 
                        ?[styles.time, {textDecorationLine:'line-through', color:'#73737330'}]
                        :styles.time
                    }>{moment(localHour).format('LT')}</Text>
            </View>

            
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        marginBottom: 20,
        flexDirection:'row',
        alignItems:'center'
    },

    text:{
        fontSize:18,
        fontWeight: '500',
        color: '#737373'
    },

    time:{
        fontSize:18,
        color: '#a3a3a3',
        fontWeight:'500'
    }

})