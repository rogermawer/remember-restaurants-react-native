import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

//dependencies
import StarRating from "react-native-star-rating";
import openMap from "react-native-open-maps";

//components
import DisplayReviews from "./DisplayReviews";
import Colors from "../constants/Colors";

const ModalPopUp = (props) => {
  const sendUserToLocation = (lat, long, address, name) => {
    openMap({ latitude: lat, longitude: long, query: name, end: address });
  };

  var deviceWidth = Dimensions.get("window").width;

  return (
    <Modal
      animationType="slide"
      visible={props.modalVisible}
      onDismiss={props.setSelectedRestaurant.bind(this, null)}
      onRequestClose={props.setSelectedRestaurant.bind(this, null)} //android back button
      statusBarTranslucent={true} //removes mysterious status bar on android
    >
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image
              style={{
                resizeMode: "contain",
                width: deviceWidth - 20,
                height: 300,
              }}
              source={{ uri: props.selectedRestaurant.image_url }}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{props.selectedRestaurant.name}</Text>
            <Text style={styles.title}>{props.selectedRestaurant.price}</Text>
            <View style={styles.ratingContainer}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={props.selectedRestaurant.rating}
                starSize={20}
                fullStarColor={"#2352fc"}
                halfStarColor={"#2352fc"}
              />
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 12,
                  alignItems: "flex-end",
                }}
              >
                {props.selectedRestaurant.review_count}
              </Text>
            </View>
            <View>
              <DisplayReviews idOfRestaurant={props.selectedRestaurant.alias} />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttons}
              onPress={props.setModalVisible.bind(this, false)}
            >
              <Text style={styles.buttonText}>See More Results</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() =>
                sendUserToLocation(
                  props.selectedRestaurant.coordinates.latitude,
                  props.selectedRestaurant.coordinates.longitude,
                  props.selectedRestaurant.location.display_address[0],
                  props.selectedRestaurant.name
                )
              }
            >
              <Text style={styles.buttonText}>Go Here!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 50,
    width: "100%",
  },
  imageContainer: {
    paddingHorizontal: 10,
    width: "100%",
  },
  ratingContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  infoContainer: {
    width: "100%",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  buttons: {
    borderRadius: 10,
    padding: 10,
    width: 140,
    backgroundColor: Colors.wtfGreen,
  },
  buttonText: {
    textAlign: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
export default ModalPopUp;
