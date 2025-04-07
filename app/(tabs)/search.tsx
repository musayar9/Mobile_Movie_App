import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import PageLayout from "@/components/PageLayout";
import MovieCard from "@/components/MovieCard";
import { useRouter } from "expo-router";
import { fetchPopularMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { updateSearchCount } from "@/services/appwrite";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovie,
    reset,
  } = useFetch(() => fetchPopularMovies({ query: searchQuery }), false);

  useEffect(() => {
    // const func = async () => {
    //   if (searchQuery.trim()) {
    //     await loadMovie();
    //   } else {
    //     reset();
    //   }
    // };
    // func();
    /**Burada search alanında setTİmeout kullanıyoruz search bar için aranan kelimeyi girmeyi bitirdiğimizdem 500 milisayniye sonra arama işlemi gerçeklşecevek */

    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovie();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    if (movies?.length > 0 && movies?.[0]) {
       updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies]);

  return (
    <PageLayout>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        className="px-5"
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEnabled={true}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search Movies"
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size={"large"}
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-white text-xl font-bold">
                Search Resutls for
                <Text className="text-accent"> {searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </PageLayout>
  );
};

export default Search;

const styles = StyleSheet.create({});
