import { useEffect, useState } from "react";

export function InfoAccount() {
  const [isName, setName] = useState("Thanh Long");
  const [isStateName, setStateName] = useState(true);
  const [isPhone, setPhone] = useState("0967994184");
  const [isStatePhone, setStatePhone] = useState(true);
  const [isEmail, setEmail] = useState("");
  const [isStateEmail, setStateEmail] = useState(true);
  const [isPass, setPass] = useState("12345678");
  const [isStatePass, setStatePass] = useState(true);
  const [isSex, setSex] = useState("Nam");
  const [isStateSex, setStateSex] = useState(true);
  const [isBirth, setBirth] = useState("2004-04-15");
  const [isStateBirth, setStateBirth] = useState(true);
  const [isStateSave, setStateSave] = useState(false);
  let date = new Date(isBirth);

  useEffect(() => {
    setStateName(isName.trimStart().length < 2 ? false : true);
  }, [isName]);

  useEffect(() => {
    setStateSex(
      isSex.trim().length === 0 ||
        (!isSex.trim().includes("Nam") && !isSex.trim().includes("Nữ"))
        ? false
        : true
    );
  }, [isSex]);

  useEffect(() => {
    setStateBirth(
      date.getFullYear() >= new Date().getFullYear() ? false : true
    );
  }, [isBirth]);

  useEffect(() => {
    setStatePhone(
      isPhone.trim().length !== 10 || !/^\d{10}$/.test(isPhone) ? false : true
    );
  }, [isPhone]);

  useEffect(() => {
    if (!/\b\w+@gmail\.com\b/.test(isEmail) && isEmail.trim().length >= 1) {
      setStateEmail(false);
    } else if (isEmail.trim().length === 0) {
      setStateEmail(true);
    } else {
      setStateEmail(true);
    }
  }, [isEmail]);

  useEffect(() => {
    setStatePass(isPass.trim().length < 8 ? false : true);
  }, [isPass]);

  useEffect(() => {
    setStateSave(
      isStateName && isStateSex && isStateBirth && isStatePhone && isStatePass
        ? true
        : false
    );
  }, [isStateName, isStateSex, isStateBirth, isStatePhone, isStatePass]);
  return (
    <>
      <p className="text-xl font-semibold p-5 text-center">
        Thông tin tài khoản
      </p>

      <div className="border-t p-5">
        <div className="mb-7">
          <p className="font-semibold text-base text-slate-500">Tên đầy đủ</p>
          {!isStateName && (
            <span className="text-rose-600 ml-4">* Tên phải trên 10 kí tự</span>
          )}
          <input
            onChange={(e) => setName(e.target.value)}
            value={isName}
            className="outline-none px-3 w-full h-9 border border-slate-500 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        <div className="flex gap-7 mb-7">
          <div className="w-[25%]">
            <p className="font-semibold text-base text-slate-500">Giới tính</p>
            {!isStateSex && (
              <span className="text-rose-600 ml-4">* "Nam" or "Nữ"</span>
            )}
            <input
              onChange={(e) => setSex(e.target.value)}
              value={isSex}
              className="outline-none px-3 w-full h-9 border border-slate-500 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
          <div className="w-[37%]">
            <p className="outline-none font-semibold text-base text-slate-500">
              Ngày sinh
            </p>
            {!isStateBirth && (
              <span className="text-rose-600 ml-4">
                * Năm sinh không phù hợp
              </span>
            )}
            <input
              type="date"
              onChange={(e) => setBirth(e.target.value)}
              value={isBirth}
              className="outline-none px-3 w-full h-9 border border-slate-500 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
        </div>
        <div className="mb-7">
          <p className="font-semibold text-base text-slate-500">
            Số điện thoại
          </p>
          {!isStatePhone && (
            <span className="text-rose-600 ml-4">
              * Số điện thoại phải 10 số
            </span>
          )}
          <input
            type="tel"
            onChange={(e) => setPhone(e.target.value)}
            value={isPhone}
            className="outline-none px-3 w-full h-9 border border-slate-500 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        <div className="mb-7">
          <p className="font-semibold text-base text-slate-500">Email</p>
          {!isStateEmail && (
            <span className="text-rose-600 ml-4">* Email không hợp lệ</span>
          )}
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={isEmail}
            className="outline-none px-3 w-full h-9 border border-slate-500 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        <div className="mb-7">
          <p className="font-semibold text-base text-slate-500">Mật khẩu</p>
          {!isStatePass && (
            <span className="text-rose-600 ml-4">
              * Pass từ 8 kí tự trở lên
            </span>
          )}
          <input
            type="password"
            onChange={(e) => setPass(e.target.value)}
            value={isPass}
            className="outline-none px-3 w-full h-9 border border-slate-500 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
      </div>
      <div className="flex gap-6 w-full h-10 justify-end px-5">
        {isStateSave ? (
          <>
            <div className="bg-sky-50 h-fit w-fit p-3 font-semibold text-sky-500 text-base rounded-lg">
              Hủy
            </div>
            <div className="bg-sky-500 h-fit w-fit p-3 font-semibold text-white text-base rounded-lg">
              Lưu
            </div>
          </>
        ) : (
          <>
            <div className="bg-slate-300 select-none h-fit w-fit p-3 font-semibold text-white text-base rounded-lg">
              Hủy
            </div>
            <div className="bg-slate-300 select-none h-fit w-fit p-3 font-semibold text-white text-base rounded-lg">
              Lưu
            </div>
          </>
        )}
      </div>
    </>
  );
}
