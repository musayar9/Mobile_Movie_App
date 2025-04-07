import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";

const MovieCard = ({
  id,
  title,
  poster_path,
  original_title,
  vote_average,
  release_date,
}: Movie) => {
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
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
