import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithVideo.js";
import Features from "components/features/ThreeColSimple.js";
import MainFeature from "components/features/TwoColWithButton.js";
import MainFeature2 from "components/features/TwoColSingleFeatureWithStats2.js";
import ProductGrid from "components/cards/TabCardGrid.js";
import Testimonial from "components/testimonials/ThreeColumnWithProfileImage.js";
import DownloadApp from "components/cta/DownloadApp.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import logo from "../images/tumler-hero.png"

import chefIconImageSrc from "images/chef-icon.svg";
import celebrationIconImageSrc from "images/celebration-icon.svg";
import shopIconImageSrc from "images/shop-icon.svg";

export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-gradient-to-l from-[#9d4edd] to-[#c77dff] text-white px-4 transform -skew-x-12 inline-block`;
  const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
  const Description = tw.span`inline-block mt-8`;
  const imageCss = tw`rounded-4xl`;

  const num = "9"
  // TODO
  // 1. Panggil component yang harusnya ada di halaman ini
  // 2. Modifikasi styling dan value property yang dimiliki component

  return (
    <AnimationRevealPage>
      <Hero
        heading={
          <>
            E-Commerce Punch
            <HighlightedText>Affordable & Quality</HighlightedText>
          </>
        }
        description="Buy your tumblers at Punch—high quality at affordable prices, right now!"
        imageSrc={logo}
        imageCss={imageCss}
        imageDecoratorBlob={true}
        primaryButtonText="Buy Now!"
      />
      <MainFeature 
      subheading="Stay Hydrated in Style, Choose from Our Best Tumbler Collection!"
      description="We offer a wide selection of high-quality tumblers at affordable prices. From stylish designs to durable materials, our tumblers are crafted to meet your hydration needs throughout the day. Find the perfect tumbler for you right here!"
      />
      <Features 
      heading="Feature Tumbler"
      subheading="Made In Indonesian"
      />
      <MainFeature2
      description="We are dedicated to providing high-quality products and the best service since the 9th century AD. With years of experience, we continuously innovate and improve our quality to meet your needs."/>
      <Testimonial/>

      <DownloadApp
        text={
          <>
            Download Now!{" "}
            <HighlightedTextInverse>Punch App.</HighlightedTextInverse>
          </>
        }
      />
      <Footer background={"bg-gray-200"} />
    </AnimationRevealPage>
  );
};
