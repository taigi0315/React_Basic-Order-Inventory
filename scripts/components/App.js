/* 
    App 
*/

import React from 'react';
import Catalyst from 'react-catalyst';
import base from '../rebase';
import Header from '../components/Header';
import Order from '../components/Order';
import NotFound from '../components/NotFound';
import Fish from '../components/Fish';
import Inventory from '../components/Inventory';

var App = React.createClass({
  mixins: [Catalyst.LinkedStateMixin],
  getInitialState: function() {
      return {
          fishes: {},
          order: {}
      }
  },
  componentDidMount: function() {
      base.syncState(this.props.params.storeId + '/fishes', {
        context: this,
        state: 'fishes',
      });
      var localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);
      if (localStorageRef) {
          // update our componenet state to reflect what is in localStorage
          this.setState({
            order: JSON.parse(localStorageRef)
          });
      }
  },
  componentWillUpdate: function(nextProps, nextState) {
      localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
  },
  addToOrder: function(key) {
      this.state.order[key] = this.state.order[key] + 1 || 1;
      this.setState({order: this.state.order });
  },
  removeFromOrder: function(key) {
      delete this.state.order[key]
      this.setState({
          order: this.state.order
      });
  },
  addFish: function(fish) {
      var timestamp = (new Date()).getTime();
      // Update the state object
      this.state.fishes['fish-' + timestamp] = fish;
      // Set the state, pass specific state which is change, so React does not have to check whole state
      this.setState({ fishes: this.state.fishes });
  },
  removeFish: function(key) {
      if(confirm("Are you sure you want to remove this fish?")) {    
          this.state.fishes[key] = null;
          this.setState({
              fishes: this.state.fishes
          })
      }
  },
  loadSamples: function() {
      this.setState({
          fishes: require("../sample-fishes")
      })
  },
  renderFish: function(key){ 
      return <Fish key={key} 
          index={key} 
          details={this.state.fishes[key]} 
          addToOrder={this.addToOrder}
      />
  },
  render: function() {
      return (
          <div className="catch-of-the-day">
              <div className="menu">
                  <Header tagline="Fresh Seafood Market"/>
                  <ui className="list-of-fishes">
                      {Object.keys(this.state.fishes).map(this.renderFish)}
                  </ui>
              </div>
          <Order order={this.state.order} fishes={this.state.fishes} removeFromOrder={this.removeFromOrder} />
          <Inventory addFish={this.addFish} loadSamples={this.loadSamples} fishes={this.state.fishes} linkState={this.linkState} removeFish={this.removeFish} />
          </div>
      )
  }
});

export default App;