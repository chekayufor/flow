import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import FlowContext from '../context/flow/flowContext';

import PropTypes from 'prop-types';

const Element = ({ el }) => {
  const [backColor, setBackColor] = useState('');
  const flowContext = useContext(FlowContext);
  const { setCurrentElement } = flowContext;
  const { age, color, id, left, name, top, valid, _id } = el;

  // console.log(el.name);
  const liColor = () => {
    let backgroundColor = color !== '' ? color : '';
    return backgroundColor;
  };

  return (
    <Li
      onClick={e => {
        setCurrentElement(el);
      }}
      style={{ backgroundColor: liColor() }}
    >
      <a
        href="#edit-log-modal"
        className="modal-trigger"
        style={{ borderRadius: '50%' }}
      >
        {name}
      </a>
    </Li>
  );
};

export default Element;
const Li = styled.li`
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
