import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; 
import {NavigationActions, DrawerActions} from 'react-navigation';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import {SearchBar, Button, List, ListItem} from 'react-native-elements';

import styles from '../styles/menuList.style';

const TopicList=['Home','Business','Entertainment','Health','Science','Sports','Technology'];

class MenuList extends Component {
  // create a method that would pass different props (topic) to
  // the TopicRoutes component, which will display that topic only (by
  // search via API). 
  constructor(props){
    super(props);
    this.state={
      searchText:""
    };
    this.handleChangeText=this.handleChangeText.bind(this);
    this.handleSearch=this.handleSearch.bind(this);
  }

  handleChangeText=(text)=>{
    this.setState({
      searchText:text
    });
  }

  handleSearch=(e)=>{
    e.stopPropagation();
    this.props.dispatch(this.navigateToSearch(this.state.searchText));
  }

  navigateToShow=(topic)=> () => {
    // see react navigation API ref for NavigationActions
    let route="";
    if(topic.topic==="home"){
      route="Home";
    }
    else{
      route="Topic";
    }
    const navigateAction = NavigationActions.navigate({
      routeName:route,
      params:{field:topic.topic}
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
  }

  navigateToSearch=(searchText)=> () => {
    const NavigationActionToSearch = NavigationActions.navigate({
      routeName:"Search",
      params:{searchText:searchText}
    }); 
    this.props.navigation.dispatch(NavigationActionToSearch);
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
  }

  componentWillMount(){
    navItems=(<List containerStyle={{marginBottom: 20}}>
      {
        TopicList.map((topic,index)=>(
          <ListItem
            key={index}
            title={topic}
            titleStyle={styles.navItemStyle}
            onPress={this.navigateToShow({topic})}
          />
        ))
      }
    </List>); 
    this.setState({
      navItems
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.sectionHeadingStyle}>
            <Text style={styles.sectionHeadingTextStyle}>Top Menu</Text>
            <SearchBar 
              lightTheme
              containerStyle={{
                borderWidth:1 ,
                borderRadius:10,
                borderBottomColor:'transparent',
                borderTopColor:'transparent'
              }}
              onChangeText={text=>this.handleChangeText(text)}
              onClearText={text=>this.setState({searchText:""})}
              placeholder='Cerca per tipo'
            />
            <Button
              activeOpacity={0.1}
              buttonStyle={{padding:5,marginTop:20, borderRadius:10}}
              onPress={e=>this.handleSearch(e)}
              title='cerca'
              textStyle={styles.buttonTextStyle} />
          </View>
          {this.state.navItems}
        </ScrollView>
      </View>
    );
  }
}

MenuList.propTypes={navigation:PropTypes.object};

export default connect()(MenuList);

