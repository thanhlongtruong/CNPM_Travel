import React, { useEffect, useState } from "react";
import "../../src/TrangThanhToan.css";
import Header from "./Header";
import Footer from "./Footer";

function TrangThanhToan() {
  const [timeLeft, setTimeLeft] = useState(3600);
  const [selectedMethod, setSelectedMethod] = useState(null);
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${secs < 10 ? "0" + secs : secs}`;
  };

  let [on, setOn] = useState([false, false]);
  let handleForm = (index) => {
    setOn((Oldon) => {
      const newOn = [...Oldon];
      newOn[index] = !on[index];
      for (var i = 0; i < newOn.length; i++) {
        if (i !== index) {
          newOn[i] = false;
        }
      }
      setSelectedMethod(newOn[index] ? index : null);
      return newOn;
    });
  };
  return (
    <>
      <Header />
      <div className="bg-gray-100 w-full">
        <div className="pt-[50px] pb-[50px] bg-gray-100 flex justify-center">
          <div className="flex w-[70%] max-w-screen-xl gap-7">
            <div className="lg:w-[70%]">
              <div className="w-full bg-blue-600 p-5 justify-center text-center font-medium text-white rounded-t-xl">
                Đừng lo lắng, giá vẫn giữ nguyên. Hoàn tất thanh toán của bạn
                bằng{" "}
                <span className="ml text-green-400 font-medium px-2 py-1 rounded">
                  {formatTime(timeLeft)}
                </span>
              </div>
              <div className="pt-[24px] pb-[24px] bg-white rounded-b-xl">
                <div className="p-4 flex gap-x-[224px]">
                  <h1 className="font-bold text-2xl">
                    Bạn muốn thanh toán thế nào ?
                  </h1>
                  <img
                    className="h-[23px]"
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2023/12/12/1702364449716-d0093df3166e4ba84c56ad9dd75afcda.webp?tr=h-23,q-75"
                    alt=""
                  />
                </div>
                <div
                  className={`vietqr ${on[0] ? "active" : ""}`}
                  onClick={() => handleForm(0)}
                >
                  <div className="vietqr-head">
                    <div className={`buttonqr ${on[0] ? "active" : ""}`}></div>
                    <h1 className="font-medium">VietQR</h1>
                    <h1 className="text-green-900 bg-green-200 text-xs font-medium text-center p-1 rounded-md">
                      Ưu đãi giảm giá
                    </h1>
                    <img
                      className="imgqr"
                      src="https://ik.imagekit.io/tvlk/image/imageResource/2024/03/12/1710225192565-14c2ea75fea49e7275568da5178454f5.png?tr=h-24,q-75"
                      alt=""
                    />
                  </div>
                  <div className={`vietqr-foot ${on[0] ? "active" : ""}`}>
                    <div className={`noteqr ${on[0] ? "active" : ""}`}>
                      {on[0] && (
                        <ul className="note1 active">
                          <li>
                            - Đảm bảo bạn có ví điện tử hoặc ứng dụng ngân hàng
                            di động hỗ trợ thanh toán bằng VietQR.
                          </li>
                          <li>
                            - Mã QR sẽ xuất hiện sau khi bạn nhấp vào nút 'Thanh
                            toán'. Chỉ cần lưu hoặc chụp màn hình mã QR để hoàn
                            tất thanh toán của bạn trong thời hạn.
                          </li>
                          <li>
                            - Vui lòng sử dụng mã QR mới nhất được cung cấp để
                            hoàn tất thanh toán của bạn.
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={`mobilebanking ${on[1] ? "active" : ""}`}
                  onClick={() => handleForm(1)}
                >
                  <div className="mobilebanking-head">
                    <div
                      className={`buttonbanking ${on[1] ? "active" : ""}`}
                    ></div>
                    <h1 className="font-medium">Moblie banking</h1>
                    <h1 className="text-green-900 bg-green-200 text-xs font-medium text-center p-1 rounded-md">
                      New !
                    </h1>
                    <img
                      className="img-banking"
                      src="https://ik.imagekit.io/tvlk/image/imageResource/2024/04/16/1713261911837-190f3a0059d042d2929ca29e96d6b42a.png?tr=h-24,q-75"
                      alt=""
                    />
                  </div>
                  <div
                    className={`mobilebanking-foot ${on[1] ? "active" : ""}`}
                  >
                    <div className={`notebanking ${on[1] ? "active" : ""}`}>
                      {on[1] && (
                        <ul className="notesbanking active">
                          <li>
                            - Đảm bảo bạn đã cài đặt ứng dụng ngân hàng di động
                            trước khi tiếp tục
                          </li>
                          <li>
                            - Sau khi nhấn nút 'Thanh toán', bạn sẽ thấy danh
                            sách các nhà cung cấp ngân hàng. Bạn có thể thanh
                            toán bằng mã QR.
                          </li>
                          <li>
                            <img
                              src="https://ik.imagekit.io/tvlk/image/imageResource/2024/06/12/1718162857025-d7c82a040358506b29c5cbcb5032b15d.png?tr=h-75,q-75"
                              alt=""
                            />
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 mt-8 bg-white rounded-xl flex-col">
                <div className="flex gap-5">
                  <img
                    className="h-[24px] w-[24px]"
                    src="https://static.vecteezy.com/system/resources/previews/025/749/026/original/voucher-isolated-sign-symbol-icon-suitable-for-display-website-logo-and-designer-high-quality-black-style-icon-icon-design-free-vector.jpg"
                    alt=""
                  />
                  <h1 className="font-bold">Thêm mã giảm</h1>
                  <h1 className="ml-auto font-bold text-blue-500 cursor-pointer">
                    Thêm mã
                  </h1>
                </div>
                <h1 className="text-xs font-medium text-gray-400 justify-center items-center">
                  Enter coupon code or select available coupon(s)
                </h1>
              </div>
              <div className="p-4 mt-8 bg-white rounded-xl flex-col">
                <div className="flex">
                  <h1 className="font-medium text-xl">Tổng giá tiền</h1>
                  <h1 className="font-medium text-xl ml-auto">2.000.000 VND</h1>
                </div>
                <div className="flex bg-orange-500 p-3 rounded-md mt-4 items-center justify-center hover:bg-orange-800 cursor-pointer">
                  <h1 className="font-bold text-white text-xl">
                    {selectedMethod === 0
                      ? "Thanh toán bằng mã QR"
                      : selectedMethod === 1
                        ? "Thanh toán bằng Mobile banking"
                        : "Thanh toán"}
                  </h1>
                </div>
                <h1 className="font-medium text-xs mt-4 text-center">
                  Bằng cách tiếp tục thanh toán, bạn đã đồng ý Điều khoản & Điều
                  kiện và Chính sách quyền riêng tư.
                </h1>
              </div>
            </div>
            <div className="w-full lg:w-[30%]">
              <div className="w-full flex-col bg-white rounded-t-md rounded-b-md">
                <div className="p-4 flex shadow-sm bg-blue-300">
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
                <div className="p-4 flex-col shadow-sm">
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
                <div className="p-4 flex-col shadow-lg - rounded-b-md">
                  <h1 className="font-bold">Chi tiết về (các) hành khách</h1>
                  <div className="flex gap-2">
                    <img
                      className="h-[25px] w-[25px]"
                      src="https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg="
                      alt=""
                    />
                    <h1 className="text-sm text-gray-600 font-medium mt-[2px]">
                      Ông Nguyễn Văn A (Người lớn)
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default TrangThanhToan;
