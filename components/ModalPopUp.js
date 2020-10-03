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

const ModalPopUp = (props) => {
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
          <StarRating
            disabled={false}
            maxStars={5}
            rating={props.selectedRestaurant.rating}
            starSize={20}
            fullStarColor={"#2352fc"}
            halfStarColor={"#2352fc"}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={props.setModalVisible.bind(this, false)}>
            <Text>See More Results</Text>
          </TouchableOpacity>
          <TouchableOpacity title="Go here!" onPress={() => {}}>
            <Text>Go here!</Text>
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
  cardContainer: {
    flexDirection: "row",
    width: "100%",
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
