import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);

  const LoadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let responseData = await response.json();
    setFoodItems(responseData[0]);
    setFoodCategory(responseData[1]);
  };

  useEffect(() => {
    LoadData();
  }, []);

  return (
    <>
      <Navbar />

      {/* ===== Carousel with Search ===== */}
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain" }} // ✅ removed !important
        >
          <div className="carousel-inner" id="carousel">
            {/* Search Box Overlay */}
            <div className="carousel-caption" style={{ zIndex: 10 }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Slides */}
            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="burger"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="pasta"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="pizza"
              />
            </div>
          </div>

          {/* Carousel Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* ===== Food Categories & Items ===== */}
      <div className="container">
        {foodCategory.length > 0 &&
          foodCategory.map((category) => (
            <div key={category._id} className="row mb-3">
              <div className="fs-3 m-3">{category.CategoryName}</div>
              <hr />
              {foodItems.length > 0 &&
                foodItems
                  .filter(
                    (item) =>
                      item.CategoryName === category.CategoryName &&
                      item.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
                  .map((filterItems) => (
                    <div
                      key={filterItems._id}
                      className="col-12 col-md-6 col-lg-3"
                    >
                      <Card
                        foodItem = {filterItems}
                        options={filterItems.options[0]}
                        
                      />
                    </div>
                  ))}
            </div>
          ))}
      </div>

      <Footer />
    </>
  );
}
