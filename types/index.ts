type Movie = {
  backdrop_path: string;
  genre_ids: Number[];
  id: number;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
};

type Cast = {
  gender: number;
  id: number;
  name: string;
};
