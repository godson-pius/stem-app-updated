import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyle } from "@/utils/defaultStyle";
import { useRouter } from "expo-router";

interface SubjectProps {
  subject: { color: string; name: string; classname: string };
}

const Subjects = ({ subject }: SubjectProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/lectures",
          params: { name: subject.name, classname: subject.classname },
        })
      }
      style={styles.container}
    >
      {/* subject */}
      <View
        style={[
          styles.subjectIcon,
          { backgroundColor: subject.color ? subject.color : "purple" },
        ]}
      >
        <Ionicons name="book-outline" color={"white"} size={28} />
      </View>
      <Text style={[defaultStyle.text, { marginTop: 6, fontSize: 15 }]}>
        {subject.name}
      </Text>
    </TouchableOpacity>
  );
};

export default Subjects;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
    width: 100,
  },

  subjectIcon: {
    width: 62,
    height: 62,
    borderRadius: 100,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    elevation: 5,
  },
});
