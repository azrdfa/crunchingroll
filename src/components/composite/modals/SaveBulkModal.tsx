import React, { useContext } from "react";
import { useCollectionItemInput } from "../../../hooks";
import {
  MediumSpacerTop,
  Modal,
  NegativeButton,
  NormalText,
  PositiveButton,
} from "../../basic";
import {
  CollectionContext,
  CollectionContextType,
  Anime,
  Combination,
} from "../../../context";

type SaveBulkModalProps = {
  showSaveBulkModal: boolean;
  setShowSaveBulkModal: React.Dispatch<React.SetStateAction<boolean>>;
  animeArr: Anime[];
  successCallback?: () => void;
  multipleCheck: boolean;
};

const AddFirstCollectionModal = ({
  showSaveBulkModal,
  setShowSaveBulkModal,
  animeArr,
  successCallback,
  multipleCheck,
}: SaveBulkModalProps) => {
  const { saveBulkAnime } = useContext(
    CollectionContext
  ) as CollectionContextType;

  const {
    value: itemValue,
    input: itemInput,
    onValidate: onItempInputValidate,
    onReset: onItemInputReset,
  } = useCollectionItemInput(multipleCheck ? 999 : 1);

  const constructSaveBulkAnimeParams = () => {
    const result: Combination[] = [];
    itemValue.forEach((elem) => {
      const tmpVal: Combination = {
        collectionName: elem.name,
        animeArr: animeArr,
      };
      result.push(tmpVal);
    });
    return result;
  };

  return (
    <Modal
      show={showSaveBulkModal}
      onClose={() => {
        setShowSaveBulkModal(false);
        onItemInputReset();
      }}
      title="Save Bulk Collection"
      actionButtons={[
        <NegativeButton
          onClick={() => {
            setShowSaveBulkModal(false);
            onItemInputReset();
          }}
        >
          Cancel
        </NegativeButton>,
        <PositiveButton
          onClick={() => {
            const isValid = onItempInputValidate();
            if (isValid) {
              saveBulkAnime(constructSaveBulkAnimeParams());
              setShowSaveBulkModal(false);
              onItemInputReset();

              if (successCallback) {
                successCallback();
              }
            }
          }}
        >
          Save
        </PositiveButton>,
      ]}
      Content={
        <>
          <NormalText>
            {multipleCheck ? (
              <>
                You can choose <b>more than 1</b> collection
              </>
            ) : (
              <>
                Choose <b>1</b> collection
              </>
            )}
          </NormalText>
          <MediumSpacerTop>{itemInput}</MediumSpacerTop>
        </>
      }
      maxWidth="480px"
    />
  );
};

export default AddFirstCollectionModal;
