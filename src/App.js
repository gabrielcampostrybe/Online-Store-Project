import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import shoppingCart from './img/shoppingCart.png';
import ProductDetails from './pages/ProductDetails';
import ProductList from './pages/ProductList';
import Cart from './pages/cart/Cart';

class App extends React.Component {
  render() {
    return (
      <main className="App">
        <Link data-testid="shopping-cart-button" to="/cart">
          <img className="shopping-cart-img" src={ shoppingCart } alt="Shopping Cart" />
        </Link>
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
