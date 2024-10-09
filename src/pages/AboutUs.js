import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components"; //eslint-disable-line
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import MainFeature1 from "components/features/TwoColWithButton.js";
// import MainFeature2 from "components/features/TwoColSingleFeatureWithStats.js";
// import MainFeature3 from "components/features/TwoColSingleFeatureWithStats2.js";
import Features from "components/features/ThreeColSimple.js";
// import Features from "components/features/ThreeColWithSideImage.js";
import TeamCardGrid from "components/cards/ProfileThreeColGrid.js";

import SupportIconImage from "images/support-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";
import CustomerLoveIconImage from "images/simple-icon.svg";

const Subheading = tw.span`uppercase tracking-wider text-sm`;
export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <MainFeature1
        subheading={<Subheading>About Treact</Subheading>}
        heading="Designing the Future, Today"
        description="We are a forward-thinking design agency focused on blending creativity with innovation to craft visually stunning and highly functional solutions. Our mission is to transform ideas into impactful designs that stand out in the modern world."
        buttonRounded={false}
        primaryButtonUrl="#"
        primaryButtonText="See Portfolio"
        imageSrc="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80"
      />
      <MainFeature1
        subheading={<Subheading>Our Vision</Subheading>}
        heading="Redefining Tumbler Design, One Sip at a Time"
        description="We’re on a mission to revolutionize how you think about everyday products. Our goal is to blend innovation with style, creating tumblers that are not just functional but also a statement of design excellence."
        buttonRounded={false}
        primaryButtonUrl="/contact-us"
        primaryButtonText="Contact Us"
        imageSrc="https://images.unsplash.com/3/doctype-hi-res.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=768&q=80"
        textOnLeft={true}
      />
      <Features
        subheading={<Subheading>Our Values</Subheading>}
        heading="Our Core Values"
        description="Guiding Every Tumbler We Create"
        cards={[
          {
            imageSrc: SupportIconImage,
            title: "Always Here for You",
            description: "Our dedicated team provides 24/7 support to ensure you’re never left without answers, because your satisfaction is our priority."
          },
          {
            imageSrc: ShieldIconImage,
            title: "Collaborative Excellence",
            description: "Behind every great tumbler is a strong, united team. We work together to bring you the best in design, quality, and innovation."
          },
          {
            imageSrc: CustomerLoveIconImage,
            title: "Your Happiness, Our Goal",
            description: "Customer satisfaction isn’t just a promise—it’s the foundation of everything we do. We strive to exceed your expectations with every product."
          },
        ]}
        linkText=""
      />
      <TeamCardGrid 
        subheading={<Subheading>Our Team</Subheading>}
      />
      <Footer />
    </AnimationRevealPage>
  );
};
