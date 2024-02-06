import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CategoriesList from '../components/CategoriesList';
import Products from '../components/Products';
import shoppingCart from '../img/shoppingCart.png';
import '../pagesCSS/ProductList.css';
import { getProductsFromCategoryAndQuery } from '../services/api';

class ProductList extends Component {
  state = {
    inputValue: '',
    category: '',
    productList: [],
    totalItens: 1,
  };

  searchForCategory = (event) => {
    const { selectedIndex } = event.target;
    const selectedOption = event.target.options[selectedIndex];
    const name = selectedOption.getAttribute('name');
    this.setState({ category: name }, async () => {
      this.searchForInput();
    });
  };

  searchForInput = async () => {
    const { category, inputValue } = this.state;
    const productObjs = await getProductsFromCategoryAndQuery(category, inputValue);
    this.setState({
      productList: productObjs.results,
      totalItens: productObjs.paging.total,
    });
  };

  handleInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      inputValue: value,
    });
  };

  render() {
    const { productList, totalItens } = this.state;
    const { searchForInput } = this;
    return (
      <>
        <div
          className="search-bar-container"
        >
          <Link data-testid="shopping-cart-button" to="/cart">
            <img
              className="shopping-cart-img"
              src={ shoppingCart }
              alt="Shopping Cart"
            />
          </Link>
          <label
            className="search-bar"
          >
            <input
              className="search-input"
              type="text"
              data-testid="query-input"
              placeholder="Pesquise por um produto"
              onChange={ this.handleInputChange }
            />
            <button
              data-testid="query-button"
              className="search-button"
              onClick={ () => searchForInput() }
            >
              Pesquisar
            </button>
          </label>
        </div>
        <div>
          <CategoriesList selectCategory={ this.searchForCategory } />
        </div>
        <Products
          productList={ productList }
          totalItens={ totalItens }
        />
      </>
    );
  }
}

export default ProductList;
