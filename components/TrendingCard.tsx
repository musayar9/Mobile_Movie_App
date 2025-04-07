import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "@/constants/images";
interface TrendingCardProps {
  movie_id: number;
  count: number;
  title: string;
  poster_url: string;
}

const TrendingCard = ({ movie }: TrendingCardProps) => {
  return (
    <Link
      asChild
      href={{
        pathname: "/movies/[id]",
        params: { id: movie?.movie_id },
      }}
    >
      <TouchableOpacity className="w-32 relative mx-3">
        <View className="w-[100%] h-52 rounded-md overflow-hidden relative">
          <Image
            source={{ uri: movie?.poster_url }}
            className="w-full h-full "
            resizeMode="cover"
          />
          {/* Siyah opak kat */}
          {/* <View className="absolute inset-0 bg-[rgba(42,42,43,0.5)]" /> */}
        </View>

        <Text className="text-light-200 mt-2 font-bold text-wrap text-sm" numberOfLines={1}>
          {movie?.title}
        </Text>

        <View className="absolute bottom-8 shadow shadow-slate-500 -left-4  rounded-full">
          <MaskedView
            maskElement={
              <Text className="text-white font-bold text-8xl">
                {movie.count}
              </Text>
            }
          >
            <Image source={images.rankingGradient} className="size-24" resizeMode="cover"/>
          </MaskedView>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;

const styles = StyleSheet.create({});
