import PropTypes from 'prop-types';
import React from 'react';
import '../componentsCSS/Products.css';
import ProductCard from './ProductCard';

class Products extends React.Component {
  render() {
    const { productList, totalItens } = this.props;

    return (
      <div>
        <ul>
          {productList.map((product) => (
            <ProductCard
              key={ product.id }
              id={ product.id }
              name={ product.title }
              image={ product.thumbnail }
              price={ product.price }
              freeShipping={ product.shipping.free_shipping }
              maxQuantity={ product.available_quantity }
            />
          ))}
        </ul>
        { totalItens === 0
          ? <div className="none-found-message">Nenhum produto foi encontrado</div>
          : null }
      </div>
    );
  }
}

Products.propTypes = {
  totalItens: PropTypes.number.isRequired,
  productList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
};

export default Products;
