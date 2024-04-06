import { StyleSheet } from "react-native";

const formStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 30,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 16,
    marginBottom: 50,
  },
  logo: {
    height: 75,
    width: 75,
    objectFit: "contain",
  },
  star: {
    position: "absolute",
    height: 60,
    width: 60,
    right: 0,
    top: -24,
  },
  title: {
    fontWeight: "bold",
  },
  form: {
    rowGap: 14,
  },
  formGroup: {
    rowGap: 5,
  },
  formControl: {
    borderRadius: 20,
  },
  fieldLabel: {
    marginLeft: 6,
  },
  errorfieldLabel: {
    color: "firebrick"
  },
  errorLabel: {
    color: "firebrick",
    marginLeft: 6,
    fontSize: 12,
  },
  eye: {
    position: "absolute",
    top: 42,
    right: 15,
  },
  forgotPasswordWrapper: {
    alignSelf: "flex-end",
  },
  submitButtonLabel: {
    padding: 5,
    fontSize: 18,
  },
  navLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: -5,
  },
});


export {formStyles};