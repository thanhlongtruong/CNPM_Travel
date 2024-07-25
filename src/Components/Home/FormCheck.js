import { useContext, useEffect, useState } from "react";
import { CONTEXT } from "../../Context/WindowLogin";
import {
  NotiFailEventlogin,
  CONTTENT_FAIL_PASS,
  CONTENT_REGISTER_SUCCESS,
  CONTENT_REGISTER_FAIL,
  CONTENT_CHUA_LOGIN,
} from "../Noti/NotiFailEventLogin";
import { FormRegister_or_InfoAccount } from "./FormRegister_or_InfoAccount";

export function Login() {
  const {
    handleShowInterfaceLogin,
    handleEventLogin,
    setUser,
    isShowNotiFailLogin,
    isInputPassword,
    setInputPassword,
    setNumberPhone,
    fullName,
    numberPhone,
    gender,
    birthday,
    password,
    setReset_When_Update,
    setGet_Id_User,
    isTimeShowNotiMake_a_Reservation,
  } = useContext(CONTEXT);
  const [isValidPhone_Email, setIsValidPhone_Email] = useState(true);
  const [isPhone, setPhone] = useState("");
  const [isStatePhone, setStatePhone] = useState(false);
  const [isInput, setCheckInput] = useState("");
  const [isNotFindPhone, setNotFindPhone] = useState(false);

  const [isShowNotiFailRegister, setShowNotiFailRegister] = useState(false);
  const [isShowNotiSuccesRegister, setShowNotiSuccesRegister] = useState(false);
  const [isResetStateRes_to_Login, setResetStateRes_to_Login] = useState(false);
  const [isRegister, setRegister] = useState(false);
  const hanleEventRegister = () => {
    setNumberPhone(isInput);
    setRegister(!isRegister);
  };

  useEffect(() => {
    if (isInput !== null && isInput.length >= 1) {
      if (/^\d{10}$/.test(isInput) && isInput.trim().length === 10) {
        setStatePhone(true);
      } else {
        setStatePhone(false);
      }
    } else {
    }
  }, [isInput]);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await fetch(
          `http://localhost:4001/api/get_user/find_number_phone/${isInput}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUser(data);
        setIsValidPhone_Email(true);
        setGet_Id_User(data._id);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
        setIsValidPhone_Email(false);
      }
    };
    fetchAccount();
  }, [isInput, isResetStateRes_to_Login]);

  useEffect(() => {
    if (!isValidPhone_Email && isStatePhone) {
      setNotFindPhone(true);
    } else {
      setNotFindPhone(false);
    }
  }, [isValidPhone_Email, isStatePhone]);

  const submitInfoRegister = async (event) => {
    event.preventDefault();
    const user = {
      numberPhone: numberPhone,
      fullName: fullName,
      gender: gender,
      birthday: birthday,
      password: password,
    
    };
    try {
      const response = await fetch("http://localhost:4001/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Kiểu nội dung của request
        },
        body: JSON.stringify({
          numberPhone: user.numberPhone,
          fullName: user.fullName,
          gender: user.gender,
          birthday: user.birthday,
          password: user.password,
        }),
      });

      if (!response.ok) {
        setShowNotiFailRegister(true);
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json(); // Đọc phản hồi JSON
      setRegister(false);
      setShowNotiSuccesRegister(true);
      setResetStateRes_to_Login(true);
      setReset_When_Update(true);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  if (isShowNotiFailRegister) {
    setTimeout(() => {
      setShowNotiFailRegister(false);
    }, 2000);
  }
  if (isShowNotiSuccesRegister) {
    setTimeout(() => {
      setShowNotiSuccesRegister(false);
    }, 2000);
  }
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
    <div className="fixed z-50 flex h-full w-full items-center justify-center bg-white/10 backdrop-brightness-75">
      {!isShowNotiFailLogin && (
        <NotiFailEventlogin content={CONTTENT_FAIL_PASS} />
      )}
      {isTimeShowNotiMake_a_Reservation && (
        <NotiFailEventlogin content={CONTENT_CHUA_LOGIN} />
      )}
      {isShowNotiSuccesRegister && (
        <NotiFailEventlogin content={CONTENT_REGISTER_SUCCESS} />
      )}
      <div
        onClick={handleShowInterfaceLogin}
        className="absolute z-20 w-full h-full"
      ></div>
      <div className="absolute z-40 m-auto h-fit w-[450px] rounded-lg bg-white p-4">
        <div className="div-flex-adjust-justify-between flex h-14 w-full">
          <p className="w-[90%] text-2xl font-bold"> Đăng nhập / Đăng ký</p>
          <div className="w-[10%]" onClick={handleShowInterfaceLogin}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        {!isRegister ? (
          <>
            <div className="my-2 mb-5">
              <p className="p-0 text-base font-medium text-slate-500">
                Số điện thoại di động
              </p>
              {!isStatePhone && (
                <span className="text-rose-600 ml-4">
                  * Số điện thoại phải 10 số
                </span>
              )}
              <input
                onChange={(e) => setCheckInput(e.target.value)}
                value={isInput}
                className="w-full rounded-md border-2 p-2 font-medium hover:border-cyan-400"
                placeholder="Ví dụ: +84901234567"
                size="10"
              ></input>
              {isValidPhone_Email && (
                <>
                  <span className="p-0 text-sm font-medium text-green-400">
                    Số điện thoại này đã được đăng kí. Bạn có thể chỉ cần nhập
                    mật khẩu của bạn dưới đây để đăng nhập.
                  </span>
                  <p className="p-0 text-base font-medium text-slate-500 mt-5">
                    Mật khẩu
                  </p>
                  <input
                    type="password"
                    onChange={(e) => setInputPassword(e.target.value)}
                    value={isInputPassword}
                    className="w-full rounded-md border-2 p-2 font-medium hover:border-cyan-400"
                    placeholder="Nhập mật khẩu ở đây"
                  ></input>
                </>
              )}
            </div>
            {!isValidPhone_Email && !isNotFindPhone && (
              <div className="w-full rounded-md bg-slate-200 p-2 text-center font-bold text-slate-400 select-none pointer-events-none">
                Tiếp tục
              </div>
            )}
            {isValidPhone_Email && (
              <div
                className="w-full rounded-md bg-orange-500 p-2 text-center font-bold text-white"
                onClick={handleEventLogin}
              >
                Đăng nhập
              </div>
            )}
            {isNotFindPhone && (
              <div
                className="w-full rounded-md bg-orange-500 p-2 text-center font-bold text-white"
                onClick={hanleEventRegister}
              >
                Đăng kí
              </div>
            )}
            <p className="my-5 text-center text-sm font-semibold text-slate-600">
              hoặc đăng nhập / đăng kí với
            </p>
            <div className="styleLogin_btnGoogleFace">
              Tiếp tục với Facebook
            </div>
            <p className="mt-6 text-center">
              Bằng cách đăng ký, bạn đồng ý với{" "}
              <span className="font-semibold text-cyan-400">
                Điều khoản & Điều kiện
              </span>{" "}
              của chúng tôi và bạn đã đọc
              <span className="font-semibold text-cyan-400">
                {" "}
                Chính Sách Quyền Riêng Tư
              </span>{" "}
              của chúng tôi.
            </p>
          </>
        ) : (
          <form onSubmit={submitInfoRegister}>
            {isShowNotiFailRegister && (
              <NotiFailEventlogin content={CONTENT_REGISTER_FAIL} />
            )}
            <FormRegister_or_InfoAccount />
            <div className="w-full h-fit flex justify-center items-center">
              <button
                type="submit"
                className="bg-cyan-500 p-2 rounded-md text-white font-semibold h-fit w-fit"
              >
                Đăng kí
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
