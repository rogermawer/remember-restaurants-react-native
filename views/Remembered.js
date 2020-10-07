import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RememberedResults from "../components/RememberedResults";

const Remembered = (props) => {
  let currentView = (
    <View>
      <Text>You haven't saved any restaurants yet! Try saving one.</Text>
    </View>
  );

  if (props.allSavedRestaurants.length > 0) {
    currentView = (
      <RememberedResults restaurantData={props.allSavedRestaurants} />
    );
  }

  return <View style={styles.container}>{currentView}</View>;
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
