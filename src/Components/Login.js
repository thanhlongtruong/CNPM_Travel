import { useContext } from "react";
import { CONTEXT } from "../Context/WindowLogin";

export function Login() {
  const { handState } = useContext(CONTEXT);
  return (
    <div className="absolute z-30 flex h-full w-full items-center bg-white/10 backdrop-brightness-75">
      <div className="m-auto h-[490px] w-[450px] rounded-lg bg-white px-4">
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
          <input
            className="w-full rounded-md border-2 p-2 font-medium hover:border-cyan-400"
            placeholder="Ví dụ: +84901234567 hoặc yourname@email.com"
          ></input>
        </div>
        <div className="w-full rounded-md bg-slate-200 p-2 text-center font-bold text-slate-400">
          Tiếp tục
        </div>
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
