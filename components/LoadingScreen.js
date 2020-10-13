import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LoadingScreen = () => {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
});
export default LoadingScreen;
