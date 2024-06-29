import { useState, useEffect, useRef, useContext } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { format, addDays, parse } from "date-fns";
import { vi } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DoiTimKiemChuyenBay from "./DoiTimKiemChuyenBay.js";
import { CONTEXT } from "../Context/DoiTimKiemChuyenBay.js";

export default function XemDanhSachChuyenBay() {
  //Đổi tìm kiếm chuyến bay
  const {
    dialogDoiTimKiem,
    handleDialogDoiTimKiem,
    isBay,
    isDap,
    today,
    setToday,
    switchNgayBay,
    setSwitchNgayBay,
  } = useContext(CONTEXT);

  //Copy mã voucher
  const copyRefVoucher = useRef("");
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(copyRefVoucher.current.textContent);
      alert(copyRefVoucher.current.textContent + " is copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
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
    console.log(newValue);
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
    console.log(newValue);
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

  //click ngày bay
  const ngayBayRef = useRef([]);
  const [clickedNgayBay, setNgayBay] = useState(null);

  const handleNgayBay = (i, j) => {
    setNgayBay((clickedNgayBay) =>
      clickedNgayBay?.[0] === i && clickedNgayBay?.[1] === j ? null : [i, j]
    );
  };

  const handleDivNgayBayClick = (index) => {
    setSwitchNgayBay(ngayBayRef.current[index].textContent);
    setSelectedDate(parseVietnameseDate(ngayBayRef.current[index].textContent));
  };

  //datePicker
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSVGClick = () => {
    setShowDatePicker(showDatePicker ? false : true);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSwitchNgayBay(
      date.toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    );
    setToday(date);
    setShowDatePicker(false);
  };

  //Tính ngày và tạo slot cho slide
  const daysToShow = 15;
  const slotsPerSlidePhone = 2; // Number of slots per slide for phones
  const slotsPerSlideTablet = 3; // Number of slots per slide for tablets
  const slotsPerSlideLaptop = 5; // Number of slots per slide for laptops (md
  const [currentSlide, setCurrentSlide] = useState(0);
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

  const createDateSlides = () => {
    let slides = [];
    for (let i = 0; i < daysToShow; i += slotsPerSlide) {
      let slots = [];
      for (let j = 0; j < slotsPerSlide; j++) {
        if (i + j >= daysToShow) break;
        let date = addDays(today, i + j);
        slots.push(
          <div
            onClick={() => {
              handleNgayBay(i, j);
              handleDivNgayBayClick((i / slotsPerSlide) * slotsPerSlide + j);
            }}
            className={`text-white text-center text-sm font-semibold p-1 ${clickedNgayBay?.[0] === i && clickedNgayBay?.[1] === j ? "bg-[#FFFFFF33] rounded-md" : ""} hover:bg-[#FFFFFF33] hover:rounded-md cursor-pointer`}
          >
            <div
              ref={(el) =>
                (ngayBayRef.current[(i / slotsPerSlide) * slotsPerSlide + j] =
                  el)
              }
              className="line-clamp-1"
            >
              {format(date, "EEEE, d 'thg' M yyyy", { locale: vi })}
            </div>
            <span className="line-clamp-1 mt-[2%]">
              {formatCurrency(2000000)}
            </span>
          </div>
        );
      }
      slides.push(
        <div className="flex justify-evenly items-center h-full">{slots}</div>
      );
    }
    return slides;
  };

  const slides = createDateSlides();

  const properties = {
    autoplay: false,
    prevArrow: (
      <div
        onClick={() => setCurrentSlide(currentSlide - 1)}
        disabled={currentSlide === 0}
        className={`absolute top-1/2 left-0 transform -translate-y-1/2 text-white text-xl ${currentSlide === 0 ? "hidden" : "visible"}`}
      >
        &#10094;
      </div>
    ),
    nextArrow: (
      <div
        type="button"
        onClick={() => setCurrentSlide(currentSlide + 1)}
        disabled={currentSlide === slides.length - 1}
        className={`absolute top-1/2 right-0 transform -translate-y-1/2 text-white text-xl ${currentSlide === slides.length - 1 ? "hidden" : "visible"}`}
      >
        &#10095;
      </div>
    ),
    onChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
  };

  //lọc min
  const [isLocMinClicked, setLocMinClicked] = useState([false, false, false]);
  const handleLocMinClicked = (index) => {
    setLocMinClicked((prevState) => {
      const newState = [...prevState];
      newState[index] = isLocMinClicked[index] ? false : true;
      return newState;
    });
  };
  const [clickOption, setClickOption] = useState("Khác");
  const handleClickOption = (text) => {
    setClickOption(text);
    setLocMinClicked((prevState) => {
      const newState = [...prevState];
      newState[2] = isLocMinClicked[2] ? false : true;
      return newState;
    });
  };

  //Xem chi tiết
  let arrayXemChiTiet = [false, false, false];
  const [xemChiTiet, setXemChiTiet] = useState(arrayXemChiTiet);
  const handleXemChiTiet = (index) => {
    setXemChiTiet((prevState) => {
      const newState = [...prevState];
      for (let i = 0; i < newState.length; i++) {
        if (i === index) {
          newState[i] = xemChiTiet[i] ? false : true;
        } else {
          newState[i] = false;
        }
      }
      return newState;
    });
  };

  return (
    <div className="relative w-full h-fit flex flex-row justify-center bg-slate-100">
      {dialogDoiTimKiem && <DoiTimKiemChuyenBay />}
      <div id="left" className="flex flex-col items-center w-[25%]">
        <div id="Khuyen-mai">
          <div className="flex flex-row items-center mt-4">
            <svg
              width="16"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              data-id="IcProductDuotoneDiscountPackage"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.91667 8.25H4.66666V9.61301C4.66666 9.86614 4.87186 10.0713 5.12499 10.0713C5.37812 10.0713 5.58332 9.86614 5.58332 9.61301V8.25H22.0833C22.5896 8.25 23 8.66041 23 9.16667V11.7122C23 12.3494 22.6471 12.9343 22.0833 13.2313L21.9616 13.2955C21.4727 13.553 21.1667 14.0602 21.1667 14.6128C21.1667 15.1782 21.4869 15.6948 21.9932 15.9463L22.0833 15.9911C22.6449 16.27 23 16.8429 23 17.47V20.0833C23 20.5896 22.5896 21 22.0833 21H5.58332V19.6369C5.58332 19.3838 5.37812 19.1786 5.12499 19.1786C4.87186 19.1786 4.66666 19.3838 4.66666 19.6369V21H1.91667C1.4104 21 1 20.5896 1 20.0833V17.47C1 16.8429 1.35512 16.27 1.91667 15.9911L2.00677 15.9463C2.51312 15.6948 2.83333 15.1782 2.83333 14.6128C2.83333 14.0602 2.52731 13.553 2.03842 13.2955L1.91667 13.2313C1.3529 12.9343 1 12.3494 1 11.7122V9.16667C1 8.66041 1.41041 8.25 1.91667 8.25ZM5.12499 10.9821C4.87186 10.9821 4.66666 11.1873 4.66666 11.4405V12.3452C4.66666 12.5984 4.87186 12.8036 5.12499 12.8036C5.37812 12.8036 5.58332 12.5984 5.58332 12.3452V11.4405C5.58332 11.1873 5.37812 10.9821 5.12499 10.9821ZM4.66666 14.1726C4.66666 13.9195 4.87186 13.7143 5.12499 13.7143C5.37812 13.7143 5.58332 13.9195 5.58332 14.1726V15.0774C5.58332 15.3305 5.37812 15.5357 5.12499 15.5357C4.87186 15.5357 4.66666 15.3305 4.66666 15.0774V14.1726ZM5.12499 16.4464C4.87186 16.4464 4.66666 16.6516 4.66666 16.9048V17.8095C4.66666 18.0627 4.87186 18.2679 5.12499 18.2679C5.37812 18.2679 5.58332 18.0627 5.58332 17.8095V16.9048C5.58332 16.6516 5.37812 16.4464 5.12499 16.4464ZM17.037 11.3237C17.2526 11.042 17.2093 10.6448 16.9378 10.4141C16.6663 10.1834 16.259 10.1975 16.0049 10.4465C15.5699 10.8728 14.8618 11.1447 13.75 11.1447C13.0091 11.1447 12.4449 11.0368 12.0219 10.8544C11.6491 10.4814 11.1293 10.25 10.5543 10.25C9.41976 10.25 8.5 11.1513 8.5 12.2632C8.5 13.375 9.41976 14.2763 10.5543 14.2763C11.6413 14.2763 12.5311 13.449 12.6039 12.402C12.9647 12.4597 13.3479 12.4868 13.75 12.4868C13.9942 12.4868 14.2314 12.4758 14.4607 12.4529L10.463 17.6763C10.2361 17.9728 10.2974 18.3934 10.6 18.6158C10.9026 18.8381 11.3318 18.778 11.5587 18.4815L17.037 11.3237ZM11.1458 11.9247C10.9736 11.8298 10.8115 11.7219 10.6604 11.6001C10.6259 11.5948 10.5904 11.5921 10.5543 11.5921C10.1762 11.5921 9.86957 11.8925 9.86957 12.2632C9.86957 12.6338 10.1762 12.9342 10.5543 12.9342C10.9325 12.9342 11.2391 12.6338 11.2391 12.2632C11.2391 12.1397 11.2051 12.0241 11.1458 11.9247ZM16.9457 14.7237C15.8111 14.7237 14.8913 15.625 14.8913 16.7368C14.8913 17.8486 15.8111 18.75 16.9457 18.75C18.0802 18.75 19 17.8486 19 16.7368C19 15.625 18.0802 14.7237 16.9457 14.7237ZM16.2609 16.7368C16.2609 16.3662 16.5675 16.0658 16.9457 16.0658C17.3238 16.0658 17.6304 16.3662 17.6304 16.7368C17.6304 17.1074 17.3238 17.4079 16.9457 17.4079C16.5675 17.4079 16.2609 17.1074 16.2609 16.7368Z"
                fill="#687176"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2 5.63321C2 5.52604 2.07887 5.43521 2.18497 5.42018L4.73221 5.05921C4.76472 5.27835 4.95363 5.44649 5.18182 5.44649C5.43286 5.44649 5.63636 5.24299 5.63636 4.99195V4.93108L13.514 3.81473C14.2628 3.70862 15.0102 4.01701 15.4663 4.62026L15.7398 4.98202C15.9609 5.2745 16.3064 5.44639 16.6731 5.44639C17.1461 5.44639 17.5727 5.1615 17.7538 4.72449L17.9481 4.25599C18.211 3.62175 18.7912 3.17505 19.4716 3.08301L21.9292 2.75057C21.9667 2.74551 22 2.77464 22 2.81245V7.24999H5.63636V6.80283C5.63636 6.55179 5.43286 6.34828 5.18182 6.34828C4.93078 6.34828 4.72727 6.55179 4.72727 6.80283V7.24999H2V5.63321Z"
                fill="#687176"
              ></path>
            </svg>
            &nbsp;
            <span className="text-[#031218] font-semibold text-lg">
              Khuyến mãi
            </span>
            &nbsp;
            <span className="text-[#031218] font-semibold text-lg rounded-full bg-[#ffdc00] px-[10px]">
              7
            </span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="bg-white rounded-md min-h-[157px] max-h-[353px] w-[90%] p-3 mt-4">
              <div className="flex flex-row justify-between items-start">
                <img src="https://ik.imagekit.io/tvlk/image/imageResource/2024/06/10/1718002224792-e8decb95fbc355701bf1270003002c0e.png?tr=h-60,q-75,w-60 1x, https://ik.imagekit.io/tvlk/image/imageResource/2024/06/10/1718002224792-e8decb95fbc355701bf1270003002c0e.png?tr=dpr-2,h-60,q-75,w-60 2x, https://ik.imagekit.io/tvlk/image/imageResource/2024/06/10/1718002224792-e8decb95fbc355701bf1270003002c0e.png?tr=dpr-3,h-60,q-75,w-60 3x" />
                <div className="w-[40%]">
                  <p className="line-clamp-2 text-sm font-semibold">
                    Tiết kiệm tới 2 triệu VNĐ cho vé bay, khách sạn, vé vui
                    chơi, xe khách, tour du lịch, đưa đón sân bay
                  </p>
                  <p className="line-clamp-2 text-sm font-semibold text-[#687176]">
                    Không phút. Giao dịch sử dụng Home PayLater
                  </p>
                </div>
                <span className="line-clamp-1 text-[#031218] w-[80px] h-fit font-semibold text-lg rounded-full bg-[#ffdc00] px-[10px]">
                  Giới hạn
                </span>
                <img
                  className="cursor-pointer"
                  src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/1/10eeeb3d5c2ce1b525ef4a3edf98bce0.svg"
                />
              </div>
              <div className="flex flex-row justify-between w-full bg-[#f7f9fa] border-[#687176] border-2 p-2 rounded-md border-dotted mt-2">
                <span
                  ref={copyRefVoucher}
                  className="text-sm font-semibold text-[#687176]"
                >
                  PAYLATER
                </span>
                <span
                  onClick={copyToClipboard}
                  className="text-sm font-semibold text-[#0194f3] cursor-pointer"
                >
                  Sao chép
                </span>
              </div>
            </div>
            <div className="bg-[#0264c8] p-1 rounded-full size-fit cursor-pointer">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                data-id="IcSystemChevronRight"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="#FFFFFF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
          </div>
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
            <div id="Gio-cat-canh" className="mt-4 w-full">
              <span className="text-[#031218] font-semibold text-lg">
                {i === 0 ? "Giờ cất cánh" : "Giờ hạ cánh"}
              </span>
              <table className="w-full mt-2">
                {Array.from({ length: 2 }, (_, j) => (
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
              <span className="text-xs font-semibold text-[#687176] self-center">{`${formatCurrency(valueGia[0])} VND - ${formatCurrency(valueGia[1])} VND`}</span>
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
      <div
        id="right"
        className="ml-5 flex flex-col items-center w-[45%] overflow-hidden"
      >
        <div
          id="Chinh-sua-ngay"
          className="relative w-full h-fit flex items-center justify-center"
        >
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
              fill-rule="evenodd"
              clip-rule="evenodd"
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
              stroke-width="2.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
          <div className="bg-[#0264C8] m-[1%] rounded-2xl flex justify-center items-center absolute bottom-[7%] z-10 w-[98%] h-[35%]">
            <div className="px-[1%] w-[93%] h-fit">
              <Slide {...properties}>{slides}</Slide>
            </div>
            <div className="flex justify-center items-center right-0 w-[7%] h-full">
              <svg
                width="50%"
                height="50%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                data-id="IcSystemCalendarFill"
                className="cursor-pointer"
                onClick={handleSVGClick}
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2 6C2 4.34315 3.34315 3 5 3H6V2C6 1.44772 6.44772 1 7 1C7.55228 1 8 1.44772 8 2V3H16V2C16 1.44772 16.4477 1 17 1C17.5523 1 18 1.44772 18 2V3H19C20.6569 3 22 4.34315 22 6V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V6ZM4 6V7H20V6C20 5.44772 19.5523 5 19 5H18C18 5.55228 17.5523 6 17 6C16.4477 6 16 5.55228 16 5H8C8 5.55228 7.55228 6 7 6C6.44772 6 6 5.55228 6 5H5C4.44772 5 4 5.44772 4 6ZM6.5 10.5C5.94772 10.5 5.5 10.9477 5.5 11.5V12.5C5.5 13.0523 5.94772 13.5 6.5 13.5H7.5C8.05228 13.5 8.5 13.0523 8.5 12.5V11.5C8.5 10.9477 8.05228 10.5 7.5 10.5H6.5ZM11.5 10.5C10.9477 10.5 10.5 10.9477 10.5 11.5V12.5C10.5 13.0523 10.9477 13.5 11.5 13.5H12.5C13.0523 13.5 13.5 13.0523 13.5 12.5V11.5C13.5 10.9477 13.0523 10.5 12.5 10.5H11.5ZM16.5 10.5C15.9477 10.5 15.5 10.9477 15.5 11.5V12.5C15.5 13.0523 15.9477 13.5 16.5 13.5H17.5C18.0523 13.5 18.5 13.0523 18.5 12.5V11.5C18.5 10.9477 18.0523 10.5 17.5 10.5H16.5ZM6.5 15.5C5.94772 15.5 5.5 15.9477 5.5 16.5V17.5C5.5 18.0523 5.94772 18.5 6.5 18.5H7.5C8.05228 18.5 8.5 18.0523 8.5 17.5V16.5C8.5 15.9477 8.05228 15.5 7.5 15.5H6.5ZM11.5 15.5C10.9477 15.5 10.5 15.9477 10.5 16.5V17.5C10.5 18.0523 10.9477 18.5 11.5 18.5H12.5C13.0523 18.5 13.5 18.0523 13.5 17.5V16.5C13.5 15.9477 13.0523 15.5 12.5 15.5H11.5Z"
                  fill="#FFFFFF"
                ></path>
              </svg>
            </div>
          </div>
          <div className="absolute top-[89%] z-10 right-0">
            {showDatePicker && (
              <DatePicker
                selected={selectedDate}
                onSelect={handleDateSelect}
                onChange={handleDateSelect}
                dateFormat="EEEE, dd MMM yyyy"
                inline
              />
            )}
          </div>
        </div>
        <div
          id="Loc-min"
          className="relative div-flex-adjust-justify-between border-2 h-[9%] w-full rounded-xl p-[1%] bg-white"
        >
          <div
            onClick={() => handleLocMinClicked(0)}
            className={`${isLocMinClicked[0] && "bg-[#e6e7e7]"} flex flex-col justify-center rounded-xl items-center h-full  w-[33%] cursor-pointer hover:border-[1px] hover:border-[#109AF4]`}
          >
            <span className="text-[#109AF4] font-medium">Giá thấp nhất</span>
            <span className="text-[#687176] font-medium text-sm">
              {formatCurrency(6000000)}
            </span>
          </div>
          <div
            onClick={() => handleLocMinClicked(1)}
            className={`${isLocMinClicked[1] && "bg-[#e6e7e7]"} flex flex-col justify-center rounded-xl items-center h-full  w-[33%] cursor-pointer hover:border-[1px] hover:border-[#109AF4]`}
          >
            <span className="text-[#109AF4] font-medium">
              Thời gian bay ngắn nhất
            </span>
            <span className="text-[#687176] font-medium text-sm">
              {formatCurrency(6000000)}
            </span>
          </div>
          <div
            onClick={() => handleLocMinClicked(2)}
            className={`${isLocMinClicked[2] && "bg-[#e6e7e7]"} flex flex-row justify-center rounded-xl items-center h-full w-[33%] cursor-pointer hover:border-[1px] hover:border-[#109AF4]`}
          >
            <svg
              width="20%"
              height="60%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              data-id="IcSystemToolSort"
            >
              <path
                d="M3 6H15.5M3 12H12.5M3 18H9"
                stroke="#687176"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M19 6V19.5M19 19.5L16.5 17M19 19.5L21.5 17"
                stroke="#0194F3"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <span className="text-[#687176] font-medium">{clickOption}</span>
            <svg
              width="11%"
              height="50%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              data-id="IcSystemChevronUp"
              className={`${isLocMinClicked[2] ? "rotate-0" : "rotate-180"}`}
            >
              <path
                d="M6 15L12 9L18 15"
                stroke="#687176"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
          {isLocMinClicked[2] && (
            <div className="flex flex-col bg-white w-[32%] border-2 absolute right-0 top-[90%] z-20 rounded-xl">
              <span
                onClick={() => handleClickOption("Cất cánh sớm nhất")}
                className="p-[4%] border-b-[1px] cursor-pointer hover:bg-[#F7F9FA]"
              >
                Cất cánh sớm nhất
              </span>
              <span
                onClick={() => handleClickOption("Cất cánh muộn nhất")}
                className="p-[4%] border-b-[1px] cursor-pointer hover:bg-[#F7F9FA]"
              >
                Cất cánh muộn nhất
              </span>
              <span
                onClick={() => handleClickOption("Hạ cánh sớm nhất")}
                className="p-[4%] border-b-[1px] cursor-pointer hover:bg-[#F7F9FA]"
              >
                Hạ cánh sớm nhất
              </span>
              <span
                onClick={() => handleClickOption("Hạ cánh muộn nhất")}
                className="p-[4%] border-b-[1px] cursor-pointer hover:bg-[#F7F9FA]"
              >
                Hạ cánh muộn nhất
              </span>
              <span
                onClick={() => handleClickOption("Khác")}
                className="p-[4%] border-b-[1px] cursor-pointer hover:bg-[#F7F9FA]"
              >
                Không lọc
              </span>
            </div>
          )}
        </div>
        <div
          id="Danh-sach-chuyen-bay"
          className="flex flex-col h-fit w-full mt-[2%] "
        >
          {Array.from({ length: 3 }, (_, i) => (
            <div
              onClick={() => handleXemChiTiet(i)}
              className="cursor-pointer mb-[2%] hover:border-[1px] hover:border-[#109AF4] hover:rounded-xl"
            >
              <div
                className={`div-flex-adjust-justify-between ${xemChiTiet[i] ? "rounded-t-xl" : "rounded-xl"} bg-white p-[2%]`}
              >
                <div className="flex flex-row items-center text-2xl font-semibold">
                  <div className="flex flex-col items-center">
                    <span>12:20</span>
                    <span className="text-sm font-semibold text-[#687176]">
                      SGN
                    </span>
                  </div>
                  <div className="flex flex-col h-fit items-center w-fit ">
                    <span className="text-sm font-semibold text-[#687176]">
                      20h 10m
                    </span>
                    <div className="flex flex-row items-center w-fit">
                      <div className="w-[12px] md:w-[24px] h-[12px] md:h-[24px] border-2 border-[#687172] rounded-full"></div>
                      <div className="w-[30px] md:w-[70px] h-fit border-[1px] border-[#687172]"></div>
                      <div className="w-[12px] md:w-[24px] h-[12px] md:h-[24px] border-2 border-[#687172] bg-[#687172] rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span>10:30</span>
                    <span className="text-sm font-semibold text-[#687176]">
                      SG
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end text-xl font-bold text-[#FF5E1F]">
                  <span>
                    {formatCurrency(6666760)}
                    <span className="text-sm font-semibold text-[#687176]">
                      /khách
                    </span>
                  </span>
                  <div className="bg-[#0194F3] text-white w-fit h-fit px-[15px] py-[2px]  lg:px-[35px] lg:py-[7px] mt-[30px] rounded-lg">
                    Chọn
                  </div>
                </div>
              </div>
              {xemChiTiet[i] && (
                <div className="flex flex-row justify-start items-center rounded-b-xl bg-[#F7F9FA] p-[2%] text-lg font-semibold">
                  <div className="flex flex-col justify-between h-120 md:h-[250px]">
                    <div className="flex flex-col">
                      <span>16:30</span>
                      <span className="text-sm font-semibold text-[#687176]">
                        {formatDate(new Date())}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-[#687176]">
                      20h 10m
                    </span>
                    <div className="flex flex-col">
                      <span>07:40</span>
                      <span className="text-sm font-semibold text-[#687176]">
                        {formatDate(new Date())}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center h-fit">
                    <div className="w-[12px] md:w-[24px] h-[12px] md:h-[24px] border-2 border-[#109AF4] rounded-full"></div>
                    <div className="h-[94px] md:h-[200px] w-fit border-[1px] border-[#687172]"></div>
                    <div className="w-[12px] md:w-[24px] h-[12px] md:h-[24px] border-2 border-[#109AF4] bg-[#109AF4] rounded-full"></div>
                  </div>
                  <div className="flex flex-col justify-between h-120 md:h-[250px]">
                    <span>TP HCM(SGN)</span>
                    <span className="flex flex-row text-sm font-bold text-[#109AF4]">
                      <img src="	https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/8c1bcc90ebe8e4f79eafc4270ec3dbcb.svg" />
                      Xem giá hành lý mua thêm
                    </span>
                    <span>Singaport</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatCurrency(amount) {
  const parts = amount.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(".") + " VND";
}

function parseVietnameseDate(dateString) {
  const parsedDate = parse(dateString, "EEEE, d 'thg' M yyyy", new Date(), {
    locale: vi,
  });
  return parsedDate;
}

const formatDate = (date) => {
  const options = { day: "2-digit", month: "short" };
  return date.toLocaleDateString("en-GB", options).replace(".", "");
};
