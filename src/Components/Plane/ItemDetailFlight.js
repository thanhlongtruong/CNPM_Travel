import { memo } from "react";

const ItemDetailFlight = (props) => {
  return (
    <button
      type="button"
      className="flex flex-col gap-x-2 justify-start items-start rounded-b-xl w-full bg-[#F7F9FA] p-[2%] text-lg font-semibold"
    >
      <span className="text-sm text-[#687176]">{props.dateDi_}</span>
      <div className="gap-x-3 flex">
        <div className="flex flex-col justify-between h-120 md:h-[250px]">
          <div className="flex flex-col">
            <span>{props.timeDi_}</span>
          </div>
          <div className="flex flex-col">
            <span>{props.timeDen_}</span>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center h-fit">
          <div className="w-[12px] md:w-[24px] h-[12px] md:h-[24px] border-2 border-[#109AF4] rounded-full"></div>
          <div className="h-[94px] md:h-[200px] w-fit border-[1px] border-[#687172]"></div>
          <div className="w-[12px] md:w-[24px] h-[12px] md:h-[24px] border-2 border-[#109AF4] bg-[#109AF4] rounded-full"></div>
        </div>
        <div className="flex flex-col items-start justify-between  md:h-[250px]">
          <span>{props.diemDi_}</span>
          <span className="flex flex-row text-base font-bold text-[#109AF4]">
            <img src="	https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/8c1bcc90ebe8e4f79eafc4270ec3dbcb.svg" />
            Số kí tối thiểu {props.khoiLuongQuyDinhTrenMotVe}
          </span>
          <span className="flex flex-row text-base font-bold text-[#109AF4]">
            Số vé thường còn lại: {props.soGheThuong}
          </span>
          <span className="flex flex-row text-base font-bold text-[#109AF4]">
            Số vé thương gia còn lại: {props.soGheThuongGia}
          </span>
          <span>{props.diemDen_}</span>
        </div>
      </div>
      <span className="text-sm text-[#687176]">{props.dateDen_}</span>
    </button>
  );
};
export default memo(ItemDetailFlight);
