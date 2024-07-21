import { CONTEXT } from "../../Context/WindowLogin";
import { useEffect, useContext } from "react";

export function HistoryTicket() {
  const { isUser } = useContext(CONTEXT);

  if (isUser === null) {
    window.location.href = "/CNPM_Travel";
  }
  return (
    <>
      <p className="text-xl font-semibold p-5 text-center">Lịch sử giao dịch</p>
      <div className="border-t p-5"></div>
    </>
  );
}
