import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator
} from "react-native";
import NavigationBackButton from "../../src/components/NavigationBackButton";
import ChannelListErrorView from "../../src/components/ChannelListErrorView";

import * as appConst from "../../src/config/Config";

const screen_width = Dimensions.get("window").width;
export default class ChannelsList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <NavigationBackButton navigation={navigation} />,
      title: navigation.state.params.title,
      headerStyle: {
        backgroundColor: "#0050ff"
      },
      headerTintColor: "#ffffff",
      headerTitleStyle: {
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center"
      }
    };
  };

  constructor() {
    super();
    this.state = {
      isChannelListAvaliable: 1,
      channelsData: []
    };
  }

  async componentWillMount() {
    fetch(appConst.NEWS_CHANNELS_URL)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          channelsData: responseJson.sources,
          isChannelListAvaliable: 2
        });
      })
      .catch(error => {
        this.setState({
          isChannelListAvaliable: 0
        });
      });
  }

  onChannelItemClicked(source,name) {
    this.props.navigation.navigate("ChannelNewsFeed", {
      source: source,
      title: name
    });
  }

  openChannelWebsite(url) {
    this.props.navigation.navigate("NewsWebView", {
      url: url
    });
  }

  render() {
    var channelsList;
    if (this.state.isChannelListAvaliable == 2) {
      channelsList = (
        <View style={styles.container}>
          {/* id: "xxx-news",
name: "... News",
description: " .... in Italia, i dati e le news dal mondo di oggi, sabato..... ",
url: "https://xxx.go.com",
category: "general",
language: "it",
country: "it" */}
          <FlatList
            style={{ flex: 1, width: screen_width }}
            data={this.state.channelsData}
            renderItem={({ item }) => (
              <View style={styles.listitem}>
                <TouchableOpacity
                  onPress={() => this.onChannelItemClicked(item.id,item.name)}
                >
                  <View style={{ flexDirection: "column" }}>
                    <View style={styles.feedItem}>
                      <Image
                        source={require("../images/ic_channel_placeholder.png")}
                        style={{ width: 25, height: 25 }}
                      />
                      <Text style={{ padding: 10, fontSize: 17 }}>
                        {item.name}
                      </Text>
                    </View>
                    <Text
                      style={{
                        paddingRight: 10,
                        paddingLeft: 10,
                        paddingBottom: 5,
                        fontSize: 15
                      }}
                    >
                      {item.description}
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.openChannelWebsite(item.url)}
                    >
                      <View
                        style={{ width: screen_width, alignItems: "center" }}
                      >
                        <Text style={{ padding: 5, color: "#0000ff" }}>
                          Go to website
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    } else if (this.state.isChannelListAvaliable == 1) {
      channelsList = (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      channelsList = (
        <View style={styles.emptyChannelsContainer}>
          <ChannelListErrorView />
        </View>
      );
    }
    return <View style={styles.container}>{channelsList}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyChannelsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  listitem: {
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    margin: 5,
    backgroundColor: "#ffffff"
  },
  feedItem: {
    alignContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    padding: 8
  }
});
