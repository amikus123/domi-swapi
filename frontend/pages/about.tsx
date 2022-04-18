import React from "react";
import { NextSeo } from "next-seo";

const about = () => {
  const SEO = {
    title: "About page",
    description: "normal about page",
    openGraph: {
      url: "https://www.url.ie/a",
      title: "Open Graph Title",
      description: "Open Graph Description",
    },
  };
  return (
    <>
      <NextSeo {...SEO} />
      <div />
    </>
  );
};

export default about;
