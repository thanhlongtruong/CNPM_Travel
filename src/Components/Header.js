import { useContext, useEffect, useState } from "react";
import { CONTEXT } from "../Context/WindowLogin";
import { Link } from "react-router-dom";

function Header() {
  const {
    isStateLogin,
    handleShowInterfaceLogin,
    isUser,
    handleShowOptionSetting_LoginSuccess,
  } = useContext(CONTEXT);

  const [isLogo, setLogo] = useState(
    "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/f/fbab4f587da2242fbe9858fe3e5ba717.svg"
  );
  const [isBorderChangeY, setBorderChangeY] = useState("border-white");
  const [isStateStroke, setStateStroke] = useState("currentColor");
  const [isColor, setColor] = useState("none");
  const [isBg_Header, setBg_Header] = useState("bg-transparent text-white");
  const [isLogo_Header, setLogo_Header] = useState(
    "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/f/fbab4f587da2242fbe9858fe3e5ba717.svg"
  );

  useEffect(() => {
    const handleScroll = () => {
      let scrollY = window.screenY || document.documentElement.scrollTop;
      if (scrollY === 0) {
        setBg_Header("bg-transparent text-white");
        setLogo_Header(
          "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/f/fbab4f587da2242fbe9858fe3e5ba717.svg"
        );
        setBorderChangeY("border-black text-[#0194f3]");
        setColor("#3f3f46");
        setStateStroke("none");
      } else {
        setBg_Header("bg-white text-black transition-colors duration-500");
        setLogo_Header(
          "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/97f3e7a54e9c6987283b78e016664776.svg"
        );
        setBorderChangeY("border-[#0194f3]");
        setColor("#0194f3");
        setStateStroke(true);
        setStateStroke("#0194f3");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let currentLocation = window.location.href;
  let place = currentLocation.includes("CNPM_Travel") ? true : false;
  return (
    <div
      className={`sticky top-0  z-20 flex w-full justify-between border-b-[0.5px] border-gray-600 ${isBg_Header} p-5 text-[20px]`}
    >
      <Link to="/CNPM_Travel">
        <img
          alt=""
          src={
            place
              ? isLogo_Header
              : "https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/97f3e7a54e9c6987283b78e016664776.svg"
          }
        />
      </Link>

      <div className="div-flex-adjust-justify-between w-fit gap-x-10">
        {!isStateLogin && (
          <>
            <button
              className={`div-flex-adjust-justify-between  gap-1 rounded-md border-2 ${isBorderChangeY} p-[6px]`}
              onClick={handleShowInterfaceLogin}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isColor}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke={isStateStroke}
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              Đăng nhập
            </button>

            <button
              className="rounded-md bg-[#0194f3] p-2 text-white"
              onClick={handleShowInterfaceLogin}
            >
              Đăng ký
            </button>
          </>
        )}
        {isStateLogin && (
          <button
            className="rounded-md bg-[#0194f3] p-2 text-white"
            onClick={handleShowOptionSetting_LoginSuccess}
          >
            {isUser.fullName ? isUser.fullName : "NULL"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
