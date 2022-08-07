import { Chip } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import { Menu } from 'react-native-paper';
import { useState } from 'react';
import config from '../config.json'

export default function CategoryChipView({ options, setOptions }) {
    const toggleExpired = () => {
        setOptions({
            ...options,
            hideExpired: !options.hideExpired
        })
    }

    return (
        <View style={styles.container}>
            <CategoryMenu options={options} setOptions={setOptions} />
            <Chip mode='outlined' selected={options.hideExpired} onPress={toggleExpired}>Hide expired</Chip>
        </View>
    );
}

function CategoryMenu({ options, setOptions }) {
    const [visible, setVisible] = useState(false);
    const menuList = [];
    Object.keys(config.CATEGORIES).forEach((category, index) => {
        menuList.push(
            <Menu.Item key={index} title={category} onPress={() => {setOptions({...options, category: category})}}/>
        )
    })
    return (
        <Menu
            visible={visible}
            onDismiss={() => {setVisible(false)}}
            anchor={<Chip mode='outlined' onPress={() => {setVisible(true)}}>
                            {options.category}
                    </Chip>}
        >
            {menuList}
        </Menu>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 10,
    },
});
