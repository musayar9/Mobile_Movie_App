import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { savedMovie } from "@/services/locaeStorage";

const MovieCard = ({
  id,
  title,
  poster_path,
  original_title,
  vote_average,
  release_date,
}: Movie) => {
  const [save, setSave] = useState([]);

  useEffect(() => {
    const getSavedMovies = async () => {
      const data = await AsyncStorage.getItem("savedMovie");
      const movies = data ? JSON.parse(data) : [];
      setSave(movies);
    };
    getSavedMovies();
  }, []);

  const handleSaveMovie = async ({
    id,
    title,
    poster_path,
    original_title,
    vote_average,
    release_date,
  }: Movie) => {
    const saved = {
      id,
      title,
      poster_path,
      original_title,
      vote_average,
      release_date,
    };
    await savedMovie(saved);
    const data = await AsyncStorage.getItem("savedMovie");
    const movies = data ? JSON.parse(data) : [];
    setSave(movies);
  };

  return (
    <Link
      asChild
      href={{
        pathname: "/movies/[id]",
        params: { id: id },
      }}
    >
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center justify-center gap-x-1 absolute bottom-10 right-2 border border-white h-10 w-10 rounded-full  bg-[rgba(0,0,0,0.3)]">
          <Image className="size-3" source={icons.star} />
          <Text className="text-white text-xs font-bold">
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        <View className="flex-row items-center justify-between  absolute top-0  bg-[rgba(0,0,0,0.8)] w-full  p-1 rounded-t-lg">
          <Text className="text-xs text-white font-medium  pl-2">
            {release_date?.split("-")[0]}
          </Text>
          <Text className="text-xs font-medium text-light-300 uppercase"></Text>
        </View>

        <View className="absolute top-8 right-2  bg-[rgba(0,0,0,0.8)] p-1 rounded-md w-10 h-10 items-center justify-center">
          <TouchableOpacity
            onPress={() =>
              handleSaveMovie({
                id,
                title,
                poster_path,
                original_title,
                vote_average,
                release_date,
              })
            }
          >
            {save && save.some((item) => item.id === id) ? (
              <Ionicons name="bookmark" color="#005588" size={20} />
            ) : (
              <Ionicons name="bookmark" color="#fff" size={20} />
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
