import React from "react"
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  FacebookShareButton,
  FacebookIcon,
} from "next-share"

const SocialRow = () => {
  return (
    <div>
      <TwitterShareButton
        url={"https://github.com/next-share"}
        title={"next-share is a social share buttons for your next React apps."}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <FacebookMessengerShareButton
        url={"https://github.com/next-share"}
        appId={""}
      >
        <FacebookMessengerIcon size={32} round />
      </FacebookMessengerShareButton>
      <FacebookShareButton
        url={"https://github.com/next-share"}
        quote={"next-share is a social share buttons for your next React apps."}
        hashtag={"#nextshare"}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </div>
  )
}

export default SocialRow
