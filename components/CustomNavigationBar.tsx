import { Appbar } from 'react-native-paper';


export default function CustomNavigationBar({ navigation, route }) {
    return (
		<Appbar.Header>
			<Appbar.BackAction onPress={navigation.goBack}/>
			<Appbar.Content title={(typeof route.params === undefined) ? route.name : route.params.title}/>
		</Appbar.Header>
    );
}