import { useContext, useEffect, useState } from "react";
import { CONTEXT } from "../../Context/WindowLogin";

export function Login() {
  const { handState, handleEventLogin, setUser } = useContext(CONTEXT);
  const [isValidPhone_Email, setIsValidPhone_Email] = useState(false);
  const [isPhone, setPhone] = useState("");
  const [isStatePhone, setStatePhone] = useState(true);
  const [isEmail, setEmail] = useState("");
  const [isStateEmail, setStateEmail] = useState(true);
  const [isInput, setCheckInput] = useState("");

  useEffect(() => {
    if (isInput !== null && isInput.length > 1) {
      if (!/^\d{10}$/.test(isInput) && isInput.trim().length <= 10) {
        setStatePhone(false);
      } else {
        setStatePhone(true);
      }
      if (!/\b\w+@gmail\.com\b/.test(isInput) && isInput.trim().length > 10) {
        setStateEmail(false);
      } else {
        setStateEmail(true);
      }
    } else {
      setStatePhone(true);
    }
  }, [isInput]);

  const [isStateSave, setStateSave] = useState(false);
  useEffect(() => {
    if (isStatePhone && isStateEmail) {
      setStateSave(true);
    }
  }, []);

  const [account, setAccount] = useState(null);

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
        // setAccount(data);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
        setIsValidPhone_Email(false);
      }
    };
    fetchAccount();
  }, [isInput]);

  // useEffect(() => {if()}, [isInput]);

  return (
    <div className="absolute z-30 flex h-full w-full items-center bg-white/10 backdrop-brightness-75">
      <div className="m-auto h-fit w-[450px] rounded-lg bg-white p-4">
        <div className="div-flex-adjust-justify-between flex h-14 w-full">
          <p className="w-[90%] text-2xl font-bold"> Đăng nhập / Đăng ký</p>
          <div className="w-[10%]" onClick={handState}>
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div className="my-2 mb-5">
          <p className="p-0 text-base font-medium text-slate-500">
            Email/ Số điện thoại di động
          </p>
          {!isStatePhone && (
            <span className="text-rose-600 ml-4">
              * Số điện thoại phải 10 số
            </span>
          )}
          {!isStateEmail && (
            <span className="text-rose-600 ml-4 w-auto h-auto">
              * Email không hợp lệ
            </span>
          )}
          <input
            onChange={(e) => setCheckInput(e.target.value)}
            value={isInput}
            className="w-full rounded-md border-2 p-2 font-medium hover:border-cyan-400"
            placeholder="Ví dụ: +84901234567 hoặc yourname@email.com"
          ></input>
          {isValidPhone_Email && (
            <>
              <span className="p-0 text-sm font-medium text-green-400">
                Email này đã được kết nối với tài khoản Traveloka. Bạn có thể
                chỉ cần nhập mật khẩu của bạn dưới đây để đăng nhập.
              </span>
              <p className="p-0 text-base font-medium text-slate-500 mt-5">
                Mật khẩu
              </p>
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={isPhone}
                className="w-full rounded-md border-2 p-2 font-medium hover:border-cyan-400"
                placeholder="Ví dụ: +84901234567 hoặc yourname@email.com"
              ></input>
            </>
          )}
        </div>
        {!isValidPhone_Email && (
          <div className="w-full rounded-md bg-slate-200 p-2 text-center font-bold text-slate-400 select-none pointer-events-none">
            Tiếp tục
          </div>
        )}
        {isValidPhone_Email && (
          <div
            className="w-full rounded-md bg-orange-500 p-2 text-center font-bold text-white"
            onClick={handleEventLogin}
          >
            Tiếp tục
          </div>
        )}
        <p className="my-5 text-center text-sm font-semibold text-slate-600">
          hoặc đăng nhập / đăng kí với
        </p>
        <div className="styleLogin_btnGoogleFace">Tiếp tục với Google</div>
        <div className="styleLogin_btnGoogleFace">Tiếp tục với Facebook</div>
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
      </div>
    </div>
  );
}
