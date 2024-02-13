import { TextInput, View } from "react-native";

import { theme } from "../../config";
import { colors as useColors } from "../../config/styles";
import useStyles from "./styles";
import Button from "../Button";

import { ChevronDown, Pencil, Pause, Play, Trash } from 'lucide-react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useCallback, useEffect, useRef, useState } from "react";
import TimerPicker from "../TimerPicker";
import BottomSheetContainer from "../BottomSheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Portal } from "@gorhom/portal";

const itemSize = 24;
const dateOptions = { day: '2-digit', month: '2-digit' };
const priorityOptions = ['Baixa', 'Média', 'Alta'];
const isPlayingIcons = (isPlaying) => isPlaying ? Pause : Play;

const Card = ({
  initialPriority = 'baixa',
  initialState = 'todo',
  initialIsPlaying = false,
  initialTitle = '',
  initialTimer = { hours: 0, minutes: 0 },
  initialDate = new Date(),
  fullWidth = false,
  taskId,
  handleTasks,
}) => {
  const [timer, setTimer] = useState(initialTimer);
  const [showTimer, setShowTimer] = useState(false);
  const [date, setDate] = useState(initialDate);
  const [showDate, setShowDate] = useState(false);
  const [priority, setPriority] = useState(initialPriority);
  const [cardState, setCardState] = useState(initialState); /** todo, doing, done, late */
  const [isPlaying, setIsPlaying] = useState(initialIsPlaying);

  const colors = useColors(theme);
  const classes = useStyles({ colors, itemSize, fullWidth });

  const bottomSheetModalRef = useRef(null);

  const deleteTask = () => {
    handleTasks(prev => prev.filter(task => task.id !== taskId));
  }

  /** For priorities */
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  /** For dates */
  const handleShowDate = () => {
    setShowDate(prev => !prev);
  }

  const handleOnChangeDate = (_, selectedDate) => {
    handleShowDate();
    setDate(new Date(selectedDate));
    handleTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return { ...task, date: new Date(selectedDate) };
      }
      return task;
    }));
  }

  /** For cowntdown */
  const handleShowCountdown = () => {
    setShowTimer(prev => !prev);
  }

  const handleOnChangecountdown = ({ hours, minutes }) => {
    if (!(hours === 0 && minutes === 0)) {
      setTimer({ hours, minutes });
    }
    handleShowCountdown();
    handleTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return { ...task, duration: { hours, minutes } };
      }
      return task;
    }));
  }

  /** For bottom buttons */
  const handlePlayPause = () => {
    if (!isPlaying && cardState === 'todo' || cardState === 'late') {
      setCardState('doing');
      handleTasks(prev => prev.map(task => {
        if (task.id === taskId) {
          return { ...task, state: 'doing', isPlaying: true };
        }
        return task;
      }));
    }
    setIsPlaying(prev => !prev);
  }

  /** Timer logic */
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer(prev => {
          let newMinutes = prev.minutes;
          let newHours = prev.hours;
          if (prev.minutes === 0) {
            if (prev.hours === 0) {
              setIsPlaying(false);
              setCardState('done');
              handleTasks(prev => prev.map(task => {
                if (task.id === taskId) {
                  return { ...task, state: 'done', isPlaying: false };
                }
                return task;
              }));
              return prev;
            }
            newHours = prev.hours - 1;
            newMinutes = 59;
          } else {
            newMinutes = prev.minutes - 1;
          }
          return { hours: newHours, minutes: newMinutes };
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <>
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
            defaultValue={initialTitle}
          />
          <TouchableOpacity
            onPress={deleteTask}
          >
            <Trash
              color={colors.white}
              size={itemSize}
            />
          </TouchableOpacity>
        </View>

        <View style={classes.bottomButtonsCard}>
          <View style={classes.configButtonsCard}>
            <Button
              title={priority}
              bgColor={colors.secondary.bg}
              color={colors.white}
              onTouchEnd={handlePresentModalPress}
              FrontIcon={cardState === 'todo' && ChevronDown}
              disabled={cardState !== 'todo'}
            />
            <Button
              title={`${timer.hours.toString().padStart(2, '0')} : ${timer.minutes.toString().padStart(2, '0')}`}
              bgColor={colors.secondary.bg}
              color={cardState == 'doing' ? colors.secondary.text : colors.white}
              onTouchEnd={handleShowCountdown}
              FrontIcon={cardState === 'todo' && ChevronDown}
              disabled={cardState !== 'todo'}
            />
            <Button
              title={date.toLocaleDateString('pt-br', dateOptions)}
              bgColor={colors.secondary.bg}
              color={colors.white}
              onTouchEnd={handleShowDate}
              FrontIcon={cardState === 'todo' && ChevronDown}
              disabled={cardState !== 'todo'}
            />

          </View>
          {cardState !== 'done' && (
            <Button
              bgColor={colors.main.bg}
              color={colors.bg[1]}
              onTouchEnd={handlePlayPause}
              FrontIcon={isPlayingIcons(isPlaying)}
              disabled={timer.hours === 0 && timer.minutes === 0}
            />
          )}
        </View>
      </View>
      <Portal>
        {showTimer && <TimerPicker
          onChange={handleOnChangecountdown}
          initialHours={timer.hours}
          initialMinutes={timer.minutes}
        />}
        {showDate && <DateTimePicker
          value={date}
          onChange={handleOnChangeDate}
        />}
        <BottomSheetContainer
          bottomSheetModalRef={bottomSheetModalRef}
          handleSheetChanges={handleSheetChanges}
          title="Prioridade"
        >
          {priorityOptions.map(priority => (
            <Button
              key={`${priority}-priority`}
              title={priority}
              color={colors.white}
              onTouchEnd={() => {
                setPriority(priority);
                bottomSheetModalRef.current?.dismiss();
              }}
              fullWidth
              textAlign="flex-start"
            />
          ))}
        </BottomSheetContainer>
      </Portal>
    </>
  );
}

export default Card;