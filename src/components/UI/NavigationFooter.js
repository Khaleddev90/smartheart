import React  from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import appStore from 'assets/appstore@3x.gif';

export default function NavigationFooter() {
  return (
    <Wrapper>
      <Body>
        <Block>
          <Label>Company</Label>
          <Menu>
            <MenuItem>
              <MenuItemLink to="/how-it-works">How It Works</MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink to="/jobs">Jobs</MenuItemLink>
            </MenuItem>
          </Menu>
        </Block>
        <Block>
          <Label>Legal</Label>
          <Menu>
            <MenuItem>
              <MenuItemLink to="/terms-of-use">Terms and Conditions</MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink to="/privacy-policy">Privacy Policy</MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink to="/cookie-policy">Cookie Policy</MenuItemLink>
            </MenuItem>
          </Menu>
        </Block>
        <Block>
          <Label>Community</Label>
          <Menu>
            <MenuItem>
              <MenuItemA href="https://heartface.zendesk.com/hc/en-us/articles/360007046031-Community-Guidelines">Community Guidelines</MenuItemA>
            </MenuItem>
            <MenuItem>
              <MenuItemA href="http://heartface.zendesk.com/">Support</MenuItemA>
            </MenuItem>
          </Menu>
        </Block>
        <div>
          <StoreLink src={appStore}/>
        </div>
      </Body>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: #eeeeee;
  width: 100%;
  position: relative;
`;

const Body = styled.div`
  font-size: 18px;
  font-weight: 400;
  padding: 25px 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 25px 20px;
  }

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const Block = styled.div`
`;

const Label = styled.span`
  color: #000000;
  font-weight: 600;
`;

const Menu = styled.ul`
  color: #606060;
  margin: 15px 0;
  padding: 0;
  list-style: none;
`;

const MenuItem = styled.li`
  line-height: 1.6;
`;

const MenuItemA = styled.a`
  color: #606060;
  text-decoration: none;

  &:hover,
  &:focus {
    color: #000000;
  }
`;

const MenuItemLink = styled(Link)`
  color: #606060;
  text-decoration: none;

  &:hover,
  &:focus {
    color: #000000;
  }
`;

const StoreLink = styled.img`
  margin: 0 auto;
  height: 38px;
`;
