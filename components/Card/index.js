import { Text, View } from "react-native";

import { theme } from "../../config";
import { colors as useColors } from "../../config/styles";
import useStyles from "./styles";
import Button from "../Button";
import { ChevronDown, Play } from 'lucide-react-native'

const Card = () => {
  const colors = useColors(theme);
  const classes = useStyles(colors);

  return (
    <>
      <View style={classes.containerCard}>
        <Button
          title="Baixa"
          bgColor={colors.secondary.bg}
          color={colors.white}
          onTouchEnd={() => console.log('Clicou!')}
          FrontIcon={ChevronDown}
          />
        <Button
          title="00h00"
          bgColor={colors.secondary.bg}
          color={colors.white}
          onTouchEnd={() => console.log('Clicou!')}
          FrontIcon={ChevronDown}
          />
        <Button
          title="13/02"
          bgColor={colors.secondary.bg}
          color={colors.white}
          onTouchEnd={() => console.log('Clicou!')}
          FrontIcon={ChevronDown}
        />

        <Button
          bgColor={colors.main.bg}
          color={colors.bg[1]}
          onTouchEnd={() => console.log('Clicou!')}
          FrontIcon={Play}
        />
      </View>
    </>
  );
}

export default Card;