import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ProductDetails from './pages/ProductDetails';
import ProductList from './pages/ProductList';
import Cart from './pages/cart/Cart';

class App extends React.Component {
  render() {
    return (
      <main className="App">
        <Switch>
          <Route path="/" exact component={ ProductList } />
          <Route path="/cart" component={ Cart } />
          <Route path="/product/:id" component={ ProductDetails } />
        </Switch>
      </main>
    );
  }
}

export default App;
