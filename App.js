import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PortalProvider } from '@gorhom/portal';
import * as Notifications from 'expo-notifications';

/** Routes */
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { colors } from './config/styles';
import { theme } from './config';
import { isLoggedStorage } from './services/AsyncStorage';

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [defaultScreen, setDefaultScreen] = useState('Login');

  useEffect(() => {
    const fetchIsLogged = async () => {
      const isLogged = (await isLoggedStorage.getValues()).some(isTrue => isTrue);
      if (isLogged) {
        setDefaultScreen('Home');
      }
      setIsLoading(false);
    }
    fetchIsLogged();
  }, []);

  return (isLoading ? <Loading /> : (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={defaultScreen}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      </PortalProvider>
    </GestureHandlerRootView>
  ));
}

const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors(theme).bg[1] }}>
      <ActivityIndicator size="large" color={colors(theme).white} />
    </View>
  );
}

export default App;