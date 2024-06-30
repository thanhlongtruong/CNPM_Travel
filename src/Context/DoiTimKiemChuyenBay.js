import { createContext, useState, useRef } from "react";
import { format, addDays, parse } from "date-fns";
import { vi } from "date-fns/locale";

export const CONTEXT = createContext({});

export const OrderProvider = ({ children }) => {
  const [isBay, setBay] = useState(null);
  const [isDap, setDap] = useState(null);
  const [today, setToday] = useState(new Date());
  const [switchNgayBay, setSwitchNgayBay] = useState(
    format(today, "EEEE, d 'thg' M yyyy", { locale: vi })
  );

  //mở dialog và set sân bay
  const [dialogDoiTimKiem, setDialogDoiTimKiem] = useState(false);
  const handleDialogDoiTimKiem = (text1, text2, date) => {
    setDialogDoiTimKiem(dialogDoiTimKiem ? false : true);

    setBay(text1);
    setDap(text2);
    setToday(date);
    setSwitchNgayBay(format(today, "EEEE, d 'thg' M yyyy", { locale: vi }));

    console.log(isBay + " - " + isDap + " - " + switchNgayBay);
  };

  //clone block html dựa vào ref
  const blockRef = useRef([]);
  const [clonedBlock, setClonedBlock] = useState(null);
  const handleClonedBlock = (index) => {
    if (blockRef.current[index]) {
      const blockElement = blockRef.current[index].cloneNode(true);
      setClonedBlock(blockElement);
    }
  };

  //open dialog chỉnh số lượng và hạng
  const [isChonMuaClick, setChonMuaClick] = useState(false);
  const handleChonMuaClick = () => {
    setChonMuaClick(!isChonMuaClick);
  };

  return (
    <CONTEXT.Provider
      value={{
        dialogDoiTimKiem,
        handleDialogDoiTimKiem,
        setDialogDoiTimKiem,
        isBay,
        setBay,
        isDap,
        setDap,
        today,
        setToday,
        setSwitchNgayBay,
        switchNgayBay,
        isChonMuaClick,
        handleChonMuaClick,
        blockRef,
        clonedBlock,
        handleClonedBlock,
      }}
    >
      {children}
    </CONTEXT.Provider>
  );
};
