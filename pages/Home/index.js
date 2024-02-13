import { Image, ScrollView, Text, View } from "react-native";

import { theme } from "../../config";
import { colors as useColors } from "../../config/styles";
import useStyles from "./styles";
import Card from '../../components/Card';
import Button from "../../components/Button";

import { Plus } from 'lucide-react-native'
import { useEffect, useState } from "react";

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

const Content = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Card 1',
      duration: { hours: 1, minutes: 30 },
      priority: 'baixa',
      date: new Date(2023, 2, 15),
      state: 'todo',
      isPlaying: false,
    },
    {
      id: 2,
      title: 'Card 2',
      duration: { hours: 2, minutes: 0 },
      priority: 'média',
      date: new Date(),
      state: 'doing',
      isPlaying: false,
    },
    {
      id: 3,
      title: 'Card 3',
      duration: { hours: 0, minutes: 45 },
      priority: 'alta',
      date: new Date(),
      state: 'done',
      isPlaying: false,
    },
    {
      id: 4,
      title: 'Card 4',
      duration: { hours: 0, minutes: 15 },
      priority: 'baixa',
      date: new Date(),
      state: 'late',
      isPlaying: false,
    },
    {
      id: 5,
      title: 'Card 5',
      duration: { hours: 1, minutes: 0 },
      priority: 'média',
      date: new Date(),
      state: 'todo',
      isPlaying: false,
    },
    {
      id: 6,
      title: 'Card 6',
      duration: { hours: 0, minutes: 30 },
      priority: 'alta',
      date: new Date(),
      state: 'doing',
      isPlaying: false,
    },
    {
      id: 7,
      title: 'Card 7',
      duration: { hours: 0, minutes: 15 },
      priority: 'baixa',
      date: new Date(),
      state: 'done',
      isPlaying: false,
    },
    {
      id: 8,
      title: 'Card 8',
      duration: { hours: 0, minutes: 45 },
      priority: 'média',
      date: new Date(),
      state: 'late',
      isPlaying: false,
    }
  ]);

  const [todoTasks, setTodoTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [lateTasks, setLateTasks] = useState([]);

  const clearTasks = () => {
    setTodoTasks([]);
    setDoingTasks([]);
    setDoneTasks([]);
    setLateTasks([]);
  };

  useEffect(() => {
    clearTasks();
    tasks.forEach(task => {
      if (task.state === 'todo') {
        setTodoTasks(prev => [...prev, task]);
      } else if (task.state === 'doing') {
        setDoingTasks(prev => [...prev, task]);
      } else if (task.state === 'done') {
        setDoneTasks(prev => [...prev, task]);
      } else if (task.state === 'late') {
        setLateTasks(prev => [...prev, task]);
      }
    });
  }, [tasks]);

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
      <View style={{ display: 'flex', position: 'absolute', bottom: 24 }}>
        <Button
          FrontIcon={Plus}
          size="large"
          bgColor={colors.main.bg}
          color={colors.white}
          onTouchEnd={() => setTasks(prev => [...prev, {
            id: prev.length + 1,
            duration: { hours: 0, minutes: 0 },
            priority: 'baixa',
            date: new Date(),
            state: 'todo',
            isPlaying: false,
          }])}
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
      <Content />
    </View>
  );
}

export default Home;