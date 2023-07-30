import {
  Card,
  Loader,
  Pagination,
  GridContainer,
  LoaderContainer,
  PaginationContainer,
  ActionButtonContainer,
  CircularPositiveButton,
  IconPositiveButton,
  AddFirstCollection,
  SaveBulkModal,
} from "../../components";
import { useHistory } from "react-router-dom";
import { useFetchAnimeList } from "../../clients";
import { FaBookmark, FaSave } from "react-icons/fa";
import { useWindowSize } from "../../hooks";
import { useContext, useState } from "react";
import { Anime, CollectionContext, CollectionContextType } from "../../context";

const ListPage = () => {
  const history = useHistory();
  const [width] = useWindowSize();

  const [showAddFirstCollectionModal, setShowAddFirstCollectionModal] =
    useState(false);
  const [showSaveBulkModal, setShowSaveBulkModal] = useState(false);
  const [selectedAnimeArr, setSelectedAnimeArr] = useState<Anime[]>([]);

  const { collectionArr } = useContext(
    CollectionContext
  ) as CollectionContextType;

  const {
    setState: setFetchAnimeListVar,
    loading: isLoading,
    data,
  } = useFetchAnimeList();

  const onCardClick = (id: number) => {
    return () => {
      history.push(`/anime/${id}`);
    };
  };

  const resetSelectedAnimeArr = () => setSelectedAnimeArr([]);

  return (
    <>
      <ActionButtonContainer>
        <CircularPositiveButton
          disabled={selectedAnimeArr.length === 0}
          onClick={() => {
            if (collectionArr.length === 0) {
              setShowAddFirstCollectionModal(true);
            } else {
              setShowSaveBulkModal(true);
            }
          }}
        >
          <FaSave />
        </CircularPositiveButton>
      </ActionButtonContainer>
      {!isLoading && data ? (
        <>
          <GridContainer>
            {data.Page.media.map((elem) => (
              <Card
                thumbnailURL={
                  width > 768
                    ? elem.coverImage.large
                    : elem.bannerImage
                    ? elem.bannerImage
                    : elem.coverImage.large
                }
                title={elem.title.romaji}
                onClick={onCardClick(elem.id)}
                dominantColor={elem.coverImage.color}
                actionButtons={[
                  <IconPositiveButton
                    onClick={(event: React.MouseEvent) => {
                      event.stopPropagation();
                      const isExist = selectedAnimeArr.find(
                        (anime) => anime.id === elem.id
                      );
                      if (isExist) {
                        const filteredArr = selectedAnimeArr.filter(
                          (anime) => anime.id !== elem.id
                        );
                        setSelectedAnimeArr([...filteredArr]);
                      } else {
                        const newAnime: Anime = {
                          id: elem.id,
                          title: elem.title.romaji,
                          image: {
                            coverImage: elem.coverImage,
                            bannerImage: elem.bannerImage,
                          },
                        };
                        setSelectedAnimeArr([...selectedAnimeArr, newAnime]);
                      }
                    }}
                  >
                    <FaBookmark />
                  </IconPositiveButton>,
                ]}
                selected={Boolean(
                  selectedAnimeArr.find((anime) => anime.id === elem.id)
                )}
              />
            ))}
          </GridContainer>
          <PaginationContainer>
            <Pagination
              currPage={data.Page.pageInfo.currentPage}
              lastPage={data.Page.pageInfo.lastPage}
              setPagination={setFetchAnimeListVar}
            />
          </PaginationContainer>
        </>
      ) : (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
      {showAddFirstCollectionModal && (
        <AddFirstCollection
          showAddFirstCollectionModal={showAddFirstCollectionModal}
          setShowAddFirstCollectionModal={setShowAddFirstCollectionModal}
          animeArr={selectedAnimeArr}
          successCallback={resetSelectedAnimeArr}
        />
      )}
      {showSaveBulkModal && (
        <SaveBulkModal
          showSaveBulkModal={showSaveBulkModal}
          setShowSaveBulkModal={setShowSaveBulkModal}
          animeArr={selectedAnimeArr}
          successCallback={resetSelectedAnimeArr}
          multipleCheck={false}
        />
      )}
    </>
  );
};

export default ListPage;
