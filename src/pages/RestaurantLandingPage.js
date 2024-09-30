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

  // TODO
  // 1. Panggil component yang harusnya ada di halaman ini
  // 2. Modifikasi styling dan value property yang dimiliki component

  return (
    <AnimationRevealPage>
      <Hero
        heading={
          <>
            E-Commerce Tumbler
            <HighlightedText>Murah & Berkualitas</HighlightedText>
          </>
        }
        description="Belilah tumbler berkualitas tinggi dengan harga terjangkau hanya di sini!"
        imageSrc={logo}
        imageCss={imageCss}
        imageDecoratorBlob={true}
        primaryButtonText="Harus Beli"
        watchVideoButtonText="Watch Video"
      />
      <MainFeature 
      subheading="Tetap Terhidrasi dengan Gaya, Pilih dari Koleksi Tumbler Terbaik Kami"
      description="Kami menawarkan berbagai pilihan tumbler berkualitas tinggi dengan harga yang terjangkau. Dari desain yang stylish hingga bahan yang tahan lama, tumbler kami dirancang untuk memenuhi kebutuhan hidrasi Anda sepanjang hari. Belilah tumbler yang sempurna untuk Anda di sini!"
      />
      <Features 
      heading="Feature Tumbler"
      subheading="Made In Indonesian"
      />
      <MainFeature2
      description="Kami berdedikasi untuk menyediakan produk berkualitas tinggi dan layanan terbaik sejak tahun 1999. Dengan pengalaman bertahun-tahun, kami terus berinovasi dan meningkatkan kualitas untuk memenuhi kebutuhan Anda."/>
      <ProductGrid/>
      <Testimonial/>

      <DownloadApp
        text={
          <>
            Download Now!{" "}
            <HighlightedTextInverse>Tumbler App.</HighlightedTextInverse>
          </>
        }
      />
      <Footer background={"bg-gray-200"} />
    </AnimationRevealPage>
  );
};
