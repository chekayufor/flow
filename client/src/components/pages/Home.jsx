import React, { useContext, useEffect } from 'react';
// import PropTypes from 'prop-types';
import AuthContext from '../context/auth/authContext';
// import FlowContext from '../context/flow/flowContext';
//modal window
import AddModal from '../flows/AddModal';
import FlowModal from '../flows/FlowModal';
import FlowSubmitModal from '../flows/FlowSubmitMoodal';
//components view
import ContentForFlow from '../flows/ContentForFlow';
import DragDropField from '../flows/DragDropField';
// import Elements from '../flows/Elements';
import FlowField from '../flows/FlowField';

//style
import styled from 'styled-components';
import 'materialize-css/dist/css/materialize.min.css';
// import M from 'materialize-css/dist/js/materialize.min.js';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);

  return (
    <MainContainer>
      <FlowModal />
      <a href="#flow-list-modal" className="modal-trigger">
        <Button>LOAD</Button>
      </a>
      <Container>
        <DragDropField id="dragDrop-1">
          <ContentForFlow draggable="true" />
        </DragDropField>
        <DragDropField id="dragDrop-2">
          <AddModal />
          <FlowField />
        </DragDropField>
      </Container>
      <FlowSubmitModal />
      <a href="#flow-submit-modal" className="modal-trigger">
        <Button type="submit" name="action">
          APPLY
        </Button>
      </a>
    </MainContainer>
  );
};

Home.propTypes = {};
Home.defaultProps = {};
export default Home;

const MainContainer = styled.div`
  display: grid;
  max-height: 100vh;
  justify-content: center;
  align-item: center;
  justify-items: center;
`;
const Container = styled.div`
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 1fr 5fr;
  @media (min-width: 875px) {
    grid-template-rows: 1fr 10fr;
    grid-template-columns: 100%;
  }
  height: 600px;
  border: #2f6587 2px solid;
  overflow: hidden;
`;
const Button = styled.button`
  width: 100px;
  height: 40px;
  background-color: #2f6587;
  color: white;
  border-radius: 5px;
  margin: 5px;
  &:hover {
    background-color: #43ada3;
  }
`;
