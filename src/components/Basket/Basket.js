import React, { useState } from "react";
import { Container, Row, Button, Col } from "react-bootstrap";
import { products } from "../../products";

import "./Basket.scss";


const images = products[0].image;

function Basket() {
  const [basket, setBasket] = useState(products);

  const addToBasket = (i) => {
    setBasket((prevState) =>
      prevState.map((product, o) => {
        if (i === o) {
          return {
            ...product,
            inBasket: true,
            count: product.counter,
          };
        }
        return product;
      })
    );
  };

  const increment = (i) => {
    setBasket((prevBasket) =>
      prevBasket.map((product, o) => {
        if (i === o && product.inBasket) {
          if (product.count >= product.stockLevels) {
            return product;
          } else return { ...product, count: product.count + 1 };
        } else if (i === o) {
          if (product.counter > product.stockLevels) {
            return product;
          } else
            return {
              ...product,
              counter: product.counter + 1,
            };
        }
        return product;
      })
    );
  };

  const decrement = (i) => {
    setBasket((prevBasket) =>
      prevBasket.map((product, o) => {
        if (i === o && product.inBasket) {
          if (product.count > 1) {
            return { ...product, count: product.count - 1 };
          } else {
            return product;
          }
        } else if (i === o && product.counter > product.stockLevels) {
          return {
            ...product,
            counter: product.counter - 1,
          };
        }
        return product;
      })
    );
  };

  const removeFromBasket = (i) => {
    setBasket((prevBasket) =>
      prevBasket.map((product, o) => {
        if (i === o) {
          return {
            ...product,
            count: 0,
            counter: 1,
            inBasket: false,
          };
        }
        return product;
      })
    );
  };

  const basketCountTotal = basket.reduce((acc, product) => acc + product.count, 0);
  const basketPriceTotal = basket.reduce(
    (acc, product) => acc + product.price * product.count,
    0
  );

  const basketTotals = () =>
    basketCountTotal === 0 ? (
      <b>Your basket is empty</b>
    ) : (
      <>
        <b>
          <p>
            Total: £
            {Number.isInteger(basketPriceTotal)
              ? basketPriceTotal
              : basketPriceTotal.toFixed(2)}
          </p>
        </b>
      </>
    );

  const basketItems = basket.map((product, i) => (
    <div key={product.name}>
      {product.inBasket && (
        <>
          <p> Item Name: {product.name}</p>
          <p>
            Item Count: <Button onClick={() => decrement(i)}>-</Button>{" "}
            {product.count}{" "}
            <Button
              disabled={product.count >= product.stockLevels}
              onClick={() => increment(i)}
            >
              +
            </Button>
          </p>
          <p>
            Subtotal: £
            {Number.isInteger(product.count * product.price)
              ? product.count * product.price
              : `£{(product.count * product.price).toFixed(2)}`}
          </p>
          <Button onClick={() => removeFromBasket(i)}>
            Remove From Basket
          </Button>
          <hr />
        </>
      )}
    </div>
  ));

  const basketProducts = () => (
    <Col>
      {basket.map((product, i) => (
        <div key={product.name}>
          <img src={images} alt="products" height={100} width={100} />
          <p>{product.name}</p>
          <p>£{product.price}</p>
          {product.count >= product.stockLevels ? (
            <p>OUT OF STOCK</p>
          ) : (
            <p> IN STOCK</p>
          )}
          <Button
            variant="primary"
            disabled={product.count >= product.stockLevels}
            onClick={() => addToBasket(i)}
          >
            Add to basket
          </Button>
        </div>
      ))}
    </Col>
  );
  return (
    <Container>
      <Row>{basketProducts()}</Row>
      <Row>
        <h1>Basket</h1>
        {basketItems}
        {basketTotals()}
      </Row>
    </Container>
  );
}

export default Basket;
