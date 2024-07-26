import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "../Header";
import { Link, useLocation } from "react-router-dom";
import {
  NotiFailEventlogin,
  CHUA_DIEN_THONGTIN_VE,
} from "../Noti/NotiFailEventLogin";

function DatChoCuaToi() {
  const dataTicketLocation = useLocation();
  const { dataTicket, dataFlight, dataUser } = dataTicketLocation.state;
  if (dataUser === null) {
    window.location.href = "/XemDanhSachChuyenBay";
  }

  //!handle device
  const [sizeSizeWidth, setSizeWidth] = useState();
  useEffect(() => {
    const handlSize = () => {
      setSizeWidth(document.documentElement.clientWidth);
    };
    window.addEventListener("resize", handlSize);
    return () => {
      window.removeEventListener("resize", handlSize);
    };
  }, [sizeSizeWidth]);

  useEffect(() => {
    if (sizeSizeWidth >= 1024) {
    } else {
    }
  }, [sizeSizeWidth]);

  const [isGetName, setGetName] = useState([null]);
  const [isGetPhone, setGetPhone] = useState([null]);

  const [isGetSoKy, setGetSoky] = useState([]);
  const [isGetHangVe, setGetHangVe] = useState([null]);
  const [isGiaVe, setGiaVe] = useState([]);

  const [isCheck, setCheck] = useState(true);

  const [isShowWarm, setShowWarm] = useState(false);

  const handleWarm = () => {
    setShowWarm(false);
  };

  //! set time auto turn off noti submit fail
  useEffect(() => {
    if (!isCheck) {
      setTimeout(() => {
        setCheck(true);
      }, 2500);
    }
  });

  function validateHangVeArray() {
    for (let i = 0; i < dataTicket.soLuongVe; i++) {
      if (isGetHangVe[i] === null) {
        return false;
      }
    }
  }
  function validateNameArray() {
    for (let i = 0; i < dataTicket.soLuongVe; i++) {
      if (
        isGetName[i] === undefined ||
        isGetName[i] === "" ||
        isGetName[i].trimStart().length < 2
      ) {
        return false;
      }
    }
  }
  function validatePhoneArray() {
    for (let i = 0; i < dataTicket.soLuongVe; i++) {
      if (
        isGetPhone[i] === undefined ||
        isGetPhone[i] === "" ||
        isGetPhone[i].trim().length !== 10 ||
        !/^\d{10}$/.test(isGetPhone[i])
      ) {
        return false;
      }
    }
  }

  const handleCheck = () => {
    if (
      validateNameArray() === false ||
      validatePhoneArray() === false ||
      validateHangVeArray() === false
    ) {
      setCheck(false);
    } else {
    }
  };

  //! Name
  const handlGetInputName = (name, index) => {
    setGetName((prev) => {
      const updated = [...prev];
      updated[index] = name;
      return updated;
    });
  };

  //! Phone
  const handlGetInputPhone = (phone, index) => {
    setGetPhone((prev) => {
      const updated = [...prev];
      updated[index] = phone;
      return updated;
    });
  };

  //! Số ký
  const handlGetSoKy = (soKy, index) => {
    setGetSoky((prev) => {
      const updated = [...prev];
      updated[index] = soKy;
      return updated;
    });
  };

  //! Hạng vé
  const handlGetHangVe = (hangVe, index) => {
    setGetHangVe((prev) => {
      const updated = [...prev];
      updated[index] = hangVe;
      return updated;
    });
  };

  //! Giá vé
  const handlGetGia = (type, index) => {
    if (type === "Vé thường") {
      setGiaVe((prev) => {
        const gia = [...prev];
        gia[index] = dataFlight.giaVeGoc;
        return gia;
      });
    }
    if (type === "Vé thương gia") {
      setGiaVe((prev) => {
        const gia = [...prev];
        gia[index] = Number((dataFlight.giaVeGoc * 1.3).toFixed(3));
        return gia;
      });
    }
  };

  //! Tạo Oder and Ticket
  const handlCreateTicket = async () => {
    try {
      const dhCreate = await fetch("http://localhost:4004/api/add_donhang", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: dataUser._id,
          soLuongVe: dataTicket.soLuongVe,
          tongGia: 0,
        }),
      });

      const dhJS = await dhCreate.json();

      const dhId = dhJS._id;

      await handleResTicket(dhId);
    } catch (error) {
      console.error("Bug when creating order:", error);
    }
  };

  const handleResTicket = async (dhId) => {
    const promises = [];
    for (let i = 0; i < dataTicket.soLuongVe; i++) {
      promises.push(
        fetch("http://localhost:4003/api/add_ticket", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Ten: isGetName[i],
            phoneNumber: isGetPhone[i],
            soKyHanhLy: isGetSoKy[i],
            hangVe: isGetHangVe[i],
            giaVe: isGiaVe[i],
            maDon: dhId,
            chuyenBayId: dataFlight._id,
            trangThaiVe: dataTicket.trangThaiVe,
          }),
        })
      );
    }
    try {
      const res = await Promise.all(promises);
      for (const response of res) {
        if (!response.ok) {
          const data = await response.json();
          if (data.error) {
            throw new Error(data.error);
          } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
        }
      }
      const data = await Promise.all(res.map((res) => res.json()));
      console.log(data);
    } catch (error) {
      console.error("Bug when creating tickets:", error);
    }
  };

  return (
    <>
      <Header />
      {isShowWarm && (
        <FCActiveThanhToan
          handlCreateTicket={handlCreateTicket}
          handleWarm={handleWarm}
        />
      )}

      <div className="w-[80%] h-fit lg:grid-cols-[30%_auto] grid py-10 lg:gap-x-3 m-auto">
        <div className="w-full lg:w-[30%] grid grid-cols-1 h-fit md:grid-cols-2 lg:grid-cols-1 gap-2 lg:mt-14">
          {Array.from({ length: dataTicket.soLuongVe }, (_, index) => (
            <InfoTicket
              key={index}
              dataFlight={dataFlight}
              dataTicket={dataTicket}
            />
          ))}
        </div>

        <div className="w-full">
          <div className="flex items-center gap-x-2">
            <h3 className="text-2xl font-bold mt-[12px] mb-[12px]">
              Thông tin đặt chỗ của tôi
            </h3>
            <div className="relative">
              <div className="cursor-pointer icon-hover-trigger">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#0194F3"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
              </div>
              <div className="absolute left-1/2 transform text-wrap -translate-x-1/2 bottom-full mb-2 w-[300px] p-2 text-sm text-white bg-gray-700 rounded transition-opacity duration-300 opacity-0 hover-note">
                <p>
                  - Thông tin của bạn được lấy từ thông tin tài khoản của bạn.{" "}
                  <br /> - Nếu bạn muốn thay đổi thông tin xin mời{" "}
                  <span className="text-[#0194F3] whitespace-nowrap font-semibold flex items-center">
                    nhấn phía dưới
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m15 15-6 6m0 0-6-6m6 6V9a6 6 0 0 1 12 0v3"
                      />
                    </svg>
                  </span>
                </p>

                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-8px] w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-700"></div>
              </div>
            </div>

            <style jsx>{`
              .icon-hover-trigger:hover + .hover-note {
                opacity: 1;
              }
            `}</style>
          </div>
          {/* //! Tài khoản */}
          <Link
            to="/Setting/InfoAccount"
            className="relative bg-white rounded-md p-6 flex shadow-lg w-full"
          >
            <div className="flex">
              <div className="w-10 h-10 rounded-[100%] bg-blue-500">
                <img
                  className="p-[8px]"
                  src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/1/10e771009e605099270565bf161c5ac4.svg"
                  alt=""
                />
              </div>
              <div className=" mt-[-5px] ml-4">
                <h3 className="font-bold">{dataUser.fullName}</h3>
                <h2 className="font-medium text-sm text-gray-500">
                  Tài khoản cá nhân
                </h2>
              </div>
            </div>
            <div className="absolute right-0 top-[-20px] p-2">
              <image
                className="w-[110px] h-[110px]"
                src="https://ik.imagekit.io/tvlk/image/imageResource/2018/07/27/1532667628823-8d3fb51a3735f35d48dfcd223d2f8bde.svg?tr=q-75,w-170"
                alt="Sample Image"
              />
            </div>
          </Link>

          <div className="text-xl font-bold mt-[40px]">
            {/* //! Thông tin liên hệ và note*/}
            <h3>Thông tin liên hệ</h3>
            <div className="mt-[16px]  bg-white shadow-lg rounded-md">
              <div className="pl-[16px] pr[16px] flex h-[52px] p-4 shadow-sm">
                <h3 className="text-base w-[570px]">
                  Thông tin liên hệ (nhận vé/phiếu thanh toán)
                </h3>
              </div>
              <div className="p-4">
                <div className="w-full m-0 flex flex-col md:flex-row">
                  <div className="w-[50%] mb-[16px] pr-[12px]">
                    <div className="flex flex-col">
                      <div className="flex">
                        <h3 className=" font-medium text-sm text-gray-500">
                          Họ và tên
                        </h3>
                      </div>

                      {/*//! Name */}
                      <div className="mt-2">
                        <input
                          className="border border-gray-300 h-[40px] w-full rounded-md px-2 font-normal"
                          type="text"
                          value={dataUser.fullName}
                        />
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
                      </div>

                      {/* //! Number phone */}
                      <div className="mt-2">
                        <input
                          type="tel"
                          className=" w-full border border-gray-300 rounded-md px-2 font-normal"
                          value={dataUser.numberPhone}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex-col p-4 shadow-sm bg-yellow-100">
            <div className="mt-[-5px]">
              <h3 className="text-xs font-medium text-red-500">
                Vui lòng chú ý cho những điều sau đây :
              </h3>
            </div>
            <h3 className="text-base font-medium">
              Tránh nhầm lẫn khi nhập tên, vì bạn có thể không sửa được sau khi
              đặt chỗ. Nhấn vào bên dưới để xem hướng dẫn.
            </h3>
            <h3 className="text-blue-500 font-bold text-base cursor-pointer ">
              Xem hướng dẫn nhập tên
            </h3>
          </div>
          <h3 className="text-xl font-bold mt-[40px]">Thông tin hành khách</h3>

          {Array.from({ length: dataTicket.soLuongVe }, (_, index) => (
            <div key={index}>
              <ThongTinHanhKhach
                index={index}
                dataFlight={dataFlight}
                handlGetInputName={handlGetInputName}
                handlGetInputPhone={handlGetInputPhone}
                handlGetSoKy={handlGetSoKy}
                handlGetHangVe={handlGetHangVe}
                handlGetGia={handlGetGia}
              />
            </div>
          ))}
          <div className="fixed h-fit top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full">
            {!isCheck && <NotiFailEventlogin content={CHUA_DIEN_THONGTIN_VE} />}
          </div>

          <button
            type="button"
            onClick={() => setShowWarm(true)}
            className="p-3 bg-[#0194F3] text-white mt-3 float-right font-semibold rounded-lg"
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </>
  );
}
export default DatChoCuaToi;

