import React, { useState } from "react";
import { useDispatch } from "react-redux";
import LinkBoxEdit from "../Boxes/LinkBox/LinkBoxEdit/LinkBoxEdit";
import * as actionTypes from "../../store/actionTypes";
import classes from "./SocialMediaList.module.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "whitesmoke" : "white",
  borderRadius: "20px",
});

const List = (props) => {
  const { storeList, enterpriseList } = props;
  const { socialMediaList, updateEditData } = props;
  const dispatch = useDispatch();
  let listItems = null;

  const [threeDotIndex, setThreeDotIndex] = useState(0);

  const dispatchNewList = (socialMediaList) => {
    storeList
      ? dispatch({
          type: actionTypes.UPDATESTOREPRODUCTS,
          socialMediaListValue: socialMediaList,
        })
      : enterpriseList
      ? dispatch({
          type: actionTypes.UPDATEINFOENTERPRISE,
          socialMediaListValue: socialMediaList,
        })
      : dispatch({
          type: actionTypes.UPDATESOCIALMEDIA,
          socialMediaListValue: socialMediaList,
        });
  };

  const btnUpClickedHandler = (index) => {
    if (index !== 0) {
      let socialMediaListCopied = socialMediaList;
      let nextValue = socialMediaListCopied[index];
      socialMediaListCopied[index] = socialMediaListCopied[index - 1];
      socialMediaListCopied[index - 1] = nextValue;
      dispatchNewList(socialMediaListCopied);
    }
  };

  const btnDownClickedHandler = (index) => {
    let socialMediaListCopied = socialMediaList;
    if (index < socialMediaListCopied.length - 1) {
      let prevValue = socialMediaListCopied[index];
      socialMediaListCopied[index] = socialMediaListCopied[index + 1];
      socialMediaListCopied[index + 1] = prevValue;
      dispatchNewList(socialMediaListCopied);
    }
  };

  const deleteClickedHandler = (index) => {
    let socialMediaListCopied = socialMediaList;
    socialMediaListCopied.splice(index, 1);
    dispatchNewList(socialMediaListCopied);
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const itemsUpdate = reorder(
      socialMediaList,
      result.source.index,
      result.destination.index
    );

    dispatchNewList(itemsUpdate);
  };

  if (socialMediaList) {
    listItems = socialMediaList.map((value, index) => {
      return (
        <Draggable
          key={value._id || value.url}
          draggableId={value._id || value.url}
          index={index}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <LinkBoxEdit
                LBKey={index + 1}
                content={value.title}
                artistContent={value.artist ? value.artist : null}
                iconType={value.icon}
                link={value.url}
                btnUpClicked={() => btnUpClickedHandler(index)}
                btnDownClicked={() => btnDownClickedHandler(index)}
                deleteClicked={() => deleteClickedHandler(index)}
                onEdit={() => updateEditData(value, index)}
                storeLB={storeList || false}
                styling={snapshot.isDragging && classes.dragging}
                threeDotActive={threeDotIndex}
                setThreeDotActive={setThreeDotIndex}
              />
            </div>
          )}
        </Draggable>
      );
    });
  }

  return (
    <div className={classes.previewPhoneArea}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              className={classes.dropping}
            >
              {listItems}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default List;
