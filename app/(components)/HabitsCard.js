import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const HabitMessage = () => {
  const dummyHabit = {
    userid: "user123",
    description: "Take a bunch of flowers",
    time: "20:00",
    stars: 2, 
  };

  return (
    <View style={styles.container}>
      <View style={styles.greenBar} />
      <View style={styles.content}>
        <Text style={styles.heading}>Movie</Text>
        <Text style={styles.description}>{dummyHabit.description}</Text>
        <Text style={styles.time}>{dummyHabit.time}</Text>
        <View style={styles.stars}>
          {[...Array(3)].map((_, index) => (
            <FontAwesome
              key={index}
              name={index < dummyHabit.stars ? 'star' : 'star-o'}
              size={24}
              color="gold"
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "red",
    borderRadius: 10,
    marginVertical: 5,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  greenBar: {
    width: 10,
    height: "100%",
    backgroundColor: "green",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    paddingLeft: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  time: {
    fontSize: 12,
    color: "#999",
  },
  stars: {
    flexDirection: "row",
    marginTop: 5,
  },
});

export default HabitMessage;
