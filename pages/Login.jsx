import { useState } from "react";
import { StackActions } from "@react-navigation/native";
import { View } from "react-native";
import { Button, Text, useTheme, Snackbar } from "react-native-paper";

import { formStyles } from "../utils/globalStyles";
import useStore from "../hooks/useStore";
import AppBar from "../components/AppBar";
import socketAddress from "../utils/socketAddress";
import {
  TextFormField,
  PasswordFormField,
  SubmitButton,
} from "../components/FormField";

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
        <TextFormField
          label="Email"
          value={email}
          setValue={setEmail}
          formError={formError.email}
          icon="email"
          isLoading={isLoading}
        />

        <PasswordFormField
          label="Password"
          value={password}
          setValue={setPassword}
          formError={formError.password}
          icon="key"
          hidePassword={hidePassword}
          handleHidePassword={handleHidePassword}
          isLoading={isLoading}
        />

        <SubmitButton
          isLoading={isLoading}
          handleSubmitForm={() => signIn("123")}
          label="Login"
        />
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
