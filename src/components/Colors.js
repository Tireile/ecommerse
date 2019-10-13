import React from "react";


function Colors(props) {

    const { product } = props;
    console.log(props);
    return (
        <div className="colors">
            <h4>Colors</h4>
            {this.renderColorButtons(product.variants)}
        </div>
    )
}

export default Colors;