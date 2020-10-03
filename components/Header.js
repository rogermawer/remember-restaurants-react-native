import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Header = (props) => {
  return (
    <View style={styles.headerStyle}>
      <Text style={styles.bigText}>Where the $@!# should I eat?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7287b",
    width: "100%",
    height: 120,
    paddingTop: 40,
  },
  bigText: {
    fontSize: 30,
    color: "black",
  },
  navContainer: {
    flexDirection: "row",
  },
  navItemStyle: {
    paddingHorizontal: 20,
  },
});

export default Header;
