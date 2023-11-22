import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";

const SignUp = ({ setToken }) => {
  const navigation = useNavigation();
  const styles = useStyle();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async () => {
    console.log("submit");
    // Vérifier que tous les champs sont remplis
    if (email && username && description && password && confirmPassword) {
      // vérifier que les mots de passe sont identique
      if (password === confirmPassword) {
        try {
          // requête pour créer un utilisateur
          const { data } = await axios.post(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
            {
              email: email,
              username: username,
              description: description,
              password: password,
            }
          );

          // console.log("data>>>", data);
          //  Envoie du 'token' à la fonction pour le créer dans l'asyncStorage et le state puis accéder au reste de l'application
          setToken(data.token);
        } catch (error) {
          // le '?' permet de vérifier si la clé existe, si non le reste du chemin n'est pas lu
          console.log("catch>>", error.response?.data?.error);

          if (error.response) {
            setErrorMessage(error.response.data.error);
          } else {
            setErrorMessage("Une erreur est survenue");
          }
        }
      } else {
        setErrorMessage("Mots de passe non identique");
      }
    } else {
      setErrorMessage("Missing Parameters");
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.signContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/logo.png")}
        ></Image>
        <Text>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="username"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="description"
          value={description}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
          secureTextEntry={true}
        />

        <View>
          {/* Afficher le message d'erreur s'il y en a un */}
          {errorMessage && <Text>{errorMessage}</Text>}
          <TouchableOpacity activeOpacity={0.8} onPress={handleSignup}>
            <Text>Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text>Already have an account ? Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;

const useStyle = () => {
  const { height, width } = useWindowDimensions();
  const styles = StyleSheet.create({
    signContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: height * 0.8,
    },
    logo: {
      width: 100,
      height: 100,
      resizeMode: "contain",
      marginBottom: 20,
    },
    input: {
      marginVertical: 15,
      borderWidth: 1,
      padding: 10,
    },
  });
  return styles;
};
