import { useTheme, useNavigation } from '@react-navigation/native';
import { Text, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export default function DealsTab({ navigation }) {
	return (
		<View style={styles.container}>
			<Text>Search Tab</Text>
			<Button icon="cog-outline" mode="text" onPress={() => navigation.navigate('Settings', {'title': 'Settings'})}>
  				Press me
  			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});