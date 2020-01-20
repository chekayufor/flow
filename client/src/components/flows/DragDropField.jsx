import React, { useContext, useEffect } from 'react';

import FlowContext from '../context/flow/flowContext';

const DragDropField = props => {
  const flowContext = useContext(FlowContext);
  const {
    setCurrentFlow,
    setFlowElements,
    flowElements,
    setLeft,
    setTop,
    left,
    top
  } = flowContext;

  useEffect(() => {
    const newFlow = {
      flowName: '',
      elements: [],
      connections: [],
      date: new Date()
    };
    setCurrentFlow(newFlow);
    //eslint-disable-next-line
  }, []);
  const dragEnd = e => {
    setLeft(e.clientX);
    setTop(e.clientY);
  };
  const drop = e => {
    e.preventDefault();
    const el_id = e.dataTransfer.getData('el_id');
    const element = document.getElementById(el_id);
    let el = element.cloneNode(true);
    // el.style.display = 'block';
    // el.style.paddingTop = '7px';
    let newEl = e.target.appendChild(el);

    newEl.style.display = 'none';
    newEl = {
      id: newEl.id,
      name: newEl.innerText,
      valid: true,
      age: '',
      color: '',
      top,
      left
    };
    flowElements === null
      ? setFlowElements([newEl])
      : setFlowElements([...flowElements, newEl]);
    // console.log({ newEl });
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
      onDragEnd={dragEnd}
    >
      {props.children}
    </div>
  );
};
export default DragDropField;
