import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Button } from "react-native";

const Explore = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>EXPLORE</Text>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke",
    justifyContent: "center",
    alignItems: "center",
    height: 600,
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30,
  },
});
