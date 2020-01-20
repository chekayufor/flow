import React, { useContext, Fragment } from 'react';
import Element from './Element';
import Draggable from '../flows/Draggable';
// import styled from 'styled-components';
import FlowContext from '../context/flow/flowContext';

// import PropTypes from 'prop-types';

const Elements = () => {
  const flowContext = useContext(FlowContext);
  const { flowElements, top, left } = flowContext;

  return (
    <ul style={{ height: '100%' }}>
      {flowElements === null ? (
        <Fragment />
      ) : (
        flowElements.map(el => (
          <Draggable top={el.top} left={el.left}>
            <Element el={el} key={el.id} />
          </Draggable>
        ))
      )}
    </ul>
  );
};

export default Elements;
