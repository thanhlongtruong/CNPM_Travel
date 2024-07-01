import { useRef, useState, useContext, useEffect } from "react";
import { CONTEXT } from "../Context/WindowLogin.js";
import { formatCurrency } from "./XemDanhSachChuyenBay.js";
import { Link } from "react-router-dom";

export default function ChinhSoLuongVaHangVeTaiCB() {
  const { isChonMuaClick, handleChonMuaClick, clonedBlock } =
    useContext(CONTEXT);

  //Unscrollable screen
  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = "hidden";

    // Clean up by re-enabling scrolling when the component is unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed top-0 z-[25] w-full h-full">
      <div
        onClick={handleChonMuaClick}
        className="absolute z-[25] w-full h-full bg-black/50"
      ></div>
      <div className="flex flex-col w-[55%] h-full bg-[#EDF9FF] absolute z-30 right-0 top-0 justify-start">
        <div className="flex flex-row p-[2%] rounded-tl-2xl text-2xl font-bold bg-white items-center">
          Chuyến đi của bạn
        </div>
        <div className="block overflow-hidden relative rounded-2xl shadow-md m-[2%]">
          {cloneCodeFunction(clonedBlock, clonedBlock.outerHTML)}
          <div className="absolute flex justify-center items-center bottom-0 right-0 inline-block w-[33%] h-[50%] bg-[#FF5E1F] rounded-tl-2xl">
            <div class="flex items-center justify-evenly h-full text-center text-2xl text-white">
              <div className="text-3xl w-[33%] h-full flex justify-center items-center cursor-pointer">
                +
              </div>
              <input
                type="number"
                defaultValue="1"
                className="bg-transparent border-x-2 w-[34%] h-full text-center text-2xl text-white focus:outline-none hover:"
              />
              <div className="text-3xl w-[33%] h-full flex justify-center items-center cursor-pointer">
                -
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-[2%] text-2xl font-bold bg-white items-start">
          <span>Chọn loại vé của bạn</span>
          <div className="flex w-full mt-[2%] justify-evenly">
            <div className="border-2 rounded-lg flex flex-col w-[33%] p-[1%] cursor-pointer hover:border-[#0194F3]">
              <div className="flex w-full justify-evenly">
                <img src="https://ik.imagekit.io/tvlk/image/imageResource/2022/12/20/1671519148670-d3ca3132946e435bd467ccc096730670.png?tr=h-48,q-75,w-48" />
                <div className="flex flex-col">
                  <span className="text-lg">Thường</span>
                  <span className="text-lg font-semibold text-[#FF5E1F]">
                    {formatCurrency(6666760)}
                    <span className="text-sm font-semibold text-[#a0a0a0]">
                      /khách
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="border-2 rounded-lg flex flex-col w-[33%] p-[1%] cursor-pointer hover:border-[#0194F3]">
              <div className="flex w-full justify-evenly">
                <img src="https://ik.imagekit.io/tvlk/image/imageResource/2022/12/23/1671789427394-4441a4e3f0b96ea01dccf4a620bad996.png?tr=h-48,q-75,w-48" />
                <div className="flex flex-col">
                  <span className="text-lg">Thương gia</span>
                  <span className="text-lg font-semibold text-[#FF5E1F]">
                    {formatCurrency(parseInt(6666760 * 1.1))}
                    <span className="text-sm font-semibold text-[#a0a0a0]">
                      /khách
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="border-2 rounded-lg flex flex-col w-[33%] p-[1%] cursor-pointer hover:border-[#0194F3]">
              <div className="flex w-full justify-evenly">
                <img src="https://ik.imagekit.io/tvlk/image/imageResource/2024/05/16/1715829230007-3059c7cb0a547b771c895bddf8f281c4.png?tr=h-48,q-75,w-48" />
                <div className="flex flex-col">
                  <span className="text-lg">Hạng nhất</span>
                  <span className="text-lg font-semibold text-[#FF5E1F]">
                    {formatCurrency(parseInt(6666760 * 1.3))}
                    <span className="text-sm font-semibold text-[#a0a0a0]">
                      /khách
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed z-30 bottom-0 w-full bg-white p-[1%] flex items-center">
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-[#a0a0a0]">
              Tổng cộng cho 1 khách
            </span>
            <span className="text-2xl font-bold text-[#FF5E1F]">
              {formatCurrency(6666760)}
            </span>
          </div>
          <Link
            to="/XemDanhSachChuyenbBay/DatChoCuaToi"
            className="fixed right-[2%] bg-[#FF5E1F] flex justify-center items-center font-bold text-white size-fit cursor-pointer p-[1%] rounded-lg"
          >
            Tiến hành đặt
          </Link>
        </div>
      </div>
    </div>
  );
}

function cloneCodeFunction(clonedBlock, clonedBlockOuterHTML) {
  // Assuming you have a string of HTML tags stored in `clonedBlock.outerHTML`
  const htmlString = clonedBlock && clonedBlockOuterHTML;

  // Create a temporary element to parse the HTML string
  const tempElement = document.createElement("div");
  tempElement.innerHTML = htmlString;

  // Get the parsed HTML elements
  const parsedElements = Array.from(tempElement.childNodes);

  // Render the parsed elements in your component
  return (
    <div>
      {parsedElements.map((element, index) => (
        <div
          key={index}
          className=" rounded-2xl"
          dangerouslySetInnerHTML={{ __html: element.outerHTML }}
        />
      ))}
    </div>
  );
}
