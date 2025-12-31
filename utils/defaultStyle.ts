import { Platform, StyleSheet } from "react-native";

export const defaultStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    // marginTop: 10,
  },

  button: {
    width: 300,
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#0078ff",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
    fontFamily: "epilogue",
  },

  label: {
    fontWeight: "500",
    color: "#000",
    fontSize: 16,
    fontFamily: "epilogue",
  },

  input: {
    borderColor: "#CCA45C",
    borderBottomWidth: 1,
    width: 300,
    fontSize: 20,
    marginTop: Platform.OS === "ios" ? 10 : 0,
    fontFamily: "epilogue-m",
  },

  select: {
    width: 280,
    borderColor: "#CCA45C",
    borderBottomWidth: 1,
    paddingBottom: 8,
    fontSize: 17,
    fontFamily: "epilogue-m",
  },

  text: {
    fontFamily: "epilogue",
  },

  textmedium: {
    fontFamily: "epilogue-m",
  },

  textbold: {
    fontFamily: "epilogue-b",
  },

  textextrabold: {
    fontFamily: "epilogue-eb",
  },

  searchInput: {
    borderWidth: 2,
    padding: 13,
    borderRadius: 100,
    fontFamily: "epilogue",
  },
});
