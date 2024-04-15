import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
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

export default function Login({ navigation }) {
  const theme = useTheme();

  const signIn = useStore((state) => state.signIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState({
    name: "",
    email: "",
    password: "",
  });

  /* Handlers */
  const onDismissSnackBarHandler = () => setServerError("");

  const handleHidePassword = () =>
    setHidePassword((prevHidePassword) => !prevHidePassword);

  //check if data in the form are valid
  const isFormValid = () => {
    const EMPTY = "";
    let errorCount = 0;

    setFormError({ email: "", password: "" });

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

    //if error is less than or equal to zero means the form is valid
    return errorCount <= 0;
  };

  const handleSubmitForm = () => {
    if (isFormValid()) login();
  };

  async function login() {
    try {
      setIsLoading(true);

      const url = `${socketAddress}/api/login`;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      };

      const res = await fetch(url, requestOptions);
      const data = await res.json();

      //if login validation failed then display error
      if (!data["success"]) {
        setServerError(data.message);
      }
      //if login validation success then signup then navigate to home page
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
        title="Log In"
        titleSize={26}
        logoSize={75}
        hasStarIcon={true}
      />

      <View style={formStyles.form}>
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
          <FontAwesome5
            style={formStyles.fieldIcon}
            name="key"
            color="gray"
            size={16}
          />
          <Feather
            name={hidePassword ? "eye-off" : "eye"}
            size={24}
            style={formStyles.eye}
            color="gray"
            disabled={isLoading}
            onPress={handleHidePassword}
          />
          {formError.password && (
            <Text style={formStyles.errorLabel}>{formError.password}</Text>
          )}
          <View style={formStyles.forgotPasswordWrapper}>
            <Button
              rippleColor="white"
              theme={{ roundness: 2 }}
              textColor={theme.colors.onSurface}
              onPress={() => console.log("forgot")}
            >
              Forgot Password?
            </Button>
          </View>
        </View>
        <Button
          loading={isLoading}
          disabled={isLoading}
          theme={{ roundness: 2 }}
          mode="contained"
          onPress={handleSubmitForm}
        >
          <Text
            style={[
              formStyles.submitButtonLabel,
              { color: theme.colors.onPrimary },
            ]}
          >
            Login
          </Text>
        </Button>
      </View>
      
      <View style={formStyles.navLink}>
        <Text style={{ color: theme.colors.secondary }}>
          Don’t have an account?
        </Text>
        <Button
          disabled={isLoading}
          rippleColor="white"
          theme={{ roundness: 2 }}
          onPress={() => navigation.dispatch(StackActions.replace("Signup"))}
        >
          Sign up
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
