import React, { Component } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import DashboardLayout from 'components/hoc/DashboardLayout/index'
import DragAndDrop from 'components/Dashboard/DragAndDrop'
import Uploads from 'components/Dashboard/Uploads'
import Followers from 'components/Dashboard/Followers'
import Followings from 'components/Dashboard/Followings'
import UploadModal from 'containers/Upload/UploadModalContainer';
import arrowLine from 'assets/arrowline.svg';

export default class Dashboard extends Component {

  state = {
    isEditTitle: false,
    currentId: null,
    isOpenUploadModal: false,
    editVideo: {},
    editVideoValid: {},
    finishedUpload: false, 
  }

  componentDidMount = () => {
    const { fetchVideos, clearDashboard, fetchFollowers, fetchFollowings } = this.props
    clearDashboard()
    fetchVideos()
    fetchFollowers()
    fetchFollowings()
  }

  componentWillUnmount() {
    const { clearDashboard } = this.props
    clearDashboard()
  }

  checkValid(model) {
    const result = {};
    if (!model.title || (model.title && (model.title.length < 2 || model.title.length > 140))) {
      result.title = 'Your video title must be between 2 and 140 characters';
    }
    if (model.description && (model.description.length < 2 || model.description.length > 2000)) {
      result.description = 'Your video description must be between 2 and 200 characters';
    }
    return result;
  }

  uploadFile = (file) => {
    const {
      uploadFile,
      uploadFileProgressUpdate,
    } = this.props;
    uploadFile({ file, uploadFileProgressUpdate });
    this.setState({
      isOpenUploadModal: true,
      finishedUpload: false,
    })
  }

  handleCloseUploadModal = () => {
    this.setState({
      isOpenUploadModal: false,
      finishedUpload: true,
    })
  }

  editTitleHandler = (id) => {
    const { isEditTitle } = this.state
    if (isEditTitle) {
      this.setState({
        isEditTitle: false
      })
    } else {
      const { videos = [] } = this.props;
      const editVideo = videos.find((item) => item.id === id);
      const editVideoValid = this.checkValid(editVideo);
      this.setState({
        isEditTitle: true,
        currentId: id,
        editVideo,
        editVideoValid
      })
    }
  }

  editInputHandler = (field, value) => {
    const editVideo = {
      ...this.state.editVideo,
      [field]: value,
    };
    const editVideoValid = this.checkValid(editVideo);
    this.setState({
      editVideo,
      editVideoValid
    })
  }

  finishEditTitle = () => {
    const { changeVideoTitle } = this.props;
    const { currentId, editVideo: { title, description } } = this.state;
    changeVideoTitle(currentId, title, description);
    this.editTitleHandler();
  };

  uploadFileFinished = () => {
    this.setState({ finishedUpload: true });
  }

  render() {

    const { history, token, currentPage } = this.props
    const {
      isOpenUploadModal,
      finishedUpload,
      currentId,
      editVideo,
      editVideoValid,
      isEditTitle,
    } = this.state
    const {
      editTitleHandler,
      editInputHandler,
      finishEditTitle,
      handleCloseUploadModal,
    } = this

    let mainContent = ''
    if (currentPage === 0) {
      mainContent = <div>
        <DragAndDrop uploadFile={this.uploadFile} />
        <BottomDiv>
          <CommonLabel><span role='img' aria-label='alert' >☝️</span> Upload Video</CommonLabel>
          <ArrowLine />
          <CommonLabel><span role='img' aria-label='alert' >👟</span> Tag Shoes</CommonLabel>
          <ArrowLine />
          <CommonLabel><span role='img' aria-label='alert' >🔥</span>Publish</CommonLabel>
        </BottomDiv>
      </div>
    }else if (currentPage === 1) {
      mainContent = <Uploads
        currentId={currentId}
        finishEditTitle={finishEditTitle}
        editVideo={editVideo}
        editVideoValid={editVideoValid}
        editInputHandler={editInputHandler}
        editTitleHandler={editTitleHandler}
        isEditTitle={isEditTitle}
        finishedUpload={finishedUpload}
      />
    }else if (currentPage === 2) {//followers
      mainContent = <Followers />
    }else if (currentPage === 3) {//followings
      mainContent = <Followings />
    }
    if (token) {
      return (
        <DashboardLayout history={history}>
          <Content>
            <Helmet>
              <title>Dashboard</title>
            </Helmet>
            {mainContent}
            <UploadModal visible={isOpenUploadModal} onClose={handleCloseUploadModal} uploadFileFinished={this.uploadFileFinished} />
          </Content>
        </DashboardLayout>
      )
    } else {
      return <Redirect to='/' />
    }
  }
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const BottomDiv = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const CommonLabel = styled.div`
  font-size: 20px;
  color: white;
`

const ArrowLine = styled.div`
  background-image: url(${arrowLine});
  background-repeat: no-repeat;
  width: 100px;
  height: 14px;
  display: inline-block;
  margin-left: 20px;
  margin-top: 8px;
`;