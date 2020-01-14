import React, { useState, useContext } from 'react';
// import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import FlowContext from '../context/flow/flowContext';
import FlowListSelectOptions from './FlowListSelectOptions';

// import FlowItem from './TechItem';

const FlowModal = () => {
  const flowContext = useContext(FlowContext);
  const {
    setCurrentFlow,
    currentFlow,
    setFlowElements,
    deleteFlow
  } = flowContext;

  const [selected, setSelected] = useState('');

  const onDelete = () => {
    if (selected === '') {
      M.toast({ html: 'Please choose some Flow' });
    } else {
      deleteFlow(JSON.parse(selected)._id);
      console.log('delete');
    }
    setSelected('');
  };

  const onSubmit = () => {
    if (selected === '') {
      M.toast({ html: 'Please choose some Flow' });
    } else {
      setCurrentFlow(JSON.parse(selected));
      setFlowElements(JSON.parse(selected).elements);
    }
    setSelected('');
  };

  return (
    <div id="flow-list-modal" className="modal">
      <div className="modal-content">
        <h5 style={{ textAlign: 'center' }}>Flow List</h5>
        <div className="imput-field">
          <select
            name="currentFlow"
            value={currentFlow}
            className="browser-default"
            onChange={e => setSelected(e.target.value)}
          >
            <option value="">Select Flow</option>
            <FlowListSelectOptions />
          </select>
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
          style={{ textAlign: 'center', marginRight: '2px' }}
        >
          Enter
        </a>
        <a
          href="#!"
          onClick={onDelete}
          className="modal-close waves-effect red waves-light btn"
          style={{ textAlign: 'center', marginRight: '2px' }}
        >
          Delete
        </a>
      </div>
    </div>
  );
};
FlowModal.propTypes = {};

export default FlowModal;
