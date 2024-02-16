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
import { tasksStorage } from "../../services/AsyncStorage";
import { schedulePushNotification } from "../../services/utils/notifications";

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
  handleTasks, /** All tasks */
}) => {
  const [timer, setTimer] = useState(initialTimer);
  const [cardTitle, setCardTitle] = useState(initialTitle);
  const [showTimer, setShowTimer] = useState(false);
  const [date, setDate] = useState(initialDate);
  const [showDate, setShowDate] = useState(false);
  const [priority, setPriority] = useState(initialPriority);
  const [cardState, setCardState] = useState(initialState); /** todo, doing, done, late */
  const [isPlaying, setIsPlaying] = useState(initialIsPlaying);

  const colors = useColors(theme);
  const classes = useStyles({ colors, itemSize, fullWidth });

  const bottomSheetModalRef = useRef(null);

  const deleteTask = async () => {
    handleTasks(prev => prev.filter(task => task.id !== taskId));
    await tasksStorage.removeValue(taskId);
  }

  /** For Task title */
  const handleTaskTitle = (textValue) => {
    setCardTitle(textValue);
    handleTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        tasksStorage.updateValue(taskId, { ...task, title: textValue });
        return { ...task, title: textValue };
      }
      return task;
    }));
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
    const todayAtMidnight = new Date().setHours(0, 0, 0, 0);
    handleTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newState = selectedDate < todayAtMidnight ? 'late' : 'todo';
        if (newState === 'late') {
          schedulePushNotification('Tarefa atrasada', `A tarefa "${task.title}" está atrasada!`);
        }
        tasksStorage.updateValue(taskId, { ...task, date: new Date(selectedDate), state: newState });
        return { ...task, date: new Date(selectedDate), state: newState };
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
        tasksStorage.updateValue(taskId, { ...task, duration: { hours, minutes } });
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
          tasksStorage.updateValue(taskId, { ...task, state: 'doing', isPlaying: true });
          return { ...task, state: 'doing', isPlaying: true };
        }
        return task;
      }));
    }
    setIsPlaying(prev => !prev);
  }

  /** Timer logic */
  /** TODO: Improve this approach */
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer(prev => {
          let newMinutes = prev.minutes;
          let newHours = prev.hours;
          if (prev.minutes === 0) {
            if (prev.hours === 0) {
              return prev;
            }
            newHours = prev.hours - 1;
            newMinutes = 59;
          } else {
            newMinutes = prev.minutes - 1;
          }
          handleTasks(prev => prev.map(task => {
            if (task.id === taskId) {
              const newTask = {
                ...task,
                duration: { hours: newHours, minutes: newMinutes },
                isPlaying: !(newHours === 0 && newMinutes === 0),
                state: newHours === 0 && newMinutes === 0 ? 'done' : 'doing',
              };
              if (newTask.state === 'done') {
                schedulePushNotification('Tarefa concluída', `A tarefa "${task.title}" foi concluída!`);
              }
              tasksStorage.updateValue(taskId, newTask);
              return newTask;
            }
            return task;
          }));
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
            defaultValue={cardTitle}
            onChangeText={textValue => handleTaskTitle(textValue)}
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
              FrontIcon={['todo', 'late'].includes(cardState) && ChevronDown}
              disabled={!['todo', 'late'].includes(cardState)}
            />

          </View>
          {!['done', 'late'].includes(cardState) && (
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
                handleTasks(prev => prev.map(task => {
                  setPriority(priority);
                  if (task.id === taskId) {
                    tasksStorage.updateValue(taskId, { ...task, priority });
                    return { ...task, priority };
                  }
                  return task;
                }));
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