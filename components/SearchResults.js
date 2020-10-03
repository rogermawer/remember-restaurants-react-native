import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import StarRating from "react-native-star-rating";
import CardView from "../components/CardView";
import ModalPopUp from "../components/ModalPopUp";

const SearchResults = (props) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const saveRestaurant = (restaurantObject) => {
    setModalVisible(true);
    setSelectedRestaurant(restaurantObject);
  };
  let showModalView;
  if (selectedRestaurant) {
    showModalView = (
      <ModalPopUp
        setSelectedRestaurant={setSelectedRestaurant}
        selectedRestaurant={selectedRestaurant}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    );
  }

  return (
    <View style={styles.container}>
      {showModalView}
      <FlatList
        data={props.searchResults}
        renderItem={(result) => (
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
            activeOpacity={0.6}
            onLongPress={props.setSavedRestaurant.bind(this, result.item)}
            onPress={saveRestaurant.bind(this, result.item)}
          >
            <CardView id={result.item.id} style={styles.resultStyle}>
              <View style={styles.cardContainer}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{ uri: result.item.image_url }}
                  />
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.title}>{result.item.name}</Text>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={result.item.rating}
                    starSize={20}
                    fullStarColor={"#2352fc"}
                    halfStarColor={"#2352fc"}
                  />
                </View>
              </View>
            </CardView>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resultStyle: {
    width: "98%",
    marginVertical: 10,
    height: 200,
  },
  cardContainer: {
    flexDirection: "row",
    width: "100%",
  },
  imageContainer: {
    paddingHorizontal: 10,
    width: "50%",
  },
  image: {
    width: 150,
    height: 150,
  },
  infoContainer: {
    paddingHorizontal: 10,
    width: "50%",
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
  },
});

export default SearchResults;
