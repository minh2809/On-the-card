import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import classes from "./MainScreen.module.css";
import Grid from "@material-ui/core/Grid";

import ProblemCard from "../../components/ProblemCard/ProblemCard";
import { logout } from "../../redux/appActions";

const MainScreen = ({ history }) => {
  const { mainStyling, listStyling, btnStyling } = classes;
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.appReducer);

  const logoutHandler = () => {
    dispatch(logout());
  };
  const displayObject = (
    <div className={mainStyling}>
      <h3>Nhấn Vào Lỗi / Yêu Cầu Của Khách Hàng</h3>
      <div className={listStyling}>
        <Grid container spacing={2}>
          <Grid item md={3} xs={12}>
            <ProblemCard index={1} history={history} />
          </Grid>
          <Grid item md={3} xs={12}>
            <ProblemCard index={2} history={history} />
          </Grid>
          <Grid item md={3} xs={12}>
            <ProblemCard index={3} history={history} />
          </Grid>
          <Grid item md={3} xs={12}>
            <ProblemCard index={4} history={history} />
          </Grid>
          <Grid item md={3} xs={12}>
            <ProblemCard index={5} history={history} />
          </Grid>
          <Grid item md={3} xs={12}>
            <ProblemCard index={6} history={history} />
          </Grid>
          <Grid item md={3} xs={12}>
            <ProblemCard index={7} history={history} />
          </Grid>
        </Grid>
      </div>
      <Button
        color="secondary"
        variant="contained"
        className={btnStyling}
        onClick={logoutHandler}
      >
        Đăng Xuất
      </Button>
    </div>
  );
  if (loggedIn) {
    return displayObject;
  } else {
    history.push("/");
    return <div></div>;
  }
};

export default MainScreen;
