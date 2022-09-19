import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import classes from "./ProblemCard.module.css";
import { getProblemById } from "../../utilities/helper_functions";

const ProblemCard = ({ index, history }) => {
  const { cardStyling } = classes;
  const content = getProblemById(index);
  const cardChosen = () => {
    index.toString() === "4"
      ? history.push(`/success/${index}`)
      : history.push(`/problem/${index}`);
  };
  return (
    <Card className={cardStyling} onClick={cardChosen}>
      <CardContent>
        <h3>{`${index}. ${content}`}</h3>
      </CardContent>
    </Card>
  );
};

export default ProblemCard;
