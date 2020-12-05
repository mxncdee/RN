import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default class BookmarksListEmptyView extends Component {
  render() {
    return (
      <View style={styles.emptyBookmarksContainer}>
        <Image
          source={require("../images/ic_empty_bookmarks.png")}
          style={{ width: 100, height: 100 }}
        />
        <Text style={{ fontWeight: "bold", padding: 10, color: "#686868" }}>
         Nessun risultato trovato..!
        </Text>
        <Text style={{ color: "#848080" }}>
          Sembra che tu non abbia segnalibri.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyBookmarksContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});
