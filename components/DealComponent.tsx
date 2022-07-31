import { Avatar, Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import RenderHtml from 'react-native-render-html';
import { LinearGradient } from 'expo-linear-gradient';

export default function DealCard(props) {
    const [WebBrowserData, setWebBrowserData] = useState(null);

    const _openDealWeb = async (url) => {
        let result = await WebBrowser.openBrowserAsync(url);
        setWebBrowserData(result);
    };

    return (
        <Card style={styles.card}>
            <Card.Title 
                title={props.item.title} 
                titleStyle={styles.cardTitle} 
                titleNumberOfLines={3}
                subtitle={props.item.date}
                subtitleStyle={styles.cardSubtitle}
                right={props.item.info['@_image'] ? () => <TouchableOpacity onPress={() =>{_openDealWeb(props.item.info['@_link'])}}><Image style={styles.cardThumb} source={{ uri: props.item.info['@_image'] }} /></TouchableOpacity> : null}
                rightStyle={{ marginRight: 10 }}
            />
            <Card.Content>
                {/* <Paragraph style={styles.cardContent}>{props.item.description}</Paragraph> */}
                {/* <View style={styles.htmlView}>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['transparent', 'rgba(255,255,255,0.9)']}
                    start={[0.5, 0.5]}
                    end={[0.5, 1]}
                
                    style={styles.linearGradient}
                />
                <RenderHtml 
                    contentWidth={50} 
                    source={{ html: props.item.description }}
                    enableExperimentalGhostLinesPrevention={true}
                />
                </View> */}
                {/*lol both look bad*/}
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        marginVertical:5,
        elevation: 3,
        paddingTop: 10,
        borderRadius: 10,
    },
    cardTitle: {
        marginLeft: 3,
        fontSize: 16,
        lineHeight: 20
    },
    cardSubtitle: {
        marginLeft: 3,
    },
    cardThumb: {
        marginRight: 6,
        width:70,
        height:70,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#dddddd',
    },
    cardContent: {
        fontSize: 14,
        lineHeight: 14,
        backgroundColor: '#ffffff',
        borderRadius: 10
    },
    htmlView: {
        paddingHorizontal:10,
        backgroundColor:'rgba(0,0,0,0.04)',
        borderRadius:10,
        maxHeight:100,
        overflow:'hidden'
    },
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 100,
        borderRadius: 10,
        elevation: 3,
    }
});