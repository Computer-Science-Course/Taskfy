import { Text, TouchableOpacity } from "react-native";

import useStyles from "./styles";

export const sizes = {
  'small': 12,
  'medium': 16,
  'large': 20,
}

const Button = ({
  title,
  BackIcon,
  FrontIcon,
  color,
  bgColor,
  onTouchEnd,
  fullWidth = false,
  disabled = false,
  textAlign = 'center',
  size = 'medium',
}) => {
  const classes = useStyles({ color, bgColor, fullWidth, size: sizes[size], textAlign });

  return (
    <TouchableOpacity
      style={classes.containerButton}
      onPress={onTouchEnd}
      disabled={disabled}
    >
      {
        BackIcon &&
        <BackIcon
          size={sizes[size]}
          color={color}
        />
      }
      {
        title &&
        <Text style={classes.text}>
          {title.toUpperCase()}
        </Text>
      }
      {
        FrontIcon &&
        <FrontIcon
          size={sizes[size]}
          color={color}
        />
      }
    </TouchableOpacity>
  );
};

export default Button;