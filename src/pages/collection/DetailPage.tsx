import { useContext, useState } from "react";
import {
  Card,
  GridContainer,
  ActionButtonContainer,
  CircularPositiveButton,
  IconNegativeButton,
  EditCollectionModal,
  RemoveAnimeModal,
  Title,
  LargeSpacerTop,
} from "../../components";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";
import { Anime, CollectionContext, CollectionContextType } from "../../context";
import { useWindowSize } from "../../hooks";

type TParams = { name: string };

const DetailPage = ({ match }: RouteComponentProps<TParams>) => {
  const history = useHistory();
  const [width] = useWindowSize();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedAnimeId, setSelectedAnimeId] = useState<Anime>();

  const { collectionArr } = useContext(
    CollectionContext
  ) as CollectionContextType;

  const onCardClick = (id: number) => {
    return () => {
      history.push(`/anime/${id}`);
    };
  };

  const collection = collectionArr.find(
    (elem) => elem.name === match.params.name
  );

  if (collection) {
    return (
      <>
        <Title>Collection - {collection.name}</Title>
        <ActionButtonContainer>
          <CircularPositiveButton
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              setShowEditModal(true);
            }}
          >
            <FaRegPenToSquare />
          </CircularPositiveButton>
        </ActionButtonContainer>
        <LargeSpacerTop>
          <GridContainer>
            {collection.animeList.map((elem, idx) => (
              <Card
                thumbnailURL={
                  width > 768
                    ? elem.image.coverImage.large
                    : elem.image.bannerImage
                    ? elem.image.bannerImage
                    : elem.image.coverImage.large
                }
                title={elem.title}
                actionButtons={[
                  <IconNegativeButton
                    onClick={(event: React.MouseEvent) => {
                      event.stopPropagation();
                      setShowRemoveModal(true);
                      setSelectedAnimeId(elem);
                    }}
                  >
                    <FaTrash />
                  </IconNegativeButton>,
                ]}
                onClick={onCardClick(elem.id)}
              />
            ))}
          </GridContainer>
        </LargeSpacerTop>

        {showRemoveModal && selectedAnimeId && (
          <RemoveAnimeModal
            showRemoveAnimeModal={showRemoveModal}
            setShowRemoveAnimeModal={setShowRemoveModal}
            collection={collection}
            anime={selectedAnimeId}
          />
        )}
        {showEditModal && (
          <EditCollectionModal
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            collection={collection}
          />
        )}
      </>
    );
  }
  return <></>;
};

export default DetailPage;
