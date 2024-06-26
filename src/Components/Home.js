function Home() {
  return (
    <div className="w-screen h-screen   bg-[url('https://ik.imagekit.io/tvlk/image/imageResource/2023/09/27/1695776209619-17a750c3f514f7a8cccde2d0976c902a.png?tr=q-75')]">
      {/* div1 */}
      <div className="div-flex-adjust-justify-between w-full bg-transparent p-4 text-[20px] border-b-[0.5px] border-gray-600">
        <a href="#">
          <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/f/fbab4f587da2242fbe9858fe3e5ba717.svg" />
        </a>
        <div className="div-flex-adjust-justify-between w-fit gap-x-10">
          <a href="#" className="text-white">
            Đặt chỗ của tôi
          </a>
          <button className="content_center border-2 border-white text-white rounded-md flex flex-row p-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            Đăng nhập
          </button>

          <button className="bg-[#0194f3] text-white rounded-md p-[10px]">
            Đăng ký
          </button>
        </div>
      </div>
      {/* div2 */}
      <div className="flex flex-row items-center justify-evenly">
        {/* sân bay */}
        <div className="w-[42%] flex flex-row relative">
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
                id="bay-select"
                className="appearance-none text-left max-w-[70%]"
              >
                <option>Sân bay Tân Sơn Nhất</option>
                <option>Sân bay Đà Nẵng</option>
                <option>Sân bay Nội Bài</option>
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
                id="dap-select"
                className="appearance-none text-left max-w-[70%]"
              >
                <option>Sân bay Tokyo</option>
                <option>Sân bay Los Angeles</option>
                <option>Sân bay Thượng Hải</option>
              </select>
            </div>
          </div>
          <button className="absolute bottom-[14%] left-[50%] transform translate-x-[-50%] bg-white rounded-full border-2  border-[#cdd0d1]">
            <img
              className="p-2"
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/331a92149a02dc615986206c588d6642.svg"
            />
          </button>
        </div>
        {/* ngày */}
        <div className="w-[42%] flex flex-row">
          <div className="w-[50%]">
            <span className="text-white text-[20px]">Từ</span>
            <div className="flex flex-row justify-evenly items-center w-full rounded-l-2xl p-4 text-[25px] border-y-4 border-l-4 border-r-2 border-[#cdd0d1] bg-white">
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
            <span className="text-white text-[20px]">Đến</span>
            <div className="flex flex-row justify-evenly items-center w-full rounded-r-2xl p-4 pl-8 text-[25px] border-y-4 border-r-4 border-[#cdd0d1] bg-white">
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
              <input type="date" />
            </div>
          </div>
        </div>
        {/* Tìm */}
        <button className="bg-[#ff5e1f] p-5 self-end rounded-2xl border-4 border-[rgba(205,208,209,0.50)]">
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
    </div>
  );
}
export default Home;
