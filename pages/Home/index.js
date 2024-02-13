import { Image, ScrollView, Text, View } from "react-native";

import { theme } from "../../config";
import { colors as useColors } from "../../config/styles";
import useStyles from "./styles";
import Card from '../../components/Card';
import Button from "../../components/Button";

import { Plus } from 'lucide-react-native'

const GirlOnPhone = '../../assets/girl_on_phone.png';
const colors = useColors(theme);
const cards = [
  {
    id: 1,
    title: 'Card 1',
    duration: { hours: 1, minutes: 30 },
    priority: 'baixa',
    date: new Date(2023, 2, 15),
    state: 'todo',
  },
  {
    id: 2,
    title: 'Card 2',
    duration: { hours: 2, minutes: 0 },
    priority: 'média',
    date: new Date(),
    state: 'doing',
  },
  {
    id: 3,
    title: 'Card 3',
    duration: { hours: 0, minutes: 45 },
    priority: 'alta',
    date: new Date(),
    state: 'done',
  },
  {
    id: 4,
    title: 'Card 4',
    duration: { hours: 0, minutes: 15 },
    priority: 'baixa',
    date: new Date(),
    state: 'late',
  },
  {
    id: 5,
    title: 'Card 5',
    duration: { hours: 1, minutes: 0 },
    priority: 'média',
    date: new Date(),
    state: 'todo',
  },
  {
    id: 6,
    title: 'Card 6',
    duration: { hours: 0, minutes: 30 },
    priority: 'alta',
    date: new Date(),
    state: 'doing',
  },
  {
    id: 7,
    title: 'Card 7',
    duration: { hours: 0, minutes: 15 },
    priority: 'baixa',
    date: new Date(),
    state: 'done',
  },
  {
    id: 8,
    title: 'Card 8',
    duration: { hours: 0, minutes: 45 },
    priority: 'média',
    date: new Date(),
    state: 'late',
  }
]

const NoContent = () => {
  const classes = useStyles(colors);
  return (
    <View style={classes.HomeNoContent}>
      <Text style={classes.HomeColumnTitle}>Começar</Text>
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
  const classes = useStyles(colors);
  return (
    <>
      <View style={classes.HomeContentContainer}>
        {cards.length === 0
          ? <NoContent />
          : <ScrollView horizontal>

            <ScrollView>
              <View style={classes.cardsArea}>
                <Text style={classes.titleCardsArea}>
                  Não Iniciadas
                </Text>
                {cards.map(({ id, title, duration, priority, date, state }) => (
                  <Card
                    key={`${id}-card`}
                    initialTitle={title}
                    initialTimer={duration}
                    initialPriority={priority}
                    initialDate={date}
                    initialState={state}
                    fullWidth
                  />
                ))}
              </View>
            </ScrollView>

            <ScrollView>
              <View style={classes.cardsArea}>
                <Text style={classes.titleCardsArea}>
                  Em execução
                </Text>
                {cards.map(({ id, title, duration, priority, date, state }) => (
                  <Card
                    key={`${id}-card`}
                    initialTitle={title}
                    initialTimer={duration}
                    initialPriority={priority}
                    initialDate={date}
                    initialState={state}
                    fullWidth
                  />
                ))}
              </View>
            </ScrollView>

            <ScrollView>
              <View style={classes.cardsArea}>
                <Text style={classes.titleCardsArea}>
                  Feitas
                </Text>
                {cards.map(({ id, title, duration, priority, date, state }) => (
                  <Card
                    key={`${id}-card`}
                    initialTitle={title}
                    initialTimer={duration}
                    initialPriority={priority}
                    initialDate={date}
                    initialState={state}
                    fullWidth
                  />
                ))}
              </View>
            </ScrollView>

            <ScrollView>
              <View style={classes.cardsArea}>
                <Text style={classes.titleCardsArea}>
                  Atrasadas
                </Text>
                {cards.map(({ id, title, duration, priority, date, state }) => (
                  <Card
                    key={`${id}-card`}
                    initialTitle={title}
                    initialTimer={duration}
                    initialPriority={priority}
                    initialDate={date}
                    initialState={state}
                    fullWidth
                  />
                ))}
              </View>
            </ScrollView>

          </ScrollView>}
      </View>
      <View style={{ display: 'flex', position: 'absolute', bottom: 24 }}>
        <Button
          FrontIcon={Plus}
          size="large"
          bgColor={colors.main.bg}
          color={colors.white}
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