function InfoTicket({ dataFlight, dataTicket }) {
  return (
    <div className="w-[300px] flex-col bg-white md:mb-2 rounded-md shadow-lg h-fit">
      <div className="p-4 flex gap-3 shadow-sm">
        <img
          className="h-[30px] w-[30px] mt-1"
          src="https://vemaybaytiachop.com/wp-content/uploads/2022/10/2.png"
          alt=""
        />
        <div className="gap-3 flex items-center font-bold from-neutral-800 text-[17px]">
          <span>{dataFlight.diemDi}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
          <span>{dataFlight.diemDen}</span>
        </div>
      </div>
      <div className="p-4 flex-col shadow-sm">
        <div className="mt-[-5px] mb-5">
          <h4 className="text-base font-semibold text-[#0194F3]">
            Chuyến bay đi • {dataFlight.timeDi} {" - "}
            {dataFlight.dateDi}
          </h4>
        </div>
        <div className="flex gap-5 items-center">
          <div className="flex flex-col justify-center text-sm font-medium text-gray-500 items-center">
            <h4 className="">{dataFlight.dateDi}</h4>
            <h4 className="font-medium text-black/80 text-base">
              {dataFlight.timeDi}
            </h4>
            <h4 className="">{dataFlight.diemDi}</h4>
          </div>
          <div className="flex flex-col ml-2 items-center">
            <div className="flex mt-1 items-center">
              <div className="border border-gray-300 rounded-[100%] w-[9px] h-[9px]"></div>
              <div className="border border-gray-300 w-[50px] h-[1px]"></div>
              <div className="border border-gray-300 rounded-[100%] w-[9px] h-[9px] bg-gray-400"></div>
            </div>
            <h4 className="text-xs font-medium text-gray-500 ml-[-5px] mt-[3px]">
              Bay thẳng
            </h4>
          </div>
          <div className="flex flex-col justify-center text-sm font-medium text-gray-500 items-center">
            <h4 className="">{dataFlight.dateDen}</h4>
            <h4 className="font-medium text-black/80 text-base">
              {dataFlight.timeDen}
            </h4>
            <h4 className="">{dataFlight.diemDen}</h4>
          </div>
        </div>
      </div>
      <div className="p-4 flex-col rounded-b-md">
        {/* <div className="flex gap-2">
          <img
            src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/0/0451207408e414bb8a1664153973b3c8.svg"
            alt=""
            className="h-[14px] w-[14px] mt-1"
          />
          <h4 className="text-sm text-gray-500 font-medium">
            Hạng vé: {dataTicket.hangVe}
          </h4>
        </div> */}
        <div className="flex gap-2 mt-2">
          <img
            src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/0/0451207408e414bb8a1664153973b3c8.svg"
            alt=""
            className="h-[14px] w-[14px] mt-1"
          />
          <h4 className="text-sm text-gray-500 font-medium">
            Số ký tối thiểu của hành lý: {dataFlight.khoiLuongQuyDinhTrenMotVe}{" "}
            Kg
          </h4>
        </div>
        {/* <div className="flex gap-2 mt-2">
          <img
            src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/0/0451207408e414bb8a1664153973b3c8.svg"
            alt=""
            className="h-[14px] w-[14px] mt-1"
          />
          <h4 className="text-sm text-gray-500 font-medium">
            Giá vé: {dataTicket.giaVe} VND
          </h4>
        </div> */}
        <div className="flex gap-2 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ffcc00"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>

          <h4 className="text-sm text-[#ffcc00] font-medium">
            {dataTicket.trangThaiVe}
          </h4>
        </div>
      </div>
    </div>
  );
}

