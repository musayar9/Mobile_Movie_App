import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { useLocalSearchParams } from "expo-router";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movieDetail, loading } = useFetch(() => fetchMovieDetails(id));

  return (
    <PageLayout>
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
          
          
        </View>
      </ScrollView>
    </PageLayout>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
