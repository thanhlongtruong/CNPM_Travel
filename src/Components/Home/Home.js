import Footer from "../Footer.js";
import { useRef, useState, useContext, useEffect } from "react";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import Header from "../Header.js";
import { Login } from "./FormCheck.js";
import { CONTEXT } from "../../Context/WindowLogin.js";
import { LoginSuccess } from "../Setting/StateLoginSucces.js";
import { Link } from "react-router-dom";
import { format, addDays, parse } from "date-fns";
import { vi } from "date-fns/locale";
import {
  NotiFailEventlogin,
  CONTENT_LOGIN_SUCCESS,
} from "../Noti/NotiFailEventLogin.js";

function Home() {
  //unlock khứ hồi
  //khứ hồi
  const [isStateCheckbox, setStateCheckbox] = useState(
    "bg-gray-400 pointer-events-none select-none"
  );
  const handle = () => {
    setStateCheckbox(
      isStateCheckbox === "bg-gray-400 pointer-events-none select-none"
        ? "bg-white"
        : "bg-gray-400 pointer-events-none select-none"
    );
  };

  //swap bay - dap
  const selectRefBay = useRef(null);
  const selectRefDap = useRef(null);
  const handleSwap = () => {
    const temp =
      selectRefBay.current.options[selectRefBay.current.selectedIndex].text;
    selectRefBay.current.options[selectRefBay.current.selectedIndex].text =
      selectRefDap.current.options[selectRefDap.current.selectedIndex].text;
    selectRefDap.current.options[selectRefDap.current.selectedIndex].text =
      temp;
  };

  const {
    isShowInterfaceLogin,
    isShowOptionSetting_LoginSuccess,
    isShowNotiFailLogin,
    isStateLogin,
    isShowNotiSuccesLogin,
    setShowOptionSetting_LoginSuccess,
    diemDenArray,
    setDiemDenArray,
    diemDiArray,
    setDiemDiArray,
    select1Value,
    setSelect1Value,
    select2Value,
    setSelect2Value,
    ngayDi,
    setNgayDi,
    setSwitchNgayBay,
    searchForChuyenBay,
  } = useContext(CONTEXT);

  useEffect(() => {
    if (isShowOptionSetting_LoginSuccess) {
      setShowOptionSetting_LoginSuccess(false);
    }
  }, []);

  // //! new
  useEffect(() => {
    const fetchDiDenFlight = async () => {
      try {
        const response = await fetch(
          `http://localhost:4002/api/get/all_flights`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDiemDiArray([...new Set(data.map((f) => f.diemDi))]);
        setDiemDenArray([...new Set(data.map((f) => f.diemDen))]);
        setSelect1Value(data[0].diemDi);
        setSelect2Value(data[0].diemDen);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };
    fetchDiDenFlight();
  }, []);

  // const navi = useNavigate();
  // const searchForChuyenBay = async () => {
  //   navi("/XemDanhSachChuyenBay", {
  //     state: {
  //       dtSelect1Value: select1Value,
  //       dtSelect2Value: select2Value,
  //       dtNgayDi: ngayDi,
  //     },
  //   });
  // };

  return (
    <>
      {isShowInterfaceLogin && <Login />}

      <div className="relative h-screen w-screen bg-[url('https://ik.imagekit.io/tvlk/image/imageResource/2023/09/27/1695776209619-17a750c3f514f7a8cccde2d0976c902a.png?tr=q-75')] bg-cover bg-center bg-no-repeat p-0">
        {isShowNotiSuccesLogin && (
          <NotiFailEventlogin content={CONTENT_LOGIN_SUCCESS} />
        )}
        <Header />
        {isShowOptionSetting_LoginSuccess && <LoginSuccess />}
        <div className="flex flex-col items-center justify-evenly lg:flex-row">
          {/* sân bay */}
          <div className="w-[80%] lg:w-[42%] flex flex-row relative">
            <div className="w-[50%]">
              <span className="text-white text-[20px]">Từ</span>
              <div className="flex flex-row justify-evenly items-center w-full rounded-l-2xl p-4 text-[25px] border-y-4 border-l-4 border-r-2 border-[#cdd0d1] bg-white">
                <label htmlFor="bay-select">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-id="IcFlightTakeOff"
                  >
                    <path
                      d="M3 21H21"
                      stroke="#0194f3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      // fill-rule="evenodd"
                      // clip-rule="evenodd"
                      d="M12 9L15.1924 7.93585C17.317 7.22767 19.6563 7.95843 21 9.75L7.44513 14.0629C5.86627 14.5653 4.1791 13.6926 3.67674 12.1137C3.66772 12.0854 3.65912 12.0569 3.65094 12.0283L3 9.75L5.25 10.875L9 9.75L4.5 3H5.25L12 9Z"
                      stroke="#0194f3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </label>
                <select
                  ref={selectRefBay}
                  id="bay-select"
                  className="appearance-none text-left max-w-[70%]"
                  onChange={(e) => {
                    setSelect1Value(e.target.value);
                    setDiemDiArray([...new Set(diemDiArray)]);
                  }}
                  value={select1Value}
                >
                  {diemDiArray
                    .filter((d) => d !== select2Value)
                    .map((d, index) => (
                      <option>{d}</option>
                    ))}
                </select>
              </div>
            </div>
            <div className="w-[50%]">
              <span className="text-white text-[20px]">Đến</span>
              <div className="flex flex-row justify-evenly items-center w-full rounded-r-2xl p-4 pl-8 text-[25px] border-y-4 border-r-4 border-[#cdd0d1] bg-white">
                <label htmlFor="dap-select">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-id="IcFlightTakeOff"
                  >
                    <path
                      d="M3 21H21"
                      stroke="#0194f3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      // fill-rule="evenodd"
                      // clip-rule="evenodd"
                      d="M12 9L15.1924 7.93585C17.317 7.22767 19.6563 7.95843 21 9.75L7.44513 14.0629C5.86627 14.5653 4.1791 13.6926 3.67674 12.1137C3.66772 12.0854 3.65912 12.0569 3.65094 12.0283L3 9.75L5.25 10.875L9 9.75L4.5 3H5.25L12 9Z"
                      stroke="#0194f3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </label>
                <select
                  ref={selectRefDap}
                  id="dap-select"
                  className="appearance-none text-left max-w-[70%]"
                  onChange={(e) => {
                    setSelect2Value(e.target.value);
                  }}
                  value={select2Value}
                >
                  {diemDenArray
                    .filter((d) => d !== select1Value)
                    .map((d, index) => (
                      <option>{d}</option>
                    ))}
                </select>
              </div>
            </div>
            <button
              onClick={handleSwap}
              className="absolute bottom-[14%] left-[50%] transform translate-x-[-50%] bg-white rounded-full border-2  border-[#cdd0d1]"
            >
              <img
                className="p-2"
                src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/331a92149a02dc615986206c588d6642.svg"
              />
            </button>
          </div>
          {/* ngày */}
          <div className="w-[80%] lg:w-[42%] flex flex-row">
            <div className="w-[50%]">
              <span className="text-white text-[20px]">Ngày đi</span>
              <div className="flex flex-row justify-evenly items-center w-full rounded-l-2xl p-4 text-[25px] border-y-4 border-l-4 border-r-2 border-[#cdd0d1] bg-white">
                <input
                  value={ngayDi}
                  type="date"
                  onChange={(e) => {
                    setNgayDi(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="w-[50%]">
              <div className="flex-row w-fit line-clamp-1">
                <input
                  id="khu_hoi_check"
                  type="checkbox"
                  onClick={handle}
                  className="h-[22px]"
                />
                &nbsp;
                <label
                  htmlFor="khu_hoi_check"
                  className="text-white text-[20px]"
                >
                  Khứ hồi
                </label>
              </div>
              <div
                className={`flex flex-row justify-evenly items-center w-full rounded-r-2xl p-4 pl-8 text-[25px] border-y-4 border-r-4 border-[#cdd0d1] ${isStateCheckbox}`}
              >
                <input type="date" className={`${isStateCheckbox}`} />
              </div>
            </div>
          </div>
          {/* Tìm */}
          <div
            onClick={() => {
              searchForChuyenBay();
              setSwitchNgayBay(
                format(new Date(ngayDi), "EEEE, d 'thg' M yyyy", { locale: vi })
              );
            }}
            className="bg-[#ff5e1f] p-5 m-[15px] lg:m-0 lg:self-end rounded-2xl border-4 border-[rgba(205,208,209,0.50)] cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              data-id="IcSystemSearch"
            >
              <path
                d="M15 15L20.5 20.5M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
