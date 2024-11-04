import { ToolIcon } from '@/components/icons'
import React from 'react'
import { chakra, IconProps, Image } from '@chakra-ui/react'
import { isSvgSrc } from '@typebot.io/lib/utils'
import { StaticImageData } from 'next/image'

type Props = {
  icon?: string | null
  emojiFontSize?: string
  boxSize?: string
  defaultIcon?: (props: IconProps) => JSX.Element
  image: StaticImageData
}

export const EmojiOrImageIcon = ({
  icon,
  boxSize = '25px',
  emojiFontSize,
  defaultIcon = ToolIcon,
  image,
}: Props) => {
  return (
    <>
      {image ? (
        <Image
          src={image.src}
          boxSize={boxSize}
          objectFit={image.width > image.height ? 'cover' : 'contain'}
          alt="typebot icon"
          rounded="10%"
        />
      ) : (
        <>
          {icon ? (
            icon.startsWith('http') || isSvgSrc(icon) ? (
              <Image
                src={icon}
                boxSize={boxSize}
                objectFit={isSvgSrc(icon) ? undefined : 'cover'}
                alt="typebot icon"
                rounded="10%"
              />
            ) : (
              <chakra.span role="img" fontSize={emojiFontSize}>
                {icon}
              </chakra.span>
            )
          ) : (
            defaultIcon({ boxSize })
          )}
        </>
      )}
    </>
  )
}
