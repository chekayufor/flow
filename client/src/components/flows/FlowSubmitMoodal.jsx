import React, { useEffect, useState, useContext } from 'react';
// import PropTypes from 'prop-types';
import FlowContext from '../context/flow/flowContext';

import M from 'materialize-css/dist/js/materialize.min.js';

const FlowSubmitModal = () => {
  const [flowName, setFlowName] = useState('');

  const flowContext = useContext(FlowContext);
  const {
    addFlow,
    updateFlow,
    setCurrentFlow,
    flowElements,
    currentFlow,
    setFlowElements
  } = flowContext;

  useEffect(() => {
    if (currentFlow !== null) {
      setFlowName(currentFlow.flowName);
    }
  }, [currentFlow]);

  const onSubmit = () => {
    if (flowName === '') {
      M.toast({ html: 'Please enter Flow name' });
    } else {
      const newFlowUpd = {
        _id: currentFlow._id,
        flowName,
        elements: flowElements,
        connections: [],
        date: new Date(),
        user: currentFlow.user
      };
      const newFlow = {
        flowName,
        elements: flowElements,
        connections: [],
        date: new Date()
      };
      console.log({ newFlow });
      console.log({ newFlowUpd });
      //Post the new Flow
      // currentFlow._id === null ? addFlow(newFlow) : updateFlow(newFlowUpd);
      addFlow(newFlow);
      // updateFlow(newFlowUpd);

      // Clear Fields
      setFlowName('');
      setFlowElements(null);
      setCurrentFlow(null);
    }
  };

  return (
    <div id="flow-submit-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h5 style={{ textAlign: 'center' }}>Please enter the Flow name</h5>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="flowName"
              value={flowName}
              onChange={e => setFlowName(e.target.value)}
            />
            <label htmlFor="flowName" className="active">
              Flow Name
            </label>
          </div>
        </div>
      </div>
      <div
        className="modal-footer"
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect blue waves-light btn"
        >
          Enter
        </a>
      </div>
    </div>
  );
};
FlowSubmitModal.propTypes = {};
const modalStyle = {
  width: '40%',
  height: '40%'
};

export default FlowSubmitModal;
