import { Text, View } from "react-native";

import useStyles from "./styles";

const Button = ({
  title,
  BackIcon,
  FrontIcon,
  color,
  bgColor,
  onTouchEnd,
  fullWidth = false,
}) => {
  const classes = useStyles({ color, bgColor, fullWidth });

  return (
    <View style={classes.container} onTouchEnd={onTouchEnd}>
      {BackIcon && <BackIcon size={16} color={color} />}
      {title && <Text style={classes.text}>{title.toUpperCase()}</Text>}
      {FrontIcon && <FrontIcon size={16} color={color} />}
    </View>
  );
};

export default Button;