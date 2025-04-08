import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { icons } from "@/constants/icons";
import PageLayout from "@/components/PageLayout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MovieCard from "@/components/MovieCard";

const Saved = () => {
  const [save, setSave] = useState([]);

  useEffect(() => {
    const getSavedMovies = async () => {
      const data = await AsyncStorage.getItem("savedMovie");
      const movies = data ? JSON.parse(data) : [];
      setSave(movies);
    };
    getSavedMovies();
  }, []);

  if (save.length === 0) {
    return (
      <View className="flex items-center justify-center flex-1 flex-col">
        <Image
          source={icons.save}
          className="size-14"
          tintColor={"#fff"}
          resizeMode="cover"
        />
        <Text className="text-gray-500 text-base">Saved</Text>
      </View>
    );
  }

  return (
    <PageLayout>
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        <View>
          <Text className="text-white font-bold text-xl ">Favorite Movies</Text>

          {save.length > 0 && (
            <FlatList
              data={save}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <MovieCard {...item} />}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>
    </PageLayout>
  );
};

export default Saved;

const styles = StyleSheet.create({});
