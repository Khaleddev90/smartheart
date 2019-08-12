import React, { Component } from 'react'
import styled from 'styled-components'
import keydown from 'react-keydown'
import { Link } from 'react-router-dom'
import Header from 'components/Main/Header'
import Footer from 'components/UI/Footer'
import LoginRegister from 'components/Main/LoginRegister'
import { Container } from 'components/UI/Container'
import { doGetHomePageContent } from 'utils/api';
import backgroundImg from 'assets/joshua-fuller.png'
import videoImg from 'assets/videoImg.png'
import videoImgMobile from 'assets/videoImg_mobile.png'
import finalVideo from 'assets/final.mp4'
import oval from 'assets/oval.png'
import arrowLine from 'assets/arrowline.svg';
import appStore from 'assets/download-apple.png'

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.changeWord();
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    if (document.getElementById('root').scrollTop <= 0 && this.state.fixedFooter) {
      this.setState({ fixedFooter: false });
    } else if (document.getElementById('root').scrollTop > 0 && !this.state.fixedFooter) {
      this.setState({ fixedFooter: true });
    }
  }

  changeWord() {
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % this.words.length;
      this.setState({ nextWord: this.words[idx] });
      setTimeout(() => {
        this.setState({ currentWord: this.words[idx] })
      }, 750)
    }, 3000)
  }

  componentDidMount() {
    this.setState({width: window.innerWidth, height:window.innerHeight})
    window.addEventListener('resize', this.updateWindowDimensions);
    document.getElementById('root').addEventListener('scroll', this.handleScroll);
    doGetHomePageContent()
      .then( response => {
        this.setState({
          isLoading: false,
          videos: response.data && response.data.featured_videos,
          channels: response.data && response.data.featured_profiles,
        });
      })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  @keydown( 'esc' )
  submit( event ) {
    const { popup: { type, isToggled } } = this.props
    if (type === 'login' && isToggled) {
      this.closePopup()
    } else return null
  }

  // get the windows width and height when broswer size is changed
  updateWindowDimensions = () => {
    this.setState({width: window.innerWidth, height:window.innerHeight})

  }

  closePopup = () => {
    const { togglePopup, clearError } = this.props
    clearError()
    togglePopup({ type: 'login', isToggled: false })
    this.setState({login: '', password: ''})
  }

  showPopup = () => {
    if (localStorage.getItem('login') !== null) {
      this.setState({login: localStorage.getItem('login')})
      this.setState({password: localStorage.getItem('password')})
    }
    const { togglePopup } = this.props
    togglePopup({ type: 'login', isToggled: true })
    this.props.showSignin()
  }
  words = ['Unboxings', 'Reviews', 'Hauls'];

  state = {
    login: '',
    password: '',
    isError: false,
    currentWord: this.words[0],
    nextWord: this.words[0],
    videos: [],
    channels: [],
    isLoading: true,
    fixedFooter: false,
    width: 0,
    height: 0,
    gender: 'man',
    birthdate: new Date(),
    rememberme: false,
    fbusername: '',
    fb_token: '',
    typingTimeout: 0,
  };

  fbusernameHandler = (e) => {
    const self = this

    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout)
    }

    this.setState({
      typingTimeout: setTimeout(() => {
        self.props.checkUsername(self.state.fbusername)
      }, 100),
      fbusername: e.target.value
    })
  }

  setFbUsernameHandler = () => {
    this.props.fbRegister(this.state.fb_token, this.state.fbusername)
  }

  loginHandler = (e) => {
    this.setState({
      login: e.target.value
    })
  }

  passwordHandler = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  setLoginHandler = () => {
    const { authorize } = this.props
    const { login, password, rememberme } = this.state
    authorize(login, password, rememberme)
  }

  //for register handler
  fullnameHandler = (e) => {
    this.setState({
      fullname: e.target.value
    })
  };
  usernameHandler = (e) => {
    this.setState({
      username: e.target.value
    })
  };
  pwRegisterHandler = (e) => {
    this.setState({
      pwRegister: e.target.value
    })
  };
  emailHandler = (e) => {
    this.setState({
      email: e.target.value
    })
  };

  setRegisterHandler = () => {
    this.props.showGender()
  }

  rememberHandler = (e) => {
    this.setState(prevState => {
      let rememberme = !prevState.rememberme
      return {rememberme: rememberme}
    })
  }

  genderHandler = (e) => {
    this.setState({
      gender: e.target.getAttribute('value')
    })
  }

  birthdateHandler = (date) => {
    this.setState({
      birthdate: date
    })
  }

  setGenderBithdateHandler = (e) => {
    
    const { clearError, register } = this.props
    clearError()
    register(this.state.username,
      this.state.fullname,
      this.state.email,
      this.state.pwRegister,
      this.state.gender,
      this.state.birthdate
    )
  }

  facebookRegisterHandler = (response) => {
    if (response.accessToken && response.accessToken !== '') {
      this.setState({fb_token: response.accessToken})
      this.props.showUsername()
    }
  }

  facebookLoginHandler = (response) => {
    if (response.accessToken && response.accessToken !== '') {
      this.setState({fb_token: response.accessToken}, () => {this.props.fbRegister(this.state.fb_token, 'test')})
    }
    
  }

  handleAppStore = (e) => {
    const url = 'https://itunes.apple.com/gb/app/heartface/id1265136931?mt=8';
    window.open(url, '_blank');
  }

  render() {
    const {
      popup: { isToggled, type },
      error,
      token,
      history,
      currentStep,
      showSignin,
      showSignup,
      usernameAvailable,
    } = this.props

    const {
      login,
      password,
      fixedFooter,
      gender,
      birthdate,
      rememberme,
      email,
      fullname,
      username,
      pwRegister,
      fbusername,
    } = this.state

    const scaleOfWindow = this.state.height/1024 //get the scale of window/design_height

    let topInnerText = this.state.width > 1300 ? 348*scaleOfWindow : 0
    let leftInnerText = this.state.width > 1300 ? 883*scaleOfWindow : 50


    const widthOval = this.state.width > 1300 ? 380*scaleOfWindow : 220*scaleOfWindow
    const heightOval = this.state.width > 1300 ? 32*scaleOfWindow : 18*scaleOfWindow

    const leftOval = this.state.width > 1300 ? 401*scaleOfWindow : 468*scaleOfWindow
    const bottomOval = this.state.width > 1300 ? 195*scaleOfWindow : 179*scaleOfWindow


    const widthVideo = this.state.width > 1300 ? 285*scaleOfWindow : 220*scaleOfWindow
    const heightVideo = this.state.width > 1300 ? 617*scaleOfWindow : 476*scaleOfWindow
    const leftVideo = this.state.width > 1300 ? 448*scaleOfWindow : 468*scaleOfWindow
    const bottomVideo = this.state.width > 1300 ? 207*scaleOfWindow : 188*scaleOfWindow


    return (
     <Content>
        <MainArea>
          <Cover>
            <Container>
              <Header
                history={history}
                token={token}
                openPopup={() => this.showPopup()}
                isPopupOpen={isToggled && type === 'login'}
                />
            </Container>
            
            <LoginRegister
              currentStep={currentStep}
              password={password}
              login={login}
              isError={error}
              gender={gender}
              rememberme={rememberme}
              email={email}
              fullname={fullname}
              username={username}
              pwRegister={pwRegister}
              isCredentialsSet={login && password ? true : false}
              setLoginHandler={this.setLoginHandler}
              passwordHandler={this.passwordHandler}
              loginHandler={this.loginHandler}
              facebookRegisterHandler={this.facebookRegisterHandler}
              facebookLoginHandler={this.facebookLoginHandler}
              openPopup={() => this.showPopup()}
              closePopup={() => this.closePopup()}
              isPopupOpen={isToggled && type === 'login'}
              fullnameHandler={this.fullnameHandler}
              usernameHandler={this.usernameHandler}
              pwRegisterHandler={this.pwRegisterHandler}
              emailHandler={this.emailHandler}
              setRegisterHandler={this.setRegisterHandler}
              rememberHandler={this.rememberHandler}
              genderHandler={this.genderHandler}
              birthdate={birthdate}
              birthdateHandler={this.birthdateHandler}
              setGenderBithdateHandler={this.setGenderBithdateHandler}
              showSignin={showSignin}
              showSignup={showSignup}
              fbusername={fbusername}
              fbusernameHandler={this.fbusernameHandler}
              setFbUsernameHandler={this.setFbUsernameHandler}
              usernameavailable={usernameAvailable}
            />
          </Cover>
          <Body>
            <Background
              style={{
                height : this.state.height + 'px',
                backgroundSize: 635*scaleOfWindow + 'px,' + 487*scaleOfWindow + 'px',
              }}
            >
              <video
                autoPlay muted loop="true"
                style={{
                  height : Math.floor(heightVideo) + 'px',
                  width: Math.floor(widthVideo) + 'px',
                  marginLeft: Math.floor(leftVideo) + 'px',
                  marginBottom: Math.floor(bottomVideo) + 'px',
                  position: 'absolute',
                  bottom: '0px',
                }}
              >
                <source src={finalVideo} type="video/mp4"/>
                Your browser does not support the video tag.
              </video>
              <VideoImg
                style={{
                  height : Math.floor(heightVideo)+2 + 'px',
                  width: Math.floor(widthVideo)+5 + 'px',
                  marginLeft: Math.floor(leftVideo)-3 + 'px',
                  marginBottom: Math.floor(bottomVideo)-1 + 'px',
                }}/>
              <Oval
                style={{
                  height : heightOval + 'px',
                  width: widthOval + 'px',
                  marginLeft: leftOval + 'px',
                  marginBottom: bottomOval + 'px',
                }}
              />
            </Background>
            <Title>
              <InnerText
                style={{
                  marginLeft: leftInnerText + 'px',
                  marginTop: topInnerText + 'px',
                }}
              >
                The world’s first (truly) shoppable
                <Space />
                social video platform.
                <Space />
                <SubTitle>
                  <NavItem to='/how-it-works'>How it works<ArrowLine /></NavItem>

                </SubTitle>

              </InnerText>
            </Title>
          </Body>
          <MobileBody>
            <video autoPlay muted loop="true"
              style={{
                backgroundSize: '250px',
                width: '260px',
                height: '551px',
                position: 'absolute',
                left: '50%',
                marginLeft: '-128px',
                marginTop: '5px',

              }}
            >
              <source src={finalVideo} type="video/mp4"/>
              Your browser does not support the video tag.
            </video>
            <VideoImgMobile />
            <Oval />
            <AppLinks onClick={ e => this.handleAppStore(e)}>
             <AppStore src={appStore} />
            </AppLinks>
          </MobileBody>
        </MainArea>
        <Footer color={'#202020'} fixed={fixedFooter}

        history={history}
        token={token}
        openPopup={() => this.showPopup()}
        isPopupOpen={isToggled && type === 'login'}/>
     </Content>
    )
  }
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainArea = styled.div`
  height: 100vh;
  position: relative;

  @media  (min-width: 768px) and (max-width: 812px) and (orientation :landscape) {
    height: inherit;
  }
  @media (max-width: 767px) {
    height: inherit;
  }

`;

