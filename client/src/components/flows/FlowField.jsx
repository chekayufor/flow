import React, { useContext, useEffect } from 'react';
import Elements from './Elements';
import Preloader from '../layout/Preloader';

import styled from 'styled-components';
import FlowContext from '../context/flow/flowContext';

// import PropTypes from 'prop-types';

const FlowField = () => {
  const flowContext = useContext(FlowContext);

  const { currentFlow, flowList, getFlows, loading } = flowContext;
  useEffect(() => {
    getFlows();
    // eslint-disable-next-line
  }, []);
  console.log({ flowList });
  console.log({ currentFlow });

  if (loading || flowList === null) {
    return <Preloader />;
  }
  return (
    <Container>
      <Elements />
    </Container>
  );
};

export default FlowField;
const Container = styled.div``;
