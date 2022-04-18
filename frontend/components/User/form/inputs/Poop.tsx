import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react"
import React from "react"
import { InfoIcon } from "@chakra-ui/icons"

interface PoopProps{
    header:string;
    text:string;
}
const Poop = ({header,text}:PoopProps) => {
  return (
    <Popover>
      <PopoverTrigger >
        <InfoIcon cursor="pointer"  color="green.400" mr="4px!important" />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{header}</PopoverHeader>
        <PopoverBody>{text}</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default Poop
