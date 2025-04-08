/**
 * 
 * const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MGQxY2M2OThhNmM3YmNiYzdkOTdkYjI2N2JjNGNhMCIsIm5iZiI6MTY3MTU0Nzg2OS4zOTM5OTk4LCJzdWIiOiI2M2ExY2JkZDM3M2FjMjAwN2JmYzg3MjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.MqhnKbdna3ATH4z2ZL8CxunP7Z52FrZAd99P3VpFwoo'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));
 */

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchPopularMovies = async ({ query }: { query: string }) => {
  try {
    const endpoint = query
      ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
          query
        )}`
      : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response?.statusText}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log("errorValue", error);
    return error;
  }
};

export const fetchMovieDetails = async (
  movieId: number
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      { method: "GET", headers: TMDB_CONFIG.headers }
    );

    if (!response.ok) throw new Error("Failed to fetch movie details");
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("erroValue", error);
    throw error;
  }
};
