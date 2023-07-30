import { NavLink, RouteComponentProps } from "react-router-dom";
import { useFetchAnimeDetail } from "../../clients";
import {
  LoaderContainer,
  Loader,
  ActionButtonContainer,
  CircularPositiveButton,
  NormalText,
  MediumSpacerTop,
  Subtitle,
  SmallSpacerTop,
  LargeSpacerTop,
  Title,
  AddFirstCollection,
  SaveBulkModal,
} from "../../components";
import { IoBookmarks } from "react-icons/io5";
import styled from "@emotion/styled";
import { useContext, useState } from "react";
import { CollectionContext, CollectionContextType } from "../../context";

type TParams = { id: string };

const DetailPage = ({ match }: RouteComponentProps<TParams>) => {
  const { loading: isLoading, data } = useFetchAnimeDetail(
    Number(match.params.id)
  );
  const [showAddFirstCollectionModal, setShowAddFirstCollectionModal] =
    useState(false);
  const [showSaveBulkModal, setShowSaveBulkModal] = useState(false);

  const { collectionArr, getAnimeCollection } = useContext(
    CollectionContext
  ) as CollectionContextType;

  const constructDate = (
    day: number | null,
    month: number | null,
    year: number | null
  ) => {
    if (day && month && year) {
      return new Date(`${month}/${day}/${year}`).toLocaleDateString();
    }
    return "Now";
  };

  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 24px;
  `;

  const ImgContainer = styled.img`
    max-height: 50vh;

    border-radius: 5px 5px 5px 5px;
    object-fit: cover;

    @media (max-width: 768px) {
      /* Styles inside the media query */
      flex-basis: 100%;
    }
  `;

  const RightItemContainer = styled.div`
    flex-basis: 50%;

    @media (max-width: 768px) {
      /* Styles inside the media query */
      flex-basis: 100%;
    }
  `;

  return (
    <>
      <ActionButtonContainer>
        <CircularPositiveButton
          onClick={() => {
            if (collectionArr.length === 0) {
              setShowAddFirstCollectionModal(true);
            } else {
              setShowSaveBulkModal(true);
            }
          }}
        >
          <IoBookmarks />
        </CircularPositiveButton>
      </ActionButtonContainer>
      {!isLoading && data ? (
        <Container>
          <ImgContainer
            src={data.Media.coverImage.extraLarge}
            alt="thumbnail"
          />
          <RightItemContainer>
            <Title>{data.Media.title.romaji}</Title>
            <SmallSpacerTop>
              <Subtitle>
                {data.Media.genres.reduce((result, elem, idx) => {
                  if (idx < data.Media.genres.length - 1) {
                    return result + `${elem}, `;
                  }
                  return result + `${elem}`;
                }, "")}
              </Subtitle>
            </SmallSpacerTop>

            <MediumSpacerTop>
              <NormalText
                dangerouslySetInnerHTML={{ __html: data.Media.description }}
              />
            </MediumSpacerTop>
            <LargeSpacerTop>
              <NormalText>
                <b>Status:</b> {data.Media.status.toLocaleUpperCase()}
              </NormalText>
            </LargeSpacerTop>
            <SmallSpacerTop>
              <NormalText>
                <b>Original Run:</b>{" "}
                {constructDate(
                  data.Media.startDate.day,
                  data.Media.startDate.month,
                  data.Media.startDate.year
                )}{" "}
                -{" "}
                {constructDate(
                  data.Media.endDate.day,
                  data.Media.endDate.month,
                  data.Media.endDate.year
                )}
              </NormalText>
            </SmallSpacerTop>
            <SmallSpacerTop>
              <NormalText>
                <b>Collections:</b>{" "}
                <ul>
                  {getAnimeCollection(Number(match.params.id)).map(
                    (_elem, idx) => (
                      <li>
                        <NavLink to={`/collection/${_elem.name}`}>
                          {_elem.name}
                        </NavLink>
                      </li>
                    )
                  )}
                </ul>
              </NormalText>
            </SmallSpacerTop>
          </RightItemContainer>
        </Container>
      ) : (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
      {showAddFirstCollectionModal && data && (
        <AddFirstCollection
          showAddFirstCollectionModal={showAddFirstCollectionModal}
          setShowAddFirstCollectionModal={setShowAddFirstCollectionModal}
          animeArr={[
            {
              id: data.Media.id,
              title: data.Media.title.romaji,
              image: {
                coverImage: data.Media.coverImage,
                bannerImage: data.Media.bannerImage,
              },
            },
          ]}
        />
      )}
      {showSaveBulkModal && data && (
        <SaveBulkModal
          showSaveBulkModal={showSaveBulkModal}
          setShowSaveBulkModal={setShowSaveBulkModal}
          animeArr={[
            {
              id: data.Media.id,
              title: data.Media.title.romaji,
              image: {
                coverImage: data.Media.coverImage,
                bannerImage: data.Media.bannerImage,
              },
            },
          ]}
          multipleCheck={true}
        />
      )}
    </>
  );
};

export default DetailPage;
