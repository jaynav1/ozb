import { Chip } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import { useState, useEffect } from 'react'

export default function DealMessageChipView({ message }) {
    const [chips, setChips] = useState([]);
    useEffect(() => {
        if (typeof message === 'object') {
            setChips([<Chip mode='outlined' key={0}>{message['#text'].toUpperCase()}</Chip>])
        } else if (Array.isArray(message)) {
            message.forEach((item, index) => {
                if (typeof item === 'object') {
                    setChips([...chips, <Chip mode='outlined' key={index}>{item['#text'].toUpperCase()}</Chip>])
                }
            })
        }
    }
    , [])

    return (
        <View style={styles.container}>
            {chips}
        </View>
    )
        
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginHorizontal: 10,
    }
});