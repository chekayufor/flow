import React, { useState, useEffect, useContext } from 'react';
// import TechSelectOptions from '../techs/TechSelectOptions';
// import PropTypes from 'prop-types';
import FlowContext from '../context/flow/flowContext';

// import { addLog } from '../../actions/logActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddModal = () => {
  const flowContext = useContext(FlowContext);
  const {
    currentElement,
    setCurrentElement,
    updateElement,
    deleteElement
  } = flowContext;
  const [age, setAge] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    if (currentElement) {
      setAge(currentElement.age);
      setColor(currentElement.color);
    }
  }, [currentElement]);

  const onSubmit = () => {
    if (age === '' || color === '') {
      M.toast({ html: 'Please enter a age and color' });
    } else {
      currentElement.color = color;
      currentElement.age = age;
      const updEl = {
        id: currentElement.id,
        name: currentElement.name,
        valid: currentElement.valid,
        color,
        age,
        top: currentElement.top,
        left: currentElement.left
      };

      updateElement(updEl);
      M.toast({ html: 'element updated' });
    }
    // Clear Fields
    setAge('');
    setColor('');
    setCurrentElement('');
  };
  const onDelete = () => {
    console.log('delete');
    M.toast({ html: 'Element was deleted' });
    deleteElement(currentElement.id);

    // Clear Fields
    setAge('');
    setColor('');
    setCurrentElement('');
  };

  return (
    <div id="edit-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h5 style={{ textAlign: 'center' }}>Please fill the form</h5>
        <div className="row">
          <div className="input-field">
            <input
              type="number"
              min="0"
              max="99"
              name="age"
              value={age}
              onChange={e => setAge(e.target.value)}
            />
            <label htmlFor="age" className="active">
              Age
            </label>
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <select
              name="color"
              value={color}
              className="browser-default"
              onChange={e => setColor(e.target.value)}
            >
              <option value="" disabled>
                Select color
              </option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="Red">Red</option>
            </select>
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
          onClick={() => onSubmit()}
          className="modal-close waves-effect blue waves-light btn"
          style={{ textAlign: 'center', marginRight: '2px' }}
        >
          Enter
        </a>
        <a
          href="#!"
          onClick={() => onDelete()}
          className="modal-close waves-effect waves-light btn #ef5350 red lighten-1"
          style={{ textAlign: 'center', marginLeft: '2px' }}
        >
          Delete
        </a>
      </div>
    </div>
  );
};

AddModal.propTypes = {};

const modalStyle = {
  width: '45%',
  height: '45%'
};

export default AddModal;
