import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RememberedResults from "../components/RememberedResults";

const Remembered = (props) => {
  return (
    <View style={styles.container}>
      <RememberedResults restaurantData={props.allSavedRestaurants} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Remembered;
