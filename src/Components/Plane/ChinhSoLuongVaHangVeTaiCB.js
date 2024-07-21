import { useState, useContext, useEffect } from "react";
import { CONTEXT } from "../../Context/WindowLogin.js";
import { Link } from "react-router-dom";
import Decimal from "decimal.js";
import ItemFlight from "./ItemFlight.js";

import { Login } from "../Home/FormCheck.js";

export default function ChinhSoLuongVaHangVeTaiCB() {
  const {
    handleChooseOpenHangVe,
    handleMake_a_Reservation,
    isShowInterfaceLogin,
    getId_Flight,
  } = useContext(CONTEXT);

  //Unscrollable screen
  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = "hidden";

    // Clean up by re-enabling scrolling when the component is unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isShowInterfaceLogin]);

  const [flight, setFlight] = useState();

  useEffect(() => {
    const getFlight = async () => {
      try {
        const res = await fetch(
          `http://localhost:4002/api/get/flight/${getId_Flight}`
        );

        if (!res.ok) {
          throw new Error(
            "Bug res when req id flight page ChinhSoLuongVaHangVeTaiCB"
          );
        }
        const flight = await res.json();
        setFlight(flight);
      } catch (err) {
        console.error(err.message);
      }
    };
    getFlight();
  }, []);

  //! state số ký
  const [isSoKyHanhLy, setSoKyHanhLy] = useState();
  const [isCheckSoKyHanhLy, setCheckSoKyHanhLy] = useState(true);
  useEffect(() => {
    if (flight) {
      setCheckSoKyHanhLy(
        Number(isSoKyHanhLy) <= flight.khoiLuongQuyDinhTrenMotVe ? true : false
      );
      setGiaTicketThuong(flight.giaVeGoc);
      setGiaTicketThuongGia(new Decimal(flight.giaVeGoc).times(1.3).toNumber());
    }
  }, [isSoKyHanhLy]);

  //! pick hạng vé
  const [statusChooseTicket, setStatusChooseTicket] = useState(true);
  //* Ticket thuong gia * 1.3

  const handleChooseTicketNormal = () => {
    setStatusChooseTicket(true);
    handleCalPrice(flight.giaVeGoc, quantityTicket);
  };

  const handleChooseTicketTG = () => {
    setStatusChooseTicket(false);
    handleCalPrice(flight.giaVeGoc, quantityTicket);
  };

  //! Số lượng vé
  const [quantityTicket, setQuantityTicket] = useState(1);
  const [isGiaTicketThuong, setGiaTicketThuong] = useState();
  const [isGiaTicketThuongGia, setGiaTicketThuongGia] = useState();

  useEffect(() => {
    if (flight) {
      setGiaTicketThuong(flight.giaVeGoc);
      setGiaTicketThuongGia(new Decimal(flight.giaVeGoc).times(1.3).toNumber());
      handleCalPrice(flight.giaVeGoc, quantityTicket);
    }
  }, [flight, statusChooseTicket, quantityTicket]);
  const [isTongGia, setTongGia] = useState();
  //* TicketNormal

  const handleTangQuantityTicket = () => {
    if (quantityTicket < flight.soLuongGhe) {
      setQuantityTicket(Number(quantityTicket) + 1);
      handleCalPrice(flight.giaVeGoc, quantityTicket);
    }
  };
  const handleGiamQuantityTicket = () => {
    if (quantityTicket > 1) {
      setQuantityTicket(Number(quantityTicket) - 1);
      handleCalPrice(flight.giaVeGoc, quantityTicket);
    }
  };

  //! func tính giá tiền
  const handleCalPrice = (pricea, soluong) => {
    if (statusChooseTicket) {
      const price = new Decimal(pricea).times(soluong);
      setTongGia(price.toNumber());
    }
    if (!statusChooseTicket) {
      const price = new Decimal(pricea).times(soluong);
      const addPrice = new Decimal(price).times(1.3);
      setTongGia(addPrice.toNumber());
    }
  };
  console.log("component cha");
  // đã thanh toán, chưa thanh toán, đã hoàn, chưa hoàn, hủy
  // const addTicket = async () => {
  //   const ticket = {
  //     soLuongVe: quantityTicket,
  //     soKyHanhLy: isSoKyHanhLy,
  //     hangVe: statusChooseTicket ? "Hạng thường" : "Hạng thương gia",
  //     trangThaiVe: "Đang chờ thanh toán",
  //     userID: isUSer._id,
  //     chuyenBayId: flight._id,
  //   };
  //   try {
  //     const res = await fetch("http://localhost:4003/api/add_ticket", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         soLuongVe: ticket.soLuongVe,
  //         soKyHanhLy: ticket.isSoKyHanhLy,
  //         hangVe: ticket.statusChooseTicket,
  //         trangThaiVe: ticket.trangThaiVe,
  //         userID: ticket.userID,
  //         chuyenBayId: ticket.chuyenBayId,
  //       }),
  //     });
  //     if (!res.ok) {
  //       throw new Error("Bug when create ticket");
  //     }
  //     const data = await res.json();
  //     setTicket(data);
  //   } catch (error) {
  //     console.error("Bug when create ticket");
  //   }
  // };
  // const hadleSaveTicketTamp = () => {
  //   if (isUSer && flight) {
  //     setTicket({
  //       soLuongVe: quantityTicket,
  //       soKyHanhLy: isSoKyHanhLy,
  //       hangVe: statusChooseTicket ? "Hạng thường" : "Hạng thương gia",
  //       trangThaiVe: "Đang chờ thanh toán",
  //       userID: isUSer._id,
  //       chuyenBayId: flight._id,
  //     });
  //   }
  // };
  if (!flight) {
    return <div>Loading...</div>;
  }
  return (
    <div className="fixed top-0 z-[25] w-full h-full">
      <div
        onClick={handleChooseOpenHangVe}
        className="absolute z-[25] w-full h-full bg-black/50"
      ></div>
      {isShowInterfaceLogin && <Login />}

      <div className="flex flex-col w-[55%] h-full bg-white absolute z-30 right-0 top-0 justify-start">
        <div className="flex flex-row p-[2%] mb-[2%] pointer-events-none select-none rounded-tl-2xl text-2xl font-bold bg-white items-center">
          Chuyến đi của bạn
        </div>
        <div className="block h-[150px] bg-white overflow-hidden relative rounded-2xl shadow-md mx-[2%]">
          <ItemFlight
            dateDi={flight.dateDi}
            dateDen={flight.dateDen}
            timeDi={flight.timeDi}
            diemDi={flight.diemDi}
            timeDen={flight.timeDen}
            diemDen={flight.diemDen}
            giaVe={flight.giaVeGoc}
          />
          <div className="absolute flex justify-center items-center bottom-0 right-0 w-[30%] h-[40%] bg-[#FF5E1F] rounded-tl-2xl">
            <div className="flex items-center justify-evenly h-full text-center text-2xl text-white">
              <button
                className="text-3xl w-[33%] h-full flex justify-center items-center"
                type="button"
                onClick={handleGiamQuantityTicket}
              >
                -
              </button>
              <input
                readOnly
                type="number"
                value={quantityTicket}
                className="bg-transparent border-x-2 w-[34%] h-full text-center text-2xl text-white select-none pointer-events-none"
              />
              <button
                className="text-3xl w-[33%] h-full flex justify-center items-center"
                type="button"
                onClick={handleTangQuantityTicket}
              >
                +
              </button>
            </div>
          </div>
        </div>
        {/* //! */}
        <FCChooseHangVe
          handleChooseTicketNormal={handleChooseTicketNormal}
          isGiaTicketThuong={isGiaTicketThuong}
          handleChooseTicketTG={handleChooseTicketTG}
          isGiaTicketThuongGia={isGiaTicketThuongGia}
          statusChooseTicket={statusChooseTicket}
        />

        <div className="shadow-md  flex flex-col p-[2%] rounded-2xl mx-[2%] font-bold bg-white items-start">
          <div className="flex gap-2 items-center ">
            <span className="select-none pointer-events-none text-lg">
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
                Nếu bạn không nhập số ký của hành lý nghĩa là bạn không mang
                theo hành lý. Ngược lại phải nhập dưới số ký tối đa của chuyến
                bay.{" "}
                <span className="text-[#0194F3]">
                  Số ký chuyến bay này là {flight.khoiLuongQuyDinhTrenMotVe} kg.
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
          {!isCheckSoKyHanhLy && (
            <span className="text-rose-600 ml-4">
              * Số ký phải nhỏ số ký quy định của chuyến bay
            </span>
          )}
          <div className="flex w-full items-center justify-start mt-[2%]">
            <input
              onChange={(e) => setSoKyHanhLy(e.target.value)}
              value={isSoKyHanhLy}
              type="number"
              className="w-[7%] text-xl flex shadow-2xl shadow-blue-500/50 items-center justify-center focus:border-0 focus:outline-0 rounded-md border-0 border-neutral-900/50 border-b-2 p-2 font-medium hover:border-cyan-400"
            />{" "}
            <span className="text-base text-slate-500">KG</span>
          </div>
        </div>
        <div className="fixed z-30 bottom-0 w-full bg-white p-[1%] flex items-center">
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-[#a0a0a0]">
              Tổng cộng cho 1 khách
            </span>
            <span className="text-2xl font-bold text-[#FF5E1F]">
              {isTongGia} VND
            </span>
          </div>

          <button
            type="button"
            onClick={() =>
              handleMake_a_Reservation({
                quantityTicket,
                isSoKyHanhLy,
                isTongGia,
                statusChooseTicket,
                flight,
              })
            }
            className="fixed right-[2%] bg-[#FF5E1F] flex justify-center items-center font-bold text-white size-fit cursor-pointer p-[1%] rounded-lg"
          >
            Tiến hành đặt
          </button>
        </div>
      </div>
    </div>
  );
}
function FCChooseHangVe({
  handleChooseTicketNormal,
  isGiaTicketThuong,
  handleChooseTicketTG,
  isGiaTicketThuongGia,
  statusChooseTicket,
}) {
  console.log("component con");
  return (
    <div className="shadow-md flex flex-col p-[2%] text-xl rounded-2xl m-[2%] font-bold bg-white items-start">
      <div className="flex gap-2 items-center">
        <span className="text-lg select-none pointer-events-none">
          Chọn loại vé của bạn
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
      <div className="flex w-full mt-[2%] justify-evenly">
        {/*//! Ticket Normal */}

        <div
          className={`border-2 rounded-lg h-[70px] flex flex-col w-[33%] p-[1%] hover:border-[#0194F3] ${statusChooseTicket ? "border-[#0194F3]" : ""}`}
          onClick={handleChooseTicketNormal}
        >
          <div className="flex w-full justify-evenly">
            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2022/12/20/1671519148670-d3ca3132946e435bd467ccc096730670.png?tr=h-48,q-75,w-48" />
            <div className="flex flex-col">
              <span className="text-lg">Thường</span>
              <span className="text-lg font-semibold text-[#FF5E1F]">
                {isGiaTicketThuong}
                <span className="text-sm font-semibold text-[#a0a0a0]">
                  / khách
                </span>
              </span>
            </div>
          </div>
        </div>

        {/*//! Ticket Rich */}
        <button
          type="button"
          className={`border-2 rounded-lg h-[70px] flex flex-col w-[33%] p-[1%] hover:border-[#0194F3] ${!statusChooseTicket ? "border-[#0194F3]" : ""}`}
          onClick={handleChooseTicketTG}
        >
          <div className="flex w-full justify-evenly">
            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2022/12/23/1671789427394-4441a4e3f0b96ea01dccf4a620bad996.png?tr=h-48,q-75,w-48" />
            <div className="flex flex-col">
              <span className="text-lg">Thương gia</span>
              <span className="text-lg font-semibold text-[#FF5E1F]">
                {isGiaTicketThuongGia}
                <span className="text-sm font-semibold text-[#a0a0a0]">
                  /khách
                </span>
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
