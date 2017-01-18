import _ from "lodash";
import React from "react";
import "./productResults.html";
import { ProductSearch } from "/lib/collections";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import ListElement from "./sortList.jsx";
require("rc-slider/assets/index.css");
const Slider = require("rc-slider");
let priceMax;
let lastMin = 0;
let lastMax = 0;

export default class SortnFilter extends TrackerReact(React.Component) {
  constructor(props) {
    super(props);

    this.state = {
      min: 0,
      max: 0
    };
    this.updatePrice = this.updatePrice.bind(this);
  }

  updatePrice(e) {
    this.setState({ min: e[0] * (0.01 * priceMax) });
    this.setState({ max: e[1] * (0.01 * priceMax) });

    if (lastMin !== this.state.min) {
      lastMin = this.state.min;
      $(this.min).trigger("change");
    } else if (lastMax !== this.state.max) {
      lastMax = this.state.max;
      $(this.max).trigger("change");
    }
  }
  getProducts() {
    return ProductSearch.find().fetch();
  }

  renderVendors() {
    const products = this.getProducts();
    const prices = [];
    let vendors = products.map((product) => {
      product.price ? prices.push(product.price.max) : prices.push(0);
      return product.vendor;
    });
    priceMax = parseInt(Math.max(...prices).toFixed(), 10) ? Math.max(...prices) : 0;
    vendors = _.uniq(vendors);
    return vendors.map((vendor) => {
      return (<ListElement key={vendors.indexOf(vendor)} item={vendor} />);
    });
  }

  render() {
    return (
      <div style={{ float: "left", height: "350px", width: 200, margin: "0 20px", bottom: 0, position: "fixed", zIndex: 2000, overflowY: "scroll" }}>
        <div id="sort">
          <h4>Sort</h4>
          <input type="radio" value="1" name="upOrDown" defaultChecked />A-Z
          <input type="radio" value="-1" name="upOrDown" style={{ marginLeft: "5px" }} />Z-A <br />
          <select style={{ clear: "both" }}>
            <option value="title">Product Title</option>
            <option value="price">Product Price</option>
            <option value="rating">Product Rating</option>
          </select>
        </div>
        <hr />
        <h4>Filter</h4>
        <h5>Brands</h5>
        <div style={{ overflowY: "scroll", maxHeight: "100px" }}>
          {this.renderVendors()}
        </div>
        <hr />
        <h5>Price</h5>
        <div style={{ width: 180, padding: "0px 10px" }}>
          <Slider range allowCross={false} defaultValue={[0, 0]} onChange={this.updatePrice} />
          <label style={{ float: "left" }}> min</label>
          <label style={{ float: "right" }}> max</label><br />
          <div id="min" style={{ clear: "both"}} >
            <input ref={input => this.min = input} style={{ float: "left", width: "60px", marginLeft: "4px" }} value={this.state.min} readOnly />
          </div>
          <div id="max">
            <input ref={input => this.max = input} style={{ float: "right", width: "60px", marginRight: "4px" }} value={this.state.max} readOnly />
          </div>
        </div>
        <hr style={{ clear: "both" }} />
      </div>
    );
  }
}
