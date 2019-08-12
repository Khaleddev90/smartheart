import React, { Component } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import Layout from 'components/hoc/Layout/index'
import Dropzone from 'react-dropzone'
import oval from 'assets/Oval@2x.png'
import arrowImg from 'assets/rightarrow@2x.png'

export default class FinishSignup extends Component {

	state = {
		note: '',
		note_length: 0,
		file:[],
  }
  componentDidMount = () => {
	}
	
	handleChangeNote = (e) => {
		let note = e.target.value
		let note_length = e.target.value.length
		if(note_length > 240) return
		this.setState({
			note: note,
			note_length: note_length
		})
	}

	handleChangePhoto = (files) => {

		let reader = new FileReader();
    let file = files[0];

    reader.onloadend = () => {
      this.setState({
        file: files,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file)
	}

	setNextHandler = () => {
		if (this.state.file.length === 0) {
			return
		}
		this.props.updateProfile(this.state.file[0], this.state.note)
	}

  render() {
		const {
			history,
		} = this.props
		
		const disable = (this.state.file.length === 0) ? true : false
		let {imagePreviewUrl} = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (<OvalImg width="100px" height="100px" src={imagePreviewUrl} />);
    } else {
      imagePreview = (<OvalImg src={oval} />);
		}
		
    return (
			<Layout hidefooter>
				<Content>
					<Helmet>
						<title>Finish Signing up</title>
					</Helmet>
					<TitleLabel>Finish Signing up</TitleLabel>
					<SubContent>
						<SubTitleLabel>1. Add a profile picture</SubTitleLabel>
							<UploadButton onDrop={(file) => this.handleChangePhoto(file)}
              multiple={false}
              accept="image/*">{imagePreview}Upload Photo</UploadButton>
						<SubTitleLabel>2. Add a profile description</SubTitleLabel>
						<Note placeholder="Say something about yourself" onChange={(e) => this.handleChangeNote(e)} value={this.state.note} />
						<Countletter>{this.state.note_length}/240</Countletter>
							
						<Row>
							<NextButton disabled={disable}
								onClick={() => this.setNextHandler()}
							>
								<ArrowImg src={arrowImg}/>
							</NextButton>
							<SkipButton  onClick={(e) => history.push('/follow')}>Skip</SkipButton>
						</Row>						
					</SubContent>                    
				</Content>
			</Layout>			
    )
  }
}

const Note = styled.textarea`
  height: 120px;
	border-radius: 8px;
	border: 1px solid #c1c1c1;
  font-size: 20px;
	margin-top: 30px;
	padding: 15px 25px 30px;

	:focus{
		outline: 0;
	}

	::placeholder{
		color: #c1c1c1;
	}
`

const Countletter = styled.span`
	bottom: 5px;
	font-size: 20px;
	color: #c1c1c1;
	text-align: right;
	margin-top: -27px;
	padding-right: 35px;
	position: relative;
`

const OvalImg = styled.img`
	width: 100px;
	margin-right: 20px;
	border-radius: 50px;
  
`

const UploadButton = styled(Dropzone)`
	border-radius: 12px;
	font-size: 24px;
	padding: 30px 0px;
	color: #4A90E2;
	display: flex;
	cursor: pointer;
	height: 100px;
	align-items: center;
`

const TitleLabel = styled.div`
	text-align: center;
	margin-top: 40px;
	margin-bottom: 30px;
	font-size: 48px;
	font-weight: bold;
`

const SubTitleLabel = styled.div`
	text-align: left;
	margin-top: 30px;
	font-size: 32px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
`
const SubContent = styled.div`
  display: flex;
	flex-direction: column;
	margin: 0 20%;
`

const CustomButton = styled.div`
  border: 3px solid #000;
  padding: 10px 0;
  cursor: pointer;
  border-radius: 12px;
  text-align: center;
	font-size: 18px;
	font-weight: bold;
  color: #000;
  -webkit-transition: border,color .5s;
  transition: border,color .5s;
  -webkit-transform: translate3d(0,0,0);
  -ms-transform: translate3d(0,0,0);
  transform: translate3d(0,0,0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000px;
  -moz-perspective: 1000px;
  -ms-perspective: 1000px;
  perspective: 1000px;
	border: none;
	padding: 13px;
	margin: auto;
	width: 232px;
	color: white;
`

const SkipButton = styled(CustomButton)`
	width: fit-content;
	margin: auto;
	float: right;
	margin-top: 5px;
	color: #4A4A4A;
	margin-right: 50px;
`

const NextButton = styled(CustomButton)`
  background-color: ${props => props.disabled ? '#d8d8d8' : '#fd3649'};
  
  display: inline-flex;
  border-radius: 50%;
  min-width: 20px;
  min-height: 20px;
  padding: 5px;
  color: white;
  text-align: center;
  line-height: 1;
  box-sizing: content-box;
  white-space: nowrap;
	float: right;
	width: 50px;

	&:before {
		content: "";
		display: inline-block;
		vertical-align: middle;
		padding-top: 100%;
		height: 0;
	}
 	img {
  width: 22px;
  height: 10px;
  margin-top: 21px;
  margin-left: 15px;
  margin-right: 15px;
  }

`
const ArrowImg = styled.img`
  
`
const Row = styled.div`
  content: '';
  display: inline-block;
  clear: both;
	width: 100%;
	margin-top: 20px;

`