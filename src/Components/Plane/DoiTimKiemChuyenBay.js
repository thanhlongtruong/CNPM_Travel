import { useRef, useState, useContext, useEffect } from "react";
import { CONTEXT } from "../../Context/WindowLogin.js";
import { format, addDays, parse } from "date-fns";
import { vi } from "date-fns/locale";

export default function DoiTimKiemChuyenBay() {
  //unlock khứ hồi
  const [isState, setState] = useState("bg-gray-400 pointer-events-none");
  const handle = () => {
    setState(
      isState == "bg-gray-400 pointer-events-none"
        ? "bg-white"
        : "bg-gray-400 pointer-events-none"
    );
  };

  //swap+set bay - dap
  const {
    isBay,
    setBay,
    isDap,
    setDap,
    dialogDoiTimKiem,
    handleDialogDoiTimKiem,
    setDialogDoiTimKiem,
    today,
    setToday,
    setSwitchNgayBay,
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
    searchForChuyenBay,
  } = useContext(CONTEXT);
  const selectRefBay = useRef(null);
  const selectRefDap = useRef(null);
  const selectNgayBay = useRef(null);
  const handleSwap = () => {
    const temp =
      selectRefBay.current.options[selectRefBay.current.selectedIndex].text;
    selectRefBay.current.options[selectRefBay.current.selectedIndex].text =
      selectRefDap.current.options[selectRefDap.current.selectedIndex].text;
    selectRefDap.current.options[selectRefDap.current.selectedIndex].text =
      temp;
  };

  //Load khi mở dialog
  useEffect(() => {
    for (let i = 0; i < selectRefBay.current.options.length; i++) {
      if (selectRefBay.current.options[i].textContent === isBay) {
        selectRefBay.current.selectedIndex = i;
        setBay(isBay);
        break;
      }
    }
    for (let i = 0; i < selectRefDap.current.options.length; i++) {
      if (selectRefDap.current.options[i].textContent === isDap) {
        selectRefDap.current.selectedIndex = i;
        setDap(isDap);
        break;
      }
    }
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    selectNgayBay.current.value = `${year}-${month}-${day}`;
  }, []);

  //Đổi string input sang type Date
  const handleInputDateConvert = (event) => {
    const dateValue = event.target.value;
    setNgayDi(() => {
      const date = new Date(dateValue);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      const monthS = month < 10 ? `0${month}` : `${month}`;
      const dayS = day < 10 ? `0${day}` : `${day}`;
      return `${year}-${monthS}-${dayS}`;
    });
  };

  //Unscrollable screen
  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = "hidden";

    // Clean up by re-enabling scrolling when the component is unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed top-0 z-[25] w-full h-full">
      <div
        onClick={() => {
          setDialogDoiTimKiem(false);
          searchForChuyenBay();
        }}
        className="absolute z-[25] w-full h-full bg-black/50"
      ></div>
      <div className="w-[50%] z-30 h-fit rounded-xl p-[1%] bg-white fixed top-[25%] left-[25%] transform translate-x-0 translate-y-0 flex flex-col items-center">
        {/* sân bay */}
        <div className="w-[90%] flex flex-row relative">
          <div className="w-[50%]">
            <span className="text-black text-[20px]">Từ</span>
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
                onChange={(e) => {
                  setSelect1Value(e.target.value);
                  setDiemDiArray([...new Set(diemDiArray)]);
                }}
                value={select1Value}
                id="bay-select"
                className="appearance-none text-left max-w-[70%]"
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
            <span className="text-black text-[20px]">Đến</span>
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
                onChange={(e) => {
                  setSelect2Value(e.target.value);
                }}
                value={select2Value}
                id="dap-select"
                className="appearance-none text-left max-w-[70%]"
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
        <div className="w-[90%] flex justify-center flex-row my-[2%]">
          <div className="w-[50%]">
            <span className="text-black text-[20px] line-clamp-1">Ngày đi</span>
            <div className="flex flex-row justify-evenly items-center w-full rounded-2xl p-4 text-[25px] border-4 border-[#cdd0d1] bg-white">
              <input
                ref={selectNgayBay}
                onChange={handleInputDateConvert}
                type="date"
              />
            </div>
          </div>
          {/* <div className="w-[50%]">
            <div className="flex-row w-fit line-clamp-1">
              <input
                id="khu_hoi_check"
                type="checkbox"
                onClick={handle}
                className="h-[22px]"
              />
              &nbsp;
              <label htmlFor="khu_hoi_check" className="text-black text-[20px]">
                Khứ hồi
              </label>
            </div>
            <div
              className={`flex flex-row justify-evenly items-center w-full rounded-r-2xl p-4 pl-8 text-[25px] border-y-4 border-r-4 border-[#cdd0d1] ${isState}`}
            >
              <input type="date" className={`${isState}`} />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
