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

  const onSubmit = e => {
    e.preventDefault();
    if (flowName === '') {
      M.toast({ html: 'Please enter Flow name' });
    } else {
      const newFlowUpd = {};
      newFlowUpd._id = currentFlow._id;
      newFlowUpd.flowName = flowName;
      newFlowUpd.elements = flowElements;
      newFlowUpd.connections = [];
      newFlowUpd.date = new Date();
      newFlowUpd.user = currentFlow.user;
      // console.log({ newFlowUpd });

      const newFlow = {
        flowName,
        elements: flowElements,
        connections: [],
        date: new Date()
      };
      console.log('currentFlow._id', currentFlow._id);
      //Post the new Flow
      if (currentFlow._id !== undefined) {
        updateFlow(newFlowUpd);
        M.toast({ html: 'Flow updated' });
      } else {
        addFlow(newFlow);
        M.toast({ html: 'Flow added' });
      }

      // Clear Fields
      let startFlow = {
        flowName: '',
        elements: [],
        connections: [],
        date: new Date()
      };
      setFlowName('');
      setFlowElements(null);
      setCurrentFlow('');
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
              value={flowName || ''}
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
