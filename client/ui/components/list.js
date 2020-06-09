import React, { Fragment, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { 
  Button,
  Spinner,
  ListGroup,
  Modal,
} from "react-bootstrap";

import { useInfiniteScrollDown } from '../hooks/use-infinite-scroll-down';
import { useAdjustedScrollDown } from '../hooks/use-adjusted-scroll-down';
import { genders } from '../../const';

const Container = styled.div`
  flex-grow: 1;
  overflow: auto;
  outline: none;
`;

const LoadingMore = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1001;
`;

const SpinnerEl = styled(Spinner)`
  width: 4vw;
  height: 4vw;
`;

const Record = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PhotoContainer = styled.div`
  width: 15vh;
  height: 10vh;
  margin-right: 10px;
`;

const PhotoContainerBig = styled.div`
  width: 45vh;
  height: 30vh;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ButtonUpContainer = styled.div`
  position: absolute;
  bottom: 75px;
  right: 20px;
  z-index: 1001;
`;

const Prompt = styled.div`
  height: 20vh;
  width: 100vw;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ListBase = ({
  hasMore, data, loadMore,
}) => {
  const [showItem, setShowItem] = useState(null);

  const selfRef = useRef(null);
  const adjustScroll = useAdjustedScrollDown(selfRef);
  PhotoContainerBig
  const [fetching, stopFetching, buttonUp] = useInfiniteScrollDown({
    onLoadMore: loadMore,
    hasMore,
    ref: selfRef,
    adjustScroll,
  });

  const handleOnHideItem = () => {
    setShowItem(null)
  }

  const handleOnItemSelect = index => {
    setShowItem(data[index])
  }

  return (
    <Fragment>
      {fetching
        && (
          <LoadingMore>
            <SpinnerEl animation="grow" />
          </LoadingMore>
        )}
      <Container ref={selfRef}>
        <ListGroup>
          {data.map(({ id, photo, name, description }, index) => (
            <ListGroup.Item action key={id} onClick={() => handleOnItemSelect(index)}>
              <Record>
                <PhotoContainer>
                  <Photo src={photo} alt="" />
                </PhotoContainer>
                <div>
                  {name}
                  <br />
                  {description}
                </div>
              </Record>
            </ListGroup.Item>
          ))}
        </ListGroup>
        {buttonUp
          && (
            <ButtonUpContainer>
              <Button color="primary" onClick={() => adjustScroll(true)}>
                Вверх
              </Button>
            </ButtonUpContainer>
          )}
        {!hasMore &&
          <Prompt>
            <span>
              Если имеются вопросы, вы можите уточнить у менеджера.
            </span>
            <span>
              Для этого обратитесь по телефону горячей линии либо по электронной почте :)
            </span>
          </Prompt>
        }
      </Container>
      {!!showItem &&
        <Modal show onHide={handleOnHideItem}>
          <Modal.Header closeButton>
            <Modal.Title>{showItem.name}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <PhotoContainerBig>
              <Photo src={showItem.photo} alt="" />
            </PhotoContainerBig>
            <p><strong>Описание:</strong></p>
            <p>{showItem.description}</p>
            <p><strong>Пол:</strong></p>
            <p>{genders[showItem.gender]}</p>
            <p><strong>Возраст:</strong></p>
            <p>{`${showItem.age[0]}-${showItem.age[1]}`}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={handleOnHideItem}>
              Закрыть
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </Fragment>
  )
}

export const List = ListBase