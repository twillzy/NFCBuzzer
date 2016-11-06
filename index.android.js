import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import NFCModule from './App/Modules/NFCModule';

export default class TagMaButt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Enter order number
          </Text>
          <TextInput
             ref="4"
             style={styles.singleLine}
             keyboardType="numeric"
             placeholder="eg. 1206"
             blurOnSubmit={false}
             onSubmitEditing={dismissKeyboard}
             onChangeText={(text) => {this.setState({text})}}
           />
         <TouchableHighlight onPress={this._onPressButton.bind(this)}>
            <Image
              style={styles.button}
              source={require('./myButton.png')}
            />
         </TouchableHighlight>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _onPressButton() {
    tagMaButt(this.state.text).then((tagStatus) => {
      if(tagStatus === 'tagged') {
        console.log('posting....');
        // fetch('https://www.order-app-web-12.herokuapp.com/orders', {
        //   method: 'POST',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     orderNumber: '',
        //   })
        // });
      }
    });
  }
}

async function tagMaButt(orderNumber) {
  try {
    var {
      tagStatus
    } = await NFCModule.tagMaButt(orderNumber);
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
  button: {
    width: 100,
    height: 100,
    marginTop: 20
  },
  singleLine: {
    fontSize: 20,
    padding: 10,
    paddingHorizontal: 40,
  },
});

AppRegistry.registerComponent('TagMaButt', () => TagMaButt);
