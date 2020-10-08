import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";
import StarRating from "react-native-star-rating";
import openMap from "react-native-open-maps";

const ModalPopUp = (props) => {
  const sendUserToLocation = (lat, long, address, name) => {
    openMap({ latitude: lat, longitude: long, query: name, end: address });
  };

  return (
    <Modal
      animationType="slide"
      visible={props.modalVisible}
      onDismiss={props.setSelectedRestaurant.bind(this, null)}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
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
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={props.setModalVisible.bind(this, false)}>
            <Text>See More Results</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              sendUserToLocation(
                props.selectedRestaurant.coordinates.latitude,
                props.selectedRestaurant.coordinates.longitude,
                props.selectedRestaurant.location.display_address[0],
                props.selectedRestaurant.name
              )
            }
          >
            <Text>Go Here!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginVertical: 20,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  imageContainer: {
    paddingHorizontal: 10,
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: 400,
    height: 400,
  },
  infoContainer: {
    paddingHorizontal: 10,
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
export default ModalPopUp;
