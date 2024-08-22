import { Pressable, Image, ScrollView, StyleSheet, Text, View, Dimensions, useWindowDimensions, TouchableOpacity } from 'react-native'
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

const index = () => {
  const todo = [];
  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.pressable}>
          <Text style={styles.pressableText}>All</Text>
        </Pressable>
        <Pressable style={styles.pressable}>
          <Text style={styles.pressableText}>Work</Text>
        </Pressable>
        <Pressable style={{ ...styles.pressable, marginRight: 'auto' }}>
          <Text style={styles.pressableText}>Personal</Text>
        </Pressable>
        <Pressable>
          <AntDesign name="pluscircle" size={32} color="#007FFF" />
        </Pressable>
      </View>
      <ScrollView>
        <View style={{padding:10}}>
          {todo?.length > 0 ? (<View></View>) : (<View style={styles.noToDo}>
            <Image source={require('./../../../assets/no-todoList.png')} style={styles.notodoImage} />
            <Text style={styles.ifNotask}>No! Tasks</Text>
            <TouchableOpacity style={{marginTop:40}}>
              <AntDesign name="pluscircle" size={55} color="#007FFF" />
            </TouchableOpacity>
          </View>
          )}
        </View>
      </ScrollView>
    </>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  pressable: {
    backgroundColor: '#7CB9E8',
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pressableText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  notodoImage: {
    flex: 1,
    flexDirection: 'row',
    width: 300,
    height: 300
  },
  ifNotask: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center'
  },
  noToDo:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginTop:'130',
    marginHorizontal:'auto'

  }
})