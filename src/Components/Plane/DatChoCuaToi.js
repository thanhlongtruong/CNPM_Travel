import React, { useState } from "react";
import Header from "../Header";
import { useEffect } from "react";

function DatChoCuaToi() {
  const [selectedPhoneCode, setSelectedPhoneCode] = useState("");

  const [isHo, setHo] = useState("");
  const [isStateHo, setStateHo] = useState(false);
  const [isTenDem, setTenDem] = useState("");
  const [isStateTenDem, setStateTenDem] = useState(false);
  const [isSoDienThoai, setSoDienThoai] = useState("");
  const [isStateSoDienThoai, setStateSoDienThoai] = useState(false);
  const [isEmail, setEmail] = useState("");
  const [isStateEmail, setStateEmail] = useState(false);

  useEffect(() => {
    setStateHo(isHo.trim().length <= 0 ? false : true);
  }, [isHo]);

  useEffect(() => {
    setStateTenDem(isTenDem.trim().length <= 0 ? false : true);
  }, [isTenDem]);

  useEffect(() => {
    setStateSoDienThoai(
      isSoDienThoai.trim().length !== 10 || !/^\d{10}$/.test(isSoDienThoai)
        ? false
        : true
    );
  }, [isSoDienThoai]);

  useEffect(() => {
    if (!/\b\w+@gmail\.com\b/.test(isEmail) && isEmail.trim().length >= 1) {
      setStateEmail(false);
    } else if (isEmail.trim().length === 0) {
      setStateEmail(true);
    } else {
      setStateEmail(true);
    }
  }, [isEmail]);

  const handleSelectChange = (event) => {
    setSelectedPhoneCode(event.target.value);
  };

  return (
    <>
      <Header />
      <div className="w-screen h-hit bg-gray-100 flex justify-center">
        <div className="w-[80%] h-fit lg:flex-row flex-col flex gap-5 justify-center pt-10">
          <div className="w-full lg:w-[30%] mt-[50px] lg:mt-[104px]">
            <div className="w-full flex-col bg-white rounded-t-md rounded-b-md">
              <div className="p-4 flex shadow-sm">
                <img
                  className="h-[30px] w-[30px] mt-1"
                  src="https://vemaybaytiachop.com/wp-content/uploads/2022/10/2.png"
                  alt=""
                />
                <h4 className=" ml-2 mt-2 mr-2 font-bold text-sm">
                  Vietnam → Bali / Denpasar
                </h4>
                <a href="#">
                  <h3 className="text-sm font-bold text-blue-500 mt-2">
                    Chi tiết
                  </h3>
                </a>
              </div>
              <div className="p-4 flex-col shadow-sm">
                <div className="mt-[-5px] mb-4">
                  <h4 className="text-sm font-bold">
                    Chuyến bay đi • Sat, 29 Jun 2024
                  </h4>
                </div>
                <div className="flex pb-4">
                  <div className="w-[50px] mr-3">
                    <img
                      className="mt-2"
                      src="https://ik.imagekit.io/tvlk/image/imageResource/2015/12/17/1450350561012-6584b693edd67d75cfc25ecff41c5704.png?tr=h-20,q-75"
                      alt=""
                    />
                  </div>
                  <div className="flex-col">
                    <h4 className="text-sm font-bold">Citilink</h4>
                    <h4 className="text-sm text-gray-500 font-medium">
                      Phổ thông
                    </h4>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="flex-col">
                    <h4 className="font-medium">19:00</h4>
                    <h4 className="text-xs font-medium text-gray-500 ml-2">
                      CGK
                    </h4>
                  </div>
                  <div className="flex-col ml-2">
                    <h4 className="text-xs font-medium text-gray-500 mt-[-5px]">
                      1h 55m
                    </h4>
                    <div className="flex mt-1 ml-[-10px]">
                      <div className="border border-gray-300 rounded-[100%] w-[8px] h-[8px]"></div>
                      <div className="border border-gray-300 w-[50px] h-[1px] mt-1"></div>
                      <div className="border border-gray-300 rounded-[100%] w-[8px] h-[8px] bg-gray-400"></div>
                    </div>
                    <h4 className="text-xs font-medium text-gray-500 ml-[-5px] mt-[3px]">
                      Bay thẳng
                    </h4>
                  </div>
                  <div className="flex-col">
                    <h4 className="font-medium">21:55</h4>
                    <h4 className="text-xs font-medium text-gray-500 ml-2">
                      DPS
                    </h4>
                  </div>
                </div>
              </div>
              <div className="p-4 flex-col shadow-lg rounded-b-md">
                <div className="flex gap-2">
                  <img
                    src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/0/0451207408e414bb8a1664153973b3c8.svg"
                    alt=""
                    className="h-[14px] w-[14px] mt-1"
                  />
                  <h4 className="text-sm font-medium text-green-700">
                    Có thể hoàn vé
                  </h4>
                </div>
                <div className="flex gap-2 mt-2">
                  <img
                    src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/0/0451207408e414bb8a1664153973b3c8.svg"
                    alt=""
                    className="h-[14px] w-[14px] mt-1"
                  />
                  <h4 className="text-sm font-medium text-green-700">
                    Có thể áp dụng đổi lịch bay
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[70%]">
            <h3 className="text-2xl font-bold mt-[12px] mb-[12px]">
              Đặt chỗ của tôi
            </h3>
            <div className="font-medium text-gray-500 mb-[24px]">
              Điền thông tin và xem lại đặt chỗ.
            </div>
            <div className="relative bg-white rounded-md p-6 flex shadow-lg">
              <div className="flex">
                <div className="w-10 h-10 rounded-[100%] bg-blue-500">
                  <img
                    className="p-[8px]"
                    src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/1/10e771009e605099270565bf161c5ac4.svg"
                    alt=""
                  />
                </div>
                <div className=" mt-[-5px] ml-4">
                  <h3 className="font-bold">Đăng nhập với tài khoản</h3>
                  <h2 className="font-medium text-sm text-gray-500">
                    Tài khoản cá nhân
                  </h2>
                </div>
              </div>
              <div className="absolute right-0 top-[-20px] p-2">
                <img
                  className="w-[110px] h-[110px]"
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2018/07/27/1532667628823-8d3fb51a3735f35d48dfcd223d2f8bde.svg?tr=q-75,w-170"
                  alt="Sample Image"
                />
              </div>
            </div>
            <div className="text-xl font-bold mt-[40px]">
              <h3>Thông tin liên hệ</h3>
              <div className="mt-[16px]  bg-white shadow-lg rounded-md">
                <div className="pl-[16px] pr[16px] flex h-[52px] p-4 shadow-sm">
                  <h3 className="text-base w-[570px]">
                    Thông tin liên hệ (nhận vé/phiếu thanh toán)
                  </h3>
                  <h3 className=" cursor-pointer text-base text-blue-500">
                    Lưu
                  </h3>
                </div>
                <div className="p-4">
                  <div className="w-full m-0 flex flex-col md:flex-row">
                    <div className="w-[50%] mb-[16px] pr-[12px]">
                      <div className="flex flex-col">
                        <div className="flex">
                          <h3 className=" font-medium text-sm text-gray-500">
                            Họ (vd: Nguyen)
                          </h3>
                          <span className="text-red-500 text-sm">*</span>
                        </div>
                        <div className="mt-2">
                          <input
                            className="border border-gray-300 h-[40px] w-full rounded-md px-2 "
                            type="text"
                            onChange={(e) => setHo(e.target.value)}
                          />
                          {!isStateHo && (
                            <span className="text-red-600 font-medium text-sm ">
                              Họ (vd: Nguyen) là phần bắt buộc
                            </span>
                          )}
                        </div>
                        <div className="mt-1 font-medium text-sm text-gray-500">
                          <h3>như trên CMND (không dấu)</h3>
                        </div>
                      </div>
                    </div>
                    <div className="w-[50%] mb-[16px] md:pl-[12px]">
                      <div className="flex flex-col">
                        <div className="flex">
                          <h3 className=" font-medium text-sm text-gray-500">
                            Tên đệm & Tên (vd: Thi Ngoc Anh)
                          </h3>{" "}
                          <span className="text-red-500 text-sm">*</span>
                        </div>
                        <div className="mt-2">
                          <input
                            className="border border-gray-300 h-[40px] w-full rounded-md px-2"
                            type="text"
                            onChange={(e) => setTenDem(e.target.value)}
                          />
                          {!isStateTenDem && (
                            <span className="text-red-600 font-medium text-sm ">
                              Tên Đệm & Tên (vd: Thi Ngoc Anh) là phần bắt buộc
                            </span>
                          )}
                        </div>
                        <div className="mt-1 font-medium text-sm text-gray-500">
                          <h3>như trên CMND (không dấu)</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full m-0 flex flex-col md:flex-row">
                    <div className="w-[50%] mb-[16px] pr-[12px]">
                      <div className="flex flex-col">
                        <div className="flex">
                          <h3 className=" font-medium text-sm text-gray-500">
                            Điện thoại di động
                          </h3>{" "}
                          <span className="text-red-500 text-sm">*</span>
                        </div>
                        <div className="mt-2">
                          <div className="w-full h-[40px] flex ">
                            <select
                              name="sdt"
                              id="sdtid"
                              className="w-[100px] text-sm border h-[40px] border-gray-300 rounded-l-md"
                              value={selectedPhoneCode}
                              onChange={handleSelectChange}
                            >
                              <option value="+1684">
                                American Samoa (+1684)
                              </option>
                              <option value="+84">VietNam (+84)</option>
                              <option value="+850">Korea North (+850)</option>
                              <option value="+82">Korea South (+82)</option>
                            </select>
                            <input
                              type="tel"
                              className=" w-[187px] border border-gray-300 rounded-r-md px-2"
                              onChange={(e) => setSoDienThoai(e.target.value)}
                            />
                          </div>
                          {!isStateSoDienThoai && (
                            <span className="text-red-600 font-medium text-sm ">
                              Số điện thoại phải là 10 số
                            </span>
                          )}
                        </div>
                        <div className="mt-1 font-medium text-xs text-gray-500">
                          <h3>
                            VD: +84 901234567 trong đó (+84) là mã quốc gia và
                            901234567 là số di động
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="w-[50%] mb-[16px] md:pl-[12px]">
                      <div className="flex flex-col">
                        <div className="flex">
                          <h3 className=" font-medium text-sm text-gray-500">
                            Email
                          </h3>{" "}
                          <span className="text-red-500 text-sm">*</span>
                        </div>
                        <div className="mt-2">
                          <input
                            className="border border-gray-300 h-[40px] w-full rounded-md px-2"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        {!isStateEmail && (
                          <span className="text-red-600 font-medium text-sm ">
                            Email phải đúng định dạng
                          </span>
                        )}
                        <div className="mt-1 font-medium text-sm text-gray-500">
                          <h3>VD: email@example.com</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-xl font-bold mt-[40px]">
              <h3>Thông tin hành khách</h3>
              <div className="mt-[16px]  bg-white shadow-lg rounded-md">
                <div className="pl-[16px] pr[16px] flex h-[52px] p-4 shadow-sm">
                  <h3 className="text-base w-[570px]">Người lớn 1</h3>
                  <h3 className=" cursor-pointer text-base text-blue-500">
                    Lưu
                  </h3>
                </div>
                <div className=" flex-col  p-4 shadow-sm bg-yellow-100">
                  <div className="mt-[-5px]">
                    <h3 className="text-xs font-medium text-red-500">
                      Vui lòng chú ý cho những điều sau đây :
                    </h3>
                  </div>
                  <h3 className="text-base font-medium">
                    Tránh nhầm lẫn khi nhập tên, vì bạn có thể không sửa được
                    sau khi đặt chỗ. Nhấn vào bên dưới để xem hướng dẫn.
                  </h3>
                  <h3 className="text-blue-500 font-bold text-base cursor-pointer ">
                    Xem hướng dẫn nhập tên
                  </h3>
                </div>
                <div className="flex-col p-4  bg-white ">
                  <div className="flex">
                    <h3 className=" font-medium text-sm text-gray-500">
                      Danh xưng
                    </h3>{" "}
                    <span className="text-red-500 text-sm">*</span>
                  </div>
                  <div className="mt-2">
                    <select
                      name="danhxung"
                      id="danhxungid"
                      className="w-[150px] text-sm border h-[40px] border-gray-300 rounded-md"
                    >
                      <option value="Ông">Ông</option>
                      <option value="Bà">Bà</option>
                      <option value="Cô">Cô</option>
                    </select>
                  </div>
                </div>
                <div className="w-full m-0 flex p-4 flex-col md:flex-row">
                  <div className="w-[50%] mb-[16px] pr-[12px]">
                    <div className="flex flex-col">
                      <div className="flex">
                        <h3 className=" font-medium text-sm text-gray-500">
                          Họ (vd: Nguyen)
                        </h3>{" "}
                        <span className="text-red-500 text-sm">*</span>
                      </div>
                      <div className="mt-2">
                        <input
                          className="border border-gray-300 h-[40px] w-full rounded-md px-2 "
                          type="text"
                          onChange={(e) => setHo(e.target.value)}
                        />
                        {!isStateHo && (
                          <span className="text-red-600 font-medium text-sm ">
                            Họ (vd: Nguyen) là phần bắt buộc
                          </span>
                        )}
                      </div>
                      <div className="mt-1 font-medium text-sm text-gray-500">
                        <h3>như trên CMND (không dấu)</h3>
                      </div>
                    </div>
                  </div>
                  <div className="w-[50%] mb-[16px] md:pl-[12px]">
                    <div className="flex flex-col">
                      <div className="flex">
                        <h3 className=" font-medium text-sm text-gray-500">
                          Tên đệm & Tên (vd: Thi Ngoc Anh)
                        </h3>{" "}
                        <span className="text-red-500 text-sm">*</span>
                      </div>
                      <div className="mt-2">
                        <input
                          className="border border-gray-300 h-[40px] w-full rounded-md px-2"
                          type="text"
                          onChange={(e) => setTenDem(e.target.value)}
                        />
                        {!isStateTenDem && (
                          <span className="text-red-600 font-medium text-sm ">
                            Tên Đệm & Tên (vd: Thi Ngoc Anh) là phần bắt buộc
                          </span>
                        )}
                      </div>
                      <div className="mt-1 font-medium text-sm text-gray-500">
                        <h3>như trên CMND (không dấu)</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-col p-4 mt-[-20px]  bg-white ">
                  <div className="flex">
                    <h3 className=" font-medium text-sm text-gray-500">
                      Quốc tịch
                    </h3>
                    <span className="text-red-500 text-sm">*</span>
                  </div>
                  <div className="mt-2">
                    <select
                      name="quoctich"
                      id="quoctichid"
                      className="w-[300px] text-sm border h-[40px] border-gray-300 rounded-md"
                    >
                      <option value="Ông">Vietnam</option>
                      <option value="Bà">United State</option>
                      <option value="Cô">United Kingdom</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-[40px] mb-[40px]">
                <div className="w-full">
                  <div className="bg-blue-500 w-[200px] h-[40px] rounded-md flex cursor-pointer items-center justify-center text-white right-2 ml-auto">
                    Tiếp tục
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DatChoCuaToi;
