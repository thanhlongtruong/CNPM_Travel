function Home() {
  return (
    <div className="w-screen h-screen   bg-[url('https://ik.imagekit.io/tvlk/image/imageResource/2023/09/27/1695776209619-17a750c3f514f7a8cccde2d0976c902a.png?tr=q-75')]">
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
      <div className="flex flex-row items-center w-fit relative">
        <div className="w-[50%] flex-col">
          <h2 className="p-[10px] text-white">Từ</h2>
          <select className="rounded-l-2xl p-4 text-[25px]">
            <option>Sân bay Tân Sơn Nhất</option>
            <option>Sân bay Đà Nẵng</option>
            <option>Sân bay Nội Bài</option>
          </select>
        </div>
        <div className="w-[50%] flex-col">
          <h2 className="p-[10px] text-white">Đến</h2>
          <select className="rounded-r-2xl p-4 text-[25px] m-1">
            <option>Sân bay Tokyo</option>
            <option>Sân bay Hồng Kông</option>
            <option>Sân bay Los Angeles</option>
          </select>
        </div>
        <div className="absolute"></div>
      </div>

      <input type="date"></input>
    </div>
  );
}
export default Home;
