import { Image, ScrollView, Text, View } from "react-native";
import { useEffect, useState, useRef } from "react";
import * as Notifications from 'expo-notifications';

import { theme } from "../../config";
import { colors as useColors } from "../../config/styles";
import useStyles from "./styles";
import Card from '../../components/Card';
import Button from "../../components/Button";

import { Cable, LogOut, Plus, ShieldQuestion, Signal, Wifi } from 'lucide-react-native'

import uuid from 'react-native-uuid';
import NetInfo from '@react-native-community/netinfo';
import { isLoggedStorage, tasksStorage } from "../../services/AsyncStorage";
import { registerForPushNotificationsAsync, schedulePushNotification } from "../../services/utils/notifications";
import { CommonActions, useNavigation } from "@react-navigation/native";

const GirlOnPhone = '../../assets/girl_on_phone.png';
const colors = useColors(theme);

const defaultTask = {
  title: '',
  duration: { hours: 0, minutes: 0 },
  priority: 'baixa',
  date: new Date(),
  state: 'todo',
  isPlaying: false,
}

connectionsTypes = {
  wifi: {
    Icon: Wifi,
    title: 'Wi-Fi'
  },
  cellular: {
    Icon: Signal,
    title: 'Celular'
  },
  none: {
    Icon: Cable,
    title: 'Sem conexão'
  },
  unknown: {
    Icon: ShieldQuestion,
    title: 'Sem conexão'
  }
}

const MobileDataInfo = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionType, setConnectionType] = useState('');
  const classes = useStyles(colors);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setConnectionType(state.type);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const { Icon, title } = connectionsTypes[connectionType || 'none'];

  return (
    <>
      {isConnected
        ? (
          <View style={classes.mobileDataInfoConnected}>
            <Text style={{ color: colors.bg[1] }}>
              Você está utilizando {title}
            </Text>
            <Icon color={colors.bg[1]} size={16} />
          </View>)
        : (
          <View style={classes.mobileDataInfoDisconnected}>
            <Text style={{ color: colors.white }}>
              Você não está conectado à internet!
            </Text>
            <Icon color={colors.white} size={16} />
          </View>)
      }
    </>
  );
};

const NoContent = () => {
  const classes = useStyles(colors);
  return (
    <View style={classes.HomeNoContent}>
      <Image
        source={require(GirlOnPhone)}
      />
      <Text style={{ color: '#A6A6A6', fontSize: 16, fontWeight: '700' }}>
        Sem tarefas por aqui
      </Text>
    </View>
  );
}

const Header = () => {
  const classes = useStyles(colors);
  return (
    <View style={classes.HomeHeaderContainer}>
      <Text style={{ fontSize: 32, fontWeight: '700' }}>Taskfy</Text>
    </View>
  );
}

