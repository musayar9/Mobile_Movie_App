import { View, Text, StatusBar, Image, ImageBase } from "react-native";
import React from "react";
import { images } from "@/constants/images";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="flex-1 bg-primary relative">
      {/* <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      /> */}
      <Image source={images.bg} className="w-full absolute z-0" />

      {children}
    </View>
  );
};

export default PageLayout;
