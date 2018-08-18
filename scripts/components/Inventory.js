
/* 
    Inventory
*/

import React from 'react';
import AddFishForm from './AddFishForm';
import { linkState } from '../../node_modules/react-catalyst/src/catalyst/LinkedStateMixin';

var Inventory = React.createClass({
  renderInventory: function(key) {
      var linkState = this.props.linkState;
      return (
          <div className="fish-edit" key={key}>
              <input type="text" valueLink={linkState('fishes.' + key +'.name')}/>
              <input type="text" valueLink={linkState('fishes.' + key +'.price')}/>
              <select valueLink={linkState('fishes.' + key + '.status')}>
                  <option value="unavailable">Sold Out!</option>
                  <option value="available">Fresh!</option>
              </select>
              <textarea valueLink={linkState('fishes.' + key + '.desc')}></textarea>
              <input type="text" valueLink={linkState('fishes.' + key +'.image')}/>
              <button onClick={this.props.removeFish.bind(null, key)}>Remove Fish</button>
          </div>
      )
  },
  render: function() {
      return(
          <div>
              <h2>Inventory</h2>
              <AddFishForm {...this.props} />
              {Object.keys(this.props.fishes).map(this.renderInventory)}
              <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
          </div>
      )
  },
  propType: {
      addFish: React.PropTypes.func.isRequired,
      loadSamples: React.PropTypes.func.isRequired,
      fishes: React.PropTypes.func.isRequired,
      removeFish: React.PropTypes.func.isRequired,
      linkState: React.PropTypes.func.isRequired,
  }
})

export default Inventory;