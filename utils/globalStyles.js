import { StyleSheet } from "react-native";

const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingVertical: 30,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
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
  snackBar: {
    width: "100%",
    marginHorizontal: 14,
    backgroundColor: "red"
  },
  title: {
    fontWeight: "bold",
  },
  form: {
    rowGap: 16,
  },
  formGroup: {
    rowGap: 5,
  },
  formControl: {
    borderRadius: 20,
    paddingStart: 24
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
  fieldIcon: {
    position: "absolute",
    top: 46,
    left: 14
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
    fontSize: 16,
    fontWeight: "bold"
  },
  navLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: -5,
  },
});


export {formStyles};