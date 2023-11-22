import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";

const SignIn = () => {
  const navigation = useNavigation();
  const styles = useStyle();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          email: email,
          password: password,
        }
      );
      if (response.status === 200) {
        // Connexion réussie, affiche une popup
        alert("Connexion réussie");
      } else {
        // Échec de la connexion, affiche une erreur
        console.log(response.data.message);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.signContainer}>
        <Text>SignIn Page</Text>

        <TextInput
          placeholder="email"
          value={email}
          onChangeText={(email) => {
            setEmail(email);
          }}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(password) => {
            setPassword(password);
          }}
          secureTextEntry={true}
        />
        <View>
          {errorMessage ? <Text>{errorMessage}</Text> : null}
          <TouchableOpacity activeOpacity={0.8} onPress={onSubmit}>
            <Text>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text>No account ? Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignIn;

const useStyle = () => {
  const { height, width } = useWindowDimensions();
  const styles = StyleSheet.create({
    signContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: height * 0.8,
    },
  });
  return styles;
};
