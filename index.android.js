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
    const barsIcon = (<Icon name="bars" size={25} color="#717274" onPress={this.openControlPanel.bind(this)}/>)
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
                    {/*<Image
                      style={styles.button}
                      source={require('./myButton.png')}
                    />*/}
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
    // this.setState({
    //   orders: this.state.orders.concat([{orderId: responseJson.id, orderNumber: this.state.text}])
    // });
    this.setState({
      orders: this.state.orders.concat([{orderId: 'xxx', orderNumber: this.state.text}])
    });
    // fetch('https://order-app-web-12.herokuapp.com/api/order', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     orderNumber: this.state.text
    //   })
    // })
    // .then((response) => response.json())
    // .then((responseJson) => {
    //   return tagMaButt(responseJson.id)
    // })
    // .then((tagStatus) => {
    //   console.log("tagStatus " + tagStatus)
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
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
  header: {
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
    marginLeft: 15,
    alignSelf: 'flex-start',
  },
  body: {
    // backgroundColor: 'blue',
    flex: 10,
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'pink',
    borderWidth: 0.8,
    borderRadius: 3,
    paddingLeft: 5
  },
  button: {
    width: 100,
    height: 100,
    marginTop: 20
  },
  plusIcon: {
    flex: 1,
    backgroundColor: '#56B68B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleLine: {
    flex: 5,
    fontSize: 15,
  },
});

AppRegistry.registerComponent('TagMaButt', () => TagMaButt);
