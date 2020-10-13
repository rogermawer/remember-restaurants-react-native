import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";

const SearchInput = (props) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View {...props} style={{ ...styles.inputContainer, ...props.style }}>
      <TextInput
        style={styles.inputStyle}
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        placeholder="enter keywords here..."
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttons}
          onPress={props.searchForRestaurant.bind(this, searchQuery)}
        >
          <Text>Search All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttons}
          onPress={props.getRandomRestaurant.bind(this, searchQuery)}
        >
          <Text>Or Random</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    width: 200,
    height: 30,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    textAlign: "center",
  },
  buttons: {
    backgroundColor: Colors.wtfGreen,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    marginVertical: 20,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
});

export default SearchInput;
