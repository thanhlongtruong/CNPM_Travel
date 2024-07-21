import { useContext, useRef, useState } from "react";
import { ItemFlight } from "./ItemFlight";
import { CONTEXT } from "../../Context/WindowLogin";

export function ShowFlight({ flights }) {
  // const { itemRefs, expandedIndex, handleClick } = useContext(CONTEXT);
  const itemRefs = useRef([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const handleClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    // setIndexItemChoose(index);
  };
  return (
    <div className="flex flex-col h-fit w-full mt-[2%]">
      {flights.map((flight, index) => (
        <div className="relative">
          <div
            key={index}
            ref={(el) => (itemRefs.current[index] = el)}
            className={`transition-all duration-300 border-2 mb-3 hover:border-cyan-400 overflow-hidden rounded-md ${
              expandedIndex === index ? "h-fit" : "h-[130px]"
            }`}
            onClick={() => handleClick(index)}
          >
            <ItemFlight
              dateDi={flight.dateDi}
              dateDen={flight.dateDen}
              timeDi={flight.timeDi}
              diemDi={flight.diemDi}
              timeDen={flight.timeDen}
              diemDen={flight.diemDen}
              giaVe={flight.giaVeGoc}
              //
              dateDi_={flight.dateDi}
              dateDen_={flight.dateDen}
              timeDi_={flight.timeDi}
              timeDen_={flight.timeDen}
              diemDi_={flight.diemDi}
              khoiLuongQuyDinhTrenMotVe={flight.khoiLuongQuyDinhTrenMotVe}
              diemDen_={flight.diemDen}
            />
          </div>

          <button
            key={index + 1}
            ref={(el) => (itemRefs.current[index] = el)}
            className="bg-[#0194F3] right-3 absolute bottom-6 text-white w-fit h-fit px-4 py-2 lg:px-[35px] lg:py-[7px] mt-[30px] rounded-lg"
            // onClick={handleChooseOpenHangVe_(index)}
          >
            Chọn
          </button>
        </div>
      ))}
    </div>
  );
}
