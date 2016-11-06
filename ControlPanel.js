import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class ControlPanel extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          New Order
        </Text>
        <Text>
          Ready to Pickup
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "red",
  }
});
