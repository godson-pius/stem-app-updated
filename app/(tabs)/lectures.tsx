import {
  View,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  RefreshControl,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyle } from "@/utils/defaultStyle";
import Topic from "@/components/Topic";
import { ISubject, ITopic } from "@/interface";
import { Link, useLocalSearchParams } from "expo-router";
// @ts-ignore
import { getAllTopicsForACourse } from "@/utils/firestore";
import { SafeAreaView } from 'react-native-safe-area-context'

const Lectures = () => {
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState<boolean>(false)
  const args = useLocalSearchParams();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchTopics();
    } catch (e) {
      Alert.alert("Error fetching topics");
    } finally {
      setRefreshing(false);
    }
  }, []);

  const fetchTopics = async () => {
    setLoading(true)
    if (Object.keys(args).length === 0) {
      return Alert.alert("Info", "Please select subject from home");
    }

    const courseDetails = {
      classname: args.classname,
      name: args.name,
    };
    const res = await getAllTopicsForACourse(courseDetails);
    if (res) {
      setLoading(false)
      setTopics(res);
    } else {
      setLoading(false)
      return null;
    }
  };

  useEffect(() => {
    (async () => {
      await fetchTopics();
    })();
  }, [args.name]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"small"} className={'my-5 text-blue-900'} />
      </View>
    );
  }

  return (
    <SafeAreaView className={"bg-white py-3 h-screen"}>
      <View style={defaultStyle.container}>
        <Text style={[defaultStyle.text, { fontWeight: "bold", fontSize: 20 }]}>
          {args.name}
        </Text>
        <Text
          style={[
            { color: "gray", marginVertical: 5, fontFamily: "epilogue-m" },
          ]}
        >
          {topics.length} Topics
        </Text>

        {/*<TextInput
          style={[
            defaultStyle.searchInput,
            { marginTop: 45, backgroundColor: "#fff" },
          ]}
          placeholder="Search for a lesson or topic"
        />*/}

        {/*<Text
          style={{
            fontFamily: "epilogue-b",
            marginTop: 40,
            fontWeight: "500",
          }}
        >
          Topics
        </Text>*/}

        <View className={"pb-56"}>
          <FlatList
            data={topics}
            renderItem={({ item }) => <Topic course={args.name} topic={item} />}
            contentContainerStyle={{ paddingBottom: 10 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <View className="justify-center items-center min-h-screen">
                <Text className={"font-medium text-xl"}>No Topics yet!</Text>
                <Link href={'/(tabs)'} asChild>
                <TouchableOpacity>
                  <Text className="text-sky-500">Return to home</Text>
                </TouchableOpacity>
                </Link>
              </View>
            }
            style={{ height: "100%" }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Lectures;
