import React from "react";
import {
  Container,
  ImagesContainer,
  Introduction,
  Section,
  SectionContent,
  SectionTitle,
  SectionContentLeft,
  SectionContentRight,
  Bottom,
  Cards
} from "./styled";
import { Helmet } from "react-helmet";
import CustomButton from "components/UI/CustomButton";
import PersonCard from "./PersonCard";
import manJacket from "assets/manJacket.png";
import Schuch from "assets/store-logos/Schuh.jpg";
import Adidas from "assets/store-logos/Adidas.png";
import OffSpring from "assets/store-logos/OffSpring.png";
import SportDirect from "assets/store-logos/SportDirect.png";
import Kickz from "assets/store-logos/Kickz.png";
import FootLocker from "assets/store-logos/FootLocker.png";
import Nike from "assets/store-logos/Nike.png";
import FootAsylum from "assets/store-logos/FootAsylum2.png";
import samuel from "assets/samuel1.jpg";
import samuel2 from "assets/samuel2.jpg";
import ashBash from "assets/ashBash1.jpg";
import ashBash2 from "assets/ashBash2.jpg";
import DefaultLayout from "components/Layout/DefaultLayout";
import detectMobile from 'utils/detectMobile'

const storeIcons = [
  Adidas,
  OffSpring,
  Kickz,
  SportDirect,
  FootLocker,
  Nike,
  Schuch,
  FootAsylum
];

export default class HowItWorks extends React.Component {
  handleClick = () => {
    if (detectMobile()) {
      const url = 'https://itunes.apple.com/gb/app/heartface/id1265136931?mt=8';
      window.open(url, '_blank');
    } else {
      this.props.togglePopup({ type: "login", isToggled: true });
    }
  };

  render() {
    return (
      <DefaultLayout {...this.props}>
        <Helmet>
          <title>How It Works</title>
        </Helmet>
        <Container>
          <Introduction>
            <h1>Shop like it’s 2018, not 2005.</h1>
            <p>
              Join thousands in the world’s first (truly) shoppable social video
              platform. With Heartface, you don’t just watch reviews and
              unboxings - you can shop stuff you love without ever leaving the
              app. That’s what we mean by truly shoppable. No more ugly
              affiliate “links in the description”, no more redirects; discover
              and shop seamlessly.
            </p>
          </Introduction>
          <Section>
            <SectionTitle>Upload to Heartface</SectionTitle>
            <SectionContent>
              <SectionContentLeft>
                <Cards>
                  <PersonCard
                    profilePicture={samuel2}
                    background={samuel}
                    name="Samuel Sagua"
                    social="@SamuelSagua"
                  />
                  <PersonCard
                    profilePicture={ashBash}
                    background={ashBash2}
                    name="Ash Bash Sneakers"
                    social="@AshBashSneakers"
                  />
                </Cards>
              </SectionContentLeft>
              <SectionContentRight>
                <h2>Clout chases you</h2>
                <p>
                  Heartface is built to help viewers find your content. From
                  hypebeasts and sneaker-nerds to the average fashion
                  enthusiast, everyone knows you.
                </p>
                <h2>Search and tag</h2>
                <p>
                  Tag products to your video with one click with a simple search
                  to our massive database of sneakers.
                </p>
                <h2>Get rewarded</h2>
                <p>
                  Tag products to your video with one click with a simple search
                  to our massive database of sneakers.
                </p>
                <div>
                  <CustomButton
                    onClick={this.handleClick}
                    text="Get Started"
                  />
                </div>
              </SectionContentRight>
            </SectionContent>
          </Section>
          <Section>
            <SectionTitle>Watch Heartface</SectionTitle>
            <SectionContent>
              <SectionContentLeft>
                <img src={manJacket} alt="Man Jacket" />
                <ImagesContainer>
                  {storeIcons.map(icon => (
                    <div key={icon}>
                      <img src={icon} alt="Store-Icon" />
                    </div>
                  ))}
                </ImagesContainer>
              </SectionContentLeft>
              <SectionContentRight hideDesktop>
                <h2>Interact</h2>
                <p>
                  Engage with other members of the community or just sit back
                  and binge watch. Window shopping is not only allowed, but
                  encouraged.
                </p>
                <h2>Discover</h2>
                <p>
                  Discover the latest releases from top brands unboxed, reviewed
                  and flexed by your favorite Heartfacers.
                </p>
                <h2>Shop</h2>
                <p>
                  Just hit the buy button, sit back and watch as your order
                  magically reaches you directly from 32+ stores and
                  marketplaces across the UK.
                </p>
                <div>
                  <CustomButton
                    onClick={this.handleClick}
                    text="Get Started"
                  />
                </div>
              </SectionContentRight>
            </SectionContent>
          </Section>
          <Bottom>
            <CustomButton onClick={this.handleClick} text="Get Started" />
          </Bottom>
        </Container>
      </DefaultLayout>
    );
  }
}
