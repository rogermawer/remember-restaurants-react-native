import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import SearchInput from "../components/SearchInput";
import axios from "axios";
import SearchResults from "../components/SearchResults";
import ModalPopUp from "../components/ModalPopUp";
import LoadingScreen from "../components/LoadingScreen";

const FindRestaurant = (props) => {
  const [searchResults, storeSearchResults] = useState([]);
  const [randomRestaurant, setRandomRestaurant] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const closeModalHandler = () => {
    setModalVisible(false);
    setRandomRestaurant(null);
  };

  const saveRestaurant = (restaurant) => {
    props.addToSavedRestaurants(restaurant);
  };

  useEffect(() => {
    props.manuallyGetLocation();
  }, [searchResults]); //run only if searchResults changes

  async function searchForRestaurant(searchQuery) {
    //for the post URL, make sure its your IP adress for development. Localhost only works for iPhone, not android.
    let data;
    setIsLoading(true);
    await axios
      .post("https://hidden-lowlands-65076.herokuapp.com/api/search", {
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
    setIsLoading(false);
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

  // if random restaurant was called, open a modal with its info
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

  if (isLoading) {
    currentView = <LoadingScreen />;
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
