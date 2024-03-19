import React from 'react'
import useFetchCollection from '../customhook/useFetchCollection';
const Slider = () => {
    const {data:sliders}=useFetchCollection("sliders")
  return (
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
{sliders.map((slider,index)=>
    <div class={`carousel-item ${index==0 ? "active":null}`} key={index}>
      <img src={slider.image} class="d-block w-100"  height={300} alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>{slider.title}</h5>
        <p>{slider.desc}</p>
      </div>
    </div>  )}
  </div>

  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  );
}
export default Slider
