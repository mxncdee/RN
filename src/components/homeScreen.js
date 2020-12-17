import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, ScrollView, Linking} from 'react-native';
import {Card} from 'react-native-elements';

import {fetchCategory} from '../actions/fetchAPI_action';
import styles from '../styles/homeScreen.style';

export class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      newsData:[],
      newsCategory:null
    };
  }

  componentDidMount(){
    this.props.dispatch(fetchCategory('general'));
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      newsData:nextProps.categoryData.data,
      newsCategory:nextProps.categoryData.category
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
            imageStyle={{ height:100 }}
            image={{ uri:imgUrl}}
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

export default connect(mapStateToProps)(HomeScreen);