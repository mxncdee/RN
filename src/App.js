import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import {DrawerNavigator} from 'react-navigation';

import MenuList from './components/menuList';
import TopicRoutes from './components/topicRoutes';

import {Provider} from 'react-redux';
import store from './store';

const TopicList=['home','business','entertainment','general',
'health','science','sports','technology'];

const Nav = DrawerNavigator({
  Item1:{
    screen:TopicRoutes,
    }
  },{
    contentComponent:MenuList,
    drawerWidth: Dimensions.get('window').width-150
  }
);

class App extends Component{
	render(){
		return(
			<Provider store={store}>
			<Nav />
			</Provider>
		)
	}
}
export default App;