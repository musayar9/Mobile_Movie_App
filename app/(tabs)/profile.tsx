import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import PageLayout from "@/components/PageLayout";
import { icons } from "@/constants/icons";

const Profile = () => {
  return (
    <PageLayout>
      <View className="flex items-center justify-center flex-1 flex-col">
        <Image
          source={icons.person}
          className="size-14"
          tintColor={"#fff"}
          resizeMode="cover"
        />
        <Text className="text-gray-500 text-base">Profile</Text>
      </View>
    </PageLayout>
  );
};

export default Profile;

const styles = StyleSheet.create({});
