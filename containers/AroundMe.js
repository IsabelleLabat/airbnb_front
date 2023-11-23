import {
  FlatList,
  Text,
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";

const AroundMe = () => {
  const [error, setError] = useState();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState();
  const [coordinates, setCoordinates] = useState({
    latitude: 48.850869,
    longitude: 2.378946,
  });
  useEffect(() => {
    const askPermissionAndGetCoords = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        // console.log("ok");

        // Récupérer les coordonnées
        const { coords } = await Location.getCurrentPositionAsync();
        // console.log("response coords>", coords);

        setCoordinates({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      } else {
        alert("Access denied");
      }

      setIsLoading(false);
    };
    askPermissionAndGetCoords();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          " https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around/latitude/longitude"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <View>
      <Text>Around Me</Text>
    </View>
  );
};

export default AroundMe;
