import React, { useRef } from 'react';
import styled from 'styled-components';
import uuid from 'uuid';
import Draggable from '../flows/Draggable';

const ContentForFlow = props => {
  const ref = useRef(null);
  const dragStart = e => {
    const target = e.target;
    console.log({ target });
    target.id = uuid.v4();
    e.dataTransfer.setData('el_id', target.id);
    console.log(target.id);
  };
  const dragOver = e => {
    e.stopPropagation();
  };
  return (
    <Container>
      <Ul>
        <Li
          ref={ref}
          id={uuid.v4()}
          draggable="true"
          onDragStart={dragStart}
          onDragOver={dragOver}
        >
          JOHN
        </Li>
        <Li
          ref={ref}
          id={uuid.v4()}
          draggable="true"
          onDragStart={dragStart}
          onDragOver={dragOver}
        >
          MIKE
        </Li>
        <Li
          ref={ref}
          id={uuid.v4()}
          draggable="true"
          onDragStart={dragStart}
          onDragOver={dragOver}
        >
          ASHLEY
        </Li>
        <Li
          ref={ref}
          id={uuid.v4()}
          draggable="true"
          onDragStart={dragStart}
          onDragOver={dragOver}
        >
          JANE
        </Li>
        <Li
          ref={ref}
          id={uuid.v4()}
          draggable="true"
          onDragStart={dragStart}
          onDragOver={dragOver}
        >
          TIM
        </Li>
      </Ul>
    </Container>
  );
};
export default ContentForFlow;

const Container = styled.div`
  display: grid;
  background-color: #d9e7f1;
  grid-template-columns: 100%;
  @media (min-width: 875px) {
    min-height: 100px;
    grid-template-rows: 100%;
  }
  justify-content: space-around;
  align-content: space-around;
`;
const Ul = styled.ul`
  list-style: none;
  display: grid;
  // background-color: #ffffff;
  grid-template-columns: 100%;
  grid-template-rows: repeat(5, 1fr);
  @media (min-width: 875px) {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 100%;
  }
  // border: #2f6587 2px solid;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  margin: 5px;
`;
const Li = styled.li`
  height: 40px;
  width: 100px;
  background-color: var(--light-color);;
  border: 1px solid #e0e0e0;
  border-radius:5px;
  shadow:
  align-items: center;
  text-align: center;
  margin: 4px;
  padding-top: 7%;
  transition: opacity 0.2s ease-in;
  -webkit-box-shadow: 1px 1px 7px 1px rgba(102,104,107,1);
  -moz-box-shadow: 1px 1px 7px 1px rgba(102,104,107,1);
  box-shadow: 1px 1px 7px 1px rgba(102,104,107,1);
  cursor: -webkit-grab;
   cursor: grab;
  &:hover{
    background-color: #2f6587;
    color:#fff;
  }
`;
