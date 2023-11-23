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
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const AroundMe = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState();
  const [coordinates, setCoordinates] = useState({
    latitude: 48.850869,
    longitude: 2.378946,
  });
  useEffect(() => {
    const askPermission = async () => {
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
  }, []);

  return (
    <View>
      <Text>Around Me</Text>
    </View>
  );
};

export default AroundMe;
