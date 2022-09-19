import React, { useState, useEffect, lazy } from "react";
// import Loader from "../../components/Loading/Loader/Loader";
import { useParams } from "react-router-dom";
import * as api from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, setToken } from "../../store/actionCreators";
import { setStorePage, setEnterprise } from "../../store/actionCreators";
import * as actionTypes from "../../store/actionTypes";
import { IGFB } from "../../utilities/helper";
import { useHistory } from "react-router-dom";
import { is25fitKOL, isPetroVn } from "../../utilities/helper3";

const View = lazy(() => import("./View"));
const KOL25FitView = lazy(() =>
  import("../../B2B_Components/25fit/KOLViewPage/KOLView")
);
const PetroView = lazy(() =>
  import("../../B2B_Components/petrovn/PetroViewPage/PetroView")
);

const ViewPage = () => {
  const { viewFetched, userInfo } = useSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({
    success: false,
    error: "",
    data: {},
    fetched: false,
    analyticData: {},
    storePage: {},
    enterprisePage: {},
  });
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.fetchDataByUserName(id, false, "1");
      setResult(res.data);
      res.data.needPIN && history.replace(`/secure/userName/${id}`);

      return dispatch(setToken(res.data.token));
    };

    if (!viewFetched) {
      IGFB(id);
      fetchData();
    }

    if (result.fetched && !result.success) {
      alert(result.error);
    }

    if (result.success && !viewFetched) {
      dispatch(setUserInfo(result.data, result.analyticData));
      dispatch(setStorePage(result.storePage));
      dispatch(setEnterprise(result.enterprisePage));
      dispatch({ type: actionTypes.PERSONAL_PAGE_VISITED });
      setLoading(false);
    }
  }, [id, result, viewFetched, dispatch, history]);

  if (viewFetched || !loading) {
    const KOL25fit = is25fitKOL(userInfo.company);
    const petro = isPetroVn(userInfo.company);
    let returnView = KOL25fit ? (
      <KOL25FitView />
    ) : petro ? (
      <PetroView />
    ) : (
      <View />
    );
    return returnView;
  } else {
    return <div></div>;
    // return <Loader />;
  }
};

export default ViewPage;
