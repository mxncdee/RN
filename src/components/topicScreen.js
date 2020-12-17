import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, ScrollView, Linking} from 'react-native';
import {Card} from 'react-native-elements';

import {fetchCategory} from '../actions/fetchAPI_action';
import styles from '../styles/homeScreen.style';

export class TopicScreen extends Component {
	constructor(props){
		super(props);
    this.state={
      newsData:[],
      newsCategory:this.props.navigation.state.params.field
    };
	}

  componentDidMount(){
    this.props.dispatch(fetchCategory(this.state.newsCategory));
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      newsData:nextProps.categoryData.data
    });
  }

  render() {
    let NewsCards=(<Text>Loading...</Text>);
    if(this.state.newsData.length!==0){
      NewsCards=this.state.newsData.map((news,key)=>{
        if(news.urlToImage!==null){
          let imgUrl=news.urlToImage;
          return (
            <Card 
            key={key}
            imageStyle={{ height:120 }}
            image={{ uri:imgUrl }}
            title={news.title}
            >
              <Text style={{textAlign:'left'}}>Pubblicato il: {news.publishedAt}</Text>
              <Text style={styles.TextLinkStyle} onPress={ ()=> Linking.openURL(news.url) } >
                leggi...
              </Text>
            </Card>
          )
        }
        else{
          return (
            <Card 
            key={key}
            title={news.title}
            >
              <Text style={{textAlign:'left'}}>Pubblicato il: {news.publishedAt}</Text>
              <Text style={styles.TextLinkStyle} onPress={ ()=> Linking.openURL(news.url) } >
                leggi...
              </Text>
            </Card>
          )          
        }
      });
    } 	
    return (
      <ScrollView>
      	{NewsCards}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state)=>{
    return {
        categoryData: state.categoryData
    };
}

export default connect(mapStateToProps)(TopicScreen);