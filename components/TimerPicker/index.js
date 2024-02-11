import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { theme } from "../../config";
import { colors as useColors } from "../../config/styles";
import useStyles from "./styles";
import { useState } from "react";

const TimerPicker = ({
  initialHours = 0,
  initialMinutes = 0,
  onChange,
}) => {
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [isHourFocused, setIsHourFocused] = useState(false);
  const [isMinuteFocused, setIsMinuteFocused] = useState(false);

  const colors = useColors(theme);
  const classes = useStyles(colors);

  return (
    <View style={classes.containerTimerPicker}>
      <View style={classes.timerPicker}>
        <View>
          <Text style={classes.text}>Insira a hora</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
          <View style={{ display: 'flex', gap: 7 }}>
            <TextInput
              style={[classes.timerSetArea, isHourFocused && classes.timerSetAreaActive]}
              keyboardType="numeric"
              maxLength={2}
              onFocus={() => setIsHourFocused(true)}
              onBlur={() => setIsHourFocused(false)}
              placeholderTextColor={colors.white}
              onChangeText={textValue => setHours(parseInt(textValue, 10) || 0)}
              defaultValue={initialHours.toString().padStart(2, '0')}
            />
            <Text style={classes.timerSetAreaLabel}>Horas</Text>
          </View>

          <Text style={[classes.text, { fontSize: 57, width: 24, textAlign: 'center' }]}>:</Text>

          <View style={{ display: 'flex', gap: 7 }}>
            <TextInput
              style={[classes.timerSetArea, isMinuteFocused && classes.timerSetAreaActive]}
              keyboardType="numeric"
              maxLength={2}
              onFocus={() => setIsMinuteFocused(true)}
              onBlur={() => setIsMinuteFocused(false)}
              placeholderTextColor={colors.white}
              onChangeText={textValue => {
                let value = parseInt(textValue, 10);
                value = value > 59 ? 59 : value;
                setMinutes(value || 0);
              }}
              defaultValue={initialMinutes.toString().padStart(2, '0')}
            />
            <Text style={classes.timerSetAreaLabel}>Minutos</Text>
          </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 40 }}>
          <TouchableOpacity onPress={() => onChange({ hours: 0, minutes: 0 })}>
            <Text style={classes.text}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onChange({ hours, minutes })}>
            <Text style={classes.text}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default TimerPicker;