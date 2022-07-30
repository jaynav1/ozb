import { Chip } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import { Menu } from 'react-native-paper';
import { useState } from 'react';
import config from '../config.json'

export default function CategoryChipView({ options, setOptions }) {
    return (
        <View style={styles.container}>
            <CategoryMenu options={options} setOptions={setOptions} />
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
        margin: 5,
    },
});
