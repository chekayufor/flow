import React, { useEffect, useState, useContext, Fragment } from 'react';
import Element from './Element';
import Draggable from '../flows/Draggable';
import styled from 'styled-components';
import FlowContext from '../context/flow/flowContext';

import PropTypes from 'prop-types';

const Elements = () => {
  const flowContext = useContext(FlowContext);
  const { currentFlow, flowElements } = flowContext;
  return (
    <ul style={{ height: '100%' }}>
      {flowElements === null ? (
        <Fragment />
      ) : (
        flowElements.map(el => (
          <Draggable>
            <Element el={el} key={el._id} />
          </Draggable>
        ))
      )}
    </ul>
  );
};

export default Elements;
