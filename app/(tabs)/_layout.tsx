import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <>
              <ImageBackground
                source={images.highlight}
                className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden"
              >
                <Image
                  source={icons.home}
                  tintColor={"#151213"}
                  className="size-5"
                />
                <Text className="text-secondary text-base font-semibold ml-2">
                  Home
                </Text>
              </ImageBackground>
            </>
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{ headerShown: false, title: "Search" }}
      />

      <Tabs.Screen
        name="saved"
        options={{ headerShown: false, title: "Saved" }}
      />

      <Tabs.Screen
        name="profile"
        options={{ headerShown: false, title: "Profile" }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