const Content = () => {
  const navigation = useNavigation();

  const [tasks, setTasks] = useState([]);

  const [todoTasks, setTodoTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [lateTasks, setLateTasks] = useState([]);

  const notificationListener = useRef();
  const responseListener = useRef();

  const handleLogout = async () => {
    await isLoggedStorage.clearValues();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }], // Replace 'Login' with the initial route name of your navigation stack
      })
    );
  };

  const getCurrentUserId = async () => (
    (await isLoggedStorage.getValues())[0]
  )

  const handleCreateTask = async () => {
    const currentUserId = await getCurrentUserId();
    const newTask = { ...defaultTask, id: uuid.v4(), userId: currentUserId };
    setTasks(prev => [...prev, newTask]);
    tasksStorage.setValue(newTask);
  };

  const clearTasks = () => {
    setTodoTasks([]);
    setDoingTasks([]);
    setDoneTasks([]);
    setLateTasks([]);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      if (tasks.length !== 0) return;
      const currentUserId = await getCurrentUserId();
      const tasksFromStorage = await tasksStorage.getValuesByField('userId', currentUserId);
      const updatedTasksFromStorage = tasksFromStorage.map(task => (
        { ...task, date: new Date(task.date) }
      ));
      setTasks(updatedTasksFromStorage);
    }

    fetchTasks();
    clearTasks();
    const todayAtMidnight = new Date().setHours(0, 0, 0, 0);
    tasks.forEach(task => {
      if (task.state === 'late' || task.date < todayAtMidnight) {
        setLateTasks(prev => [...prev, { ...task, state: 'late' }]);
        tasksStorage.updateValue(task.id, { ...task, state: 'late' });
      } else if (task.state === 'todo') {
        setTodoTasks(prev => [...prev, task]);
      } else if (task.state === 'doing') {
        setDoingTasks(prev => [...prev, task]);
      } else if (task.state === 'done') {
        setDoneTasks(prev => [...prev, task]);
      }
    });
  }, [tasks]);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => console.log(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const classes = useStyles(colors);
  return (
    <>
      <View style={classes.HomeContentContainer}>
        <ScrollView horizontal>

          <ScrollView>
            <View style={classes.cardsArea}>
              <Text style={classes.titleCardsArea}>
                Não Iniciadas
              </Text>
              {todoTasks.length === 0
                ? <NoContent />
                : todoTasks.map(({ id, title, duration, priority, date, state, isPlaying }) => (
                  <Card
                    key={`${id}-card`}
                    initialTitle={title}
                    initialTimer={duration}
                    initialPriority={priority}
                    initialDate={date}
                    initialState={state}
                    initialIsPlaying={isPlaying}
                    fullWidth
                    handleTasks={setTasks}
                    taskId={id}
                  />
                ))}
            </View>
          </ScrollView>

          <ScrollView>
            <View style={classes.cardsArea}>
              <Text style={classes.titleCardsArea}>
                Em execução
              </Text>
              {doingTasks.length === 0
                ? <NoContent />
                : doingTasks.map(({ id, title, duration, priority, date, state, isPlaying }) => (
                  <Card
                    key={`${id}-card`}
                    initialTitle={title}
                    initialTimer={duration}
                    initialPriority={priority}
                    initialDate={date}
                    initialState={state}
                    initialIsPlaying={isPlaying}
                    fullWidth
                    handleTasks={setTasks}
                    taskId={id}
                  />
                ))}
            </View>
          </ScrollView>

          <ScrollView>
            <View style={classes.cardsArea}>
              <Text style={classes.titleCardsArea}>
                Feitas
              </Text>
              {doneTasks.length === 0
                ? <NoContent />
                : doneTasks.map(({ id, title, duration, priority, date, state, isPlaying }) => (
                  <Card
                    key={`${id}-card`}
                    initialTitle={title}
                    initialTimer={duration}
                    initialPriority={priority}
                    initialDate={date}
                    initialState={state}
                    initialIsPlaying={isPlaying}
                    fullWidth
                    handleTasks={setTasks}
                    taskId={id}
                  />
                ))}
            </View>
          </ScrollView>

          <ScrollView>
            <View style={classes.cardsArea}>
              <Text style={classes.titleCardsArea}>
                Atrasadas
              </Text>
              {lateTasks.length === 0
                ? <NoContent />
                : lateTasks.map(({ id, title, duration, priority, date, state, isPlaying }) => (
                  <Card
                    key={`${id}-card`}
                    initialTitle={title}
                    initialTimer={duration}
                    initialPriority={priority}
                    initialDate={date}
                    initialState={state}
                    initialIsPlaying={isPlaying}
                    fullWidth
                    handleTasks={setTasks}
                    taskId={id}
                  />
                ))}
            </View>
          </ScrollView>

        </ScrollView>
      </View>
      <View style={{ width: '100%', display: 'flex', position: 'absolute', right: 0, bottom: 24, flexDirection: 'row', gap: 16, paddingLeft: 16, paddingRight: 86 }}>
        <Button
          FrontIcon={LogOut}
          size="large"
          bgColor={colors.red}
          color={colors.white}
          onTouchEnd={handleLogout}
        />
        <Button
          FrontIcon={Plus}
          size="large"
          bgColor={colors.main.bg}
          color={colors.white}
          onTouchEnd={handleCreateTask}
          fullWidth
        />
      </View>
    </>
  );
}

const Home = () => {
  /** As cores estão configuradas, basta usá-las dentro do arquivo styles.js */
  const classes = useStyles(colors);

  return (
    /** Pra usar o estilo, basta chamar ele como no exemplo abaixo. */
    <View style={classes.containerHome}>
      <Header />
      <MobileDataInfo />
      <Content />
    </View>
  );
}

export default Home;