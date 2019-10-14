import React from 'react';
import axios from 'axios';
import './style.css';
// import Colors from './components/Colors';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,

      product: {
        name: '',
        description: '',
        link: '',
        details: [],
        variants: []
      },

      selectedVariant: null

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

  setVariantByColor(variant) {
    // const selectedVariant = variants.find((variant) => variant.variantId === variantId);
    this.setState({
      selectedVariant: variant
    })
  }

  renderColorButtons(variants) {
    return (
      <ul className="variant-list">
        {
          variants.map((variant) => {
            const { variantId, variantColor } = variant;

            return <li key={variantId} className="variant-item">
              <button
                className={`variant-button variant-button-${variantColor}`}
                onClick={() => this.setVariantByColor(variant)}
              >
              </button>
            </li>
          })
        }
      </ul>
    )
  }

  fetchProduct() {
    return axios.get('http://localhost:3004/product')
      .then(({ data }) => {
        this.setState({
          product: data,
          selectedVariant: data.variants[0]
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  componentDidMount() {
    this.fetchProduct()
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  render() {
    const { loading, product, selectedVariant } = this.state;

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
            <img src={selectedVariant.imageUrl} alt=""></img>
          </div>
          <div className="product-info">
            <a href={product.link} target="_blank">
              <h1>{product.name}</h1>
            </a>
            {this.renderStockStatus(selectedVariant.inventory)}
            <p>{product.description}</p>
            <div className="details">
              <h3>Details</h3>
              {this.renderDatailsSocks(product.details)}
            </div>
            {/* <Colors product={product} /> */}
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
