import AsyncStorage from "@react-native-async-storage/async-storage";
export const savedMovie = async (saved) => {
  try {
    const savedMoviesString = await AsyncStorage.getItem("savedMovie");
    const savedMovies = savedMoviesString ? JSON.parse(savedMoviesString) : [];
    const isMovieSaved = savedMovies.some((movie) => movie.id === saved.id);
    if (isMovieSaved) {
      const filteredMovies = savedMovies.filter(
        (movie) => movie.id !== saved.id
      );
      await AsyncStorage.setItem("savedMovie", JSON.stringify(filteredMovies));
    } else {
      savedMovies.push(saved);
      await AsyncStorage.setItem("savedMovie", JSON.stringify(savedMovies));
    }
  } catch (error) {
    console.log("Error Saving movie", error);
  }
};
