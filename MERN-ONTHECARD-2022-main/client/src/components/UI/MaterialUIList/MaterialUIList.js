import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import QrImg from "../../../assets/qrcode.png";
import Button from "@material-ui/core/Button";
import { copyToClipboard } from "../../../utilities/helper_functions";
import { useHistory } from "react-router-dom";
import * as api from "../../../containers/firebase/serialAPI";
import ModalLoad from "../../../components/UI/Modal/ModalLoad/ModalLoad";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 720,
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    height: "5vh",
    marginBottom: "15px",
    marginTop: "10px",
  },
  textStyling: {
    fontSize: "1.1rem",
    fontWeight: "650",
  },
  checkAll: {
    marginBottom: "2.5vh",
  },
}));

export default function CheckboxListSecondary({ list, token }) {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const buttonClicked = async () => {
    setLoading(true);
    if (checked.length === 0) {
      setLoading(false);
      return alert(
        "Chưa mã số thẻ nào được chọn. Vui lòng chọn mã số thẻ để đăng ký !"
      );
    }
    const result = await api.registerSerial(checked, token);
    setLoading(false);
    alert(result.message);
    return history.push("/admin/serialNumber");
  };

  const buttonChooseAll = () => {
    checked.length === list.length ? setChecked([]) : setChecked(list);
  };

  const copySerial = (value) => {
    copyToClipboard(value.serialNo);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
    <List dense className={classes.root}>
      <h3>Tích Vào Ô Trống Hoặc Nhấn "Chọn Tất Cả" Để Lấy Code</h3>
      <h3>Nhấn Nút Màu Xanh Sau Khi Đã Lấy Lượng Code Cần Thiết</h3>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.signInButton}
        onClick={buttonClicked}
      >
        <i className="fas fa-check-circle"></i>
        &nbsp;
        {"Đã Lấy " + checked.length + " Code"}
      </Button>
      <hr />
      <Button
        variant="contained"
        color="secondary"
        className={classes.checkAll}
        onClick={buttonChooseAll}
      >
        <i className="fas fa-list"></i>
        &nbsp;
        {"Chọn Tất Cả"}
      </Button>
      {list.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value.serialNo}`;
        var nf = new Intl.NumberFormat();
        let formattedValue = nf.format(value.serialNo);
        return (
          <ListItem key={value.serialNo} button className={classes.listItem}>
            <ListItemAvatar>
              <Avatar alt={`Avatar no${value.serialNo}`} src={QrImg} />
            </ListItemAvatar>
            <ListItemText
              id={labelId}
              primary={`${formattedValue}`}
              classes={{ primary: classes.textStyling }}
            />
            <Button
              onClick={() => copySerial(value)}
              variant="contained"
              color="primary"
            >
              Copy
            </Button>
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(value)}
                checked={checked.indexOf(value) !== -1}
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
      <ModalLoad h5text={"Đang Tải..."} show={loading} />
      <Backdrop show={loading} />
    </List>
  );
}
