import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../componentsCSS/ProductCard.css';
import { saveLocalStorage } from '../services/helpers';

class ProductCard extends React.Component {
  constructor() {
    super();
    this.state = {
      objProps: { id: '',
        name: '',
        price: '',
        image: '',
        freeShipping: false,
        maxQuantity: 1,
      },
    };
  }

  componentDidMount() {
    const { id, name, price, image, freeShipping, maxQuantity } = this.props;
    this.setState({
      objProps: {
        id,
        name,
        price,
        image,
        freeShipping,
        maxQuantity,
      },
    });
  }

  addProductToCart = () => {
    const { objProps } = this.state;
    saveLocalStorage(objProps);
  };

  render() {
    const { name, image, price, id, freeShipping } = this.props;
    return (
      <div data-testid="product">
        <Link
          className="product-card"
          data-testid="product-detail-link"
          to={ `/product/${id}` }
          id={ id }
          name={ name }
          price={ price }
          image={ image }
        >
          <p>{name}</p>
          <img
            src={ image }
            alt={ name }
            className="product-img"
          />
          <div
            className="product-info"
          >
            { freeShipping ? <p data-testid="free-shipping">Frete Grátis</p> : null }
            <p>{`R$${price}`}</p>
            <button
              className="add-to-cart-button"
              data-testid="product-add-to-cart"
              onClick={ this.addProductToCart }
            >
              <p
                className="shopping-cart-text"
              >
                Adicionar ao carrinho
              </p>
            </button>
          </div>
        </Link>
      </div>
    );
  }
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  freeShipping: PropTypes.bool.isRequired,
  maxQuantity: PropTypes.number.isRequired,
};

export default ProductCard;
