import React from "react";
import { useTranslation } from "next-export-i18n";

function Test() {
  const { t } = useTranslation();
  return <div>{t("general.button.cancel")}</div>;
}

export default Test;
