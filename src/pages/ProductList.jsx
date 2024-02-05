import React, { Component } from 'react';
import CategoriesList from '../components/CategoriesList';
import Products from '../components/Products';
import '../pagesCSS/ProductList.css';
import { getProductsFromCategoryAndQuery } from '../services/api';

class ProductList extends Component {
  state = {
    inputValue: '',
    showMessage: true,
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

  show = () => {
    const { inputValue } = this.state;
    if (inputValue !== '') {
      this.setState({ showMessage: false });
    } else {
      this.setState({ showMessage: true });
    }
  };

  handleInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      inputValue: value,
    }, () => this.show()); // Aqui a função de atualizar o status 'showMessage' deve ser passada como segundo parâmetro para garantir que a atualização ocorra apenas após a atualização do input
  };

  render() {
    const { showMessage, productList, totalItens } = this.state;
    const { searchForInput } = this;
    const message = 'Digite algum termo de pesquisa ou escolha uma categoria.';
    return (
      <div>
        { showMessage
&& <div className="message" data-testid="home-initial-message">{ message }</div>}
        {' '}
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
        <Products
          productList={ productList }
          totalItens={ totalItens }
        />
        <div>
          <CategoriesList selectCategory={ this.searchForCategory } />
        </div>
      </div>
    );
  }
}

export default ProductList;
