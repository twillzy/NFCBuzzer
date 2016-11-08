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
      orders: [],
      text: ''
    };
  }

  render() {
    const barsIcon = (<Icon name="bars" size={30} color="#717274" onPress={this.openControlPanel.bind(this)}/>)
    const plusIcon = (<Icon name="plus" size={35} color="white"/>)

    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="overlay"
        content={<ControlPanel orders={this.state.orders}/>}
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
            <View style={styles.header}>
              {barsIcon}
            </View>
            <View style={styles.body}>
               <Text style={styles.logo}>
                 TapAway
               </Text>
               <View style={styles.searchBar}>
                 <TextInput
                    style={styles.singleLine}
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    placeholder="Enter new order number..."
                    blurOnSubmit={false}
                    onSubmitEditing={dismissKeyboard}
                    onChangeText={(text) => {this.setState({text: text})}}
                  />
                  <TouchableHighlight style={styles.plusIcon} onPress={this._onPressButton.bind(this)}>
                     <View>
                       {plusIcon}
                     </View>
                  </TouchableHighlight>
                </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Drawer>
    );
  }

  _onPressButton() {
    console.log('Posting...');
    fetch('https://order-app-web-12.herokuapp.com/api/order', {
      method: 'POST',
      body: JSON.stringify({
        orderNumber: this.state.text
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.id) {
        this.setState({
          orders: this.state.orders.concat([{orderId: responseJson.id, orderNumber: this.state.text}])
        });
        return tagMaButt(responseJson.id);
      }
    })
    .then((tagStatus) => {
      console.log("TagStatus " + tagStatus);
    })
    .catch((err) => {
      console.log(err);
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
  console.log('Tagging... ');
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
  header: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: 15,
    alignSelf: 'flex-start',
  },
  body: {
    flex: 10,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold',
    fontSize: 50,
    color: '#462066',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  searchBar: {
    flexDirection: 'row',
    borderWidth: 0.8,
    borderRadius: 3,
    paddingLeft: 5
  },
  plusIcon: {
    flex: 1,
    backgroundColor: '#8ED2C9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleLine: {
    flex: 5,
    fontSize: 15,
  },
});

AppRegistry.registerComponent('TagMaButt', () => TagMaButt);
