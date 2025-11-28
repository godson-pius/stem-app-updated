import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { defaultStyle } from "@/utils/defaultStyle";
import { loginUser } from "@/utils/firestore";
import { readData, storeData } from "@/utils/storage";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const Index = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [launch, setLaunch] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const navigation = useRouter();

  // Handle the login submit
  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      email,
      password,
    };
    const res = await loginUser(data);
    if (res) {
      console.log(res);
      setLoading(false);

      await storeData("userData", res);
      return navigation.navigate({
        pathname: "/(tabs)",
        params: { studentClass: res.studentClass },
      });
    }
    Alert.alert("Auth Failed! Try again!");
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      setLaunch(true);
      const userData = await readData("userData");
      if (userData) {
        return navigation.navigate({
          pathname: "/(tabs)",
          params: { studentClass: userData.studentClass },
        });
      }
      setLaunch(false);
    })();
  }, []);

  if (launch) {
    return (
      <View className={"flex justify-center items-center"}>
        <ActivityIndicator size={"small"} className={"my-5 text-blue-900"} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView className={"h-screen"}>
        <View style={styles.container} className={"h-screen"}>
          <View className="bg-blue-500 rounded-full flex justify-center items-center w-40 h-40 my-10">
            <Image
              style={styles.image}
              source={require("@/assets/images/logo.png")}
            />
          </View>
          <Text style={[defaultStyle.text, styles.title]}>Start Learning</Text>
          <Text style={defaultStyle.text}>Geanco STEM</Text>

          <View style={{ marginTop: 30 }}>
            <Text style={[defaultStyle.label]}>Enter email</Text>
            <TextInput
              autoCapitalize="none"
              keyboardType={"email-address"}
              textContentType={"emailAddress"}
              autoCorrect={false}
              style={defaultStyle.input}
              onChangeText={(value: string) => setEmail(value)}
            />
          </View>

          <View style={{ marginTop: 30, marginBottom: 40 }}>
            <Text style={[defaultStyle.label]}>Enter password</Text>
            <View className={"flex-row items-center"} style={{ width: 300 }}>
              <TextInput
                secureTextEntry={hidePassword}
                autoCapitalize="none"
                autoCorrect={false}
                style={defaultStyle.input}
                onChangeText={(value: string) => setPassword(value)}
              />
              <Ionicons
                name={hidePassword ? "eye" : "eye-off"}
                onPress={() => setHidePassword(!hidePassword)}
                size={16}
              />
            </View>
          </View>

          {!loading ? (
            <>
              <TouchableOpacity
                style={defaultStyle.button}
                onPress={handleSubmit}
              >
                <Text style={defaultStyle.buttonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={"font-medium mt-3"}
                onPress={() => navigation.push("/register")}
              >
                <Text>Not registered? Register</Text>
              </TouchableOpacity>
            </>
          ) : null}

          {loading ? (
            <ActivityIndicator
              size={"small"}
              className={"my-5 text-blue-900"}
            />
          ) : null}

          <Text style={[defaultStyle.text, { marginTop: 30, color: "gray" }]}>
            Secured by GeancoStem
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    height: Dimensions.get("window").height,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ededee",
  },

  image: {
    width: 100,
    height: 100,
    marginTop: -10,
  },

  title: {
    fontSize: 24,
    marginTop: -30,
    fontWeight: "500",
  },
});
