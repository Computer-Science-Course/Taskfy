import { useEffect, useState, useRef } from "react";
import { Image, ScrollView, Text, View } from "react-native";

import * as Notifications from 'expo-notifications';
import { LogOut, Plus } from 'lucide-react-native'
import uuid from 'react-native-uuid';
import { CommonActions, useNavigation } from "@react-navigation/native";

import { theme } from "../../config";
import { colors as useColors } from "../../config/styles";
import useStyles from "./styles";
import { isLoggedStorage, tasksStorage } from "../../services/AsyncStorage";
import { registerForPushNotificationsAsync } from "../../services/utils/notifications";
import { defaultTask } from "../../common/task";

import Button from "../../components/Button";
import Card from '../../components/Card';
import MobileDataInfo from "../../components/MobileDataInfo";

const GirlOnPhone = '../../assets/girl_on_phone.png';
const colors = useColors(theme);

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

/**
 * Handles the logout functionality.
 * Clears the logged-in user's values from storage and navigates to the Login screen.
 */
const handleLogout = async () => {
  const navigation = useNavigation();
  await isLoggedStorage.clearValues();
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    })
  );
};

/**
   * Handles the creation of a new task.
   * @returns {Promise<void>} A promise that resolves when the task is created.
   */
const handleCreateTask = async (setTasks) => {
  const currentUserId = await getCurrentUserId();
  const newTask = { ...defaultTask, id: uuid.v4(), userId: currentUserId };
  setTasks(prev => [...prev, newTask]);
  tasksStorage.setValue(newTask);
};

const BottomButtons = ({ setTasks }) => (
  <View style={{
    width: '100%',
    display: 'flex',
    position: 'absolute',
    right: 0,
    bottom: 24,
    flexDirection: 'row',
    gap: 16,
    paddingLeft: 16,
    paddingRight: 86
  }}>
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
      onTouchEnd={() => handleCreateTask(setTasks)}
      fullWidth
    />
  </View>
)

const Content = () => {

  const classes = useStyles(colors);
  const [tasks, setTasks] = useState([]);

  const [todoTasks, setTodoTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [lateTasks, setLateTasks] = useState([]);
  const taskSets = [
    { title: 'Não Iniciadas', tasks: todoTasks, },
    { title: 'Em execução', tasks: doingTasks, },
    { title: 'Feitas', tasks: doneTasks, },
    { title: 'Atrasadas', tasks: lateTasks, },
  ]

  const notificationListener = useRef();
  const responseListener = useRef();

  /**
   * Retrieves the current user ID.
   * @returns {Promise<string>} The current user ID.
   */
  const getCurrentUserId = async () => (
    (await isLoggedStorage.getValues())[0]
  )



  useEffect(() => {
    /**
     * Fetches tasks from storage and updates the state with the retrieved tasks.
     * If tasks already exist in the state, the function returns early.
     * @returns {Promise<void>} A promise that resolves when the tasks are fetched and updated.
     */
    const fetchTasks = async () => {
      if (tasks.length !== 0) return;
      const currentUserId = await getCurrentUserId();
      const tasksFromStorage = await tasksStorage.getValuesByField('userId', currentUserId);
      const updatedTasksFromStorage = tasksFromStorage.map(task => (
        { ...task, date: new Date(task.date) }
      ));
      setTasks(updatedTasksFromStorage);
    }

    /**
     * Clears all task arrays.
     */
    const clearTasks = () => {
      setTodoTasks([]);
      setDoingTasks([]);
      setDoneTasks([]);
      setLateTasks([]);
    };

    /**
     * Fills the tasks into different task lists based on their state and date.
     * Late tasks are added to the 'late' list, tasks with state 'todo' are added to the 'todo' list,
     * tasks with state 'doing' are added to the 'doing' list, and tasks with state 'done' are added to the 'done' list.
     * @returns {Promise<void>} A promise that resolves when the task lists are filled.
     */
    const fillTasks = async () => {
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
    }

    fetchTasks();
    clearTasks();
    fillTasks();
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

  return (
    <>
      <View style={classes.HomeContentContainer}>
        <ScrollView horizontal>
          {taskSets.map(({ title, tasks }) => (
            <ScrollView>
              <View style={classes.cardsArea}>
                <Text style={classes.titleCardsArea}>
                  {title}
                </Text>
                {tasks.length === 0
                  ? <NoContent />
                  : tasks.map(({ id, title, duration, priority, date, state, isPlaying }) => (
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
          ))}
        </ScrollView>
      </View>
      <BottomButtons setTasks={setTasks} />
    </>
  );
}

const Home = () => {
  const classes = useStyles(colors);

  return (
    <View style={classes.containerHome}>
      <Header />
      <MobileDataInfo />
      <Content />
    </View>
  );
}

export default Home;