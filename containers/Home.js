import {
  FlatList,
  Text,
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const styles = useStyle();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const displayStars = (rate) => {
    // créer un tableau vide
    const tab = [];
    // boucle qui tourne 5 fois
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        tab.push(<AntDesign name="star" size={24} color="yellow" />);
      } else {
        tab.push(<AntDesign name="star" size={24} color="grey" />);
      }
    }
    return tab;
  };
  // const renderItem = ({ item }) => {
  //   return (
  //     <View
  //     // style={{
  //     //   padding: 10,
  //     //   marginVertical: 8,
  //     //   marginHorizontal: 16,
  //     //   backgroundColor: "#f9c2ff",
  //     // }}
  //     >
  //       <View style={styles.imagePrice}>
  //         <Image style={styles.room} source={{ uri: item.photos[0].url }} />
  //         <Text style={styles.price}>{item.price} €</Text>
  //       </View>
  //       <View style={styles.description}>
  //         <View>
  //           <Text style={{ fontSize: 16 }}>{item.title}</Text>
  //           <Text>{displayStars(item.ratingValue)}</Text>
  //           <Text style={{ fontSize: 14 }}>{item.reviews} Reviews</Text>
  //         </View>

  //         <Image
  //           source={{ uri: item.user.account.photo.url }}
  //           style={styles.avatar}
  //         />
  //       </View>
  //     </View>
  //   );
  // };

  return loading ? (
    <ActivityIndicator size="large" color="purple" style={{ marginTop: 100 }} />
  ) : (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")}></Image>

      <FlatList
        style={styles.flatList}
        data={data}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Room", { id: item._id })}
            >
              <View
              // style={{
              //   padding: 10,
              //   marginVertical: 8,
              //   marginHorizontal: 16,
              //   backgroundColor: "#f9c2ff",
              // }}
              >
                <View style={styles.imagePrice}>
                  <Image
                    style={styles.room}
                    source={{ uri: item.photos[0].url }}
                  />
                  <Text style={styles.price}>{item.price} €</Text>
                </View>
                <View style={styles.description}>
                  <View>
                    <Text style={{ fontSize: 16 }}>{item.title}</Text>
                    <Text>{displayStars(item.ratingValue)}</Text>
                    <Text style={{ fontSize: 14 }}>{item.reviews} Reviews</Text>
                  </View>

                  <Image
                    source={{ uri: item.user.account.photo.url }}
                    style={styles.avatar}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        // renderItem={({ item }) => <Text>{item.title}</Text>}
        ItemSeparatorComponent={() => <View style={styles.divider}></View>}
      />
    </View>
  );
};

export default Home;
const useStyle = () => {
  const { height, width } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      marginTop: 20,

      alignItems: "center",
      justifyContent: "center",
    },
    logo: {
      marginTop: 50,
      width: 30,
      height: 30,
      resizeMode: "contain",
    },
    room: {
      width: "100%",
      height: 200,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },

    price: {
      color: "white",
      backgroundColor: "black",
      width: 80,
      padding: 15,
      fontSize: 16,
      position: "absolute",
      top: 140,
    },

    imagePrice: {
      position: "relative",
    },

    description: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 10,
    },

    divider: {
      backgroundColor: "hsla(0, 0%, 7%, 0.1)",
      display: "block",
      height: 1,
      width: "100%",
      marginTop: 10,
      marginBottom: 10,
    },

    flatList: {
      padding: 15,
      marginVertical: 8,
      marginHorizontal: 16,
      // backgroundColor: "#f9c2ff",
      marginTop: 20,
      width: "100%",
    },
  });
  return styles;
};
