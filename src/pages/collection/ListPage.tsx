import React, { useContext, useState } from "react";
import {
  Card,
  GridContainer,
  CircularPositiveButton,
  IconNegativeButton,
  IconNeutralButton,
  ActionButtonContainer,
  AddCollectionModal,
  RemoveCollectionModal,
  EditCollectionModal,
} from "../../components";
import { useHistory } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { FaTrash, FaRegPenToSquare } from "react-icons/fa6";
import {
  Collection,
  CollectionContext,
  CollectionContextType,
} from "../../context";
import { useWindowSize } from "../../hooks";

const ListPage = () => {
  const history = useHistory();
  const [width] = useWindowSize();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [removeCandidate, setRemoveCandidate] = useState<Collection>();
  const [editCandidate, setEditCandidate] = useState<Collection>();

  const { collectionArr } = useContext(
    CollectionContext
  ) as CollectionContextType;

  const onCardClick = (name: string) => {
    return () => {
      history.push(`/collection/${name}`);
    };
  };

  const constructThumbnailURL = (collection: Collection) => {
    if (collection.animeList.length !== 0) {
      return width > 768
        ? collection.animeList[0].image.coverImage.large
        : collection.animeList[0].image.bannerImage
        ? collection.animeList[0].image.bannerImage
        : collection.animeList[0].image.coverImage.large;
    }
    return "https://i.pinimg.com/564x/15/9e/ba/159eba30238c53e841c2608ba7496bb3.jpg";
  };

  return (
    <div>
      <ActionButtonContainer>
        <CircularPositiveButton onClick={() => setShowAddModal(true)}>
          <FaPlus />
        </CircularPositiveButton>
      </ActionButtonContainer>
      <GridContainer>
        {collectionArr.map((elem, idx) => (
          <>
            {" "}
            <Card
              thumbnailURL={constructThumbnailURL(elem)}
              title={elem.name}
              actionButtons={[
                <IconNegativeButton
                  onClick={(event: React.MouseEvent) => {
                    event.stopPropagation();
                    setRemoveCandidate(elem);
                    setShowRemoveModal(true);
                  }}
                >
                  <FaTrash />
                </IconNegativeButton>,
                <IconNeutralButton
                  onClick={(event: React.MouseEvent) => {
                    event.stopPropagation();
                    setEditCandidate(elem);
                    setShowEditModal(true);
                  }}
                >
                  <FaRegPenToSquare />
                </IconNeutralButton>,
              ]}
              onClick={onCardClick(elem.name)}
            />
          </>
        ))}
      </GridContainer>
      <AddCollectionModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
      />
      {removeCandidate && (
        <RemoveCollectionModal
          showRemoveModal={showRemoveModal}
          setShowRemoveModal={setShowRemoveModal}
          collection={removeCandidate}
        />
      )}
      {editCandidate && (
        <EditCollectionModal
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          collection={editCandidate}
        />
      )}
    </div>
  );
};

export default ListPage;
