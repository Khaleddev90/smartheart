import React from 'react'
import styled from 'styled-components'

import Adidas from 'assets/store-logos/Adidas.png'
import FightClub from 'assets/store-logos/FightClub.jpeg'
import FootAsylum from 'assets/store-logos/FootAsylum.jpg'
import FootLocker from 'assets/store-logos/FootLocker.jpeg'
import FootPatrol from 'assets/store-logos/FootPatrol.jpg'
import NewBalance from 'assets/store-logos/NewBalance.png'
import Nike from 'assets/store-logos/Nike.png'
import OffSpring from 'assets/store-logos/OffSpring.png'
import Schuh from 'assets/store-logos/Schuh.jpg'
import SportDirect from 'assets/store-logos/SportDirect.png'
import Timberland from 'assets/store-logos/Timberland.png'
import UrbanIndustry from 'assets/store-logos/UrbanIndustry.jpeg'
import UrbanOutfitters from 'assets/store-logos/UrbanOutfitters.png'
import Vans from 'assets/store-logos/Vans.png'


const Stores = () => {
    return (
        <Content>
            <StoreItem target="_blank" href='https://www.adidas.co.uk'>
                <StoreItemBg src={Adidas} />
                <StoreItemName>Adidas</StoreItemName>
            </StoreItem>
            <StoreItem target="_blank" href='https://www.flightclub.com/'>
                <StoreItemBg src={FightClub} />
                <StoreItemName>Fight Club</StoreItemName>
            </StoreItem>
            <StoreItem target="_blank" href='https://www.footasylum.com/'>
                <StoreItemBg src={FootAsylum} />
                <StoreItemName>Foot Asylum</StoreItemName>
            </StoreItem>
            <StoreItem target="_blank" href='http://www.footlocker.co.uk'>
                <StoreItemBg src={FootLocker} />
                <StoreItemName>Foot Locker</StoreItemName>
            </StoreItem>
            <StoreItem target="_blank" href='https://www.footpatrol.com/shop'>
                <StoreItemBg src={FootPatrol} />
                <StoreItemName>Foot Patrol</StoreItemName>
            </StoreItem>
            <StoreItem target="_blank" href='http://www.newbalance.co.uk'>
                <StoreItemBg src={NewBalance} />
                <StoreItemName>New Balance</StoreItemName>
            </StoreItem>
            <StoreItem target="_blank" href='http://www.nike.com'>
                <StoreItemBg src={Nike} />
                <StoreItemName>Nike</StoreItemName>
            </StoreItem>
            <StoreItem target="_blank" href='http://www.offspring.co.uk'>
                <StoreItemBg src={OffSpring} />
                <StoreItemName>Offspring</StoreItemName>
            </StoreItem>
            <StoreItem target="_blank" href='http://www.schuh.co.uk'>
                <StoreItemBg src={Schuh} />
                <StoreItemName>Schuh</StoreItemName>
            </StoreItem>
            <StoreItem target="_blank" href='https://www.sportsdirect.com/'>
                <StoreItemBg src={SportDirect} />
                <StoreItemName>Sport Direct</StoreItemName>
            </StoreItem>
            <StoreItem target="_blank" href='https://www.timberland.co.uk/'>
                <StoreItemBg src={Timberland} />
                <StoreItemName>Timeberland</StoreItemName>
            </StoreItem>
            <StoreItem target="_blank" href='http://www.urbanindustry.co.uk'>
                <StoreItemBg src={UrbanIndustry} />
                <StoreItemName>Urban Industry</StoreItemName>
            </StoreItem>
            <StoreItem target="_blank" href='https://www.urbanoutfitters.co.uk'>
                <StoreItemBg src={UrbanOutfitters} />
                <StoreItemName>Urban Outfitters</StoreItemName>
            </StoreItem>
            <StoreItem target="_blank" href='http://www.vans.com'>
                <StoreItemBg src={Vans} />
                <StoreItemName>Vans</StoreItemName>
            </StoreItem>
        </Content>
    )
}

export default Stores

const Content = styled.div`
    padding: 25px 30px 0;
    /* margin: 0 -20px; */
    display: flex;
    flex-wrap: wrap;
`


const StoreItem = styled.a`
  width: calc(50% - 40px);
  margin: 0 20px 20px;
  text-align: center;
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.2s ease-out;
  text-decoration: none;
  color: #000;
  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`

const StoreItemBg = styled.img `
  height: 50px;
  width: auto;
  margin-bottom: 10px;
`

const StoreItemName = styled.div `
  font-size: 0.875em;;
`