const Body = styled.div`
  display: flex;
  @media  (min-width: 768px) and (max-width: 1300px) and (orientation :portrait) {
    flex-direction: column-reverse;
  }

  @media  (min-width: 768px) and (max-width: 812px) and (orientation :landscape) {
    display: none;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const Cover = styled.div`
  background: #fff;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: inline;
  flex-direction: column;
  align-items: center;
`;

const Background = styled.div`
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-position: left bottom;
  z-index: -1;
  display: inline-block;
  width: 100%;position: absolute;
  left: 0;
  bottom: 0;
`;

const VideoImg = styled.div`
  background-image: url(${videoImg});
  background-repeat: no-repeat;
  background-size: cover;
  width: 285px;
  height: 617px;
  margin-left: 420px;
  z-index: 999;
  margin-top: 00PX;
  bottom: 0px;
  position: absolute;
  margin-bottom: 230px;

  @media  (min-width: 768px) and (max-width: 1300px) and (orientation :portrait) {
    margin-bottom: 450px;
    width: 220px;
    height: 476px;
    margin-left: 450px;
  }
  @media  (min-width: 768px) and (max-width: 812px) and (orientation :landscape) {
    margin: 10px auto;
    width: 261px;
    height: 561px;
    position: relative;
  }
  @media (max-width: 767px) {
    margin: 10px auto;
    width: 261px;
    height: 561px;
    position: relative;
  }

