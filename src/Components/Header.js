import { useContext } from 'react';
import { CONTEXT } from '../Context/WindowLogin';

function Header() {
  const { handState } = useContext(CONTEXT);

  return (
    <div className="div-flex-adjust-justify-between w-full border-b-[0.5px] border-gray-600 bg-transparent p-4 text-[20px]">
      <a href="#">
        <img
          alt=""
          src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/f/fbab4f587da2242fbe9858fe3e5ba717.svg"
        />
      </a>
      <div className="div-flex-adjust-justify-between w-fit gap-x-10">
        <a href="#" className="text-white">
          Đặt chỗ của tôi
        </a>
        <button
          className="content_center flex flex-row rounded-md border-2 border-white p-[10px] text-white"
          onClick={handState}
        >
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

        <button className="rounded-md bg-[#0194f3] p-[10px] text-white" onClick={handState}>
          Đăng ký
        </button>
      </div>
    </div>
  );
}

export default Header;
