import React from 'react'
import {TouchableOpacity} from "react-native";
import Text from "./Text";

interface LinkButtonProps {
  children: React.ReactNode
  onPress: () => void
  color?: 'primary'
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const LinkButton = ({ children, onPress, ...props }: LinkButtonProps) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <Text {...props}>{children}</Text>
    </TouchableOpacity>
  )
}

LinkButton.defaultProps = {
  color: 'primary',
  fontSize: 'md'
}

export default LinkButton
