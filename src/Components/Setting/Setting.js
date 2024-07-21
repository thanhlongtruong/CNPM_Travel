import { useEffect, useState, useContext } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { OptionSetting } from "./OptionSetting";
import { InfoAccount } from "./InfoAccount";
import { HistoryTicket } from "./HistoryTicket";
import { LoginSuccess } from "./StateLoginSucces";
import { CONTEXT } from "../../Context/WindowLogin";

export function Setting() {
  const [sizeSizeWidth, setSizeWidth] = useState();
  const [hideOptionSetting, setHideOptionSetting] = useState(true);
  let currentLocation = window.location.href;
  let place = currentLocation.includes("Setting/InfoAccount") ? true : false;

  const {
    isShowOptionSetting_LoginSuccess,
    setShowOptionSetting_LoginSuccess,
  } = useContext(CONTEXT);

  useEffect(() => {
    const handlSize = () => {
      setSizeWidth(document.documentElement.clientWidth);
    };
    window.addEventListener("resize", handlSize);
    return () => {
      window.removeEventListener("resize", handlSize);
    };
  }, [sizeSizeWidth]);

  useEffect(() => {
    if (sizeSizeWidth < 1024) {
      setHideOptionSetting(true);
    } else {
      setHideOptionSetting(false);
    }
  }, [sizeSizeWidth]);

  useEffect(() => {
    if (isShowOptionSetting_LoginSuccess) {
      setShowOptionSetting_LoginSuccess(false);
    }
  }, [sizeSizeWidth]);
  return (
    <>
      <Header />
      {isShowOptionSetting_LoginSuccess && <LoginSuccess />}

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
