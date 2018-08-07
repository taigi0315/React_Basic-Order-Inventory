var React = require('react');
var ReactDOM = require('react-dom');

var StorePicker = React.creaetClass({
    render : function() {
        return (
            <form>
                <h2>Please Enter A Stroe</h2>
                <input type='text' ref='storeId'/>
                <input type='Submit'/>
            </form>
        )
    }
});

ReactDOM.render(<StorePicker/>, document.querySelector('#main'));
