import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import FlowContext from '../context/flow/flowContext';
import M from 'materialize-css/dist/js/materialize.min.js';

// import PropTypes from 'prop-types';

const Element = ({ el }) => {
  const flowContext = useContext(FlowContext);
  const {
    setCurrentElement,
    updateElement,
    currentElement,
    left,
    top,
    setLeft,
    setTop
  } = flowContext;
  const ref = useRef(null);
  const liColor = () => {
    let backgroundColor = el.color !== '' ? el.color : '';
    return backgroundColor;
  };

  const onMouseUp = () => {
    currentElement.top = top;
    currentElement.left = left;

    const updEl = {
      id: currentElement.id,
      name: currentElement.name,
      valid: currentElement.valid,
      color: currentElement.color,
      age: currentElement.age,
      top,
      left
    };
    updateElement(updEl);
    setCurrentElement(null);
    M.toast({ html: 'top and left are set' });
  };
  return (
    <Li
      top={el.top}
      left={el.left}
      ref={ref}
      onMouseEnter={() => {
        setCurrentElement(el);
        console.log({ currentElement });
      }}
      onMouseDown={e => {
        setLeft(e.clientX);
        setTop(e.clientY);
      }}
      onMouseUp={onMouseUp}
      onMouseLeave={() => console.log('leave')}
      onClick={() => setCurrentElement(el)}
      style={{ backgroundColor: liColor() }}
    >
      <a
        href="#edit-log-modal"
        className="modal-trigger"
        style={{ borderRadius: '50%' }}
      >
        {el.name}
      </a>
    </Li>
  );
};

export default Element;
const Li = styled.li`
// top:${props => props.top + 'px'};
// left:${el => el.left + 'px'};
 position:relative;
display:block;
height: 40px;
width: 100px;
background-color: var(--light-color);
border: 1px solid #e0e0e0;
border-radius:5px;
shadow:
align-items: center;
text-align: center;
margin: 4px;
padding-top: 10px;
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
