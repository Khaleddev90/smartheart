import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CustomButton = ({ color, size, text, onClick }) => {
  return (
    <Button onClick={onClick} color={color} size={size}>
      {text}
    </Button>
  );
};

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

CustomButton.defaultProps = {
  size: 1,
  color: "#9013FE"
};

export default CustomButton;

const Button = styled.button`
  border: 0;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  background-color: ${({ color }) => color}
  width: ${({ size }) => 200 * size}px
  height: ${({ size }) => 50 * size}px

  &:focus {
    outline:0;
  }
`;
