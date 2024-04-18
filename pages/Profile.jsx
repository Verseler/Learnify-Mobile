import { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Button, Avatar, useTheme, Snackbar, List } from "react-native-paper";

import { getSecureStore } from "../utils/SecureStore";
import useStore from "../hooks/useStore";
import AppBar from "../components/AppBar";
import { formStyles } from "../utils/globalStyles";
import {
  TextFormField,
  PasswordFormField,
  SubmitButton,
} from "../components/FormField";

export default function Profile() {
  const signOut = useStore((state) => state.signOut);
  const userToken = getSecureStore("userToken");
  const theme = useTheme();
  console.log(userToken)

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
    if (isFormValid()) editProfile();
  };

  async function editProfile() {
    try {
      setIsLoading(true);

      const url = `${socketAddress}/api/`;
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
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppBar hasProfileAvatar={true} title="Learnify" />

      <ScrollView style={styles.content}>
        <View style={styles.profile}>
          <Avatar.Image
            size={90}
            style={{ backgroundColor: "white" }}
            source={{
              uri: "https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png",
            }}
          />
        </View>

        <View style={[formStyles.form, { marginVertical: 20 }]}>
          <TextFormField
            label="Name"
            value={name}
            setValue={setName}
            formError={formError.name}
            icon="account"
            isLoading={isLoading}
          />
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

          <PasswordFormField
            label="Confirm Password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            formError={formError.confirmPassword}
            icon="key"
            hidePassword={hideConfirmPassword}
            handleHidePassword={handleConfirmHidePassword}
            isLoading={isLoading}
          />

          <SubmitButton
            isLoading={isLoading}
            handleSubmitForm={handleSubmitForm}
            label="Save"
          />

          {/* Display server error response */}
          <Snackbar
            style={formStyles.snackBar}
            visible={serverError}
            onDismiss={onDismissSnackBarHandler}
          >
            {serverError}
          </Snackbar>
        </View>

        <View style={styles.footer}>
          <Button
            rippleColor="tomato"
            theme={{ roundness: 2 }}
            style={{ marginTop: 12, borderColor: "firebrick" }}
            mode="outlined"
            onPress={signOut}
          >
            <Text
              style={[formStyles.submitButtonLabel, { color: "firebrick" }]}
            >
              Signout
            </Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 14,
  },
  logo: {
    marginEnd: 10,
    objectFit: "contain",
    height: 40,
    width: 40,
  },
  profile: {
    alignItems: "center",
  },
  footer: {
    marginTop: 50,
    marginBottom: 30,
  },
});
