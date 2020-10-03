import React, { useState } from "react";
import { StyleSheet } from "react-native";

import FindRestaurant from "./views/FindRestaurant";
import Remembered from "./views/Remembered";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Header from "./components/Header";

export default function App() {
  const [searchResults, passSearchResults] = useState([]);
  const [allSavedRestaurants, setAllSavedRestaurants] = useState([]);

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
