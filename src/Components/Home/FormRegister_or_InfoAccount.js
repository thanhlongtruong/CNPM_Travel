import { useContext, useEffect } from "react";
import { CONTEXT } from "../../Context/WindowLogin";

export const FormRegister_or_InfoAccount = () => {
  const {
    checkBirthday,
    fullName,
    setFullName,
    checkFullName,
    numberPhone,
    setNumberPhone,
    checkNumberPhone,
    password,
    setPassword,
    checkPassword,
    gender,
    setGender,
    checkGender,
    setBirthday,
    birthday,
  } = useContext(CONTEXT);

  return (
    <>
      <div className="border-t p-5">
        <div className="mb-7">
          <p className="font-semibold text-base text-slate-500">Tên đầy đủ</p>
          {!checkFullName && (
            <span className="text-rose-600 ml-4">* Tên phải trên 1 kí tự</span>
          )}
          <input
            onChange={(e) => setFullName(e.target.value)}
            defaultValue={fullName}
            className="outline-none px-3 w-full h-9 border border-slate-500 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        <div className="flex gap-7 mb-7">
          <div className="w-[50%]">
            <p className="font-semibold text-base text-slate-500">Giới tính</p>
            {!checkGender && (
              <span className="text-rose-600 ml-4">* "Nam/Nữ"</span>
            )}
            <input
              onChange={(e) => setGender(e.target.value)}
              defaultValue={gender}
              className="outline-none px-3 w-full h-9 border border-slate-500 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
          <div className="w-[50%]">
            <p className="outline-none font-semibold text-base text-slate-500">
              Ngày sinh
            </p>
            {!checkBirthday && (
              <span className="text-rose-600 ml-4">
                * Năm sinh không phù hợp
              </span>
            )}
            <input
              type="date"
              onChange={(e) => setBirthday(e.target.value)}
              defaultValue={birthday}
              className="outline-none px-3 w-full h-9 border border-slate-500 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
        </div>
        <div className="mb-7">
          <p className="font-semibold text-base text-slate-500">
            Số điện thoại
          </p>
          {!checkNumberPhone && (
            <span className="text-rose-600 ml-4">
              * Số điện thoại phải 10 số
            </span>
          )}
          <input
            type="tel"
            onChange={(e) => setNumberPhone(e.target.value)}
            defaultValue={numberPhone}
            className="outline-none px-3 w-full h-9 border border-slate-500 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>

        <div className="mb-7">
          <p className="font-semibold text-base text-slate-500">Mật khẩu</p>
          {!checkPassword && (
            <span className="text-rose-600 ml-4">
              * Pass từ 8 kí tự trở lên
            </span>
          )}
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            defaultValue={password}
            className="outline-none px-3 w-full h-9 border border-slate-500 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
      </div>
    </>
  );
};
