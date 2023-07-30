import { gql, useQuery } from "@apollo/client";

const GET_ANIME_DETAIL = gql`
  query ($id: Int) {
    # Define which variables will be used in the query (id)
    Media(id: $id, type: ANIME) {
      # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
      id
      coverImage {
        medium
        large
        extraLarge
        color
      }
      bannerImage
      title {
        romaji
        english
        native
      }
      synonyms
      description
      status
      updatedAt
      genres
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
    }
  }
`;

interface AnimeDetail {
  Media: {
    id: number;
    coverImage: {
      medium: string;
      large: string;
      extraLarge: string;
      color: string;
    };
    bannerImage: string;
    title: {
      romaji: string;
      english: string;
      native: string;
    };
    synonyms: string[];
    description: string;
    status:
      | "FINISHED"
      | "RELEASING"
      | "NOT_YET_RELEASED"
      | "CANCELLED"
      | "HIATUS";
    updatedAt: number;
    genres: string[];
    startDate: {
      year: number | null;
      month: number | null;
      day: number | null;
    };
    endDate: {
      year: number | null;
      month: number | null;
      day: number | null;
    };
  };
}

const useFetchAnimeDetail = (id: number) => {
  const { loading, error, data } = useQuery<AnimeDetail>(GET_ANIME_DETAIL, {
    variables: { id: id },
  });

  return {
    loading,
    error,
    data,
  };
};

export default useFetchAnimeDetail;
