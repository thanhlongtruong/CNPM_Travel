function Header() {
  return (
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
  );
}

export default Header;
