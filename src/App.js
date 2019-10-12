import React from 'react';
import './style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
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
      <ul>
        {variants.map((variant, index) => {
          return
          <li key={index}>
            <button className="button" ></button>
          </li>
        })}
      </ul>
    )
  }

  render() {

    const { product } = this.props;



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
            <div className="details">
              <h4>Details</h4>
              {this.renderDatailsSocks(product.details)}
            </div>
          </div>


        </div>
      </div>
    );
  }
}

export default App;
