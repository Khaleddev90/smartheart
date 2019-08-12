import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';

import 'draft-js/dist/Draft.css';

const hashtagPlugin = createHashtagPlugin();
const plugins = [hashtagPlugin];

class DescriptionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: createEditorStateWithText(props.value),
      count: props.value.length,
    };
  }

  handleChange = editorState => {
    const content = editorState.getCurrentContent();
    const clearValue = content.getPlainText();
    this.setState({
      editorState: editorState,
      count: clearValue.length,
    }, () => this.props.onChange(clearValue))
  }

  render() {
    const {
      isValid,
      placeholder,
    } = this.props;
    return (
      <Wrapper isValid={isValid} onClick={this.handleFocus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.handleChange}
          plugins={plugins}
          placeholder={placeholder}
        />
        <Count isValid={isValid}>{this.state.count}/{this.props.maxCount}</Count>
      </Wrapper>
    );
  }
}

DescriptionInput.propTypes = {
  value: PropTypes.string,
  isValid: PropTypes.bool,
  placeholder: PropTypes.string,
  maxCount: PropTypes.number,
  onChange: PropTypes.func,
};

DescriptionInput.defaultProps = {
  value: '',
  maxCount: 170,
  onChange: () => {},
};

export default DescriptionInput;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  font-size: 24px;
  border-radius: 8px;
  border: 1px solid;
  border-color: ${({ isValid }) => isValid ? '#a1a1a1' : '#fd3649'};
  resize: none;
  box-sizing: border-box;
  width: 100%;
  padding: 20px 28px 35px 28px;

  :focus {
    outline: none;
    border-color: ${({ isValid }) => isValid ? '#2b2b2b' : '#fd3649'};
  }

  & .public-DraftEditorPlaceholder-root {
    color: #a1a1a1;
    font-size: 24px;
    font-weight: 300;
    font-style: italic;
    cursor: text;
  }

  & .draftJsHashtagPlugin__hashtag__1wMVC {
    color: blue;
    font-weight: 600;
  }
`;

const Count = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 24px;
  color: ${({ isValid }) => isValid ? '#a1a1a1' : '#fd3649'};
`;