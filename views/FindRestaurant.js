import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import SearchInput from "../components/SearchInput";
import axios from "axios";
import SearchResults from "../components/SearchResults";
import ModalPopUp from "../components/ModalPopUp";

const FindRestaurant = (props) => {
  const [searchResults, storeSearchResults] = useState([]);
  const [randomRestaurant, setRandomRestaurant] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const closeModalHandler = () => {
    setModalVisible(false);
    setRandomRestaurant(null);
  };

  const saveRestaurant = (restaurant) => {
    props.addToSavedRestaurants(restaurant);
  };

  async function searchForRestaurant(searchQuery) {
    //for the post URL, make sure its your IP adress. Localhost only works for iPhone, not android.
    let data;
    await axios
      .post("http://192.168.1.11:3000/api/search", {
        term: searchQuery,
        latitude: props.userLocation.coords.latitude,
        longitude: props.userLocation.coords.longitude,
      })
      .then((res) => {
        storeSearchResults(res.data);
        data = res.data;
      })
      .catch((err) => {
        setSearchError("error searching");
      });
    return data;
  }

  async function getRandomRestaurant(searchQuery) {
    let foundRestaurants = await searchForRestaurant(searchQuery);
    if (!foundRestaurants || foundRestaurants.length < 1) {
      setSearchError("either server error or didnt find any restaurants");
    } else {
      setRandomRestaurant(
        foundRestaurants[Math.floor(Math.random() * foundRestaurants.length)]
      );
      setModalVisible(true);
    }
  }

  //show search input view on start up
  let currentView = (
    <View style={styles.container}>
      <SearchInput
        style={styles.container}
        searchForRestaurant={searchForRestaurant}
        manuallyGetLocation={props.manuallyGetLocation}
        getRandomRestaurant={getRandomRestaurant}
      />
      {props.userLocation ? (
        <View>
          <Text>Your Lat is: {props.userLocation.coords.latitude}</Text>
          <Text>Your Long is: {props.userLocation.coords.longitude}</Text>
          <Text>Timestamp: {props.userLocation.timestamp}</Text>
        </View>
      ) : (
        <View>
          <Text>{props.locationError}</Text>
        </View>
      )}
      <Button title="Update Location" onPress={props.manuallyGetLocation} />
      <View>
        <Text>{searchError}</Text>
      </View>
    </View>
  );

  // if search returns results, display all of them
  if (searchResults.length > 0 && randomRestaurant === null) {
    currentView = (
      <View style={styles.container}>
        <Button
          title="or try another search"
          onPress={() => storeSearchResults([])}
        />
        <SearchResults
          setSavedRestaurant={saveRestaurant}
          searchResults={searchResults}
        />
      </View>
    );
  }

  // if random restaurant was found, open a modal with its info
  let modalView;
  if (randomRestaurant) {
    modalView = (
      <ModalPopUp
        selectedRestaurant={randomRestaurant}
        setSelectedRestaurant={setRandomRestaurant}
        setModalVisible={closeModalHandler}
        modalVisible={modalVisible}
      />
    );
  }

  return (
    <View style={styles.container}>
      {currentView}
      {modalView}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default FindRestaurant;
