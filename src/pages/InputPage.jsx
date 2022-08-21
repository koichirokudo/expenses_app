import React, { useState } from "react";
import GenericTemplate from "../components/template/GenericTemplate";
import {
  CssBaseline,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { inputListItem } from "./InputListItem";
import FormControl from "@mui/material/FormControl";
import Totals from "./Totals";
import { Title } from "./Title";
import Box from "@mui/material/Box";
import { formatDate } from "../components/pages/FormatDate";
import axios from "../api/axios";

const REGISTER_URL = "/expenses/register";
const PAYMENTS = 0;
const INCOME = 1;

export const InputPage = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorList, setErrorList] = useState([]);

  const [dateFocus, setDateFocus] = useState(false);
  const [validDate, setValidDate] = useState(false);

  const [userIdFocus, setUserIdFocus] = useState(false);
  const [validUserId, setValidUserId] = useState(false);

  const [categoryFocus, setCategoryFocus] = useState(false);
  const [validCategory, setValidCategory] = useState(false);

  const [moneyFocus, setMoneyFocus] = useState(false);
  const [validMoney, setValidMoney] = useState(false);

  const currentDate = new Date();
  const [values, setValues] = useState({
    types: 0,
    date: formatDate(currentDate),
    user_id: "",
    category: "",
    money: "",
    note: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      await axios.post(REGISTER_URL, JSON.stringify({ ...values }), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setOpen(false);
    } catch (error) {
      console.log(error.response);
      if (!error?.response) {
        setErrorMessage("サーバーの応答がありません。");
        setOpen(true);
      } else if (error.response?.status === 422) {
        setErrorList(error.response.data.errors);
        setOpen(true);
      } else {
        setErrorMessage("登録に失敗しました。");
        setOpen(true);
      }
    }
    setLoading(false);
  };

  return (
    <GenericTemplate title="収支の入力">
      <CssBaseline />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item sm={12} md={12} lg={7}>
          <Paper sx={{ p: 2 }}>
            <Title>収支の入力・編集</Title>
            <form onSubmit={handleSubmit}>
              <Box sx={{ mt: 1 }}>
                <ToggleButtonGroup
                  color="primary"
                  value={values.types}
                  exclusive
                  onChange={handleChange("types")}
                >
                  <ToggleButton value={PAYMENTS}>支出</ToggleButton>
                  <ToggleButton value={INCOME}>収入</ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <Box>
                <TextField
                  id="date"
                  error={!!errorList?.date || (dateFocus && !validDate)}
                  label="支払った日"
                  margin="dense"
                  type="date"
                  defaultValue={formatDate(currentDate)}
                  helperText={errorList?.date}
                  onChange={handleChange("date")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    style: { fontSize: 18 },
                  }}
                  sx={{
                    mt: 2,
                    mr: 2,
                    width: "225px",
                    fontSize: "32px",
                  }}
                />
                <FormControl margin="dense" sx={{ mt: 2, width: "25ch" }}>
                  <InputLabel id="userid-label">支払った人</InputLabel>
                  <Select
                    labelId="userid-label"
                    id="userid-select"
                    error={
                      !!errorList?.user_id || (userIdFocus && !validUserId)
                    }
                    value={values.user_id}
                    label="支払った人"
                    onChange={handleChange("user_id")}
                  >
                    {/*
                      登録されている人の名前を持ってくる
                    */}
                    <MenuItem value={1}>工藤</MenuItem>
                    <MenuItem value={2}>佐藤</MenuItem>
                  </Select>
                  <FormHelperText error={true}>
                    {errorList?.user_id}
                  </FormHelperText>
                </FormControl>
              </Box>
              <Box>
                <FormControl margin="dense" sx={{ width: "25ch", mr: 2 }}>
                  <InputLabel id="category-label">カテゴリ</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category-select"
                    error={
                      !!errorList?.category || (categoryFocus && !validCategory)
                    }
                    value={values.category}
                    label="カテゴリ"
                    onChange={handleChange("category")}
                  >
                    <MenuItem value="DailyGoods">日用品</MenuItem>
                    <MenuItem value="Education">教育費</MenuItem>
                    <MenuItem value="Beauty">美容</MenuItem>
                    <MenuItem value="Transport">交通費</MenuItem>
                    <MenuItem value="Insurance">保険料</MenuItem>
                    <MenuItem value="Clothing">衣服</MenuItem>
                    <MenuItem value="Food">食費</MenuItem>
                    <MenuItem value="Medical">医療費</MenuItem>
                    <MenuItem value="Housing">住居費</MenuItem>
                    <MenuItem value="Water">水道</MenuItem>
                    <MenuItem value="Gas">ガス</MenuItem>
                    <MenuItem value="Electric">電気</MenuItem>
                    <MenuItem value="Loan">ローン</MenuItem>
                    <MenuItem value="Internet">インターネット</MenuItem>
                    <MenuItem value="SmartPhone">スマホ</MenuItem>
                    <MenuItem value="Entertainment">娯楽費</MenuItem>
                    <MenuItem value="Gift">贈答費</MenuItem>
                    <MenuItem value="Fee">手数料</MenuItem>
                  </Select>
                  <FormHelperText error={true}>
                    {errorList?.category}
                  </FormHelperText>
                </FormControl>
                <TextField
                  margin="dense"
                  label="支出"
                  error={!!errorList?.money || (moneyFocus && !validMoney)}
                  defaultValue={values.money}
                  helperText={errorList?.money}
                  onChange={handleChange("money")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">￥</InputAdornment>
                    ),
                  }}
                  sx={{
                    width: "25ch",
                    mr: 2,
                    display: values.types === PAYMENTS ? "" : "none",
                  }}
                />
                <TextField
                  margin="dense"
                  label="収入"
                  error={!!errorList?.money || (moneyFocus && !validMoney)}
                  defaultValue={values.money}
                  helperText={errorList?.money}
                  onChange={handleChange("money")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">￥</InputAdornment>
                    ),
                  }}
                  sx={{
                    width: "25ch",
                    display: values.types === INCOME ? "" : "none",
                  }}
                />
              </Box>
              <TextField
                margin="dense"
                label="メモ"
                defaultValue={values.note}
                onChange={handleChange("note")}
                sx={{ width: 320 }}
              />
              <Button
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<CreateIcon />}
                sx={{ mt: 2, mb: 1, ml: 2, width: 120 }}
              >
                登録
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={5}>
          <Paper sx={{ p: 2 }}>
            <Totals />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            {inputListItem}
            {inputListItem}
            {inputListItem}
            {inputListItem}
            {inputListItem}
            {inputListItem}
          </Paper>
        </Grid>
      </Grid>
    </GenericTemplate>
  );
};
