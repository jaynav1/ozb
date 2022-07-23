import { Provider as PaperProvider, DefaultTheme as PDefT, DarkTheme as PDarT } from 'react-native-paper';
import { NavigationContainer, DefaultTheme as NDefT, DarkTheme as NDarT} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';

import SiteTabs from './pages/SiteTabs';
import Settings from './pages/Settings';

import merge from 'deepmerge';

import CustomNavigationBar from './components/CustomNavigationBar';


const CDefT = merge(PDefT, NDefT);
const CDarT = merge(PDarT, NDarT);

const Stack = createNativeStackNavigator();

function MainStack() {
	return (
		<Stack.Navigator initialRouteName='Deals' screenOptions={{header: (props) => <CustomNavigationBar {...props} />}}>
			<Stack.Screen name="Site" component={SiteTabs} options={{ headerShown: false }}/>
			<Stack.Screen name="Settings" component={Settings} />
		</Stack.Navigator>
	);
}

export default function App(){
	return (
		<PaperProvider theme={useColorScheme() === 'dark' ? CDarT : CDefT}>
			<NavigationContainer theme={useColorScheme() === 'dark' ? CDarT : CDefT}>
				<MainStack/>
			</NavigationContainer>
		</PaperProvider>
	);
}