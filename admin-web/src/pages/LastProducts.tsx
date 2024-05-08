import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLastAddedProducts } from "../reducers/lastAddedProducts";
import { API_URL, PICT_URL } from "../api/axiosConfig";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {};

const LastProducts = (props: Props) => {
  const dispatch = useDispatch<any>();
  const products = useSelector((state: any) => state?.lastAddedProducts?.data);
  console.log(products);

  useEffect(() => {
    dispatch(fetchLastAddedProducts());
  }, [dispatch]);

  return (
    <>
      {products?.map((product: any) => (
        <div className="lastProductItem" key={product._id}>
          <div className="lastProdInfo">
           { product && <img
              src={`${PICT_URL}/${product.files[0].filePath}`}
              alt="Company Logo"
              style={{ width: "100px", height: "100px", objectFit: 'cover', borderRadius: 8, marginRight: 6 }}
            />}
            <div className="lastProdDetails">
              <div className="lastProdTitle">{product.name}</div>
              <div className="lastProdMagasin">Prix Magasin</div>
              <div className="lastProdPrice">{product.price}<span>TND</span></div>
            </div>
            
          </div>
          <div className="lastProdAddedBy">
            <div className="lastProdAddedByText">Ajouté par {product.company.companyName}</div>
            <img
              src={`${PICT_URL}/${product.company.logo}`}
              alt="Company Logo"
              style={{ width: "24px", height: "24px" }}
            />
          </div>
          
         
          <div>
            
          </div>
        </div>
      ))}
    </>
  );
};

export default LastProducts;
