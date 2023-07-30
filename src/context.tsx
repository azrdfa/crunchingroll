import React, { createContext, useState, useEffect } from "react";

export type Anime = {
  id: number;
  title: string;
  image: {
    coverImage: {
      medium: string;
      large: string;
      extraLarge: string;
      color: string;
    };
    bannerImage: string;
  };
};

export type Collection = {
  name: string;
  animeList: Anime[];
};

export type Combination = { collectionName: string; animeArr: Anime[] };

export type CollectionContextType = {
  collectionArr: Collection[];
  addCollection: (collectionArr: Collection) => void;
  removeCollection: (name: string) => void;
  editCollection: (name: string, newName: string) => void;
  saveBulkAnime: (combinationArr: Combination[]) => void;
  addFirstCollection: (collectionName: string, animeArr: Anime[]) => void;
  removeAnime: (collectionName: string, animeId: number) => void;
  getAnimeCollection: (animeId: number) => Collection[];
};

export const CollectionContext = createContext<CollectionContextType | null>(
  null
);

type CollectionProviderProps = {
  children: React.ReactNode;
};

const CollectionProvider = (props: CollectionProviderProps) => {
  const [collectionArr, setCollectionArr] = useState<Collection[]>(() => {
    const storedCollection = localStorage.getItem("collectionArr");
    return storedCollection ? JSON.parse(storedCollection) : [];
  });

  useEffect(() => {
    localStorage.setItem("collectionArr", JSON.stringify(collectionArr));
  }, [collectionArr]);

  const addCollection = (collection: Collection) => {
    setCollectionArr([...collectionArr, collection]);
  };

  const removeCollection = (name: string) => {
    setCollectionArr(collectionArr.filter((elem) => elem.name !== name));
  };

  const editCollection = (name: string, newName: string) => {
    const targetIdx = collectionArr.findIndex((elem) => elem.name === name);
    collectionArr[targetIdx].name = newName;
    setCollectionArr([...collectionArr]);
  };

  const saveBulkAnime = (combinationArr: Combination[]) => {
    combinationArr.forEach((combination) => {
      const targetIdx = collectionArr.findIndex(
        (elem) => elem.name === combination.collectionName
      );
      collectionArr[targetIdx].animeList = collectionArr[
        targetIdx
      ].animeList.concat(combination.animeArr);
    });
    setCollectionArr([...collectionArr]);
  };

  const addFirstCollection = (collectionName: string, animeArr: Anime[]) => {
    const newCollection: Collection = {
      name: collectionName,
      animeList: animeArr,
    };
    setCollectionArr([...collectionArr, newCollection]);
  };

  const removeAnime = (collectionName: string, animeId: number) => {
    const targetIdx = collectionArr.findIndex(
      (elem) => elem.name === collectionName
    );
    const target2Idx = collectionArr[targetIdx].animeList.findIndex(
      (elem) => elem.id === animeId
    );
    collectionArr[targetIdx].animeList = collectionArr[
      targetIdx
    ].animeList.filter((_elem, idx) => idx !== target2Idx);
    setCollectionArr([...collectionArr]);
  };

  const getAnimeCollection = (animeId: number) => {
    const result: Collection[] = [];
    collectionArr.forEach((elem) => {
      const isExists =
        elem.animeList.findIndex((elem2) => elem2.id === animeId) >= 0;
      if (isExists) {
        result.push(elem);
      }
    });
    return result;
  };

  return (
    <CollectionContext.Provider
      value={{
        collectionArr: collectionArr,
        addCollection: addCollection,
        removeCollection: removeCollection,
        editCollection: editCollection,
        saveBulkAnime: saveBulkAnime,
        addFirstCollection: addFirstCollection,
        removeAnime: removeAnime,
        getAnimeCollection: getAnimeCollection,
      }}
    >
      {props.children}
    </CollectionContext.Provider>
  );
};

export default CollectionProvider;
