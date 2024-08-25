import { TextInput, Pressable, Image, ScrollView, StyleSheet, Text, View, Modal, useWindowDimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react';
import SliderButton from '../../(components)/SliderButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from '@expo/vector-icons/AntDesign';

const index = () => {
  const todo = [];
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState('start');

  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) setTime(selectedTime);
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      if (datePickerMode === 'start') {
        setStartDate(selectedDate);
      } else {
        setEndDate(selectedDate);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      avoidKeyboard={false}
    >

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
        <TouchableOpacity>
          <AntDesign name="pluscircle" size={32} color="#007FFF" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ padding: 10 }}>
          {todo?.length > 0 ? (
            <View>

            </View>) : (<View style={styles.noToDo}>
              <Image source={require('./../../../assets/no-todoList.png')} style={styles.notodoImage} />
              <Text style={styles.ifNotask}>No! Tasks</Text>
              <TouchableOpacity style={{ marginTop: 20 }} onPress={() => setModalVisible(true)}>
                <AntDesign name="pluscircle" size={45} color="#007FFF" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add a Habit </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            <TouchableOpacity style={styles.input} onPress={() => setShowTimePicker(true)}>
              <Text>{time.toLocaleTimeString()}</Text>
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onChangeTime}
              />
            )}

            <View style={styles.dateRangeContainer}>
              <TouchableOpacity style={styles.dateInput} onPress={() => {
                setDatePickerMode('start');
                setShowDatePicker(true);
              }}>
                <Text>{startDate.toLocaleDateString()}</Text>
              </TouchableOpacity>
              <Text>to</Text>
              <TouchableOpacity style={styles.dateInput} onPress={() => {
                setDatePickerMode('end');
                setShowDatePicker(true);
              }}>
                <Text>{endDate.toLocaleDateString()}</Text>
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={datePickerMode === 'start' ? startDate : endDate}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
            <SliderButton
              onSlideComplete={() => { setModalVisible(false);}}
              iconColor={"white"}
              iconSize={50}
              width={300}
              height={50}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
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
  noToDo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '130',
    marginHorizontal: 'auto'
  },
  addHabits: { marginTop: 40 },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',

  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    width: '45%',
  },
  doneButton: {
    width: '100%',
    backgroundColor: '#007FFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});