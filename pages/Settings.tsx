import { useTheme } from '@react-navigation/native';
import { Text, Button, Surface, List, RadioButton} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {

	return (
		<Surface style={styles.surface}>
            <List.Section>
                <List.Subheader>Theme</List.Subheader>
                <RadioButton.Group onValueChange={() => {}} value={"light"}>
                    <View style={styles.radiobutton}>
                        <RadioButton value="light" />
                        <Text>Light</Text>
                    </View>
                    <View style={styles.radiobutton}>
                        <RadioButton value="dark"/>
                        <Text>Dark</Text>
                    </View>
                </RadioButton.Group>
            </List.Section>
		</Surface>
	);
}

const styles = StyleSheet.create({
	surface: {
        margin: 10,
		flex: 1,
        elevation: 4,
        borderRadius: 10,
	},
    radiobutton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    }
});