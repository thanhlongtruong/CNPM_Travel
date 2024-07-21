import React, { useState, useContext } from "react";
import Header from "../Header";
import { Link, useLocation } from "react-router-dom";

function DatChoCuaToi() {
  const dataTicketLocation = useLocation();
  const { dataTicket, dataFlight, dataUser } = dataTicketLocation.state;

  return (
    <>
      <Header />
      <div className="w-[80%] h-fit lg:grid-cols-[30%_auto] grid py-10 lg:gap-x-3 m-auto">
        <div className="w-full lg:w-[30%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2 lg:mt-14">
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
        </div>
      </div>
    </>
  );
}
export default DatChoCuaToi;

function InfoTicket({ dataFlight, dataTicket }) {
  return (
    <div className="w-[300px] flex-col bg-white md:mb-2 rounded-md">
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
      <div className="p-4 flex-col shadow-lg rounded-b-md">
        <div className="flex gap-2">
          <img
            src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/0/0451207408e414bb8a1664153973b3c8.svg"
            alt=""
            className="h-[14px] w-[14px] mt-1"
          />
          <h4 className="text-sm text-gray-500 font-medium">
            Hạng vé: {dataTicket.hangVe}
          </h4>
        </div>
        <div className="flex gap-2 mt-2">
          <img
            src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/0/0451207408e414bb8a1664153973b3c8.svg"
            alt=""
            className="h-[14px] w-[14px] mt-1"
          />
          <h4 className="text-sm text-gray-500 font-medium">
            Số ký hành lý: {dataTicket.soKyHanhLy} Kg
          </h4>
        </div>
        <div className="flex gap-2 mt-2">
          <img
            src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/0/0451207408e414bb8a1664153973b3c8.svg"
            alt=""
            className="h-[14px] w-[14px] mt-1"
          />
          <h4 className="text-sm text-gray-500 font-medium">
            Giá vé: {dataTicket.giaVe} VND
          </h4>
        </div>
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
