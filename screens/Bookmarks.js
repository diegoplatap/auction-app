import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Bookmarks = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>BOOKMARKS</Text>
    </View>
  );
};

export default Bookmarks;
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
