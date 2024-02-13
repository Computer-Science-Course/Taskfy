import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheetContainer from './components/BottomSheet';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Home />
    </GestureHandlerRootView>
  );
}

export default App;