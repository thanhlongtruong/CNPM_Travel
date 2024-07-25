import { memo, useContext, useEffect, useRef, useState } from "react";
import { CONTEXT } from "../../Context/WindowLogin";
import ItemDetailFlight from "./ItemDetailFlight.js";

const ItemFlight = (isFlight) => {
  const { hideDetailItemFlight } = useContext(CONTEXT);

  return (
    <>
      <button
        type="button"
        className="h-[130px] w-full bg-white p-3 flex justify-between items-center"
      >
        <div className="flex items-center text-2xl gap-x-3 font-semibold w-fit h-fit">
          <div className="flex flex-col gap-y-1 items-center">
            <span className="text-sm text-[#687176]">{isFlight.dateDi}</span>
            <span>{isFlight.timeDi}</span>
            <span className="text-sm font-semibold text-[#687176]">
              {isFlight.diemDi}
            </span>
          </div>
          <div className="flex flex-col gap-y-1 items-center">
            <div className="flex flex-row items-center w-fit">
              <div className="w-[12px] md:w-[24px] h-[12px] md:h-[24px] border-2 border-[#687172] rounded-full"></div>
              <div className="w-[30px] md:w-[70px] h-fit border-[1px] border-[#687172]"></div>
              <div className="w-[12px] md:w-[24px] h-[12px] md:h-[24px] border-2 border-[#687172] bg-[#687172] rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-col gap-y-1 items-center">
            <span className="text-sm text-[#687176]">{isFlight.dateDen}</span>
            <span>{isFlight.timeDen}</span>
            <span className="text-sm font-semibold text-[#687176]">
              {isFlight.diemDen}
            </span>
          </div>
        </div>
        <div className="flex text-xl items-center font-bold text-[#FF5E1F]">
          {isFlight.giaVe} {" VND"}
          <span className="text-sm font-semibold text-[#687176]">/khách</span>
        </div>
      </button>
      {hideDetailItemFlight && (
        <ItemDetailFlight
          dateDi_={isFlight.dateDi}
          dateDen_={isFlight.dateDen}
          timeDi_={isFlight.timeDi_}
          soGheThuong={isFlight.soGheThuong}
          soGheThuongGia={isFlight.soGheThuongGia}
          timeDen_={isFlight.timeDen_}
          diemDi_={isFlight.diemDi_}
          khoiLuongQuyDinhTrenMotVe={isFlight.khoiLuongQuyDinhTrenMotVe}
          diemDen_={isFlight.diemDen_}
        />
      )}
    </>
  );
};
export default memo(ItemFlight);
