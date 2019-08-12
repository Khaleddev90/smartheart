import React, { Component } from 'react'
import styled from 'styled-components'
import Spinner from 'react-spinkit'

import { dopendingVideos } from 'utils/api'

import VideoDescription from 'components/Dashboard/components/VideoDescription'
import PendingVideos from '../PendingVideos'

class Uploads extends Component {
  state = {
    pendingVideos: [],
    firstVideoFetch: true,
  };

  async componentDidMount() {
    this.mount = true
    try {
      const res = await dopendingVideos();
      this.setPendingVideos(res.data);
      if (!res.data.length) {
        this.props.clearDashboard()
        this.props.fetchVideos()
        return;
      }
      setTimeout(() => {
        this.fetchPendigVideos();
      }, 3000)
    } catch (error) {
      console.log(error);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.finishedUpload) {
      this.fetchPendigVideos();
    }
  }
  
  componentWillUnmount() {
    this.mount = false
  }

  fetchPendigVideos = async () => {
    try {

      if (this.mount) {// avoid unnecessary api call 
        console.log('currentpage' + this.props.currentPage)
        const res = await dopendingVideos();
        this.setPendingVideos(res.data);
        if (!res.data.length) {
          const { firstVideoFetch } = this.state;
          if (firstVideoFetch) {
            this.setState({ firstVideoFetch: false }, () => {
              this.props.clearDashboard()
              this.props.fetchVideos()
            });
          }
          return;
        }
      }

      setTimeout(() => {
        this.fetchPendigVideos();
      }, 3000)
    } catch (error) {
      console.log(error);
    }
  }

  setPendingVideos(data) {
    this.setState({
      pendingVideos: data
    });
  }

  render() {
    const {
      videos,
      editTitleHandler,
      editInputHandler,
      editVideo,
      editVideoValid,
      finishEditTitle,
      isEditTitle,
      currentId,
      error,
    } = this.props

    const { pendingVideos } = this.state

    return (
      <Content ready={true}>
        <Title>Uploads</Title>
        <Container>
        {
          pendingVideos.length ? pendingVideos.map((item, key) =>
              <PendingVideos
                key={key}
                title={item.title}
                description={item.description}
                products={item.products} />
          ) :
            null
        }
        {
          error ? (
            <NotFound>Error fetching videos. Click <a href="/" onClick={(e) => {
              e.preventDefault()
              window.location.reload(false)
            }}>here</a> to reload.</NotFound>
          ) : videos
              ?
              !videos.length ? (
                <NotFound>You have not uploaded any videos yet <span role="img" aria-label="monkey">🙈</span></NotFound>
              ) : videos.map((item, key) => {
                const {
                  title,
                  description,
                  cover_picture,
                  view_count,
                  published,
                  products,
                  id
                } = item
                return (
                  <VideoDescription
                    currentId={currentId}
                    isEditTitle={isEditTitle}
                    finishEditTitle={finishEditTitle}
                    editVideo={editVideo}
                    editVideoValid={editVideoValid}
                    editInputHandler={editInputHandler}
                    products={products}
                    id={id}
                    editTitleHandler={editTitleHandler}
                    key={key}
                    title={title}
                    description={description}
                    cover_picture={cover_picture}
                    view_count={view_count}
                    published={published}
                  />
                )
              })
              :
              <Placeholder>
                <Spinner name="line-scale-pulse-out-rapid" />
              </Placeholder>
        }
        </Container>
      </Content>
    )
  }
}

export default Uploads;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  ${props => props.ready
    ?
    'justify-content: null; align-items: null;'
    :
    ' justify-content: center; align-items: center;'}
  margin: 40px 0;
`

const Container = styled.div`
  content: "";
  display: table;
  clear: both;
  
`

const Title = styled.h1`
  font-size: 25px;
  padding: 10px 0;
  align-self: flex-start;
  color: white;
  margin-left: 100px;
`

const Placeholder = styled.div`
  height: 500px;
  display: flex;
  justify-content: center;
  align-content: center;
`

const NotFound = styled.h2`
  font-weight: 600;
  text-align: center;
  color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 2000;
  background-color: black;
`;
