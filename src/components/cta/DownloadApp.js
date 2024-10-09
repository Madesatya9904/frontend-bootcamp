import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro";
import mockupImageSrc from "images/mockupnre.png"; // Ensure this image is high-resolution
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-9.svg";
import { ContentWithPaddingXl, Container as ContainerBase } from "components/misc/Layouts";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import appleIconImageSrc from "images/apple-icon.png";
import googlePlayIconImageSrc from "images/google-play-icon.png";

const Container = tw.div`bg-gray-900 -mx-8 p-2`;
const Content = tw.div`px-8 flex items-center justify-center text-center`;
const Row = tw.div`px-8 flex items-center relative z-10 flex-col lg:flex-row text-center lg:text-left justify-center`;

const ColumnContainer = tw.div`max-w-2xl`;
const TextContainer = tw(ColumnContainer)``;
const Text = tw(SectionHeading)`text-gray-100 lg:text-left max-w-none text-2xl leading-snug`; // Reduced text size
const Subheading = tw(SubheadingBase)`text-yellow-500 mb-4 tracking-wider text-lg`; // Reduced subheading size

const LinksContainer = tw.div`mt-8 lg:mt-10 flex items-center sm:block`; // Reduced top margin
const Link = styled.a`
  ${tw`w-full max-w-[200px] p-3 text-sm sm:text-base font-bold uppercase tracking-wider rounded-full flex justify-center items-center mt-6 bg-white text-gray-900 hocus:bg-gray-300 hocus:text-gray-900 shadow hover:shadow-lg focus:shadow-outline focus:outline-none transition duration-300`}
  img {
    ${tw`inline-block object-contain h-6 mr-3`} // Reduced icon size
  }
  span {
    ${tw`leading-none flex`}
  }
`;

const ImageContainer = tw(ColumnContainer)`mt-8 lg:mt-0 lg:ml-12 flex justify-end`; // Reduced margin-top and margin-left
const Image = tw.img`w-48 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105`; // Reduced image size

const DecoratorBlobContainer = tw.div`absolute inset-0 overflow-hidden rounded-lg`;
const DecoratorBlob1 = tw(SvgDecoratorBlob1)`absolute bottom-0 left-0 w-64 h-64 transform -translate-x-20 translate-y-32 text-gray-800 opacity-50`; // Reduced size
const DecoratorBlob2 = tw(SvgDecoratorBlob1)`absolute top-0 right-0 w-64 h-64 transform translate-x-20 -translate-y-64 text-gray-800 opacity-50`; // Reduced size

export default ({
  subheading = "Download App",
  text = "Developers all over the world are happily using Treact.",
  link1Text = "App Store",
  link1Url = "http://apple.com",
  link1IconSrc = appleIconImageSrc,
  link2Text = "Google Play",
  link2Url = "http://play.google.com",
  link2IconSrc = googlePlayIconImageSrc,
  pushDownFooter = false,
  imageSrc = mockupImageSrc,
}) => {
  return (
    <Container css={pushDownFooter && tw`mb-20 lg:mb-24`}>
      <Content>
        <Row>
          <TextContainer>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Text>{text}</Text>
            <LinksContainer>
              <Link href={link1Url}>
                <img src={link1IconSrc} alt="" />
                <span>{link1Text}</span>
              </Link>
              <Link href={link2Url}>
                <img src={link2IconSrc} alt="" />
                <span>{link2Text}</span>
              </Link>
            </LinksContainer>
          </TextContainer>
          <ImageContainer>
            <Image src={imageSrc} alt="" />
          </ImageContainer>
        </Row>
        <DecoratorBlobContainer>
          <DecoratorBlob1 />
          <DecoratorBlob2 />
        </DecoratorBlobContainer>
      </Content>
    </Container>
  );
};