`;

const VideoImgMobile = styled(VideoImg)`
  background-image: url(${videoImgMobile});
`;

const Oval = styled.div`
  background-image: url(${oval});
  background-repeat: no-repeat;
  width: 380px;
  height: 32px;
  z-index: -1;
  margin-left: 370px;
  background-size: cover;
  margin-top: -10px;
  position: absolute;
  bottom: 0px;
  margin-bottom: 160px;


  @media  (min-width: 768px) and (max-width: 1300px) and (orientation :portrait){
    margin-bottom: 435px;
    width: 220px;
    height: 18px;
    margin-left: 450px;
  }
  @media  (min-width: 768px) and (max-width: 812px) and (orientation :landscape) {
    margin: -25px auto;
    z-index: -1;
    width: 261px;
    position: relative;
    height: 21px;
  }
  @media (max-width: 767px) {
    margin: -25px auto;
    z-index: -1;
    width: 261px;
    position: relative;
    height: 21px;
  }
`;


const Title = styled.div`
  width: 50%;
  font-size: 32px;
  letter-spacing: 0.25px;
  color: #4a4a4a;
  display: inline-block;

  @media  (min-width: 768px) and (max-width: 1300px) {
    width: 100%;
    height: 300px;
    margin-top: 20px;
  }
`;

const Space = styled.div`
  display: block;
  margin: 20px 0;
