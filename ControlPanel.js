import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
} from 'react-native';

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
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
          style={styles.orderListItem}
        />
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
  },
  orderListItem: {
  }
});
