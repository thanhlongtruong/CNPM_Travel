import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { OptionSetting } from "../Home/OptionSetting";
import { InfoAccount } from "./InfoAccount";
import { HistoryTicket } from "./HistoryTicket";

export function Setting() {
  const [sizeSizeWidth, setSizeWidth] = useState();
  const [hideOptionSetting, setHideOptionSetting] = useState(true);
  let currentLocation = window.location.href;
  let place = currentLocation.includes("Setting/InfoAccount") ? true : false;

  useEffect(() => {
    const handlSize = () => {
      setSizeWidth(document.documentElement.clientWidth);
    };
    window.addEventListener("resize", handlSize);
    return () => {
      window.removeEventListener("resize", handlSize);
    };
  }, []);

  useEffect(() => {
    if (sizeSizeWidth < 1024) {
      setHideOptionSetting(true);
    } else {
      setHideOptionSetting(false);
    }
  }, [sizeSizeWidth]);

  return (
    <>
      <Header />
      <div className="p-5 w-full h-fit bg-slate-100">
        <div className="w-[80%] h-fit flex gap-x-8  m-auto">
          <div className="w-0 h-0 lg:w-[30%] lg:h-80 rounded-lg border bg-white">
            {!hideOptionSetting && <OptionSetting />}
          </div>
          <div className="w-full lg:w-[70%] h-fit py-5 rounded-lg border bg-white">
            {place ? <InfoAccount /> : <HistoryTicket />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
