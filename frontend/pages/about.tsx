import React from "react";
import { NextSeo } from "next-seo";
import { aboutUsSEO } from "../lib/SEO";

const about = () => {

  return (
    <>
      <NextSeo {...aboutUsSEO} />
      <div />
    </>
  );
};

export default about;
