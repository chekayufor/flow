import React, { useState, useEffect } from 'react';
import FlowContext from '../context/flow/flowContext';

import styled, { css } from 'styled-components';

// const Draggable = props => {
//   const { setCurrentElement, currentElement } = flowContext;
//   const [isDragging, setIsDragging] = useState(false);
//   const [originalX, setOriginalX] = useState(0);
//   const [originalY, setOriginalY] = useState(0);
//   const [translateX, setTranslateX] = useState(0);
//   const [translateY, setTranslateY] = useState(0);
//   const [lastTranslateX, setLastTranslateX] = useState(0);
//   const [lastTranslateY, setLastTranslateY] = useState(0);

//   useEffect(() => {
//     return () => {
//       window.removeEventListener('mousemove', this.handleMouseMove);
//       window.removeEventListener('mouseup', this.handleMouseUp);
//     };
//   }, [input]);

//   const handleMouseDown = ({ clientX, clientY }) => {
//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('mouseup', handleMouseUp);
//     if (props.onDragStart) {
//       props.onDragStart();
//     }
//     setOriginalX(clientX);
//     setOriginalY(clientY);
//     setIsDragging(true);
//   };

//   const handleMouseMove = ({ clientX, clientY }) => {
//     const { onDrag } = props;

//     if (!isDragging) {
//       return;
//     }
//     let transX = clientX - originalX + lastTranslateX;
//     let transY = clientY - originalY + lastTranslateY;

//     if (onDrag) {
//       setTranslateX(transX)
//       setTranslateY(transY)
//   };
//   const handleMouseUp = ({ clientX, clientY }) => {
//     console.log({ clientX });

//     window.removeEventListener('mousemove', this.handleMouseMove);
//     window.removeEventListener('mouseup', this.handleMouseUp);

//     this.setState(
//       {
//         setOriginalX: 0,
//         setOriginalY: 0,
//         setLastTranslateX: clientX,
//         setLastTranslateY: clientY,

//         isDragging: false
//       },
//       () => {
//         if (this.props.onDragEnd) {
//           this.props.onDragEnd();
//         }
//       }
//     );

// };

export default class Draggable extends React.Component {
  state = {
    isDragging: false,
    originalX: 0,
    originalY: 0,
    translateX: 0,
    translateY: 0,
    lastTranslateX: 0,
    lastTranslateY: 0,
    positionX: 0,
    positionY: 0
  };

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown = ({ clientX, clientY }) => {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    if (this.props.onDragStart) {
      this.props.onDragStart();
    }

    this.setState({
      originalX: clientX,
      originalY: clientY,
      isDragging: true
    });
  };

  handleMouseMove = ({ clientX, clientY }) => {
    const { isDragging } = this.state;
    const { onDrag } = this.props;

    if (!isDragging) {
      return;
    }

    this.setState(
      prevState => ({
        translateX: clientX - prevState.originalX + prevState.lastTranslateX,
        translateY: clientY - prevState.originalY + prevState.lastTranslateY
      }),
      () => {
        if (onDrag) {
          onDrag({
            translateX: this.state.translateX,
            translateY: this.state.translateY
          });
        }
      }
    );
  };

  handleMouseUp = ({ clientX, clientY }) => {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);

    this.setState(
      {
        originalX: 0,
        originalY: 0,
        lastTranslateX: this.state.translateX,
        lastTranslateY: this.state.translateY,
        positionX: clientX,
        positionY: clientY,

        isDragging: false
      },
      () => {
        if (this.props.onDragEnd) {
          this.props.onDragEnd();
        }
      }
    );
  };

  render() {
    const { children } = this.props;
    const {
      translateX,
      translateY,
      positionX,
      positionY,
      isDragging
    } = this.state;

    return (
      <Container
        onMouseDown={this.handleMouseDown}
        x={translateX}
        y={translateY}
        posX={positionX}
        posY={positionY}
        isDragging={isDragging}
        style={{ backgroundColor: 'lightblue', width: '100px' }}
      >
        {children}
      </Container>
    );
  }
}

const Container = styled.div.attrs({
  style: ({ x, y }) => ({
    transform: `translate(${x}px, ${y}px)`
  })
})`
  cursor: grab;

  ${({ isDragging }) =>
    isDragging &&
    css`
      opacity: 0.8;
      cursor: grabbing;
    `};
`;
