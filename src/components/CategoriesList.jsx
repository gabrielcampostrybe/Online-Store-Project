import PropTypes from 'prop-types';
import React from 'react';
import '../componentsCSS/CategoriesList.css';
import { getCategories } from '../services/api';

class CategoriesList extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    getCategories().then((data) => this.setState({ categories: data }));
  }

  render() {
    const { categories } = this.state;
    const { selectCategory } = this.props;
    return (
      <div
        className="categories-list"
      >
        <h2
          className="title-categories"
        >
          Categorias
        </h2>
        <select
          className="category-select"
          onChange={ (event) => selectCategory(event) }
        >
          <option>Select a category</option>
          {
            categories.map((category) => (
              <option
                className="button-category"
                key={ category.id }
                data-testid="category"
                name={ category.id }
                value={ category.name }
              >
                { category.name }
              </option>
            ))
          }
        </select>
      </div>
    );
  }
}

CategoriesList.propTypes = {
  selectCategory: PropTypes.func,
};

CategoriesList.defaultProps = {
  selectCategory: () => '',
};

export default CategoriesList;
