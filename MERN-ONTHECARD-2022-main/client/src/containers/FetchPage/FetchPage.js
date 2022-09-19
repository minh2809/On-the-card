import React, { useEffect, useState } from "react";
// import Loader from "../../components/Loading/Loader/Loader";
import { useParams, useHistory } from "react-router-dom";
import * as api from "../../api/api";
import * as api2 from "../../api/api2";
import { setUserInfo, setToken } from "../../store/actionCreators";
import { setStorePage, setEnterprise } from "../../store/actionCreators";
import { useDispatch } from "react-redux";
import { saveContact } from "../../utilities/vCardHelper";
import { getSignUpRoute } from "../../utilities/helper2";

const FetchPage = () => {
  const { id } = useParams();
  const [result, setResult] = useState({
    success: false,
    error: "",
    data: {},
    fetched: false,
    analyticData: {},
    token: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const notRegistered =
    "Thẻ chưa được đăng ký. Vui lòng đăng ký thẻ để sử dụng.";

  useEffect(() => {
    const redirectToUserName = () => {
      dispatch(setUserInfo(result.data, result.analyticData));
      dispatch(setStorePage(result.storePage));
      dispatch(setEnterprise(result.enterprisePage));
      history.push("/" + result.data.userName);
    };

    const fetchData = async () => {
      const token = process.env.REACT_APP_LINKEDSERIAL_TOKEN;
      const res = await api.fetchDataBySerialNo(id, true);

      if (res.data.needPIN) {
        dispatch(setToken(res.data.token));
        return history.replace(`/secure/serialNo/${id}`);
      }

      if (res.data.success) {
        setResult(res.data);
        dispatch(setToken(res.data.token));
      } else {
        const result1 = await api2.getLinkedSerial(id, token);

        if (result1.linked && !result1.meToCo) {
          if (result1.linkedTo.includes("https://")) {
            return (window.location.href = result1.linkedTo);
          }
          return (window.location.href = `${window.location.origin}/fetch/${result1.linkedTo}`);
        }
        if (result1.linked && result1.meToCo) {
          return (window.location.href = result1.linkedTo);
        }
        if (!result1.linked && result1.error) {
          alert(result1.error);
        }
        if (!result1.linked && !result1.error) {
          setResult(res.data);
        }
      }
    };

    if (!result.fetched) {
      fetchData();
    }

    if (
      result.fetched &&
      !result.success &&
      !result.error.includes(notRegistered)
    ) {
      alert(result.error);
    }
    if (result.error.includes(notRegistered)) {
      const signUpRoute = getSignUpRoute(result.partner);
      history.push(`${signUpRoute}/${id}`);
    }
    if (result.success && !result.data.redirectMode) {
      redirectToUserName();
      setTimeout(() => {
        result.data.redirectSaveContact && saveContact(result.data);
      }, 1500);
    }
    if (
      result.success &&
      result.data.redirectMode &&
      !result.data.redirectLink.includes("http")
    ) {
      redirectToUserName();
    }
    if (
      result.success &&
      result.data.redirectMode &&
      result.data.redirectLink.includes("http")
    ) {
      return window.location.replace(result.data.redirectLink);
    }
  }, [result, dispatch, history, id]);

  // return <Loader />;
  return <div></div>;
};

export default FetchPage;
