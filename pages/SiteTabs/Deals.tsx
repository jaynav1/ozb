import { Appbar, ActivityIndicator } from 'react-native-paper';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
//import { useScrollToTop } from '@react-navigation/native';
import { getCategoryFeed, getFrontPageFeed } from '../../utilities/siteRssFeedInterface';
import DealComponent from '../../components/DealComponent';
import CategoryChipView from '../../components/CategoryChipView';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useTheme } from 'react-native-paper';

//import sampleDeal from '../../sampleDeal.json';

function DealsAppbar() {
	const { colors } = useTheme();
	return ( 
		<Appbar.Header style={{ ...styles.appbar, backgroundColor: colors.surface}}>
			<Appbar.Content title="Deals"/>
		</Appbar.Header>
	)
}

export default function DealsTab({ navigation }) {
	const ref = useRef(null);
	const [options, setOptions] = useState({
		sort: 'hot',
		category: 'Computing',
		page: 0
	});
	const [deals, setDeals] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	useEffect(() => {
		if (options.category !== 'all') {	
			getCategoryFeed(options)
				.then(data => {
					setDeals(data);
					setLoading(false);
				})
		} else {
			if (options.page < 11) {
				setLoading(true);
				getFrontPageFeed(options)
				.then(data => {
					setDeals(deals.concat(data));
					setLoading(false);
				}),
				() => {
					setLoading(false);
				}
			}
		}
	}
	, [options]);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setDeals([]);
		setOptions({
			...options,
			page: 0
		});
		setRefreshing(false);
	}, [options]);

	return (
		<View style={styles.container}>
			<DealsAppbar/>
			<CategoryChipView options={options} setOptions={setOptions}/>
			<DealsList deals={deals} refreshing={refreshing} onRefresh={onRefresh} loading={loading} options={options} setOptions={setOptions}/>
		</View>
	);
}

function DealsList(props) {
	const renderItem = ({ item }) => {
		return (
			<DealComponent item={item}/>
		)
	}

	const renderFooter = () => {
		return (
			<ActivityIndicator style={styles.loadcircle} animating={props.loading}/>
		)
	}

	return (
		<FlatList
			ref={props.ref}
			data={props.deals}
			renderItem={renderItem}
			refreshControl={<RefreshControl refreshing={props.refreshing} onRefresh={props.onRefresh} />}
			keyExtractor={(item, index) => index.toString()}
			ListFooterComponent={renderFooter}
			maxToRenderPerBatch={5}
			onEndReached={() => {
				props.setOptions({...props.options, page: props.options.page + 1});
			}}
		/>
	)
}


const styles = StyleSheet.create({
	appbar: {
		elevation: 0
	},
	container: {
		flex: 1,
	},
	loadcircle: {
		marginVertical: 10
	}
});