import React, { useState, useEffect } from "react";
import axious from "axios";
import "./index.css";
function Wishlist() {
  const [product, setProduct] = useState([]);
  const [isActive, setIsActive] = useState(true)
  const [isShow, setIsShow] = useState(true)
  const [isDark, setIsDark] = useState(true)

  const [wishlist, setwishlist] = useState(
    localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist"))
      : []
  );
  const [isLoading, setIsLoading] = useState(true);

  async function getFetch() {
    const response = await axious.get("https://fakestoreapi.com/products");
    setProduct(response.data);
    setIsLoading(false);
  }
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    getFetch();
  }, []);

  function addwishlist(item) {
    handleToggle(item.id)
    const elementIndex = wishlist.findIndex((x) => x.id === item.id);
    if (elementIndex !== -1) {
      removeItem(item.id);
    } else {
      setwishlist([...wishlist, { ...item }]);
    }
  }
  function handleToggle(item ) {
    const elementIndex = wishlist.findIndex((x) => x.id === item.id);

    setIsActive(!isActive)
    console.log(isActive);
  }
  function handleToggleBasket( ) {

    setIsShow(!isShow)
  }
  function handleToggleMode( ) {
    document.body.classList.toggle("dark")

    setIsDark(!isDark)
  }
  function removeItem(id) {
    setwishlist(wishlist.filter((x) => x.id !== id));
  }
  return (
    <>
      {isLoading ? (
        <div className="vid">
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="vd">
          <div className="mode">
          <i onClick={handleToggleMode} className={`fa-solid  ${isDark?"fa-toggle-on":"fa-toggle-off"}`}></i>

          </div>
          <i className="fa-solid fa-basket-shopping" onClick={handleToggleBasket}></i>
          <div className={`wishlist ${isShow?"show":""}`} >
            <h2>Wishlist</h2>
            {wishlist.map((x) => (
              <ul id="wishlist_ul" key={x.id}>
                <div className="icon">
                  <i
                    className="fa-solid fa-heart"
                    onClick={() => removeItem(x.id)}
                  ></i>
                </div>
                <div className="image">
                  <img src={x.image} alt="" />
                </div>
                <li>{x.title}</li>
                <li>{x.description.slice(0, 49)}</li>
                <li>{x.price}$</li>
                
              </ul>
            ))}
          </div>
          <h2 className="h2">Products</h2>
          <div className="cards">
            {product.map((x) => (
              <div className="card" key={x.id}>
                <ul>
                  <div className="image">
                    <img src={x.image} alt="" />
                  </div>
                  <div className="icon" onClick={() => addwishlist(x)}>
                    <i className={` fa-heart ${isActive?'fa-regular':'fa-solid'}`}></i>
                  </div>
                  <li onClick={handleToggle}>{x.title}</li>
                  <li>{x.description.slice(0, 49)}</li>
                  <li>{x.price}$</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
export default Wishlist;