function ThongTinHanhKhach({
  index,
  dataFlight,
  handlGetInputName,
  handlGetInputPhone,
  handlGetSoKy,
  handlGetHangVe,
  handlGetGia,
}) {
  const [fullName, setFullName] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [checkFullName, checkSetFullName] = useState();
  const [checkNumberPhone, checkSetNumberPhone] = useState();

  useEffect(() => {
    checkSetFullName(fullName.trimStart().length < 2 ? false : true);
    handlGetInputName(fullName, index);
  }, [fullName]);

  useEffect(() => {
    checkSetNumberPhone(
      numberPhone.trim().length !== 10 || !/^\d{10}$/.test(numberPhone)
        ? false
        : true
    );
    handlGetInputPhone(numberPhone, index);
  }, [numberPhone]);

  const handlSetName = (e) => {
    setFullName(e.target.value);
  };
  const handlSetPhone = (e) => {
    setNumberPhone(e.target.value);
  };

  return (
    <div className="text-xl font-bold mb-3">
      <div className="mt-[16px]  bg-white shadow-lg rounded-md">
        <div className="pl-[16px] pr[16px] flex h-[52px] p-4 shadow-sm">
          <h3 className="text-base w-[570px]">Thông tin vé {index + 1}</h3>
          {/* <h3 className=" cursor-pointer text-base text-blue-500">Lưu</h3> */}
        </div>
        <div className="w-full m-0 flex p-4 flex-col md:flex-row">
          <div className="w-[50%] mb-[16px] pr-[12px]">
            <div className="flex flex-col">
              <div className="flex">
                <h3 className=" font-mediumd text-sm text-gray-500">
                  Họ Tên (vd: Nguyen Anh)
                </h3>{" "}
                <span className="text-red-500 text-sm">*</span>
              </div>
              <div className="mt-2">
                <input
                  defaultValue={fullName}
                  className={`border h-[40px] font-semibold text-[17px] focus:border-[#0194F34F] focus:outline-0 w-full rounded-md px-2 ${!checkFullName ? "border-[#F45A5A]" : "border-gray-300"}`}
                  type="text"
                  onChange={handlSetName}
                />
                <span className="text-red-600 font-medium text-sm ">
                  {checkFullName ? "" : "Họ Tên là phần bắt buộc"}
                </span>
              </div>
            </div>
          </div>
          <div className="w-[50%] mb-[16px] md:pl-[12px]">
            <div className="flex flex-col">
              <div className="flex">
                <h3 className=" font-medium text-sm text-gray-500">
                  Số điện thoại (vd: 0987654321)
                </h3>{" "}
                <span className="text-red-500 text-sm">*</span>
              </div>
              <div className="mt-2">
                <input
                  defaultValue={numberPhone}
                  className={`border h-[40px] font-semibold text-[17px] focus:border-[#0194F34F] focus:outline-0 w-full rounded-md px-2 ${!checkFullName ? "border-[#F45A5A]" : "border-gray-300"}`}
                  type="text"
                  onChange={handlSetPhone}
                />
                <span className="text-red-600 font-medium text-sm ">
                  {checkNumberPhone
                    ? ""
                    : "Số điện thoại là phần bắt buộc (10 số)"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full m-0 flex p-4 flex-col md:flex-row justify-between">
          <FCChooseHangVe
            dataFlight={dataFlight}
            index={index}
            handlGetHangVe={handlGetHangVe}
            handlGetGia={handlGetGia}
          />
          <FCInputSoKy
            dataFlight={dataFlight}
            index={index}
            handlGetSoKy={handlGetSoKy}
          />
        </div>
      </div>
    </div>
  );
}

function FCChooseHangVe({ dataFlight, index, handlGetHangVe, handlGetGia }) {
  const [isClicked, setIsClicked] = useState(null);

  useEffect(() => {}, [isClicked]);
  const handleButtonClick = (type) => {
    if (type === "Vé thường") {
      handlGetHangVe(type, index);
      handlGetGia(type, index, isClicked);
      setIsClicked(true);
    }
    if (type === "Vé thương gia") {
      handlGetHangVe(type, index);
      handlGetGia(type, index, isClicked);
      setIsClicked(false);
    }
  };
  return (
    <div className="shadow-md flex flex-col p-3 w-[48%] text-xl rounded-2xl font-bold bg-white items-start">
      <div className="flex gap-2 items-center">
        <span className="text-lg font-semibold select-none pointer-events-none">
          Chọn hạng vé
        </span>
        <div className="relative">
          <div className="cursor-pointer icon-hover-trigger">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#0194F3"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          </div>
          <div className="absolute left-1/2 transform text-wrap -translate-x-1/2 bottom-full mb-2 w-[300px] p-2 text-sm text-white bg-gray-700 rounded transition-opacity duration-300 opacity-0 hover-note">
            Có 2 loại vé: <br /> - Vé thường <br /> - Vé thương gia = Vé thường
            * 13%
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-8px] w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-700"></div>
          </div>
        </div>

        <style jsx>{`
          .icon-hover-trigger:hover + .hover-note {
            opacity: 1;
          }
        `}</style>
      </div>
      <div className="flex flex-col gap-3 w-full mt-[2%] justify-evenly">
        {/*//! Ticket Normal */}

        <button
          className={`border-2 rounded-lg h-fit flex justify-center gap-x-4 w-full p-2 hover:border-[#0194F3] ${isClicked === true ? "border-[#0194F3]" : ""}`}
          onClick={() => handleButtonClick("Vé thường")}
        >
          <img
            className="bg-cover w-16 h-14"
            src="https://ik.imagekit.io/tvlk/image/imageResource/2022/12/20/1671519148670-d3ca3132946e435bd467ccc096730670.png"
          />
          <div className="flex flex-col">
            <span className="text-base font-bold">Vé thường</span>
            <span className="text-lg font-semibold text-[#FF5E1F]">
              {dataFlight.giaVeGoc}
              <span className="text-sm font-semibold text-[#a0a0a0]">
                / khách
              </span>
            </span>
          </div>
        </button>

        {/*//! Ticket Rich */}
        <button
          type="button"
          className={`border-2 rounded-lg h-fit flex gap-x-4 w-full justify-center p-2 hover:border-[#0194F3] ${isClicked === false ? "border-[#0194F3]" : ""}`}
          onClick={() => handleButtonClick("Vé thương gia")}
        >
          <img
            className="bg-cover w-16 h-14"
            src="https://ik.imagekit.io/tvlk/image/imageResource/2022/12/23/1671789427394-4441a4e3f0b96ea01dccf4a620bad996.png"
          />
          <div className="flex flex-col">
            <span className="text-base font-bold whitespace-nowrap">
              Vé thương gia
            </span>
            <span className="text-lg font-semibold text-[#FF5E1F]">
              {(dataFlight.giaVeGoc * 1.3).toFixed(3)}
              <span className="text-sm font-semibold text-[#a0a0a0]">
                /khách
              </span>
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
function FCInputSoKy({ index, handlGetSoKy, dataFlight }) {
  const [soKy, setSoKy] = useState();
  const [checkSoKy, checkSetSoKy] = useState(false);

  useEffect(() => {
    checkSetSoKy(
      Number(soKy) > dataFlight.khoiLuongQuyDinhTrenMotVe ? false : true
    );
    handlGetSoKy(soKy, index);
  }, [soKy]);

  const handleSetSoKy = (e) => {
    setSoKy(e.target.value);
  };
  return (
    <div className="shadow-md mb-3 flex flex-col h-fit w-[47%] p-5 rounded-2xl font-bold bg-white items-start">
      <div className="flex gap-2 items-center ">
        <span className="text-lg font-semibold select-none pointer-events-none">
          Nhập số ký hành lý của bạn
        </span>

        <div className="relative">
          <div className="cursor-pointer icon-hover-trigger">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#0194F3"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          </div>
          <div className="absolute left-1/2 transform text-wrap -translate-x-1/2 bottom-full mb-2 w-[300px] p-2 text-sm text-white bg-gray-700 rounded transition-opacity duration-300 opacity-0 hover-note">
            {/* Nếu bạn không nhập số ký của hành lý nghĩa là bạn không mang theo
            hành lý. Ngược lại có thể nhập số ký tối đa của chuyến bay.{" "} */}
            <span className="text-[#0194F3]">
              Số ký chuyến bay này là {dataFlight.khoiLuongQuyDinhTrenMotVe} kg.
            </span>
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-8px] w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-700"></div>
          </div>
        </div>

        <style jsx>{`
          .icon-hover-trigger:hover + .hover-note {
            opacity: 1;
          }
        `}</style>
      </div>
      {!checkSoKy && (
        <span className="text-rose-600 text-sm ml-4">
          * Số ký vượt quá quy định
        </span>
      )}
      <div className="flex gap-x-2 w-full items-center justify-start mt-[2%]">
        <input
          value={soKy}
          onChange={handleSetSoKy}
          type="number"
          className="w-10 text-xl flex shadow-2xl shadow-blue-500/50 items-center justify-center focus:border-0 focus:outline-0 rounded-md border-0 border-neutral-900/50 border-b-2 p-2 font-medium hover:border-cyan-400"
        />{" "}
        <span
          className={`text-base ${checkSoKy ? "text-[#0194F3]" : "text-rose-600"}`}
        >
          KG
        </span>
      </div>
    </div>
  );
}

function FCActiveThanhToan({ handlCreateTicket, handleWarm }) {
  return (
    <div className="w-screen h-screen z-50 fixed p-2">
      <p className="w-[40%] top-[40%] left-[50%] transform select-none text-white -translate-x-1/2 -translate-y-1/2 absolute bg-[#0194F3] h-fit p-5 rounded-lg text-lg font-semibold">
        Sau khi xác nhận bạn{" "}
        <span className="text-[#ffcc00] text-lg font-bold">
          không thể chỉnh sửa
        </span>{" "}
        lại thông tin vé. Vui lòng chắn chắc trước quyết định đến trang thanh
        toán vé của bạn!
        <button
          type="button"
          onClick={handlCreateTicket}
          className="bg-white rounded-lg p-2 float-right mt-5 text-[#0194F3]"
        >
          Tiếp tục
        </button>
        <button
          type="button"
          onClick={handleWarm}
          className="bg-white rounded-lg p-2 float-right mt-5 mr-8 text-[#0194F3]"
        >
          Hủy
        </button>
      </p>
    </div>
  );
}
