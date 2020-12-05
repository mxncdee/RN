import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default class NewsFeedErrorView extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../images/ic_empty_response.png")}
          style={{ width: 100, height: 100 }}
        />
        <Text style={{ fontWeight: "bold", padding: 10, color: "#686868" }}>
          Nessun risultato trovato..!
        </Text>
        <Text style={{ color: "#848080" }}>
          Impossibile recuperare i dati ..! Riprova.
        </Text>
      </View>
    );
  }
}
