import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import SearchInput from "../components/SearchInput";
import axios from "axios";
import SearchResults from "../components/SearchResults";
import ModalPopUp from "../components/ModalPopUp";
import * as Location from "expo-location";

const FindRestaurant = (props) => {
  const [searchResults, storeSearchResults] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [randomRestaurant, setRandomRestaurant] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const closeModalHandler = () => {
    setModalVisible(false);
    setRandomRestaurant(null);
  };

  const saveRestaurant = (restaurant) => {
    props.addToSavedRestaurants(restaurant);
  };

  const getLocation = () => {
    if (!userLocation) {
      manuallyGetLocation();
    }
  };
  getLocation();

  async function manuallyGetLocation() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    } catch (e) {
      setErrorMsg("Couldn't find your location. Is data on?");
    }
  }

  async function searchForRestaurant(searchQuery) {
    //for the post URL, make sure its your IP adress. Localhost only works for iPhone, not android.
    let data;
    await axios
      .post("http://192.168.1.11:3000/api/search", {
        term: searchQuery,
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      })
      .then((res) => {
        storeSearchResults(res.data);
        data = res.data;
      })
      .catch((err) => {
        setErrorMsg("error searching");
      });
    return data;
  }

  async function getRandomRestaurant(searchQuery) {
    let foundRestaurants = await searchForRestaurant(searchQuery);
    if (!foundRestaurants || foundRestaurants.length < 1) {
      setErrorMsg("either server error or didnt find any restaurants");
    } else {
      setRandomRestaurant(
        foundRestaurants[Math.floor(Math.random() * foundRestaurants.length)]
      );
      setModalVisible(true);
    }
  }

  //current view. i.e., what you see on this screen
  let currentView = (
    <View style={styles.container}>
      <SearchInput
        style={styles.container}
        searchForRestaurant={searchForRestaurant}
        manuallyGetLocation={manuallyGetLocation}
        getRandomRestaurant={getRandomRestaurant}
      />
      {userLocation ? (
        <View>
          <Text>Your Lat is: {userLocation.coords.latitude}</Text>
          <Text>Your Long is: {userLocation.coords.longitude}</Text>
          <Text>Timestamp: {userLocation.timestamp}</Text>
        </View>
      ) : (
        <View>
          <Text>{errorMsg}</Text>
        </View>
      )}
      <Button title="Update Location" onPress={manuallyGetLocation} />
      <View>
        <Text>{errorMsg}</Text>
      </View>
    </View>
  );
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

  // conditional render logic
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
