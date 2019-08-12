import React from 'react'
import styled from 'styled-components'

export default function ProgressBar({ value, done }) {

  const percents = value + '%';
  return (
    <Wrapper>
      <Bar>
        <Progress width={percents} isDone={done}>
          {(value === null)?'Uploading':`${value}% Uploaded`}
        </Progress>
      </Bar>
    </Wrapper>
  )
}

const Wrapper = styled.div `
  display: flex;
  align-items: center;
  flex: 1;
`;

const Bar = styled.div `
  height: 25px;
  width: 100%;
  position: relative;
`;

const Progress = styled.div `
  position: absolute;
  border-radius: ${props => props.isDone ? '0' : '0 8px 8px 0'};
  background-color: ${props => props.isDone ? '#21cd6c' : '#af53fe'};
  height: 100%;
  left: 0;
  top: 0;
  width: ${props => props.width ? props.width : '0'};
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  font-style: italic;
  text-align: center;
  transition: width .5s;
`;
