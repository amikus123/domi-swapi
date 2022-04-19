import React from "react"
import {
  TwitterShareButton,
  FacebookShareButton,
} from "next-share"
import { FaFacebook, FaTwitter, FaShare, FaCopy } from "react-icons/fa"

import { useToast, Icon, HStack } from "@chakra-ui/react"
import { IconType } from "react-icons"

interface CustomIconProps {
  as: IconType
  onClick?: () => Promise<void>
}
const size = 8
const CustomIcon = ({ as, onClick }: CustomIconProps) => {
  return <Icon as={as} onClick={onClick} w={size} h={size} cursor="pointer" />
}

interface SocialRowProps {
  category: string
  slug: string
}
const SocialRow = ({ category, slug }: SocialRowProps) => {
  const toast = useToast()
  // ! DODAJ DOMENE
  const text = "Przeczytałem/am bardzo ciekawy artykuł: "
  const url = `/blog/${category}/${slug}`

  const shareNative = async () => {
    const shareData = {
      title: "NAZWA STRONY",
      text,
      url,
    }

    try {
      await navigator.share(shareData)
    } catch (e) {
      toast({
        title: "Wystąpił błąd",
        description: "Nie udało się udostępnić",
        duration: 5000,
        isClosable: true,
      })
    }
  }
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url).then(() => {
        toast({
          title: "Skopiowano link",
          description: "Udało się skopiować link",
          status: "success",
          isClosable: true,
        })
      })
    } catch (e) {
      toast({
        title: "Wystąpił błąd",
        description: "Nie udało się skopiować tekstu",
        duration: 5000,
        isClosable: true,
      })
    }
  }
  return (
    <HStack spacing={4}>
      <TwitterShareButton url={url} title={text}>
        <CustomIcon as={FaTwitter} />
      </TwitterShareButton>
      <FacebookShareButton url={url} title={text}>
        <CustomIcon as={FaFacebook} />
      </FacebookShareButton>
      <CustomIcon as={FaShare} onClick={shareNative} />
      <CustomIcon as={FaCopy} onClick={copyToClipboard} />
    </HStack>
  )
}

export default SocialRow
