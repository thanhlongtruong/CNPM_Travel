import { useState, useContext, useEffect, useRef, useCallback } from "react";
import { CONTEXT } from "../../Context/WindowLogin.js";
import Decimal from "decimal.js";
import ItemFlight from "./ItemFlight.js";

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

  const [isStateShowNotiGiaVe, setStateShowNotiGiaVe] = useState(true);
  const handleChange = () => {
    setStateShowNotiGiaVe(!isStateShowNotiGiaVe);
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
  }, [flight, quantityTicket]);

  const [isTongGia, setTongGia] = useState();
  //* TicketNormal

  //! func tính giá tiền
  const handleCalPrice = (pricea, soluong) => {
    const price = new Decimal(pricea).times(soluong);
    setTongGia(price.toNumber());
  };

  const handleTangQuantityTicket = () => {
    console.log(flight);
    if (quantityTicket < flight.soGheThuong + flight.soGheThuongGia) {
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

  if (!flight) {
    return <div>Loading...</div>;
  }
  return (
    <div className="fixed z-30 flex h-full w-full items-center justify-center bg-white/10 backdrop-brightness-75">
      <div
        onClick={handleChooseOpenHangVe}
        className="absolute z-20 w-full h-full"
      ></div>
      <div className="absolute z-20 m-auto h-fit w-[45%] rounded-lg bg-white p-4">
        <div className="flex flex-col w-full">
          <div className="flex gap-2 items-center">
            <p className="px-[2%] rounded-2xl text-2xl font-bold select-none">
              Chọn số vé cho chuyến bay
            </p>
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
                Có 2 loại vé: <br /> - Vé thường <br /> - Vé thương gia = Vé
                thường * 13% <br />
                <span className="font-semibold text-[#0194F3]">
                  Giá vé hiện tại được tính giá vé thường
                </span>
                <br />
                Quý khách có thể chọn hạng từng vé tại trang tiếp theo
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-8px] w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-700"></div>
              </div>
            </div>

            <style jsx>{`
              .icon-hover-trigger:hover + .hover-note {
                opacity: 1;
              }
            `}</style>
          </div>
          <p className="p-[2%] rounded-2xl text-base text-zinc-400 font-semibold select-none">
            Giá vé hiện tại đang được áp dụng giá vé thường <br />{" "}
            <span className="text-[#FF5E1F]">
              Số vé thường còn lại : {flight.soGheThuong}
            </span>{" "}
            <br />{" "}
            <span className="text-[#FF5E1F]">
              Số vé thương gia còn lại : {flight.soGheThuongGia}
            </span>
          </p>
        </div>

        <div className="h-fit bg-white rounded-2xl shadow-md mx-[2%]">
          <ItemFlight
            dateDi={flight.dateDi}
            dateDen={flight.dateDen}
            timeDi={flight.timeDi}
            diemDi={flight.diemDi}
            timeDen={flight.timeDen}
            diemDen={flight.diemDen}
            giaVe={flight.giaVeGoc}
          />
          <div className="flex justify-center items-center rounded-2xl bg-[#FF5E1F] float-right w-[30%] h-[45%] bottom-0">
            <button
              className={`text-3xl w-[30%] h-full flex rounded-2xl items-center ${quantityTicket <= 1 ? "bg-[#ffffff] text-[#FF5E1F]" : "bg-[#FF5E1F] text-white"}`}
              type="button"
              onClick={handleGiamQuantityTicket}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 m-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <input
              readOnly
              type="number"
              value={quantityTicket}
              className="bg-transparent bg-[#FF5E1F] text-white border-x-2 w-[34%] rounded-lg h-full text-center text-2xl select-none pointer-events-none"
            />
            <button
              className={`text-3xl w-[30%] h-full flex justify-center rounded-2xl items-center ${quantityTicket < flight.soGheThuong + flight.soGheThuongGia ? "bg-[#FF5E1F] text-white" : "bg-[#ffffff] text-[#FF5E1F]"}`}
              type="button"
              onClick={handleTangQuantityTicket}
            >
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
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="w-full h-fit bg-white p-2 flex justify-between mt-3 items-center">
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-[#a0a0a0]">
              Tổng cộng cho {quantityTicket} khách
            </span>
            <span className="text-2xl font-bold text-[#FF5E1F]">
              {/* {isTongGia} VND */}
            </span>
          </div>

          <button
            type="button"
            onClick={() =>
              !isStateShowNotiGiaVe &&
              handleMake_a_Reservation({
                quantityTicket,
                isTongGia,
                flight,
              })
            }
            className={` ${isStateShowNotiGiaVe ? "bg-gray-500" : "bg-[#FF5E1F]"} flex justify-center items-center font-bold text-white size-fit cursor-pointer p-3 rounded-lg`}
          >
            Tiến hành đặt
          </button>
        </div>
      </div>
      {isStateShowNotiGiaVe && (
        <div className="w-[40%] select-none absolute z-50 h-fit p-2 bg-white rounded-lg">
          <p className="font-semibold text-lg text-[#0194F3]">
            Giá vé đang được hiển thị là giá thuộc về vé thường. Trang này quý
            khách chỉ chọn số lượng và trang kế tiếp quý khách có thể chọn hạng
            vé cho từng vé mà quý khách chọn.{" "}
            <span className="text-[#FF5E1F]">
              Giá vé thương gia = vé thường * 13%
            </span>
          </p>
          <button
            type="button"
            className="p-2 m-auto bg-[#0194F3] text-white font-semibold rounded-xl"
            onClick={handleChange}
          >
            OK, hiểu rồi
          </button>
        </div>
      )}
    </div>
  );
}
