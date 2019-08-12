import React from 'react'
import styled from 'styled-components'
import { Icon } from 'react-fa'
import DescriptionInput from 'components/Upload/Steps/Description/DescriptionInput';
import sneaker from 'assets/sneaker.svg';
import TimeAgo from 'react-timeago'

const VideoDescription = ({
  title,
  description,
  cover_picture,
  view_count,
  published,
  products,
  editTitleHandler,
  id,
  editInputHandler,
  editVideo,
  editVideoValid,
  finishEditTitle,
  isEditTitle,
  currentId
}) => {

  return (
    <Content>
      <VideoWrapper>
        <Preview
          src={!cover_picture
          ? 'http://via.placeholder.com/240x135/'
          : cover_picture}
        />
      </VideoWrapper>
      <Info>
        {
            isEditTitle && currentId === id

          ?
            <React.Fragment>
              <TitleEdited>
                <InputVideoTitle
                  type="text"
                  isValid={!(editVideoValid.title)}
                  value={editVideo.title}
                  onChange={(e) => editInputHandler('title', e.target.value)} />
                <StyledIcon
                  onClick={finishEditTitle}
                  name='check' />
              </TitleEdited>
              <HelpText>
                {
                  editVideoValid.title ? 'Your video title must be between 2 and 140 characters' : null
                }
              </HelpText>
              <Description edit={true}>
                <DescriptionInput
                  isValid={!(editVideoValid.description)}
                  maxCount={2000}
                  value={editVideo.description}
                  onChange={(val) => editInputHandler('description', val)}
                />
              </Description>
              <HelpText>
                {
                  editVideoValid.description ? 'Your video description must be between 2 and 2000 characters' : null
                }
              </HelpText>
            </React.Fragment>

          :
            <React.Fragment>
              <Title>
                {title} | {description}
              </Title>
            </React.Fragment>
        }
        <Counters
          isEditTitle={isEditTitle && currentId === id}>
          <p>{view_count || 0} views</p>
          <p><TimeAgo date={published}/></p>
          <Edit
            isEditTitle={isEditTitle}
            onClick={() => editTitleHandler(id)}>edit</Edit>
        </Counters>

        <TagsGroup>
          {
            products.map((item, index) => (
              <TagItem key={index}>
                <ProductThumbnail image={item.primary_picture} />
              </TagItem>
            ))
          }
        </TagsGroup>

      </Info>
    </Content>
  )
}

export default VideoDescription

const Content = styled.div`
  float: left;
  width: 33.3333%;
  border: 0px solid;
  box-sizing: border-box;
  @media  (max-width: 768px) {
    float: none;
    width: auto;
  }
  color: white;
`
const Preview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`
const VideoWrapper = styled.div`
 height: 134px;
 width: 100%;
 margin-right: 15px;
 display: flex;
 justify-content: center;
 padding-left: 50px;
 padding-right: 50px;
 box-sizing: border-box;
`

const StyledIcon = styled(Icon)`
  color: #aaa;
  cursor: pointer;
  padding-left: 20px;

  &:hover {
    color: rgb(35,207,94);
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 50px;
  padding-right: 50px;
  margin-bottom: 50px;
`

const Counters = styled.div`
  display: ${props => props.isEditTitle ? 'none' : 'flex'};
  align-items: center;
  
  p {
    font-size: 12px;
    font-weight: lighter;
    margin-block-end: 0px;
    margin-block-start: 0px;
    &:not(:last-child):after {
      content: '·';
      padding: 0 10px;
    }
  }
`

const Edit = styled.div`
  cursor: pointer;
  pointer-events: all;
  transition: all .2s;
  font-weight: bolder;
  color: #4A90E2;
  font-size: 12px;
`

const Title = styled.div`
  font-size: 14px;
  font-weight: normal;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
`

const TitleEdited = styled.div`
  font-size: 16px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`

const Description = styled.div`
  font-size: 14px;
  position: relative;
  background-color: white;
  background-color: ${props => props.edit ? 'white' : 'black'};
  color: ${props => props.edit ? 'black' : 'white'};
`

const InputVideoTitle = styled.input`
  border-radius: 8px;
  border: 1px solid #a1a1a1;
  border: ${props => props.isValid ? '1px solid #a1a1a1' : '1px solid #fd3649'};
  padding: 14px 28px;
  font-size: 16px;

  :focus {
    outline: none;
    border-color: ${props => props.isValid ? '#2b2b2b' : '#fd3649'};
  }
`;
const HelpText = styled.div`
  color: #fd3649;
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 300;
`;

export const TagsGroup = styled.div `
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
  overflow-x: auto;
  min-height: 50px;
`;

export const TagItem = styled.div `
  width: 50px;
  height: 50px;
  min-width: 50px;
  min-height: 50px;
  margin-right: 10px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:last-child {
    margin-right: 0;
  }

  &:hover .fa {
    display: inline-block;
  }
`;

export const ProductThumbnail = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
   background-image: ${props => props.image ? `url(${props.image})` : `url(${sneaker})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #fff;
  border-radius: 8px;
`;