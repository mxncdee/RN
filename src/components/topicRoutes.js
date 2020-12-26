import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';

import TopicScreen from './topicScreen';
import HomeScreen from './homeScreen';
import SearchScreen from './searchScreen';

const TopicRoutes=StackNavigator(
	{
		Home:{
			screen:HomeScreen,
			navigationOptions:({navigation})=>({
				title:"Home",
				headerLeft:(
					<TouchableOpacity
						onPress={()=>navigation.openDrawer()}>
						<Icon name='menu' color='white'/>
					</TouchableOpacity>
				)				
			})
		},

		Topic:{
			screen:TopicScreen,
			navigationOptions:({navigation})=>({
				title:navigation.state.params.field,
				headerLeft:(
					<TouchableOpacity
						onPress={()=>navigation.openDrawer()}>
						<Icon name='menu' color='white'/>
					</TouchableOpacity>
				)											
			})
		},
		Search:{
			screen:SearchScreen,
			navigationOptions:({navigation})=>({
				title:"Search Results",
				headerLeft:(
					<TouchableOpacity
						onPress={()=>navigation.openDrawer()}>
						<Icon name='menu' color='white'/>
					</TouchableOpacity>
				)						
			})
		}
	},
	// imposta uno stile di intestazione comune per tutte le schermate del percorso ??
	// https://reactnavigation.org/docs/en/stack-navigator.html#headerleftcontainerstyle
	{
		initialRouteName:"Home",
		navigationOptions:{
			headerLeftContainerStyle:{margin:20},			
			headerStyle:{
				backgroundColor:'#007dbc'
			},			
			headerTintColor:'#fff',
			headerTintStyle:{
				fontWeight:'bold'
			}
		},
		headerLayoutPreset: 'center'
	}
);

export default TopicRoutes;

