import React from 'react'
import styled from 'styled-components'
import Dropzone from 'react-dropzone'
import { Icon } from 'react-fa'

const DragAndDrop = ({ uploadFile }) => {

  return (
    <Content>
      <Uploader
        onDrop={uploadFile}
        multiple={false}
        accept="video/*"
      >
        <UploadIcon name='cloud-upload' size='5x' />
        <Text>
          Select files to upload
          <span>or drag drop video files</span>
        </Text>
      </Uploader>
    </Content>
  )
}

export default DragAndDrop

const Content = styled.div`
  display: flex;
`

const Uploader = styled(Dropzone)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  height: calc(100vh - 250px);
  border-radius: 40px;
  margin: 50px auto;
  text-align: center;
  transition: all .2s;
  box-shadow: 0px 5px 26.46px 0.54px rgba(0, 0, 0, 0.16);
  background-color: white;
}

`

const Text = styled.div`
  font-size: 20px;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  span {
    font-size: 23px;
    font-weight: 300;
  }
`
const UploadIcon = styled(Icon)`
  color: #ccc;
  cursor: pointer;
  transition: all .2s;
`