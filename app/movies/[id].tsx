import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { icons } from "@/constants/icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { transform } from "@babel/core";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

interface MovieInfoProps {
  label: string;
  value: string;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className="flex-col items-start- justify-center mt-5">
      <Text className="text-light-200 text-sm ">{label}</Text>
      <Text className="text-light-100 font-bold leading-1 my-2">{value}</Text>
    </View>
  );
};

const MovieDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { data: movieDetail, loading } = useFetch(() => fetchMovieDetails(id));
  console.log(movieDetail?.budget / 1_000_000);
  return (
    <PageLayout>
      <Pressable
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        })}
        onPress={() => router.back()}
        className=" absolute  top-12 left-5 z-10 bg-[rgba(146,142,142,0.5)] border border-white rounded-full p-2 shadow-md hover:scale-110"
      >
        <Ionicons name="arrow-back" size={24} color={"white"} />
      </Pressable>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}`,
          }}
          className="w-full h-[550px] object-center "
          resizeMode="stretch"
        />

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">
            {movieDetail?.title}
          </Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-300 ">
              {movieDetail?.release_date.split("-")[0]}
            </Text>
            <Text className="text-gray-400 text-xs">|</Text>
            <Text className="text-light-300">{movieDetail?.runtime} min</Text>
          </View>

          <View className="flex-row items-center gap-x-1 mt-2 py-1 px-2 bg-dark-100 rounded-md">
            <Image source={icons.star} className="size-4" />
            <Text className="text-sm font-bold text-white">
              {movieDetail?.vote_average ?? 0}/10
            </Text>
            <Text className="text-light-200">
              ({movieDetail?.vote_count} votess)
            </Text>
          </View>
          <MovieInfo label={"Overview"} value={movieDetail?.overview} />
          <MovieInfo
            label={"Genres"}
            value={movieDetail?.genres.map((g) => g.name).join(" - ") || "N/A"}
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${movieDetail?.budget / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$ ${Math.round(movieDetail?.revenue / 1_000_000)}`}
            />
          </View>

          <MovieInfo
            label="Production"
            value={
              movieDetail?.production_companies
                .map((p) => p.name)
                .join(" - ") || "N/A"
            }
          />
        </View>
      </ScrollView>
    </PageLayout>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
