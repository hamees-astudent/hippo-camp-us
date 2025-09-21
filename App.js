import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from "expo-splash-screen";
import AnimatedAppLoader from './AnimatedAppLoader';
import GameScreen from './GameScreen';
import MainScreen from './MainScreen';

SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AnimatedAppLoader image={require('./assets/images/splash-screen.png')}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="GameScreen" component={GameScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AnimatedAppLoader>
  );
}
