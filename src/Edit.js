import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SimpleStorageContract from '../build/contracts/SimpleStorage.json';
import getWeb3 from './utils/getWeb3';
import { button } from "@blueprintjs/core";
import { SketchPicker } from 'react-color';
import { Icon } from "@blueprintjs/core";
import Nav from './Nav';

class Edit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      background: '#fff'
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      //this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  componentDidMount() {
    this.setupCanvas();
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  setupCanvas() {
    var canvas = document.getElementById('pixel-canvas');
    this.writeMessage(canvas);

    canvas.addEventListener('click', (event) => {
      var context = canvas.getContext('2d');
      var mousePosition = this.getMousePosition(canvas, event);
      var gridX = Math.floor(parseInt(mousePosition.x, 10) / 8);
      var gridY = Math.floor(parseInt(mousePosition.y, 10) / 8);
      
      context.fillRect(gridX * 8, gridY * 8, 8, 8);
      context.fillStyle = 'white';
    }, false);
  }

  writeMessage(canvas, message) {
    var context = canvas.getContext('2d');
    
    context.strokeStyle = "black"; // Draws the canvas border
    context.rect(0, 0, 600, 600);
    context.stroke();
    
    var countOfGridSquares = 75;
    var colors = ['red', 'blue', 'green'];  

    var step = 8;
    for (var x = 0; x <= countOfGridSquares; x++) {
        for(var y = 0; y <= countOfGridSquares; y++) {
          context.fillRect(x * step, y * step, step, step);
          context.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        } 
    }
  }

  getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();

    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  }

  render() {
    //@TODO: get actual values from contract
    const ethAvgPixelCost = 0.0002;
    const ethFundedAmt = 18.2910;
    const projectEdits = '1,291';

    return (
        <div className="App">
            <Nav />
            <div id="main" className="container">
            <div className="col">
                <SketchPicker
                    color={ this.state.background }
                    onChangeComplete={ this.handleChangeComplete }
                />
            </div>
            <div className="col">
                <div id="pixel-canvas-wrapper">
                <canvas id="pixel-canvas" width="600" height="600" />
                </div>
            </div>
            <div className="col">
                <div className='panel'>
                    <h1>Transaction Details</h1>
                    <span>
                        <Icon iconName='dollar' className='ico' />
                        {`${ethAvgPixelCost} ETH/pixel`}
                    </span>
                    <span>
                        <Icon iconName='bank-account' className='ico' />
                        {`${ethFundedAmt} ETH funded`}
                    </span>
                    <span>
                        <Icon iconName='helper-management' className='ico' />
                        {`${projectEdits} project edits`}
                    </span>
                </div>

                <div style={{ flexDirection: 'row' }}>
                    <Link to="/">
                        <button type="button" className="pt-button pt-large pt-fill">
                        Confirm Transaction
                        </button>
                    </Link>

                    <Link to="/">
                        <button type="button" className="pt-button pt-large pt-fill cancel" style={{ marginTop: 20 }}>
                        Cancel
                        </button>
                    </Link>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Edit;
