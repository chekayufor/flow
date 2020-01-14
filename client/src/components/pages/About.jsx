import React from 'react';
// import PropTypes from 'prop-types';

const About = () => {
  return (
    <div>
      <h1>About this App</h1>
      <h4 className="my-1">
        This is a home assignment
        <span>
          <a href="https://insidepacket.com/"> "Insidepacket" </a>
        </span>
        <span>made by Elena Dubinsky.</span>
      </h4>
      <h4>The following resources were used in the process:</h4>
      <ul>
        <li>
          1.
          <a href="https://reactjs.org/"> React</a>
        </li>
        <li>
          2.
          <a href="https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e">
            Private Route, Public Route, and Restricted Route with React Router
          </a>
        </li>
        <li>
          3.
          <a href="https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction">
            Express/Node introduction
          </a>
        </li>
        <li>
          4.
          <a href="https://express-validator.github.io/docs/">
            express-validator
          </a>
        </li>
        <li>
          5.
          <a href="https://www.npmjs.com/package/jsonwebtoken">jsonwebtoken</a>
        </li>
        <li>
          6.
          <a href="https://www.npmjs.com/package/bcrypt">bcrypt</a>
        </li>
        <li>
          7.
          <a href="https://materializecss.com/">Materialize</a>
        </li>
        <li>
          8.
          <a href="https://www.udemy.com/course/modern-react-front-to-back/">
            Udemy React Front To Back
          </a>
        </li>
        <li>
          9.
          <a href="https://mongoosejs.com/docs/api/schema.html">Mongoose</a>
        </li>
        <li>
          10.
          <a href="https://cloud.mongodb.com/"> MongoDB</a>
        </li>
        <li>
          11.
          <a href="https://www.styled-components.com/docs/basics">
            styled-components for React
          </a>
        </li>
        <l1>
          12.
          <a href="https://engineering.datorama.com/mastering-drag-drop-with-reactjs-part-01-39bed3d40a03">
            Mastering Drag & Drop with ReactJS
          </a>
        </l1>
      </ul>
    </div>
  );
};

About.propTypes = {};
About.defaultProps = {};
export default About;
