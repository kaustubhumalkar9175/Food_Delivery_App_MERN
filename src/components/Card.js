import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {
  let Dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = () => {
    let foodItem = props.foodItem;
    Dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      qty: qty,
      size: size,
      price: options[size],
      img: foodItem.img
    });
  };

  let finalPrice = qty * parseInt(options[size]);
  if (isNaN(finalPrice)) finalPrice = 0;

  useEffect(() => {
    setSize(priceRef.current.value);
  }, [priceRef]);

  // 👇 Log cart updates whenever `data` changes
  useEffect(() => {
    console.log("Cart Updated:", data);
  }, [data]);

  return (
    <>
      <div>
        <div className="card mt-3" style={{ width: "18rem", maxHeight: "400px" }}>
          <img
            src={props.foodItem.img}
            className="card-img-top"
            alt="..."
            style={{ objectFit: "fill", height: "120px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <p className="card-text">{props.foodItem?.description}</p>
            <div className="container w-100">
              <select
                className="m-2 h-100 bg-success rounded text-white"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <select
                className="m-2 h-100 bg-success rounded text-white"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>

              <div className="d-inline h-100 fs-5">{finalPrice}/-</div>
            </div>
            <hr />
            <button
              className={'btn btn-success justify-center ms-2'}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}