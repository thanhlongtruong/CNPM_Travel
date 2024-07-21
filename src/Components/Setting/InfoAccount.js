import { useEffect, useState, useContext } from "react";
import { CONTEXT } from "../../Context/WindowLogin";
import { FormRegister_or_InfoAccount } from "../Home/FormRegister_or_InfoAccount";
import {
  NotiFailEventlogin,
  CONTENT_UPDATE_FAIL,
  CONTENT_UPDATE_SUCCESS,
} from "../Noti/NotiFailEventLogin";
export function InfoAccount() {
  const {
    fullName,
    numberPhone,
    gender,
    birthday,
    password,
    isStateSaveRegister,
    setShowNotiSuccesUpdate,
    isShowNotiSuccesUpdate,
    setReset_When_Update,
    get_Id_User,
    setUser,
    isUser,
  } = useContext(CONTEXT);

  const [isShowNotiFailUpdate, setShowNotiFailUpdate] = useState(false);

  if (isUser === null) {
    window.location.href = "/CNPM_Travel";
  }

  const submitUpdateUser_id = async (event) => {
    event.preventDefault();
    const id = isUser._id;
    const user = {
      numberPhone: numberPhone,
      fullName: fullName,
      gender: gender,
      birthday: birthday,
      password: password,
    };

    try {
      const response = await fetch(
        `http://localhost:4001/api/update_user/${id}`,
        {
          method: "PATCH", // Phương thức HTTP
          headers: {
            "Content-Type": "application/json", // Kiểu nội dung của request
          },
          body: JSON.stringify({
            numberPhone: user.numberPhone,
            fullName: user.fullName,
            gender: user.gender,
            birthday: user.birthday,
            password: user.password,
          }),
        }
      );
      if (!response.ok) {
        setShowNotiFailUpdate(true);
        throw new Error("Network response was not ok");
      }

      const fetchNewDataResponse = await fetch(
        `http://localhost:4001/api/get_user/find_id_user/${get_Id_User}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!fetchNewDataResponse.ok) {
        throw new Error("Failed to fetch new data");
      }

      const newData = await fetchNewDataResponse.json();
      setUser(newData);

      setReset_When_Update(true);
    } catch (error) {
      console.log(error);
    }
  };
  if (isShowNotiSuccesUpdate) {
    setTimeout(() => {
      setShowNotiSuccesUpdate(false);
    }, 1000);
  }

  if (isShowNotiFailUpdate) {
    setTimeout(() => {
      setShowNotiFailUpdate(false);
    }, 1800);
  }
  return (
    <>
      <p className="text-xl font-semibold p-5 text-center">
        Thông tin tài khoản
      </p>

      <form onSubmit={submitUpdateUser_id} className="relative m-auto">
        {isShowNotiFailUpdate && (
          <NotiFailEventlogin content={CONTENT_UPDATE_FAIL} />
        )}
        {isShowNotiSuccesUpdate && (
          <NotiFailEventlogin content={CONTENT_UPDATE_SUCCESS} />
        )}
        <FormRegister_or_InfoAccount />
        <div className="flex gap-6 w-full h-10 justify-end px-5">
          {!isStateSaveRegister ? (
            <button
              className="bg-slate-300 select-none h-fit w-fit p-3 font-semibold text-white text-base rounded-lg"
              type="button"
            >
              Lưu
            </button>
          ) : (
            <button
              type="submit"
              className="bg-sky-500 select-none h-fit w-fit p-3 font-semibold text-white text-base rounded-lg"
            >
              Lưu
            </button>
          )}
        </div>
      </form>
    </>
  );
}
