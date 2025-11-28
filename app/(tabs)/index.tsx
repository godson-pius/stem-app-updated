import { defaultStyle } from "@/utils/defaultStyle";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import Subjects from "@/components/Subjects";
import { IStudent, ISubject } from "@/interface";
import { getAllCourse } from "@/utils/firestore";
import { clearStorage, readData } from "@/utils/storage";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function HomeScreen() {
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [userData, setUserData] = useState<IStudent>();
  const [refreshing, setRefreshing] = React.useState(false);
  const params = useLocalSearchParams();
  const navigation = useRouter();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await getCourse();
    } catch (e) {
      Alert.alert("Error fetching topics");
    } finally {
      setRefreshing(false);
    }
  }, []);

  const getCourse = async () => {
    const args = {
      classname: params.studentClass.toString().toLowerCase(),
    };
    const res = await getAllCourse(args);
    setSubjects(res);
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          await clearStorage();
          navigation.replace("/(auth)");
        },
      },
    ]);
  };

  useEffect(() => {
    (async () => {
      await getCourse();
      const getUserData = await readData("userData");
      setUserData(getUserData);
    })();
  }, []);

  return (
    <SafeAreaView className={"bg-white py-7 h-screen"}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={[styles.container]}>
          <Text
            style={[defaultStyle.text, styles.greeting]}
            className={"font-medium"}
          >
            Welcome back, {userData?.fullname}
          </Text>
          {/*<Text style={defaultStyle.text}>{userData?.studentClass.toUpperCase()}</Text>*/}
          <Ionicons
            name="log-out-outline"
            size={25}
            color={"red"}
            onPress={handleLogout}
          />
        </View>

        {/* Search */}
        <TextInput
          placeholder="What would you like to learn"
          style={styles.searchInput}
        />

        {/* Subjects */}
        <View style={styles.subjects}>
          {subjects.map((subject, index) => (
            <Subjects key={index} subject={subject} />
          ))}
        </View>

        {/* Banner for practice exams */}
        {/*<View style={{borderRadius: 30}}>*/}
        {/*    <ImageBackground*/}
        {/*        source={{uri: 'https://img.freepik.com/premium-photo/stepping-into-success-school-books-accessories-graduation-vibes-light-blue-3d-rendering_930407-5388.jpg?w=2000'}}*/}
        {/*        resizeMode='cover' style={styles.practiceContainer}>*/}
        {/*        <View style={styles.practice}>*/}
        {/*            <Text style={[defaultStyle.text, styles.text]}>Practice exams for perfect grades. Practice*/}
        {/*                makes perfect!</Text>*/}
        {/*            <TouchableOpacity style={styles.practiceBtn}>*/}
        {/*                <Text style={{fontFamily: 'epilogue-m'}}>Practice Exams</Text>*/}
        {/*            </TouchableOpacity>*/}
        {/*        </View>*/}
        {/*        /!* <Ionicons name='calendar-outline' size={80} style={{ marginLeft: -70 }} /> *!/*/}
        {/*    </ImageBackground>*/}
        {/*</View>*/}

        {/* Banner for practice exams */}
        {/*<View style={{borderRadius: 30}}>*/}
        {/*    <ImageBackground*/}
        {/*        source={{uri: 'https://img.freepik.com/premium-photo/stepping-into-success-school-books-accessories-graduation-vibes-light-blue-3d-rendering_930407-5388.jpg?w=2000'}}*/}
        {/*        resizeMode='cover' style={styles.practiceContainer}>*/}
        {/*        <View style={styles.practice}>*/}
        {/*            <Text style={[defaultStyle.text, styles.text]}>Take quiz for perfection. Practice makes*/}
        {/*                perfect!</Text>*/}
        {/*            <TouchableOpacity style={styles.practiceBtn}>*/}
        {/*                <Text style={{fontFamily: 'epilogue-m'}}>Take Quiz</Text>*/}
        {/*            </TouchableOpacity>*/}
        {/*        </View>*/}
        {/*        /!* <Ionicons name='calendar-outline' size={80} style={{ marginLeft: -70 }} /> *!/*/}
        {/*    </ImageBackground>*/}
        {/*</View>*/}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  greeting: {
    fontSize: 20,
  },

  searchInput: {
    borderWidth: 2,
    marginHorizontal: 25,
    marginTop: 20,
    padding: 13,
    borderRadius: 100,
    borderColor: "gray",
    fontFamily: "epilogue",
  },

  subjects: {
    marginTop: 20,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  practiceContainer: {
    borderRadius: 12,
    backgroundColor: "skyblue",
    flexDirection: "row",
    marginHorizontal: 25,
    marginTop: 30,
    padding: 20,
    height: 160,
    justifyContent: "space-between",
    alignItems: "center",
  },

  practice: {
    width: 200,
    // marginLeft: 30,
  },

  practiceBtn: {
    backgroundColor: "#fff",
    width: 150,
    padding: 14,
    borderRadius: 6,
    // position: 'absolute',
    // bottom: 0,
    marginTop: 13,
    alignItems: "center",
  },

  text: {
    fontSize: 15,
    fontFamily: "epilogue-m",
    color: "#000",
  },
});
