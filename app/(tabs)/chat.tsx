import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  Platform,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { getGeneralChat, sendMessage } from "@/utils/firestore";
import { IStudent } from "@/interface";
import { readData } from "@/utils/storage";
import moment from "moment";

export default function TabTwoScreen() {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello!", sender: "bot" },
    { id: "2", text: "Hi there!", sender: "user" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<IStudent>();

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const data = {
      message: input,
      sender: userData?.username,
      received: "general",
    };

    const response = await sendMessage(data);
    if (response) {
      setInput("");
    } else {
      Alert.alert("Failed to send message!");
    }
  };

  const renderItem = ({ item }: any) => {
    const isUser = item.sender === userData?.username;
    return (
      <View className={`mb-4 ${isUser ? "items-end" : "items-start"}`}>
        {/* Sender Name */}
        <Text
          className={`text-xs mb-1 ${
            isUser ? "text-blue-500" : "text-gray-500"
          }`}
        >
          {item.sender === userData?.username ? null : item.sender}
        </Text>

        {/* Message Bubble */}
        <View
          className={`rounded-lg px-4 py-2 max-w-[70%] ${
            isUser ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <Text className={`text-sm ${isUser ? "text-white" : "text-black"}`}>
            {item.message}
          </Text>
        </View>

        {/* Time Sent */}
        <Text
          className={`text-[10px] mt-1 ${
            isUser ? "text-blue-400" : "text-gray-400"
          }`}
        >
          {moment(item.createdAt?.toDate()).fromNow()}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    (async () => {
      const getUserData = await readData("userData");
      setUserData(getUserData);

      getGeneralChat(setMessages);
      setLoading(false);
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 py-7 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        {/* Messages */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
          className="flex-1"
        />

        {/* Input */}
        <View className="flex-row items-center p-4 border-t border-gray-200 bg-white">
          <TextInput
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-2"
            placeholder="Type a message..."
            value={input}
            multiline={true}
            onChangeText={setInput}
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            className="bg-blue-500 px-4 py-2 rounded-full"
          >
            <Text className="text-white font-semibold">Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
