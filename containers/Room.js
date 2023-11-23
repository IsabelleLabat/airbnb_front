import {
  Text,
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

// import { useRoute } from "@react-navigation/native";

const Room = ({ route }) => {
  // const { params } = useRoute();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const styles = useStyle();
  const [coordinates, setCoordinates] = useState({
    latitude: 48.850869,
    longitude: 2.378946,
  });
  console.log(route.params.id);

  const roomId = route.params.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${roomId}`
        );
        setData(response.data);
        console.log(response.data);
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
        tab.push(<AntDesign name="star" size={24} color="#FDB100" key={i} />);
      } else {
        tab.push(<AntDesign name="star" size={24} color="grey" key={i} />);
      }
    }
    return tab;
  };
  return loading ? (
    <ActivityIndicator size="large" color="purple" style={{ marginTop: 100 }} />
  ) : (
    <View style={styles.container}>
      <View
      // style={{
      //   padding: 10,
      //   marginVertical: 8,
      //   marginHorizontal: 16,
      //   backgroundColor: "#f9c2ff",
      // }}
      >
        <View style={styles.imagePrice}>
          {data.photos && data.photos.length > 0 && (
            <Image style={styles.room} source={{ uri: data.photos[0].url }} />
          )}
          {/* <Image style={styles.room} source={{ uri: data.photos[0].url }} /> */}
          <Text style={styles.price}>{data.price} €</Text>
        </View>
        <View style={styles.description}>
          <View>
            <Text style={{ fontSize: 16 }}>{data.title}</Text>
            <Text>{displayStars(data.ratingValue)}</Text>
            <Text style={{ fontSize: 14 }}>{data.reviews} Reviews</Text>
          </View>

          <Image
            source={{ uri: data.user.account.photo.url }}
            style={styles.avatar}
          />
        </View>
        <Text>{data.description}</Text>
        {/* <Text>longitude : {data.location[0]}</Text>
        <Text>latitude : {data.location[1]}</Text> */}
      </View>
      <MapView
        style={styles.map}
        // Pour demander à Iphone d'utiliser GoogleMaps plutôt que Maps
        provider={PROVIDER_GOOGLE}
        // Dévinition du centrage de la carte
        initialRegion={{
          longitude: coordinates.longitude,
          latitude: coordinates.latitude,
          // Niveau de zoom de la carte
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        // Afficher la position de l'utilisateur (fonctionne uniquement si l'utilisateur à accepter le partage de sa localisation)
        showsUserLocation
      >
        <Marker
          key={roomId}
          coordinate={{
            latitude: data.location[1],
            longitude: data.location[0],
          }}
          // S'affiche lorsque l'on appuie sur l'épingle
          title={"marker.title"}
          description={"marker.description"}
        />
      </MapView>
    </View>
  );
};

export default Room;

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
    map: {
      // Par défault, il prend toute la largeur de son parent car nous somme en flexbox
      height: 290,
      width: 400,
      marginTop: 20,
    },
  });
  return styles;
};
