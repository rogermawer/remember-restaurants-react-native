import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Location from "expo-location";

import FindRestaurant from "./views/FindRestaurant";
import Remembered from "./views/Remembered";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Header from "./components/Header";

export default function App() {
  const [searchResults, passSearchResults] = useState([]);
  const [allSavedRestaurants, setAllSavedRestaurants] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  const getLocation = () => {
    if (!userLocation) {
      manuallyGetLocation();
    }
  };
  getLocation();

  async function manuallyGetLocation() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setLocationError("Permission to access location was denied");
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    } catch (e) {
      setLocationError("Couldn't find your location. Is data on?");
    }
  }

  const updateSavedRestaurants = (restaurant) => {
    setAllSavedRestaurants([...allSavedRestaurants, restaurant]);
  };

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Header />
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
          labelStyle: { fontSize: 15, paddingVertical: 15 },
        }}
        initialRouteName={FindRestaurant}
      >
        <Tab.Screen name="Search">
          {(props) => (
            <FindRestaurant
              {...props}
              searchResults={searchResults}
              storeSearchResults={passSearchResults}
              addToSavedRestaurants={updateSavedRestaurants}
              manuallyGetLocation={manuallyGetLocation}
              userLocation={userLocation}
              locationError={locationError}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Remembered">
          {(props) => (
            <Remembered {...props} allSavedRestaurants={allSavedRestaurants} />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
