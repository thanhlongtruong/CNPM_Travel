import { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CONTEXT } from "../../Context/WindowLogin";

export function OptionSetting() {
  const {
    handleSetStateLogin_Logout,
    isUser,
    setShowOptionSetting_LoginSuccess,
    isShowOptionSetting_LoginSuccess,
  } = useContext(CONTEXT);
  const ref = useRef();
  const [isTextBg, setTextBg] = useState("bg-[#c79971] text-white");
  let placeHome = window.location.href.includes("CNPM_Travel") ? true : false;
  let place = window.location.href.includes("Setting/InfoAccount")
    ? true
    : false;
  useEffect(() => {
    const tagCurrent = ref.current;
    const tagChildren = tagCurrent.children;

    for (let i = 0; i < tagChildren.length; i++) {
      tagChildren[i].classList.remove("bg-sky-200");
    }

    if (!placeHome) {
      tagChildren[place ? 0 : 1].classList.add("bg-sky-200");
    } else {
    }

    if (placeHome) {
      setTextBg("bg-[#c79971] text-white");
    } else {
      setTextBg("bg-white text-black");
    }
  }, [place]);
  return (
    <>
      <p
        className={`select-none flex items-center border-b px-5 justify-start h-[20%] w-full text-xl font-bold rounded-t-lg rounded-tr-lg ${isTextBg}`}
      >
        {isUser ? isUser.fullName : "Tài khoản của tôi"}
      </p>
      <div className={`h-[80%] w-full`} ref={ref}>
        <Link
          onClick={() => {
            setShowOptionSetting_LoginSuccess(
              !isShowOptionSetting_LoginSuccess
            );
          }}
          to="/Setting/InfoAccount"
          className="flex items-center px-5 justify-start optionWhenLoginSuccess"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#0369a1"
            // class="size-6 mr-3 w-6 h-6"
            className="size-6 mr-3 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          Xem thông tin tài khoản
        </Link>
        <Link
          onClick={() => {
            setShowOptionSetting_LoginSuccess(
              !isShowOptionSetting_LoginSuccess
            );
          }}
          to="/Setting/HistoryTicket"
          className="flex items-center px-5 justify-start optionWhenLoginSuccess"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#0369a1"
            className="mr-3 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
            />
          </svg>
          Xem lịch sử vé
        </Link>
        <div
          onClick={handleSetStateLogin_Logout}
          className="flex items-center px-5 justify-start optionWhenLoginSuccess"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#0369a1"
            className="mr-3 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
            />
          </svg>
          Đăng xuất
        </div>
      </div>
    </>
  );
}
