import React from "react";
import DryCleaningIcon from "@mui/icons-material/DryCleaning";
import SchoolIcon from "@mui/icons-material/School";
import TrainIcon from "@mui/icons-material/Train";
import PaidIcon from "@mui/icons-material/Paid";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MedicationIcon from "@mui/icons-material/Medication";
import HomeIcon from "@mui/icons-material/Home";
import OpacityIcon from "@mui/icons-material/Opacity";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import WifiIcon from "@mui/icons-material/Wifi";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import CoffeeIcon from "@mui/icons-material/Coffee";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import WorkIcon from "@mui/icons-material/Work";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SavingsIcon from "@mui/icons-material/Savings";

export const selectIcons = (category) => {
  switch (category) {
    case "日用品":
      return <DryCleaningIcon />;
    case "教育費":
      return <SchoolIcon />;
    case "交通費":
      return <TrainIcon />;
    case "保険料":
      return <PaidIcon />;
    case "美容":
      return <ContentCutIcon />;
    case "衣服":
      return <CheckroomIcon />;
    case "食費":
      return <RestaurantIcon />;
    case "医療費":
      return <MedicationIcon />;
    case "住居費":
      return <HomeIcon />;
    case "水道":
      return <OpacityIcon />;
    case "ガス":
      return <GasMeterIcon />;
    case "電気":
      return <ElectricBoltIcon />;
    case "ローン":
      return <CreditScoreIcon />;
    case "インターネット":
      return <WifiIcon />;
    case "スマートフォン":
      return <SmartphoneIcon />;
    case "娯楽費":
      return <SportsEsportsIcon />;
    case "交際費":
      return <CoffeeIcon />;
    case "贈答費":
      return <CardGiftcardIcon />;
    case "手数料":
      return <AccountBalanceIcon />;
    case "給料":
      return <CurrencyYenIcon />;
    case "副業":
      return <WorkIcon />;
    case "お小遣い":
      return <AccountBalanceWalletIcon />;
    case "投資":
      return <SavingsIcon />;
    case "賞与":
      return <CurrencyYenIcon />;
    case "臨時収入":
      return <CurrencyYenIcon />;
  }
};
