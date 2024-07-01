import Footer from './Footer.js';
import { useRef, useState, useContext } from 'react';
import Header from './Header.js';
import { Login } from './Login.js';
import { CONTEXT } from '../Context/WindowLogin.js';
import { LoginSuccess } from './StateLoginSucces.js';

function Home() {
  //khứ hồi
  const [isStateCheckbox, setStateCheckbox] = useState(
    "bg-gray-400 pointer-events-none select-none"
  );
  const handle = () => {
    setStateCheckbox(
      isStateCheckbox == "bg-gray-400 pointer-events-none select-none"
        ? "bg-white"
        : "bg-gray-400 pointer-events-none select-none"
    );
  };

  //get text
  const selectRefBay = useRef(null);
  const [isBay, setBay] = useState("");
  const selectRefDap = useRef(null);
  const [isDap, setDap] = useState("");
  const handleSwap = () => {
    const temp =
      selectRefBay.current.options[selectRefBay.current.selectedIndex].text;
    selectRefBay.current.options[selectRefBay.current.selectedIndex].text =
      selectRefDap.current.options[selectRefDap.current.selectedIndex].text;
    selectRefDap.current.options[selectRefDap.current.selectedIndex].text =
      temp;

    setBay(
      selectRefBay.current.options[selectRefBay.current.selectedIndex].text
    );
    setDap(
      selectRefDap.current.options[selectRefDap.current.selectedIndex].text
    );
  };

  const { isState } = useContext(CONTEXT);

  return (
    <>
      {isState && <Login />}
      <div className="relative h-screen w-screen bg-[url('https://ik.imagekit.io/tvlk/image/imageResource/2023/09/27/1695776209619-17a750c3f514f7a8cccde2d0976c902a.png?tr=q-75')] bg-cover bg-center bg-no-repeat p-0">
        <Header />

        <LoginSuccess />

        {/* div2 */}
        <div className="flex min-h-96 flex-col items-center justify-evenly lg:flex-row">
          {/* sân bay */}
          <div className="relative flex w-[80%] flex-row lg:w-[42%]">
            <div className="w-[50%]">
              <span className="text-[20px] text-white">Từ</span>
              <div className="flex w-full flex-row items-center justify-evenly rounded-l-2xl border-y-4 border-l-4 border-r-2 border-[#cdd0d1] bg-white p-4 text-[25px]">
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 9L15.1924 7.93585C17.317 7.22767 19.6563 7.95843 21 9.75L7.44513 14.0629C5.86627 14.5653 4.1791 13.6926 3.67674 12.1137C3.66772 12.0854 3.65912 12.0569 3.65094 12.0283L3 9.75L5.25 10.875L9 9.75L4.5 3H5.25L12 9Z"
                      stroke="#0194f3"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </label>
                <select
                  ref={selectRefBay}
                  value={isBay}
                  onChange={() =>
                    setBay(
                      selectRefBay.current.options[
                        selectRefBay.current.selectedIndex
                      ].text
                    )
                  }
                  id="bay-select"
                  className="max-w-[70%] appearance-none text-left"
                >
                  <option>Sân bay Tân Sơn Nhất</option>
                  <option>Sân bay Đà Nẵng</option>
                  <option>Sân bay Nội Bài</option>
                </select>
              </div>
            </div>
            <div className="w-[50%]">
              <span className="text-[20px] text-white">Đến</span>
              <div className="flex w-full flex-row items-center justify-evenly rounded-r-2xl border-y-4 border-r-4 border-[#cdd0d1] bg-white p-4 pl-8 text-[25px]">
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 9L15.1924 7.93585C17.317 7.22767 19.6563 7.95843 21 9.75L7.44513 14.0629C5.86627 14.5653 4.1791 13.6926 3.67674 12.1137C3.66772 12.0854 3.65912 12.0569 3.65094 12.0283L3 9.75L5.25 10.875L9 9.75L4.5 3H5.25L12 9Z"
                      stroke="#0194f3"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </label>
                <select
                  ref={selectRefDap}
                  value={isDap}
                  onChange={() =>
                    setBay(
                      selectRefDap.current.options[
                        selectRefDap.current.selectedIndex
                      ].text
                    )
                  }
                  id="dap-select"
                  className="max-w-[70%] appearance-none text-left"
                >
                  <option>Sân bay Tokyo</option>
                  <option>Sân bay Los Angeles</option>
                  <option>Sân bay Thượng Hải</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleSwap}
              className="absolute bottom-[14%] left-[50%] translate-x-[-50%] transform rounded-full border-2 border-[#cdd0d1] bg-white"
            >
              <img
                alt=""
                className="p-2"
                src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/331a92149a02dc615986206c588d6642.svg"
              />
            </button>
          </div>
          {/* ngày */}
          <div className="flex w-[80%] flex-row lg:w-[42%]">
            <div className="w-[50%]">
              <span className="text-[20px] text-white">Ngày đi</span>
              <div className="flex w-full flex-row items-center justify-evenly rounded-l-2xl border-y-4 border-l-4 border-r-2 border-[#cdd0d1] bg-white p-4 text-[25px]">
                <label htmlFor="ngay-di-select">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-id="IcSystemCalendar"
                  >
                    <path
                      d="M7 2V5M17 2V5M3 8H21M11.5 11.5H12.5V12.5H11.5V11.5ZM11.5 16.5H12.5V17.5H11.5V16.5ZM16.5 11.5H17.5V12.5H16.5V11.5ZM6.5 16.5H7.5V17.5H6.5V16.5ZM5 21H19C20.1046 21 21 20.1046 21 19V6C21 4.89543 20.1046 4 19 4H5C3.89543 4 3 4.89543 3 6V19C3 20.1046 3.89543 21 5 21Z"
                      stroke="#0194f3"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.5 11.5V12.5H6.5V11.5H7.5Z"
                      stroke="#0194F3"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </label>
                <input type="date" />
              </div>
            </div>
            <div className="w-[50%]">
              <div className="w-fit flex-row">
                <input
                  id="khu_hoi_check"
                  type="checkbox"
                  onClick={handle}
                  className="size-4"
                />
                &nbsp;
                <label
                  htmlFor="khu_hoi_check"
                  className="text-[20px] text-white"
                >
                  Khứ hồi
                </label>
              </div>
              <div
                className={`flex w-full flex-row items-center justify-evenly rounded-r-2xl border-y-4 border-r-4 border-[#cdd0d1] p-4 pl-8 text-[25px] ${isStateCheckbox}`}
              >
                <label htmlFor="ngay-ve-select">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-id="IcSystemCalendar"
                  >
                    <path
                      d="M7 2V5M17 2V5M3 8H21M11.5 11.5H12.5V12.5H11.5V11.5ZM11.5 16.5H12.5V17.5H11.5V16.5ZM16.5 11.5H17.5V12.5H16.5V11.5ZM6.5 16.5H7.5V17.5H6.5V16.5ZM5 21H19C20.1046 21 21 20.1046 21 19V6C21 4.89543 20.1046 4 19 4H5C3.89543 4 3 4.89543 3 6V19C3 20.1046 3.89543 21 5 21Z"
                      stroke="#0194f3"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.5 11.5V12.5H6.5V11.5H7.5Z"
                      stroke="#0194F3"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </label>
                <input type="date" className={`${isStateCheckbox}`} />
              </div>
            </div>
          </div>
          {/* Tìm */}
          <button className="m-[15px] rounded-2xl border-4 border-[rgba(205,208,209,0.50)] bg-[#ff5e1f] p-5 lg:m-0 lg:w-auto lg:self-end">
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
