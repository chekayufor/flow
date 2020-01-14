import React, { useContext, Fragment } from 'react';
import Draggable from './Draggable';
import Elements from './Elements';

import styled from 'styled-components';
import FlowContext from '../context/flow/flowContext';

import PropTypes from 'prop-types';

const FlowField = () => {
  const flowContext = useContext(FlowContext);
  const { currentFlow } = flowContext;
  console.log({ currentFlow });
  return (
    <Container>
      {
        <Fragment>
          <Elements />
        </Fragment>
      }
    </Container>
  );
};

export default FlowField;
const Container = styled.div``;
