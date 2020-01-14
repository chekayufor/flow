import React, { useEffect, useContext } from 'react';
// import PropTypes from 'prop-types';
import FlowContext from '../context/flow/flowContext';
import Preloader from '../layout/Preloader';

const FlowListSelectOptions = () => {
  const flowContext = useContext(FlowContext);
  const { flowList, getFlows, loading } = flowContext;
  console.log({ flowList });

  useEffect(() => {
    getFlows();
    // eslint-disable-next-line
  }, []);
  if (loading || flowList === null) {
    return <Preloader />;
  }
  return (
    !loading &&
    flowList.map(flow => {
      return (
        <option key={flow._id} value={JSON.stringify(flow)}>
          {flow.flowName}
        </option>
      );
    })
  );
};

export default FlowListSelectOptions;
