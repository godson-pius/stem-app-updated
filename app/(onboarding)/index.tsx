import {
  Button,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useRef } from "react";
import { sliderData } from "@/utils/sliderData";
import SlideItem from "./components/SlideItem";

const Index = () => {
  const data = sliderData;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <SlideItem data={item} />}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator
      bounces={false}
      keyExtractor={(item: any) => item.id}
      viewabilityConfig={viewConfig}
    />
  );
};

export default Index;
