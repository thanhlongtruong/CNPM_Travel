/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useContext, useCallback } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import "react-slideshow-image/dist/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import DoiTimKiemChuyenBay from "./DoiTimKiemChuyenBay.js";
import ChinhSoLuongVaHangVeTaiCB from "./ChinhSoLuongVaHangVeTaiCB.js";
import { CONTEXT } from "../../Context/WindowLogin.js";
import Header from "../Header.js";
import ItemFlight from "./ItemFlight.js";
import { LoginSuccess } from "../Setting/StateLoginSucces.js";
import { Login } from "../Home/FormCheck.js";

export const XemDanhSachChuyenBay = () => {
  const {
    dialogDoiTimKiem,
    handleDialogDoiTimKiem,
    isBay,
    isDap,
    today,
    switchNgayBay,
    isShowInterfaceLogin,
    setFlights,
    isOpenChooseHangVe,
    isShowOptionSetting_LoginSuccess,
    isFlights,
    handleChooseOpenHangVe_,
  } = useContext(CONTEXT);

  //chọn giờ
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleGio = (i, j, k) => {
    setClickedIndex((clickedIndex) =>
      clickedIndex?.[0] === i &&
      clickedIndex?.[1] === j &&
      clickedIndex?.[2] === k
        ? null
        : [i, j, k]
    );
  };
  //chọn thời gian bay
  const [valueThoiGianBay, setValueThoiGianBay] = useState([0, 19]);

  const handleChangeThoiGianBay = (event, newValue) => {
    if (newValue[1] - newValue[0] < 1) {
      if (valueThoiGianBay[0] === newValue[0]) {
        newValue[1] = newValue[0] + 1;
      } else {
        newValue[0] = newValue[1] - 1;
      }
    }
    setValueThoiGianBay(newValue);
  };
  //chọn giá
  const [valueGia, setValueGia] = useState([0, 50000000]);

  const handleChangeGia = (event, newValue) => {
    if (newValue[1] - newValue[0] < 1) {
      if (valueGia[0] === newValue[0]) {
        newValue[1] = newValue[0] + 1;
      } else {
        newValue[0] = newValue[1] - 1;
      }
    }
    setValueGia(newValue);
  };

  //hover thanh chỉnh sửa
  const [isAjustHovered, setAdjustHovered] = useState(false);

  // Tính ngày và tạo slot cho slide
  const daysToShow = 15;
  const slotsPerSlidePhone = 2; // Number of slots per slide for phones
  const slotsPerSlideTablet = 3; // Number of slots per slide for tablets
  const slotsPerSlideLaptop = 5; // Number of slots per slide for laptops (md
  const [slotsPerSlide, setSlotsPerSlide] = useState(slotsPerSlidePhone);

  useEffect(() => {
    // Update number of slots per slide based on screen size
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlotsPerSlide(slotsPerSlideLaptop); // Laptop size (md)
      } else if (window.innerWidth >= 768) {
        setSlotsPerSlide(slotsPerSlideTablet); // Tablet size (sm)
      } else {
        setSlotsPerSlide(slotsPerSlidePhone); // Phone size (xs)
      }
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [currentFlights, setCurrentFlights] = useState();
  const [isLoadingFlight, setIsLoadingFlight] = useState(true);

  const [isStatePrice_Thap_to_Cao, setStatePrice_Thap_to_Cao] = useState(false);
  const [isStatePrice_Cao_to_Thap, setStateCao_to_Thap] = useState(false);
  const [isStateDate_Som, setStateDate_Som] = useState(false);
  const [isStateDate_Tre, setStateDate_Tre] = useState(false);
  const [isStateAll, setStateAll] = useState(true);

  // fetch
  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await fetch(
          "http://localhost:4002/api/get/all_flights"
        );

        if (!response.ok) {
          throw new Error("Network response not ok when get all flight");
        }
        const dataFlight = await response.json();
        setFlights(dataFlight);
      } catch (err) {
        console.error("Bug when get all flight", err.message);
      } finally {
        setIsLoadingFlight(false);
      }
    };
    fetchFlight();
  }, []);

  useEffect(() => {
    setCurrentFlights(
      Function_Loc_Flight("All", { isFlights, isLoadingFlight })
    );
  }, [isFlights, isLoadingFlight]);

  if (isLoadingFlight) {
    return <div>Loading...</div>;
  }
  const handleShowPriceFlight = () => {
    if (!isStatePrice_Cao_to_Thap) {
      setStatePrice_Thap_to_Cao(!isStatePrice_Thap_to_Cao);
    } else {
      setStateCao_to_Thap(!isStatePrice_Cao_to_Thap);
      setStatePrice_Thap_to_Cao(!isStatePrice_Thap_to_Cao);
    }
    if (!isStatePrice_Thap_to_Cao) {
      setCurrentFlights(
        Function_Loc_Flight("isPrice_Thap_to_Cao_Fight", {
          isFlights,
          isLoadingFlight,
          isStateDate_Tre,
          isStateDate_Som,
          isStatePrice_Cao_to_Thap,
          isStatePrice_Thap_to_Cao,
        })
      );
    } else {
      setCurrentFlights(
        Function_Loc_Flight("All", {
          isFlights,
          isLoadingFlight,
        })
      );
    }
  };
  const Price_Cao_to_Thap_Fight = () => {
    if (!isStatePrice_Thap_to_Cao) {
      setStateCao_to_Thap(!isStatePrice_Cao_to_Thap);
    } else {
      setStatePrice_Thap_to_Cao(!isStatePrice_Thap_to_Cao);
      setStateCao_to_Thap(!isStatePrice_Cao_to_Thap);
    }
    if (!isStatePrice_Cao_to_Thap) {
      setCurrentFlights(
        Function_Loc_Flight("isPrice_Cao_to_Thap_Fight", {
          isFlights,
          isLoadingFlight,
          isStateDate_Tre,
          isStateDate_Som,
          isStatePrice_Cao_to_Thap,
          isStatePrice_Thap_to_Cao,
        })
      );
    } else {
      setCurrentFlights(
        Function_Loc_Flight("All", {
          isFlights,
          isLoadingFlight,
        })
      );
    }
  };
  const handleShowDateDiSomNhat = () => {
    if (!isStateDate_Tre) {
      setStateDate_Som(!isStateDate_Som);
    } else {
      setStateDate_Tre(!isStateDate_Tre);
      setStateDate_Som(!isStateDate_Som);
    }
    if (!isStateDate_Som) {
      setCurrentFlights(
        Function_Loc_Flight("isDate_Som_to_Tre_Fight", {
          isFlights,
          isLoadingFlight,
          isStateDate_Tre,
          isStateDate_Som,
          isStatePrice_Cao_to_Thap,
          isStatePrice_Thap_to_Cao,
        })
      );
    } else {
      setCurrentFlights(
        Function_Loc_Flight("All", {
          isFlights,
          isLoadingFlight,
        })
      );
    }
  };
  const handleShowDateDiTreNhat = () => {
    if (!isStateDate_Som) {
      setStateDate_Tre(!isStateDate_Tre);
    } else {
      setStateDate_Tre(!isStateDate_Tre);
      setStateDate_Som(!isStateDate_Som);
    }
    if (!isStateDate_Tre) {
      setCurrentFlights(
        Function_Loc_Flight("isDate_Tre_to_Som_Fight", {
          isFlights,
          isLoadingFlight,
          isStateDate_Tre,
          isStateDate_Som,
          isStatePrice_Cao_to_Thap,
          isStatePrice_Thap_to_Cao,
        })
      );
    } else {
      setCurrentFlights(
        Function_Loc_Flight("All", {
          isFlights,
          isLoadingFlight,
        })
      );
    }
  };
  const handleCancelLocFight = () => {
    setCurrentFlights(
      Function_Loc_Flight("All", {
        isFlights,
        isLoadingFlight,
        isStateDate_Tre,
        isStateDate_Som,
        isStatePrice_Cao_to_Thap,
        isStatePrice_Thap_to_Cao,
      })
    );
    setStateAll(!isStateAll);
    setStateDate_Tre(false);
    setStateDate_Som(false);
    setStatePrice_Thap_to_Cao(false);
    setStateCao_to_Thap(false);
  };
  //!

  return (
    <>
      {isShowInterfaceLogin && <Login />}
      <div className="relative h-fit w-screen py-5">
        <Header />
        {isShowOptionSetting_LoginSuccess && <LoginSuccess />}
        {dialogDoiTimKiem && <DoiTimKiemChuyenBay />}
        {isOpenChooseHangVe && <ChinhSoLuongVaHangVeTaiCB />}
        {}
        <div className="flex justify-center bg-slate-100  gap-6">
          <div className="sticky top-[87px] z-20 h-[500px] flex flex-col items-center w-[25%] overflow-y-scroll overflow-hidden">
            <div id="Khuyen-mai">
              <div className="flex flex-row items-center mt-4"></div>
              <div className="flex flex-row items-center justify-between"></div>
            </div>
            <div className="w-full">
              <div id="Bo-loc" className="mt-4">
                <div className="div-flex-adjust-justify-between ">
                  <span className="text-[#031218] font-semibold text-lg">
                    Bộ lọc:
                  </span>
                  <span className="text-[#0194f3] font-semibold text-lg cursor-pointer ">
                    Đặt lại
                  </span>
                </div>
              </div>
              {Array.from({ length: 2 }, (_, i) => (
                <div key={i} id="Gio-cat-canh" className="mt-4 w-full">
                  <span className="text-[#031218] font-semibold text-lg">
                    {i === 0 ? "Giờ cất cánh" : "Giờ hạ cánh"}
                  </span>
                  <table className="w-full mt-2">
                    {Array.from({ length: 2 }, (_, j) => (
                      <tbody>
                        <tr className="div-flex-adjust-justify-between mb-3">
                          {Array.from({ length: 2 }, (_, k) => (
                            <td
                              onClick={() => handleGio(i, j, k)}
                              className={`text-sm font-semibold border-2 flex flex-col w-[47%] p-2 justify-center items-center rounded-lg cursor-pointer ${
                                clickedIndex?.[0] === i &&
                                clickedIndex?.[1] === j &&
                                clickedIndex?.[2] === k
                                  ? "text-white bg-[#0194f3] border-[#0194f3]"
                                  : "text-[#687176]"
                              }`}
                            >
                              <span>
                                {j === 0 && k === 0
                                  ? "Đêm đến Sáng"
                                  : j === 0 && k === 1
                                    ? "Sáng đến Trưa"
                                    : j === 1 && k === 0
                                      ? "Trưa đến Chiều"
                                      : "Chiều đến tối"}
                              </span>
                              <span
                                className={`font-semibold text-lg ${
                                  clickedIndex?.[0] === i &&
                                  clickedIndex?.[1] === j &&
                                  clickedIndex?.[2] === k
                                    ? ""
                                    : "text-[#0194f3]"
                                }`}
                              >
                                {j === 0 && k === 0
                                  ? "00:00 - 06:00"
                                  : j === 0 && k === 1
                                    ? "06:00 - 12:00"
                                    : j === 1 && k === 0
                                      ? "12:00 - 18:00"
                                      : "18:00 - 24:00"}
                              </span>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              ))}
              <div id="Thoi-gian-bay" className="mt-4 ">
                <div className="text-[#031218] font-semibold text-lg flex flex-row justify-between">
                  <span>Thời gian bay</span>
                  <span>{`${valueThoiGianBay[0]}h - ${valueThoiGianBay[1]}h`}</span>
                </div>
                <div className="flex justify-center">
                  <Box className="w-[80%]">
                    <Slider
                      value={valueThoiGianBay}
                      onChange={handleChangeThoiGianBay}
                      max={19}
                      sx={{
                        "& .MuiSlider-thumb": {
                          color: "white", // Change the thumb color to white
                        },
                      }}
                    />
                  </Box>
                </div>
              </div>
              <div id="Gia" className="mt-4 content-center">
                <div className="text-[#031218] font-semibold text-lg flex flex-row justify-between">
                  <span>Giá/Hành khách</span>
                  {/* <span className="text-xs font-semibold text-[#687176] self-center">{`${formatCurrency(valueGia[0])} VND - ${formatCurrency(valueGia[1])} VND`}</span> */}
                </div>
                <div className="flex justify-center">
                  <Box className="w-[80%]">
                    <Slider
                      getAriaLabel={() => "Temperature range"}
                      value={valueGia}
                      onChange={handleChangeGia}
                      max={50000000}
                      sx={{
                        "& .MuiSlider-thumb": {
                          color: "white", // Change the thumb color to white
                        },
                      }}
                    />
                  </Box>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-fit items-center w-[55%]">
            <div className="relative w-full h-fit flex items-center justify-center overflow-hidden">
              <svg
                viewBox="0 0 672 185"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M672 20c0-11.046-8.954-20-20-20H20C8.954 0 0 8.954 0 20v92.139c0 10.408 7.983 19.076 18.355 19.932l632 52.143c11.655.962 21.645-8.238 21.645-19.932V20Z"
                  fill="#007CE8"
                ></path>
                <mask
                  id="a"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="669"
                  height="137"
                  className="custom-mask"
                >
                  <path
                    d="M0 9.846C0 4.408 4.408 0 9.846 0h639.109c12.166 0 21.514 10.77 19.801 22.815l-.668 4.698c-9.345 65.723-67.73 113.161-133.974 108.855L91.608 107.602C40.08 104.253 0 61.482 0 9.846Z"
                    fill="#007CE8"
                  ></path>
                </mask>
                <g mask="url(#a)">
                  <path
                    d="M394.274 240.769c56.942-8.607 131.375-19.858 190.987-31.654C638.51 198.577 672 151.355 672 97.073V18c0-74.006-59.994-134-134-134H122C47.994-116-12-56.006-12 18v134.052c0 92.044 90.826 156.837 180.049 134.223 74.288-18.828 149.646-33.931 226.225-45.506Z"
                    fill="#1870C9"
                  ></path>
                  <path
                    d="M-127-301.319s111.381 69.475 209.934 146.083c52.883 41.156 161.504 107.483 175.94 176.688 19.846 87.361-94.025 175.741-161.296 220.019L.11 308.018-127-301.319Z"
                    fill="#29A5FE"
                  ></path>
                </g>
              </svg>
              <svg
                viewBox="0 0 672 185"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 left-0 z-[2]"
              >
                <path
                  // fill-rule="evenodd"
                  // clip-rule="evenodd"
                  d="M433.019 0H20C19.6349 0 19.2721 0.0097821 18.9118 0.0290985H252.515H253.312H253.463H331.002H331.392H383.12C399.211 0.00962341 416.007 0 433.019 0ZM281.629 120.446C284.363 120.628 287.204 120.817 290.144 121.011C313.718 122.615 343.095 124.531 373.571 126.466C379.226 126.832 384.97 127.203 390.783 127.578C480.188 133.344 520.528 135.895 541.641 136.398C547.244 136.653 550.786 136.767 551.783 136.71C553.749 136.598 555.693 136.445 557.618 136.251C562.361 135.944 565.555 135.356 569.283 134.569C570.312 134.352 571.339 134.121 572.365 133.876C587.129 130.555 600.921 124.473 614.692 115.306C617.821 113.223 620.855 110.993 623.784 108.627C632.84 101.416 640.815 93.1064 647.196 84.0291C649.286 81.0566 651.285 77.8758 653.172 74.5617C654.529 72.26 655.812 69.9144 657.018 67.5291C660.958 59.7351 664.181 51.3075 666.461 43.3115C670.355 30.0943 671.605 18.1973 668.943 11.8434C668.929 11.8112 668.916 11.7791 668.902 11.7471C668.102 9.8823 666.454 7.70711 664.535 5.78348L664.534 5.78224L664.53 5.77876C662.414 3.65869 659.969 1.84486 657.968 1.0901C657.968 1.08994 657.967 1.08977 657.967 1.08961C657.919 1.07202 657.837 1.05466 657.72 1.03754C657.109 0.948053 655.543 0.864935 652.992 0.788025C637.585 0.32354 586.23 0.0854605 491.97 0.0380229C472.533 0.0127908 452.632 0 433.019 0H652C663.046 0 672 8.95431 672 20V164.282C672 175.976 662.01 185.176 650.355 184.214L18.3555 132.071C7.98267 131.215 0 122.547 0 112.139V20C0 17.4547 0.475473 15.0204 1.34245 12.7812L1.565 17.2311C1.7564 21.0587 2.08152 24.5222 2.59295 27.8183C3.90253 36.3759 6.46515 43.7209 11.255 53.5291C20.2624 71.9749 34.6517 86.7524 52.2552 96.2373C62.2344 101.715 73.142 105.453 84.436 107.054C85.3372 107.182 91.204 107.63 101.14 108.338C114.638 109.426 133.585 110.784 153.283 112.047C164.256 112.751 181.996 113.898 203.956 115.323C227.721 116.904 253.954 118.634 281.629 120.446Z"
                  fill="#007CE8"
                ></path>
              </svg>
              <svg
                viewBox="0 0 187 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[30%] transform translate-x-0 absolute top-2 -right-[13.5%]"
              >
                <path
                  d="M25.895 35.042s127.02 13.23 147.81 3.56c0 0 4.51-5.78 3.58-7.15-1.33-1.96-4.63-1.95-4.63-1.95l9.54-28.62s-6.04-.97-8.21-.87h-.02c-.35.01-.6.05-.7.14-.02.02-.06.05-.12.1l-.01.01c-.74.64-4.09 3.66-8.08 7.25-7.05 6.34-16.05 14.47-16.05 14.47-11.61-.95-117.87-9.68-117.87-9.68s-10.18-1.3-17.55 1.85c-1.35.58-2.6 1.3-3.68 2.2 0 0-1.33.3-3.02.82-2.67.83-6.26 2.2-6.8 3.73-.89 2.51 5.07 12.22 25.81 14.14Z"
                  fill="#85D6FF"
                ></path>
                <path
                  d="M143.555 42.102c14.03-.18 25.16-1.18 30.15-3.5 0 0 4.51-5.78 3.58-7.15-1.33-1.96-4.63-1.95-4.63-1.95l9.54-28.62s-8.21-1.32-8.93-.73c-.02.02-.06.05-.12.1l-.01.01c-3.08 8.74-11.39 27.41-29.58 41.84Z"
                  fill="#1BA0E2"
                ></path>
                <path
                  d="M5.922 28.932c4.06 2.71 10.46 5.23 19.96 6.11 0 0 62.55 6.52 107.05 7.05"
                  stroke="#0194F3"
                  strokeWidth="2.5"
                  // stroke-miterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M43.793 24.492c1.08.09 2.04-.72 2.12-1.8l.15-1.83c.09-1.08-.72-2.04-1.8-2.12-1.08-.09-2.04.72-2.12 1.8l-.15 1.83c-.1 1.08.72 2.04 1.8 2.12ZM54.085 25.342l2.57.21c.37.03.71-.25.74-.62l.36-4.39a.69.69 0 0 0-.62-.74l-2.57-.21a.69.69 0 0 0-.74.62l-.36 4.39c-.04.38.24.71.62.74ZM66.932 26.402c1.08.09 2.04-.72 2.12-1.8l.15-1.83c.09-1.08-.72-2.04-1.8-2.12-1.08-.09-2.04.72-2.12 1.8l-.15 1.83c-.09 1.07.72 2.03 1.8 2.12ZM78.51 27.352c1.08.09 2.04-.72 2.12-1.8l.15-1.83c.09-1.08-.72-2.04-1.8-2.12-1.08-.09-2.04.72-2.12 1.8l-.15 1.83c-.09 1.07.72 2.03 1.8 2.12ZM90.08 28.302c1.08.09 2.04-.72 2.12-1.8l.15-1.83c.09-1.08-.72-2.04-1.8-2.12-1.08-.09-2.04.72-2.12 1.8l-.15 1.83c-.09 1.07.72 2.03 1.8 2.12ZM101.651 29.252c1.08.09 2.04-.72 2.12-1.8l.15-1.83c.09-1.08-.72-2.04-1.8-2.12-1.08-.09-2.04.72-2.12 1.8l-.15 1.83c-.09 1.07.72 2.03 1.8 2.12ZM113.237 30.202c1.08.09 2.04-.72 2.12-1.8l.15-1.83c.09-1.08-.72-2.04-1.8-2.12-1.08-.09-2.04.72-2.12 1.8l-.15 1.83c-.09 1.07.72 2.03 1.8 2.12ZM124.799 31.152c1.08.09 2.04-.72 2.12-1.8l.15-1.83c.09-1.08-.72-2.04-1.8-2.12-1.08-.09-2.04.72-2.12 1.8l-.15 1.83a1.97 1.97 0 0 0 1.8 2.12ZM19.074 14.592l-2.91 3.34 2.38.2 3.32-3.31-2.79-.23ZM13.577 14.142c-1.25.58-3.17 1.31-4.18 2.22 0 0-2.35.74-3.92 1.27l8.35.11 2.91-3.34M30.122 26.662c1.64.13 3.07-1.08 3.21-2.72l.42-5.16a2.978 2.978 0 0 0-2.72-3.21 2.978 2.978 0 0 0-3.21 2.72l-.42 5.16a2.966 2.966 0 0 0 2.72 3.21ZM133.465 35.152c1.64.13 3.07-1.08 3.21-2.72l.42-5.16a2.978 2.978 0 0 0-2.72-3.21 2.978 2.978 0 0 0-3.21 2.72l-.42 5.16a2.966 2.966 0 0 0 2.72 3.21ZM81.048 47.912l1.95.16c1.53.13 2.96-1.35 3.09-2.93l-.09.3c.13-1.58-1-2.95-2.53-3.08l-1.95-.16c-1.53-.13-2.87 1.05-3 2.62-.13 1.58 1 2.96 2.53 3.09ZM59.432 39.602l-.57 6.94c-.13 1.54.99 2.9 2.48 3.02l2.42-.02c-.95-.5-1.55-1.55-1.46-2.72l.57-6.94c.1-1.17.86-2.11 1.88-2.45l-2.39-.41c-1.48-.12-2.8 1.03-2.93 2.58Z"
                  fill="#1870C9"
                ></path>
                <path
                  d="m62.87 39.882-.57 6.93c-.13 1.54.99 2.9 2.48 3.02l1.78-.02 7.08-.05 6.21-.05c1.5.12 2.81-1.03 2.94-2.57l.35-4.25c.13-1.54-.98-2.89-2.48-3.01l-6.12-1.06-6.98-1.21-1.76-.31c-1.48-.11-2.8 1.04-2.93 2.58Z"
                  fill="#85D6FF"
                ></path>
                <path
                  d="m67.57 37.622-1 12.2 7.08-.05.9-10.95-6.98-1.2Z"
                  fill="#BDE9FF"
                ></path>
                <path
                  d="m65.785 42.072 32.47 2.67c1.22.1 2.3-.81 2.4-2.03l.48-5.8a.856.856 0 0 0-.79-.93l-33.83-2.78a.856.856 0 0 0-.93.79l-.59 7.15c-.04.47.32.89.79.93Z"
                  fill="#1BA0E2"
                ></path>
                <path
                  d="m160.207 32.972 24.05 1.98c.84.07 1.58-.56 1.65-1.4l.26-3.19a.163.163 0 0 0-.16-.18l-25.41-2.09a.163.163 0 0 0-.18.16l-.37 4.55c0 .08.07.16.16.17Z"
                  fill="#1870C9"
                ></path>
              </svg>
              <div
                onMouseEnter={() => setAdjustHovered(true)}
                onMouseLeave={() => setAdjustHovered(false)}
                className={`${isAjustHovered ? "w-[80%]" : "w-[60%]"} max-h-[45%] bg-white w-[60%] py-3 px-5 rounded-3xl absolute z-10 top-[4%] left-[1%] transform translate-x-0 div-flex-adjust-justify-between`}
              >
                <div>
                  <p className="text-lg font-bold leading-[30px] line-clamp-1">
                    {isBay === null ? "Sân bay Đà Nẵng" : isBay} →
                    {isDap === null ? "Sân bay Tokyo" : isDap}
                  </p>
                  <span className="text-base font-semibold text-[#687176] leading-[35px]">
                    {switchNgayBay}
                  </span>
                </div>
                {isAjustHovered ? (
                  <span
                    onClick={() =>
                      handleDialogDoiTimKiem(
                        () => (isBay === null ? "Sân bay Đà Nẵng" : isBay),
                        () => (isDap === null ? "Sân bay Tokyo" : isDap),
                        today
                      )
                    }
                    className={`text-base font-semibold text-zinc-800 hover:text-[#0194f3] cursor-pointer`}
                  >
                    Đổi tìm kiếm
                  </span>
                ) : (
                  ""
                )}
                <svg
                  width="16"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  data-id="IcSystemSearch"
                >
                  <path
                    d="M15 15L20.5 20.5M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
                    stroke="#0194f3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="relative flex items-center shadow-2xl shadow-blue-500/50 h-[55px] gap-x-2 w-full rounded-xl p-2 bg-white">
              <button
                type="button"
                onClick={handleShowPriceFlight}
                className={`${isStatePrice_Thap_to_Cao ? "bg-[#109AF4] text-white" : "text-[#109AF4]"} flex  font-medium p-2 rounded-xl border border-[#109AF4]`}
              >
                Giá
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={Price_Cao_to_Thap_Fight}
                className={`${isStatePrice_Cao_to_Thap ? "bg-[#109AF4] text-white" : "text-[#109AF4]"} flex font-medium p-2 rounded-xl border border-[#109AF4]`}
              >
                Giá
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleCancelLocFight}
                className={`${isStateDate_Tre || isStateDate_Som || isStatePrice_Cao_to_Thap || isStatePrice_Thap_to_Cao ? "bg-[#109AF4] text-white" : "text-[#109AF4]"} absolute right-3 font-medium p-2 rounded-xl border border-[#109AF4]`}
              >
                Hủy
              </button>
            </div>
            {/* //! List Flight ========================================================================================== */}

            <ShowFlight flights={currentFlights} />
          </div>
        </div>
      </div>
    </>
  );
};
function ShowFlight({ flights }) {
  const { handleChooseOpenHangVe } = useContext(CONTEXT);
  const itemRefs = useRef([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const handleClick = useCallback(
    (index) => {
      setExpandedIndex(expandedIndex === index ? null : index);
      // setIndexItemChoose(index);
    },
    [expandedIndex]
  );
  return (
    <div className="flex flex-col h-fit w-full mt-[2%]">
      {flights.map((flight, index) => (
        <div className="relative">
          <div
            key={index}
            ref={(el) => (itemRefs.current[index] = el)}
            className={`transition-all duration-300 border-2 mb-3 hover:border-cyan-400 overflow-hidden rounded-md ${
              expandedIndex === index ? "h-fit" : "h-[130px]"
            }`}
            onClick={() => handleClick(index)}
          >
            <ItemFlight
              dateDi={flight.dateDi}
              dateDen={flight.dateDen}
              timeDi={flight.timeDi}
              diemDi={flight.diemDi}
              timeDen={flight.timeDen}
              diemDen={flight.diemDen}
              giaVe={flight.giaVeGoc}
              //
              dateDi_={flight.dateDi}
              dateDen_={flight.dateDen}
              timeDi_={flight.timeDi}
              timeDen_={flight.timeDen}
              diemDi_={flight.diemDi}
              soLuongGhe={flight.soLuongGhe}
              khoiLuongQuyDinhTrenMotVe={flight.khoiLuongQuyDinhTrenMotVe}
              diemDen_={flight.diemDen}
            />
          </div>

          <button
            key={flight._id}
            ref={(el) => (itemRefs.current[index] = el)}
            className="bg-[#0194F3] right-3 absolute bottom-6 text-white w-fit h-fit px-4 py-2 lg:px-[35px] lg:py-[7px] mt-[30px] rounded-lg"
            onClick={() => handleChooseOpenHangVe(flight)}
          >
            Chọn
          </button>
        </div>
      ))}
    </div>
  );
}

function Function_Loc_Flight(
  pra,
  {
    isFlights,
    isLoadingFlight,
    isStateDate_Tre,
    isStateDate_Som,
    isStatePrice_Cao_to_Thap,
    isStatePrice_Thap_to_Cao,
  }
) {
  let isFlights_Before_5DateDi = [];
  let isPrice_Thap_to_Cao_Fight = [];
  let isPrice_Cao_to_Thap_Fight = [];
  let isDate_Som_to_Tre_Fight = [];
  let isDate_Tre_to_Som_Fight = [];

  if (!isLoadingFlight) {
    isFlights_Before_5DateDi = isFlights.filter((flight) => {
      const flightDate = new Date(flight.dateDi);
      const khoang_cach_2_ngay = flightDate.getTime() - new Date().getTime();
      const date = Math.ceil(khoang_cach_2_ngay / (1000 * 60 * 60 * 24));
      return date >= 5 && flightDate > new Date();
    });

    //! sort theo giá vé thấp đến cao
    if (pra === "isPrice_Thap_to_Cao_Fight") {
      isPrice_Thap_to_Cao_Fight = isFlights_Before_5DateDi.sort(
        (flight, flight_) => flight.giaVeGoc - flight_.giaVeGoc
      );

      // const flight_Price_Lowest = sortFlights[0].giaVeGoc;
      // isLoc_Price_Fight = isFlights_Before_5DateDi.filter(
      //   (flight) => flight.giaVeGoc === flight_Price_Lowest
      // );

      //! add DateDi
      if (isStateDate_Tre) {
        isPrice_Thap_to_Cao_Fight = isPrice_Thap_to_Cao_Fight.sort(
          (flight, flight_) =>
            new Date(flight_.dateDi).getTime() -
            new Date(flight.dateDi).getTime()
        );
      }
    }

    //! sort theo giá vé cao đến thấp
    if (pra === "isPrice_Cao_to_Thap_Fight" && isPrice_Cao_to_Thap_Fight) {
      isPrice_Cao_to_Thap_Fight = isFlights_Before_5DateDi.sort(
        (flight, flight_) => flight_.giaVeGoc - flight.giaVeGoc
      );

      // const flight_Price_Lowest = sortFlights[0].giaVeGoc;
      // isLoc_Price_Fight = isFlights_Before_5DateDi.filter(
      //   (flight) => flight.giaVeGoc === flight_Price_Lowest
      // );
    }

    //! sort theo ngày bay sớm nhất
    if (pra === "isDate_Som_to_Tre_Fight") {
      isDate_Som_to_Tre_Fight = isFlights_Before_5DateDi.sort(
        (flight, flight_) =>
          new Date(flight.dateDi).getTime() - new Date(flight_.dateDi).getTime()
      );
      // const flight_date_lowest = sortDateFlight[0].dateDi;
      // let convert_date = new Date(flight_date_lowest);
      // isLoc_DateDi_Fight = isFlights_Before_5DateDi.filter(
      //   (flight) => new Date(flight.dateDi).getTime() === convert_date.getTime()
      // );
    }
    //! sort theo ngày bay trễ nhất
    if (pra === "isDate_Tre_to_Som_Fight") {
      isDate_Tre_to_Som_Fight = isFlights_Before_5DateDi.sort(
        (flight, flight_) =>
          new Date(flight_.dateDi).getTime() - new Date(flight.dateDi).getTime()
      );
      // const flight_date_lowest = sortDateFlight[0].dateDi;
      // let convert_date = new Date(flight_date_lowest);
      // isLoc_DateDi_Fight = isFlights_Before_5DateDi.filter(
      //   (flight) => new Date(flight.dateDi).getTime() === convert_date.getTime()
      // );
    }
  }
  if (pra === "isPrice_Thap_to_Cao_Fight") {
    return isPrice_Thap_to_Cao_Fight;
  }
  if (pra === "isPrice_Cao_to_Thap_Fight") {
    return isPrice_Cao_to_Thap_Fight;
  }
  if (pra === "isDate_Som_to_Tre_Fight") {
    return isDate_Som_to_Tre_Fight;
  }
  if (pra === "isDate_Tre_to_Som_Fight") {
    return isDate_Tre_to_Som_Fight;
  }
  if (pra === "All") {
    return isFlights_Before_5DateDi;
  }
}
