import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, TextInput,StyleSheet} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
const Button = ({ elevation,icon, buttonTextHeight, height, width, borderColor, borderRadius, backgroundColor, value, onPress }) => {
    return (
        <TouchableOpacity style={{ height: height, width: width, borderColor: borderColor, borderRadius: borderRadius, backgroundColor: backgroundColor, justifyContent: 'center', alignItems: 'center', elevation: elevation }} onPress={onPress} >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {icon && <AntDesign name={icon} size={24} color="black" style={{ marginRight: 10 }} />}
            <Text style={{ fontSize: buttonTextHeight }}>{value}</Text>
          </View>
        </TouchableOpacity>
      );
    };
    

export default Button;