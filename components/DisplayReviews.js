import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import axios from "axios";

const DisplayReviews = (props) => {
  const [selectedRestaurantReviews, setSelectedRestaurantReviews] = useState(
    []
  );

  async function searchForReviews(alias) {
    let reviews;
    await axios
      .post("https://hidden-lowlands-65076.herokuapp.com/api/reviews", {
        restaurantName: alias,
      })
      .then((res) => {
        reviews = res.data.reviews;
        reviews.length > 1
          ? setSelectedRestaurantReviews(reviews)
          : setSelectedRestaurantReviews("no reviews yet");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    searchForReviews(props.idOfRestaurant);
  }, []);

  return (
    <View>
      {selectedRestaurantReviews.length > 0 ? (
        <View style={styles.container}>
          <View style={styles.userInfo}>
            <Image
              style={styles.image}
              source={{ uri: selectedRestaurantReviews[0].user.image_url }}
            />
            <Text>{selectedRestaurantReviews[0].user.name}</Text>
          </View>
          <View style={styles.reviewText}>
            <Text>{selectedRestaurantReviews[0].text}</Text>
          </View>
        </View>
      ) : (
        <View>
          <Text>There are no reviews yet for this restaurant.</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
  },
  userInfo: {
    width: "20%",
    paddingRight: 10,
    alignItems: "center",
  },
  reviewText: {
    width: "80%",
    paddingLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "cover",
    borderRadius: 70 / 2,
  },
});
export default DisplayReviews;
