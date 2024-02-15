import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheetContainer from './components/BottomSheet';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { PortalProvider } from '@gorhom/portal';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <Register />
      </PortalProvider>
    </GestureHandlerRootView>
  );
}

export default App;