import React from 'react';
import axios from 'axios';
import './style.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,

      product: {
        name: '',
        description: '',
        link: '',
        inventory: null,
        details: [],
        variants: []
      }
    }

  }

  renderStockStatus(inventory) {
    if (inventory === 0) {
      return <span className="out-of-stock">out of stock</span>;
    }
    if (10 > inventory > 0) {
      return <span>almost out of stock</span>;
    }
    return <span>in stock</span>
  }

  renderDatailsSocks(details) {
    return (
      <ul>
        {details.map((detail) => {
          return <li key={detail}>{detail}</li>
        })}
      </ul>
    )
  }

  renderColorButtons(variants) {
    return (
      <ul className="variant-list">
        {
          variants.map(({variantId, variantColor}) => {
            return <li key={variantId} className="variant-item">
              <button className={`variant-button variant-button-${variantColor}`}></button>
            </li>
          })
        }
      </ul>
    )
  }

  fetchProduct() {
    return axios.get('http://localhost:3004/product')
      .then(({ data }) => {
        this.setState({ product: data })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.fetchProduct()
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  render() {
    const { loading, product } = this.state;

    if (loading) {
      return <div className="loading-spinner">Loading...</div>
    }

    return (
      <div>
        <div className="nav-bar"></div>
        <div className="cart">
          <p>Cart (0)</p>
        </div>
        <div className="product">
          <div className="product-image">
            <img src={product.image} alt=""></img>
          </div>
          <div className="product-info">
            <a href={product.link} target="_blank">
              <h1>{product.name}</h1>
            </a>
            {this.renderStockStatus(product.inventory)}
            <p>{product.description}</p>
            <div className="details">
              <h3>Details</h3>
              {this.renderDatailsSocks(product.details)}
            </div>

            <div className="colors">
              <h4>Colors</h4>
              {this.renderColorButtons(product.variants)}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
