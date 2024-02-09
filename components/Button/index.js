import { Text, View } from "react-native";

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
  size = 'medium',
}) => {
  const classes = useStyles({ color, bgColor, fullWidth, size: sizes[size] });

  return (
    <View
      style={classes.container}
      onTouchEnd={onTouchEnd}
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
    </View>
  );
};

export default Button;