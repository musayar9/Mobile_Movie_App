import { Image, ImageBackground, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

import { ImageSourcePropType } from "react-native";

const TabIcon = ({
  icon,
  name,
  focused,
}: {
  icon: ImageSourcePropType | undefined;
  name: string;
  focused: boolean;
}) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
      >
        <Image source={icon} tintColor={"#151213"} className="size-5" />
        <Text className="text-secondary text-base font-semibold ml-2">
          {name}
        </Text>
      </ImageBackground>
    );
  }

  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Image source={icon} tintColor={"#a8b5db"} className="size-5" />
    </View>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          borderRadius: 50,
          marginHorizontal: 15,
          marginBottom: 36,
          position: "absolute",
          overflow: "hidden",
          borderWidth:Platform.OS === "android" ? 0: 1 ,
          borderColor:Platform.OS==="android" ? "" : "#0f0d23",
          height: 52,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name="Home" icon={icons.home} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name="Search" icon={icons.search} />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          title: "Saved",

          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name="Saved" icon={icons.save} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name="Profile" icon={icons.person} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
