import React  from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import logo from 'assets/white-logo.svg';
import menuButton from 'assets/menuicon.png';
import menuClose from 'assets/menuclose.png';

export default class GradientHeader extends React.Component {
  state = {
    menuOpen: false,
  };

  handleToggleMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen,
    })
  }

  render() {
    const {
      items
    } = this.props;
    const {
      menuOpen,
    } = this.state;
    return (
      <Wrapper>
        <Navbar open={menuOpen}>
          <Link to="/">
            <Logo src={logo}/>
          </Link>
          <MenuButtonWrapper onClick={() => this.handleToggleMenu()}>
            <MenuButton open={menuOpen} src={menuOpen ? menuClose : menuButton}  />
          </MenuButtonWrapper>
          <MenuList open={menuOpen}>
      	    {items.map( menuItem => {
	       return (menuItem.external) ?
        	 <NavbarItemA key={menuItem.to} href={menuItem.to} target="_blank">{menuItem.label}</NavbarItemA> :
	         <NavbarItem key={menuItem.to} to={menuItem.to}>{menuItem.label}</NavbarItem>;
      	    })}
          </MenuList>
        </Navbar>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background-image: linear-gradient(225deg, #af53fe 0%, #fd3649 100%);
  width: 100%;
  position: relative;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const Navbar = styled.div`
  padding: 0 100px;
  height: ${props => props.open ? '215px' : '60px'};
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 20px;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

export const MenuList = styled.div`
  display: block;
  @media (max-width: 576px) {
    display: ${props => props.open ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    width: 100%;
    line-height: 2.4;
  }
`;

const MenuButtonWrapper = styled.div`
  display: none;
  @media (max-width: 576px) {
    display: block;
  }
`;

const MenuButton = styled.img`
  width: ${props => props.open ? '16px' : '31px'};
  height: ${props => props.open ? '16px' : '21px'};
`;

const Logo = styled.img`
  width: 33px;
  height: 33px;
  margin-right: 25px;
`;

export const NavbarItem = styled(NavLink)`
  opacity: 0.4;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  text-decoration: none;
  margin-left: 25px;

  &:hover,
  &:active,
  &.active,
  &:focus {
    opacity: 1;
  }
`;

export const NavbarItemA = styled.a`
  opacity: 0.4;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  text-decoration: none;
  margin-left: 25px;

  &:hover,
  &:active,
  &.active,
  &:focus {
    opacity: 1;
  }

  @media (max-width: 576px) {
    margin-left: 0;
  }
`;