`;

const InnerText = styled.div`
  width: 500px;
  height: 160px;
  font-weight: 300;
  @media  (min-width: 768px) and (max-width: 1300px) {
    margin: 80px 50px;
  }
`;

const SubTitle = styled.div`
  width: 390px;
  font-size: 32px;
  letter-spacing: 0.25px;
  color: #a1a1a1;
  font-weight: 100;
  display: inline-block;
`;

const NavItem = styled(Link)`
  text-decoration: none;
  font-size: 32px;
  letter-spacing: 0.25px;
  color: #a1a1a1;
  font-weight: 100;
`;

const ArrowLine = styled.div`
  background-image: url(${arrowLine});
  background-repeat: no-repeat;
  width: 100px;
  height: 14px;
  display: inline-block;
  margin-left: 20px;
`;

const MobileBody = styled.div`
  display: none;
  @media  (min-width: 768px) and (max-width: 812px) and (orientation :landscape) {
    display: block;
  }
  @media (max-width: 767px) {
    display: block;
  }
`;

const AppStore = styled.img`
  margin: 55px auto;
  width: 112px;
  height: 38px;
`;

const AppLinks = styled.div`
  display: flex;
  flex-direction: column;

  & > .disabled {
    opacity: 0.4;
  }

  @media (max-width: 950px) {
    flex-direction: row;
  }

  @media  (min-width: 768px) and (max-width: 812px) and (orientation :landscape) {
    margin-top: 20px;
    margin-bottom: 45px;
    flex-direction: column;
    & > * {
      margin-bottom: 10px;
    }
  }
  @media (max-width: 767px) {
    margin-top: 20px;
    margin-bottom: 45px;
    flex-direction: column;
    & > * {
      margin-bottom: 10px;
    }
  }
`;

