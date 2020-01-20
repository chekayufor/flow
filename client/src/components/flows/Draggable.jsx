import React, { useState, useEffect } from 'react';
import FlowContext from '../context/flow/flowContext';

import styled, { css } from 'styled-components';

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

    console.log(this.originalX);
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
    const { translateX, translateY, isDragging } = this.state;

    return (
      <Container
        onMouseDown={this.handleMouseDown}
        x={translateX}
        y={translateY}
        topY={props => (props ? this.props.top : 'null')}
        leftX={props => (props ? this.props.left : 'null')}
        isDragging={isDragging}
        style={{ backgroundColor: 'lightblue', width: '100px' }}
      >
        {children}
      </Container>
    );
  }
}

const Container = styled.div.attrs(props => ({
  style: {
    transform: `translate(${props.x}px, ${props.y}px)`,
    top: `${props.topY}px`,
    left: `${props.leftX}px`
  }
}))`
  // top: ${props => props.topY + 'px'};
  // left: ${props => props.left + 'px'};
  cursor: grab;
  position: absolute;

  ${({ isDragging }) =>
    isDragging &&
    css`
      opacity: 0.8;
      cursor: grabbing;
    `};
`;
