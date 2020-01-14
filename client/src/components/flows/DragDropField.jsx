import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import FlowContext from '../context/flow/flowContext';
import AuthContext from '../context/auth/authContext';

const DragDropField = props => {
  const flowContext = useContext(FlowContext);
  const authContext = useContext(AuthContext);
  const {
    setCurrentFlow,
    currentFlow,
    setFlowElements,
    flowElements
  } = flowContext;

  useEffect(() => {
    const newFlow = {
      flowName: '',
      elements: [],
      connections: [],
      date: new Date()
    };
    setCurrentFlow(newFlow);
  }, []);

  const drop = e => {
    e.preventDefault();
    const el_id = e.dataTransfer.getData('el_id');
    // console.log(el_id);
    const element = document.getElementById(el_id);
    let el = element.cloneNode(true);

    el.style.display = 'block';
    el.style.paddingTop = '7px';
    let newEl = e.target.appendChild(el);
    newEl.style.display = 'none';
    newEl = {
      id: newEl.id,
      name: newEl.innerText,
      valid: true,
      age: '',
      color: '',
      top: newEl.clientTop,
      left: newEl.clientLeft
    };
    flowElements === null
      ? setFlowElements([newEl])
      : setFlowElements([newEl, ...flowElements]);
    console.log({ newEl });
    return newEl;
  };

  const dragOver = e => {
    e.preventDefault();
  };
  return (
    <div
      style={{ display: 'grid', height: '100%' }}
      id={props.id}
      onDrop={drop}
      onDragOver={dragOver}
    >
      {props.children}
    </div>
  );
};
export default DragDropField;
