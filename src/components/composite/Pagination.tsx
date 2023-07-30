import styled from "@emotion/styled";
import { useMemo } from "react";

// Define styled components with the desired styles
const PaginationContainer = styled.div`
  display: inline-block;
`;

const PaginationLink = styled.a`
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  cursor: pointer;
`;

const ActivePaginationLink = styled(PaginationLink)`
  background-color: #4caf50;
  color: white;
`;

const HoveredPaginationLink = styled(PaginationLink)`
  &:hover:not(.active) {
    background-color: #ddd;
  }
`;

type PaginationProps = {
  currPage: number;
  lastPage: number;
  setPagination: React.Dispatch<
    React.SetStateAction<{
      limit: number;
      page: number;
    }>
  >;
};

// Usage of the styled components
const Pagination = (props: PaginationProps) => {
  const onFirstButtonClick = () => {
    props.setPagination({
      limit: 10,
      page: 1,
    });
  };

  const onJumpButtonClick = () => {
    props.setPagination({
      limit: 10,
      page: props.currPage + 50,
    });
  };

  const onNextButtonClick = () => {
    props.setPagination({
      limit: 10,
      page: props.currPage + 1,
    });
  };

  const onPrevButtonClick = () => {
    props.setPagination({
      limit: 10,
      page: props.currPage - 1,
    });
  };

  const onItemClick = (page: number) => {
    return () => {
      props.setPagination({
        limit: 10,
        page: page,
      });
    };
  };

  const indexArr = useMemo(() => {
    const result: number[] = [];
    for (let i = 0; i < 3; i++) {
      if (props.currPage > 2) {
        result.push(props.currPage - 1 + i);
      } else {
        result.push(i + 1);
      }
    }
    return result;
  }, [props.currPage]);

  return (
    <PaginationContainer>
      <PaginationLink className="active" onClick={onFirstButtonClick}>
        &laquo;
      </PaginationLink>
      <PaginationLink onClick={onPrevButtonClick}>&lsaquo;</PaginationLink>
      {indexArr.map((elem) => {
        if (elem === props.currPage) {
          return (
            <ActivePaginationLink onClick={onItemClick(elem)}>
              {elem}
            </ActivePaginationLink>
          );
        }
        return (
          <HoveredPaginationLink onClick={onItemClick(elem)}>
            {elem}
          </HoveredPaginationLink>
        );
      })}
      <PaginationLink onClick={onNextButtonClick}>&rsaquo;</PaginationLink>
      <PaginationLink onClick={onJumpButtonClick}>&raquo;</PaginationLink>
    </PaginationContainer>
  );
};

export default Pagination;
