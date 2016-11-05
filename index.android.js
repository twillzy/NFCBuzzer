import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import NFCModule from './App/Modules/NFCModule';

export default class TagMaButt extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to TagMaButt!
        </Text>
        <TouchableHighlight onPress={this._onPressButton}>
          <Image
            style={styles.button}
            source={require('./myButton.png')}
          />
        </TouchableHighlight>
      </View>
    );
  }

  _onPressButton() {
    console.log("pressed!");
    tagMaButt().then((tagStatus) => {
      console.log(tagStatus);
    });
  }
}

async function tagMaButt() {
  try {
    console.log(NFCModule);
    var {
      tagStatus
    } = await NFCModule.tagMaButt();
    console.log("Hi " + tagStatus);
    return tagStatus;
  } catch (error) {
    console.error(error);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {}
});

AppRegistry.registerComponent('TagMaButt', () => TagMaButt);
