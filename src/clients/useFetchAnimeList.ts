import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const GET_ANIME_LIST = gql`
  query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(id: $id, search: $search) {
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
        }
      }
    }
  }
`;

interface AnimeList {
  Page: {
    pageInfo: {
      total: number;
      currentPage: number;
      lastPage: number;
      hasNextPage: boolean;
      perPage: number;
    };
    media: {
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
      };
    }[];
  };
}

const useFetchAnimeList = () => {
  const [state, setState] = useState({
    limit: 10,
    page: 1,
  });

  const { loading, error, data } = useQuery<AnimeList>(GET_ANIME_LIST, {
    variables: { page: state.page, perPage: state.limit },
  });

  return {
    loading,
    error,
    data,
    setState,
  };
};

export default useFetchAnimeList;
