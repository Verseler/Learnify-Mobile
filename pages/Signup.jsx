import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";
import { View } from "react-native";
import {
  Button,
  Text,
  TextInput,
  useTheme,
  Snackbar,
} from "react-native-paper";

import { formStyles } from "../utils/globalStyles";
import useStore from "../hooks/useStore";
import AppBar from "../components/AppBar";
import socketAddress from "../utils/socketAddress";

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

      const url = `${socketAddress}/api/signup`;
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
    <View style={formStyles.container}>
      <AppBar
        style={formStyles.header}
        title="Sign Up"
        titleSize={26}
        logoSize={75}
        hasStarIcon={true}
      />

      <View style={formStyles.form}>
        {/* Name Field */}
        <View style={formStyles.formGroup}>
          <Text
            style={[
              formStyles.fieldLabel,
              formError.name && formStyles.errorfieldLabel,
            ]}
          >
            Name
          </Text>
          <TextInput
            disabled={isLoading}
            mode="outlined"
            outlineColor="lightgray"
            theme={{ roundness: 10 }}
            style={[
              formStyles.formControl,
              { backgroundColor: theme.colors.background },
            ]}
            value={name}
            onChangeText={setName}
            error={formError.name}
          />
          <MaterialCommunityIcons
            style={formStyles.fieldIcon}
            name="account"
            size={18}
            color="gray"
          />
          {formError.name && (
            <Text style={formStyles.errorLabel}>{formError.name}</Text>
          )}
        </View>
        {/* Email Field */}
        <View style={formStyles.formGroup}>
          <Text
            style={[
              formStyles.fieldLabel,
              formError.email && formStyles.errorfieldLabel,
            ]}
          >
            Email address
          </Text>
          <TextInput
            disabled={isLoading}
            mode="outlined"
            outlineColor="lightgray"
            theme={{ roundness: 10 }}
            style={[
              formStyles.formControl,
              { backgroundColor: theme.colors.background },
            ]}
            value={email}
            onChangeText={setEmail}
            error={formError.email}
          />
          <MaterialIcons
            style={formStyles.fieldIcon}
            name="email"
            size={18}
            color="gray"
          />
          {formError.email && (
            <Text style={formStyles.errorLabel}>{formError.email}</Text>
          )}
        </View>

        {/* Password Field */}
        <View style={formStyles.formGroup}>
          <Text
            style={[
              formStyles.fieldLabel,
              formError.password && formStyles.errorfieldLabel,
            ]}
          >
            Password
          </Text>
          <TextInput
            disabled={isLoading}
            mode="outlined"
            secureTextEntry={hidePassword}
            outlineColor="lightgray"
            theme={{ roundness: 10 }}
            style={[
              formStyles.formControl,
              { backgroundColor: theme.colors.background },
            ]}
            value={password}
            onChangeText={setPassword}
            error={formError.password}
          />
          <Feather
            name={hidePassword ? "eye-off" : "eye"}
            size={24}
            style={formStyles.eye}
            color="gray"
            disabled={isLoading}
            onPress={handleHidePassword}
          />
          <FontAwesome5
            style={formStyles.fieldIcon}
            name="key"
            color="gray"
            size={16}
          />
          {formError.password && (
            <Text style={formStyles.errorLabel}>{formError.password}</Text>
          )}
        </View>

        {/* Confirm Password Field */}
        <View style={formStyles.formGroup}>
          <Text
            style={[
              formStyles.fieldLabel,
              formError.confirmPassword && formStyles.errorfieldLabel,
            ]}
          >
            Confirm Password
          </Text>
          <TextInput
            disabled={isLoading}
            mode="outlined"
            secureTextEntry={hideConfirmPassword}
            outlineColor="lightgray"
            theme={{ roundness: 10 }}
            style={[
              formStyles.formControl,
              { backgroundColor: theme.colors.background },
            ]}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            error={formError.confirmPassword}
          />
          <FontAwesome5
            style={formStyles.fieldIcon}
            name="key"
            color="gray"
            size={16}
          />
          <Feather
            name={hideConfirmPassword ? "eye-off" : "eye"}
            size={24}
            style={formStyles.eye}
            color="gray"
            disabled={isLoading}
            onPress={handleConfirmHidePassword}
          />
          {formError.confirmPassword && (
            <Text style={formStyles.errorLabel}>
              {formError.confirmPassword}
            </Text>
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
              formStyles.submitButtonLabel,
              { color: theme.colors.onPrimary },
            ]}
          >
            Create Account
          </Text>
        </Button>
      </View>
      <View style={formStyles.navLink}>
        <Text style={{ color: theme.colors.secondary }}>
          Already have an account?
        </Text>
        <Button
        disabled={isLoading}
          rippleColor="white"
          theme={{ roundness: 2 }}
          onPress={() => navigation.dispatch(StackActions.replace("Login"))}
        >
          Login
        </Button>
      </View>

      {/* Display server error response */}
      <Snackbar
        style={formStyles.snackBar}
        visible={serverError}
        onDismiss={onDismissSnackBarHandler}
      >
        {serverError}
      </Snackbar>
    </View>
  );
}
