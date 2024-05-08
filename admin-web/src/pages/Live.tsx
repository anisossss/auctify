import React, { useEffect, useState } from "react";
import { fetchInProgressProducts } from "../reducers/inProgressSlice";
import { useDispatch, useSelector } from "react-redux";
import { SwiperSlide, Swiper } from "swiper/react";
import { PICT_URL, SOCKET_URL } from "../api/axiosConfig";
import Auctions from "./Auctions";
import AuctionProducts from "../components/products/auctionProducts";
import io from "socket.io-client";

type Props = {};

interface Product {
  _id: string;
  prodName: string;
  total: number;
  companyAdress: string;
  companyLogo: string;
  prodPrice: number;
  winnerName: string;
  openDate: string;
  prodPicture: {
    productPicture: string;
    filePath: string;
    fileType: string;
    fileSize: number;
  }[];
}

const Live = (props: Props) => {

  
  const socket = io(SOCKET_URL);
  const dispatch = useDispatch<any>();
  const setting = useSelector((state: any) => state.settings);
  const [selLive, setSelLive] = useState<string | null>(null);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const userId = localStorage.getItem("userID");
  const roleId = localStorage.getItem("roleID");

  const inprog = useSelector(
    (state: any) => state?.inProgressProducts?.products
  );
  const currentDate = new Date().toISOString();
  //console.log(inprog[0].openDate < currentDate);
  useEffect(() => {
    if (userId && roleId) {
    dispatch(fetchInProgressProducts(roleId == "1" ?  userId : "--"));
    }
  }, [dispatch, userId, roleId]);

  const handleWatchClick = (product: Product) => {
    setSelLive(product._id);
    setIsLive(false);
    setTimeout(() => {
      setIsLive(true);
    }, 100);
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentTime(new Date());
  //   }, 1000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  const calculateTimeRemaining = (openDate: string) => {
    const openDateTime = new Date(openDate);
    const timeRemaining = openDateTime.getTime() - currentTime.getTime();

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };

  return (
    <div className="w-full h-full">
      <div className="detailsRow">
        
        <div className="cardDetailsContainer" style={{ flex : 1, background: "none"}}>
          <div className="content" style={{ background: "none", padding: 0}}>
            <div className=" grid grid-cols-2 gap-6 rounded-lg ">
              {inprog?.map((product: Product) => (
                <div
                  key={product._id}
                  className="participProductItem h-[150px]"
                >
                  <div
                    className="companyLogo"
                    style={{
                      backgroundImage: `url(${PICT_URL}/${product.companyLogo})`,
                    }}
                  ></div>

                  <div className="content flex items-center">
                    <div className="prodSwipe w-1/3">
                      <Swiper spaceBetween={50} slidesPerView={1}>
                        {product?.prodPicture.map((file: any) => (
                          <SwiperSlide key={file.filePath}>
                            <img
                              className="rounded-lg"
                              src={`${PICT_URL}/${file.filePath}`}
                              alt={file.productPicture}
                              style={{ width: "100px", height: "100px" }}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    <div className="prodInfos w-1/3">
                      <div className="prodTitle">{product.prodName}</div>
                      <div className="priceContainer">
                        <div className="magasin">Prix Magasin</div>
                        <div className="priceContent">
                          <div className="price">{product.prodPrice}</div>
                          <div className="currency">TND</div>
                        </div>
                      </div>
                      {/**{product && product?.openDate < currentDate ? (
                        <button
                          className="prodWinner"
                          onClick={() => handleWatchClick(product)}
                        >
                          Watch
                        </button>
                      ) : (
                        <div>
                          <div>{calculateTimeRemaining(product.openDate)}</div>
                        </div>
                      )} */}
                      <button
                        className="prodWinner"
                        onClick={() => handleWatchClick(product)}
                      >
                        Watch
                      </button>
                    </div>
                    <div className="prodMyTotal">
                      <div className="value">{Math.abs(product.total)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="liveScreen">
            {(isLive && selLive) && <AuctionProducts product={selLive} />}
        </div>
      </div>
    </div>
  );
};

export default Live;
