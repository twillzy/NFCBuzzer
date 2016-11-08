import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ControlPanel extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.orders),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.orders.length !== nextProps.orders.length) {
      const nextOrder = nextProps.orders[nextProps.orders.length - 1];
      const orders = this.props.orders.concat(nextOrder);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(orders)
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <View>
              <Text>Order: {rowData.orderNumber}</Text>
              <Icon name="bars" size={30} color="#900" onPress={this.buzz.bind(this, rowData)}/>
            </View>
          }
        />
      </View>
    )
  }

  buzz(rowData) {
    console.log(rowData);
    fetch('https://order-app-web-12.herokuapp.com/api/order/136945d8-3eee-4f5f-bd5b-151fe3ebdf02', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inProgress: false
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
    })
    .catch(err => {
      console.log(err);
    });
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
