import React, { useState } from "react";
import classes from "./Modal.module.css";
import SimpleTextBox from "../../TextBox/SimpleTextBox/SimpleTextBox";
import firebase from "../../../../containers/firebase/firebase";
import MainButton from "../../Button/MainButton/MainButton";
import { useSelector } from "react-redux";
import { Vietnamese, English } from "../../../../language/language";
import CloseModalButton from "../../Button/CloseModal/CloseModal";
import ProductCard from "../../Cards/ProductCard/ProductCardPreview/ProductCardPreview";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const Modal = ({ show, closeModal, setLoad, onUpdate, data }) => {
  const [name, setName] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [price, setPrice] = useState(data.price);
  const [url, setUrl] = useState(data.url);
  const [icon, setIcon] = useState(data.icon);
  const [imageObject, setImageObject] = useState({ name: "" });

  const { appLanguage, userInfo } = useSelector((state) => state);
  const appLang = appLanguage === "VIETNAMESE" ? Vietnamese : English;
  const { email } = userInfo;

  const onChangeName = (value) => setName(value);
  const onChangeDescription = (value) => setDescription(value);
  const onChangePrice = (value) => setPrice(value);
  const onChangeUrl = (value) => setUrl(value.replace(/\s/g, ""));

  const deleteImage = () => {
    setIcon("");
    setImageObject({ name: "" });
  };
  const resetState = () => {
    setName("");
    setDescription("");
    setPrice(0);
    setImageObject({ name: "" });
    setUrl("");
  };
  const resetModal = () => setLoad(false) && resetState();

  const imageHandler = async (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setIcon(reader.result);
      }
    };
    try {
      const image = e.target.files[0];
      reader.readAsDataURL(image);
      setImageObject(image);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addLink = async () => {
    name.length !== 0
      ? uploadImageWork()
      : alert(appLang.editPage.text.productAlert);
  };

  const uploadImageWork = async () => {
    const condition = imageObject.name.length === 0;
    setLoad(true);
    closeModal();
    condition
      ? onUpdate({
          ...data,
          title: name,
          description: description,
          price: price,
          url: url,
          icon: icon,
        })
      : await saveImgFirebase();
    condition && setLoad(false) && resetState();
  };

  const saveImgFirebase = async () => {
    try {
      firebase.updateImage(imageObject, imageObject.name, email).on(
        "state_changed",
        (snapshot) => {
          //nothing going on
        },
        (error) => {
          console.log(appLang.editPage.text.errorsHappened + " " + error);
          resetModal();
        },
        () => {
          firebase.storage
            .ref("images/" + email)
            .child(imageObject.name)
            .getDownloadURL()
            .then((imgUrl) => {
              const productData = {
                ...data,
                title: name,
                description: description,
                price: price,
                url: url,
                icon: imgUrl,
              };
              resetModal();
              onUpdate(productData);
            });
        }
      );
    } catch (error) {
      alert(appLang.editPage.text.errorsHappened + " " + error.message);
      resetModal();
    }
  };

  /*  ************************************************************************************  */

  return (
    <div className={show ? classes.Modal : classes.ModalClosed}>
      <div
        className={classes.closeButton}
        onClick={() => {
          closeModal();
          resetState();
        }}
      >
        <i className="fas fa-times"></i>
      </div>

      <div className={classes.container}>
        <div className={classes.input}>
          <SimpleTextBox
            textHolder={appLang.editPage.modal.enter.productNameHolder}
            textEntered={onChangeName}
            title
            modalShow={show}
            value={name}
          />
          <TextareaAutosize
            placeholder={appLang.editPage.modal.enter.productDescriptionHolder}
            onChange={(event) => onChangeDescription(event.target.value)}
            className={classes.textArea}
            value={description}
          />
          <SimpleTextBox
            textHolder={appLang.editPage.modal.enter.productPriceHolder}
            textEntered={onChangePrice}
            modalShow={show}
            number
            value={price}
          />
          <SimpleTextBox
            textHolder={appLang.editPage.modal.enter.productLink}
            textEntered={onChangeUrl}
            modalShow={show}
            url
            value={url}
          />

          <div className={classes.thumbnailContainer}>
            <h5>{appLang.editPage.text.imageReplace}</h5>
            <div className={classes.btnContainer}>
              <label htmlFor="input">
                <i className="fas fa-folder-plus"></i>{" "}
                {appLang.customizePage.replaceImage}
              </label>
              <div onClick={deleteImage}>
                <i className="fas fa-trash"></i>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.output}>
          <h3>{appLang.editPage.modal.demoProduct}</h3>
          <ProductCard
            productData={{
              icon: icon,
              title: name,
              description: description,
              price: price,
              url: url,
            }}
          />
        </div>
      </div>

      <div className={classes.buttonContainer}>
        <MainButton imageModal onClick={addLink}>
          {appLang.editPage.button.updateInfo}
        </MainButton>
        <CloseModalButton
          buttonText={appLang.retrieve.dismiss}
          imgModal
          closeModal={() => {
            resetState();
            closeModal();
          }}
        />
      </div>

      <input
        type="file"
        accept="image/*"
        name="image-upload1"
        id="input"
        onChange={imageHandler}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default Modal;
