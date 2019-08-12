import React from 'react'
import { Label } from '../StyledElements'
import DescriptionInput from './DescriptionInput'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
export default class Description extends React.Component {
  render() {
    const {model, errors, handleChangeModel} = this.props;

    return <React.Fragment>
      <Helmet>
        <title>Step 1 - Upload</title>
      </Helmet>
      <Label>Add video details</Label>
      <Controls>
        <InputVideoTitle type="text"
                         placeholder="Write a video title"
                         isValid={errors.title === ''}
                         value={model.title}
                         onChange={(e) => handleChangeModel('title', e.target.value)}
        />
        <HelpText>{errors.title}</HelpText>
        <DescriptionInput placeholder="Add a description, no product links needed though, this ain’t 2005"
                          maxCount={2000}
                          isValid={errors.description === ''}
                          value={model.description}
                          onChange={(value) => handleChangeModel('description', value)}
        />
        <HelpText>{errors.description}</HelpText>
      </Controls>
    </React.Fragment>
  }
}

const InputVideoTitle = styled.input`
  height: 60px;
  border-radius: 8px;
  border: 1px solid #a1a1a1;
  border: ${props => props.isValid ? '1px solid #a1a1a1' : '1px solid #fd3649'};
  padding: 14px 28px;
  font-size: 24px;
  :focus {
    outline: none;
    border-color: ${props => props.isValid ? '#2b2b2b' : '#fd3649'};
  }
  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #a1a1a1;
    font-size: 24px;
    font-weight: 300;
    font-style: italic;
    opacity: 1; /* Firefox */
  }
`;

const HelpText = styled.div`
  color: #fd3649;
  margin-bottom: 20px;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 300;
`;

const Controls = styled.div`
  width: 780px;
  margin-bottom: 50px;
  & > * {
    width: 100%;
    box-sizing: border-box;
  }
`;
