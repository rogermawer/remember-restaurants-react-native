import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const Header = (props) => {
  return (
    <View style={styles.headerStyle}>
      <Text style={styles.bigText}>WTF Should I Eat?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.26,
    elevation: 10, //android only
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.wtfPink,
    marginBottom: 10,
    width: "100%",
    borderRadius: 10,
    height: 120,
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  bigText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
});

export default Header;
