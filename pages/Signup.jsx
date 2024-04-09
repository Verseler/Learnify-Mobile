import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";
import { View, Image } from "react-native";
import { Appbar } from "react-native-paper";
import {
  Button,
  Text,
  TextInput,
  useTheme,
  Snackbar,
} from "react-native-paper";

import { formStyles as styles } from "../utils/globalStyles";
import useStore from "../hooks/useStore";

export default function Signup({ navigation }) {
  const theme = useTheme();

  const signIn = useStore((state) => state.signIn);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  /* Handlers */
  const onDismissSnackBarHandler = () => setServerError("");

  const handleHidePassword = () =>
    setHidePassword((prevHidePassword) => !prevHidePassword);

  const handleConfirmHidePassword = () =>
    setHideConfirmPassword(
      (prevConfirmHidePassword) => !prevConfirmHidePassword
    );

  //check if data in the form are valid
  const isFormValid = () => {
    const EMPTY = "";
    let errorCount = 0;

    setFormError({ email: "", password: "" });

    //check if email is empty
    if (name == EMPTY) {
      setFormError((prevFormError) => {
        return { ...prevFormError, name: "Required" };
      });
      errorCount++;
    }
    //check if email has @ and .com
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError((prevFormError) => {
        return { ...prevFormError, email: "Invalid email" };
      });
      errorCount++;
    }
    //check if email is empty
    if (email == EMPTY) {
      setFormError((prevFormError) => {
        return { ...prevFormError, email: "Required" };
      });
      errorCount++;
    }
    //check if password and confirm password matched
    if (password !== confirmPassword) {
      setFormError((prevFormError) => {
        return {
          ...prevFormError,
          password: "Password doesnt matched",
          confirmPassword: "Password doesnt matched",
        };
      });
      errorCount++;
    }
    //check if password is more than 8 characters
    if (password.length < 8) {
      setFormError((prevFormError) => {
        return { ...prevFormError, password: "Minimum of 8 characters" };
      });
      errorCount++;
    }

    //check if password is empty
    if (password == EMPTY) {
      setFormError((prevFormError) => {
        return { ...prevFormError, password: "Required" };
      });
      errorCount++;
    }

    //check if confirm password is empty
    if (confirmPassword == EMPTY) {
      setFormError((prevFormError) => {
        return { ...prevFormError, confirmPassword: "Required" };
      });
      errorCount++;
    }

    //if error is less than or equal to zero means the form is valid
    return errorCount <= 0;
  };

  const handleSubmitForm = () => {
    if (isFormValid()) signup();
  };

  async function signup() {
    try {
      setIsLoading(true);

      const url = "http://192.168.1.7:8000/api/signup";
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      };
      const res = await fetch(url, requestOptions);
      const data = await res.json();

      //if signup failed display error message
      if (!data["success"]) {
        setServerError(data.message);
      }
      //if signup successful then signin
      else {
        signIn(data.token);
      }
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Appbar.Header
        style={[styles.header, { backgroundColor: theme.colors.background }]}
      >
        <Image
          style={styles.logo}
          source={require("../assets/Icons/Logo.png")}
        />
        <Appbar.Content
          title="Sign Up"
          titleStyle={{ fontWeight: "bold", fontSize: 26 }}
        />
        <Image
          style={styles.star}
          source={require("../assets/Icons/star.png")}
        />
      </Appbar.Header>

      <View style={styles.form}>
        {/* Name Field */}
        <View style={styles.formGroup}>
          <Text
            style={[
              styles.fieldLabel,
              formError.name && styles.errorfieldLabel,
            ]}
          >
            Name
          </Text>
          <TextInput
            mode="outlined"
            outlineColor="lightgray"
            theme={{ roundness: 10 }}
            style={[
              styles.formControl,
              { backgroundColor: theme.colors.background },
            ]}
            value={name}
            onChangeText={setName}
            error={formError.name}
          />
          <MaterialCommunityIcons
            style={styles.fieldIcon}
            name="account"
            size={18}
            color="gray"
          />
          {formError.name && (
            <Text style={styles.errorLabel}>{formError.name}</Text>
          )}
        </View>
        {/* Email Field */}
        <View style={styles.formGroup}>
          <Text
            style={[
              styles.fieldLabel,
              formError.email && styles.errorfieldLabel,
            ]}
          >
            Email address
          </Text>
          <TextInput
            mode="outlined"
            outlineColor="lightgray"
            theme={{ roundness: 10 }}
            style={[
              styles.formControl,
              { backgroundColor: theme.colors.background },
            ]}
            value={email}
            onChangeText={setEmail}
            error={formError.email}
          />
          <MaterialIcons
            style={styles.fieldIcon}
            name="email"
            size={18}
            color="gray"
          />
          {formError.email && (
            <Text style={styles.errorLabel}>{formError.email}</Text>
          )}
        </View>

        {/* Password Field */}
        <View style={styles.formGroup}>
          <Text
            style={[
              styles.fieldLabel,
              formError.password && styles.errorfieldLabel,
            ]}
          >
            Password
          </Text>
          <TextInput
            mode="outlined"
            secureTextEntry={hidePassword}
            outlineColor="lightgray"
            theme={{ roundness: 10 }}
            style={[
              styles.formControl,
              { backgroundColor: theme.colors.background },
            ]}
            value={password}
            onChangeText={setPassword}
            error={formError.password}
          />
          <Feather
            name={hidePassword ? "eye-off" : "eye"}
            size={24}
            style={styles.eye}
            color="gray"
            onPress={handleHidePassword}
          />
          <FontAwesome5
            style={styles.fieldIcon}
            name="key"
            color="gray"
            size={16}
          />
          {formError.password && (
            <Text style={styles.errorLabel}>{formError.password}</Text>
          )}
        </View>

        {/* Confirm Password Field */}
        <View style={styles.formGroup}>
          <Text
            style={[
              styles.fieldLabel,
              formError.confirmPassword && styles.errorfieldLabel,
            ]}
          >
            Confirm Password
          </Text>
          <TextInput
            mode="outlined"
            secureTextEntry={hideConfirmPassword}
            outlineColor="lightgray"
            theme={{ roundness: 10 }}
            style={[
              styles.formControl,
              { backgroundColor: theme.colors.background },
            ]}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            error={formError.confirmPassword}
          />
          <FontAwesome5
            style={styles.fieldIcon}
            name="key"
            color="gray"
            size={16}
          />
          <Feather
            name={hideConfirmPassword ? "eye-off" : "eye"}
            size={24}
            style={styles.eye}
            color="gray"
            onPress={handleConfirmHidePassword}
          />
          {formError.confirmPassword && (
            <Text style={styles.errorLabel}>{formError.confirmPassword}</Text>
          )}
        </View>
        <Button
          loading={isLoading}
          disabled={isLoading}
          theme={{ roundness: 2 }}
          style={{ marginTop: 12 }}
          mode="contained"
          onPress={handleSubmitForm}
        >
          <Text
            style={[
              styles.submitButtonLabel,
              { color: theme.colors.onPrimary },
            ]}
          >
            Create Account
          </Text>
        </Button>
      </View>
      <View style={styles.navLink}>
        <Text style={{ color: theme.colors.secondary }}>
          Already have an account?
        </Text>
        <Button
          rippleColor="white"
          theme={{ roundness: 2 }}
          onPress={() => navigation.dispatch(StackActions.replace("Login"))}
        >
          Login
        </Button>
      </View>

      <Snackbar
        style={styles.snackBar}
        visible={serverError}
        onDismiss={onDismissSnackBarHandler}
      >
        {serverError}
      </Snackbar>
    </View>
  );
}
