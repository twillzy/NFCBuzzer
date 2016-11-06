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
import Drawer from 'react-native-drawer';
import ControlPanel from './ControlPanel';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TagMaButt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    const myIcon = (<Icon name="bars" size={30} color="#900" onPress={this.openControlPanel.bind(this)}/>)

    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="overlay"
        content={<ControlPanel />}
        tapToClose={true}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.container}>
            {myIcon}
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
      </Drawer>
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

  closeControlPanel = () => {
    this._drawer.close()
  };

  openControlPanel = () => {
    this._drawer.open()
  };
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

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
  main: {paddingLeft: 3},
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
