import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Title } from "./Title";

export default function Totals() {
  return (
    <>
      <Title>今月の合計</Title>
      <Typography component="p" variant="h5" sx={{ mt: 1, mb: 3 }}>
        ￥55000000
      </Typography>
      <Title>工藤さんの支払額</Title>
      <Typography component="p" variant="h5" sx={{ mt: 1, mb: 3 }}>
        ￥65000000
      </Typography>
      <Title>佐藤さんの支払額</Title>
      <Typography component="p" variant="h5" sx={{ mt: 1 }}>
        ￥65000000
      </Typography>
    </>
  );
}
