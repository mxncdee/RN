import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, ScrollView, Linking} from 'react-native';
import {Card} from 'react-native-elements';

import {fetchSearch} from '../actions/fetchAPI_action';
import styles from '../styles/homeScreen.style';

export class SearchScreen extends Component {
	constructor(props){
		super(props);
    this.state={
      newsCategory:'search',
      newsData:[],
      searchCount:null,
      searchText:this.props.navigation.state.params.searchText
    };
	}

  componentDidMount(){
    this.props.dispatch(fetchSearch(this.state.searchText));
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      newsData:nextProps.searchData.data,
      searchCount:nextProps.searchData.count
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
                continua...
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
                approfondisci...
              </Text>
            </Card>
          )          
        }
      });
    }     	
    return (
      <ScrollView>
        <Text style={{textAlign:'left', fontWeight:'bold'}}>Trovati {this.state.searchCount} risultati</Text>
      	{NewsCards}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state)=>{
    return {
        searchData: state.searchData
    };
}

export default connect(mapStateToProps)(SearchScreen);