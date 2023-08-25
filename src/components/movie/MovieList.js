import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import { fetcher } from "../../config";
import useSWR from "swr";
import { v4 } from "uuid";

const itemsPerPage = 20;

// https://api.themoviedb.org/3/movie/550?api_key=10194899031c86a48b5546c52678bad4
// https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1
// https://api.themoviedb.org/3/movie/now_playing?api_key=10194899031c86a48b5546c52678bad4
const MovieList = ({ type = "now_playing" }) => {
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=10194899031c86a48b5546c52678bad4`,
    fetcher
  );
  const isLoading = !data && !error;
  const movies = data?.results || [];
  return (
    <div className="movie-list">
      {isLoading && (
        <>
          <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
            {new Array(itemsPerPage).fill(0).map(() => (
              <SwiperSlide>
                <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
      {!isLoading && (
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {movies.length > 0 &&
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

export default MovieList;
