import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PortalProvider } from '@gorhom/portal';


/** Routes */
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const Stack = createStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Login'
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
  );
}

export default App;