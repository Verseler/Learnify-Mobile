import { useState } from "react";
import { View, Image } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { Feather } from "@expo/vector-icons";

import { formStyles as styles } from "../utils/globalStyles";

export default function Signup() {
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [formError, setFormError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

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
    if (isFormValid()) {
      console.log("login success");
    } else {
      console.log("login failed");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/Icons/Logo.png")}
        />
        <Text variant="headlineSmall" style={styles.title}>
          Signup
        </Text>
        <Image
          style={styles.star}
          source={require("../assets/Icons/star.png")}
        />
      </View>

      <View style={styles.form}>
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
          {formError.email && (
            <Text style={styles.errorLabel}>{formError.email}</Text>
          )}
        </View>

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
          {formError.password && (
            <Text style={styles.errorLabel}>{formError.password}</Text>
          )}
        </View>

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
            Sign up
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
          onPress={() => console.log("Pressed")}
        >
          Login
        </Button>
      </View>
    </View>
  );
}
