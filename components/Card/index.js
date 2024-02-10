import { TextInput, View } from "react-native";

import { theme } from "../../config";
import { colors as useColors } from "../../config/styles";
import useStyles from "./styles";
import Button from "../Button";
import { ChevronDown, Pencil, Play, Trash } from 'lucide-react-native'

const itemSize = 24;

const Card = () => {
  const colors = useColors(theme);
  const classes = useStyles({colors, itemSize});

  return (
    <View style={classes.containerCard}>
      <View style={classes.cardHeader}>
        <Pencil
          color={colors.white}
          size={itemSize}
        />
        <TextInput
          placeholder="Digite sua tarefa"
          style={classes.inputTextCard}
          placeholderTextColor={colors.bg[11]}
          multiline={true}
        />
        <Trash
          color={colors.white}
          size={itemSize}
        />
      </View>

      <View style={classes.bottomButtonsCard}>
        <View style={classes.configButtonsCard}>
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

        </View>
        <Button
          bgColor={colors.main.bg}
          color={colors.bg[1]}
          onTouchEnd={() => console.log('Clicou!')}
          FrontIcon={Play}
        />
      </View>
    </View>
  );
}

export default Card;