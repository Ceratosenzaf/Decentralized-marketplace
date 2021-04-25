import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Marketplace from "../abis/Marketplace.json"

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]});
    const networkId = await web3.eth.net.getId();
    const networkData = Marketplace.networks[networkId];

    if(networkData) {
      const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address);
    } else {
      window.alert("Marketplace contract not deployed to detected network");
    }
  }

  constructor(props) {
    super(props);
    this.state = {account: "", productsCount: 0, products: [], loading: true};
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="https://github.com/MrC3drik/Decentralized-marketplace/tree/master" 
          target="_blank" rel="noopener noreferrer">
            MrC3drik Marketplace
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;