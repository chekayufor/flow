import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import FlowContext from '../context/flow/flowContext';

const FlowListSelectOptions = () => {
  const flowContext = useContext(FlowContext);
  const { flowList } = flowContext;

  return (
    flowList !== null &&
    flowList.map(flow => {
      return (
        <option key={flow._id} value={JSON.stringify(flow) || ''}>
          {flow.flowName}
        </option>
      );
    })
  );
};

export default FlowListSelectOptions;
