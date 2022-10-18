import React, { useEffect, useMemo, useState } from "react";
import GenericTemplate from "../components/template/GenericTemplate";
import {
  Alert,
  CircularProgress,
  CssBaseline,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import { Title } from "./Title";
import Box from "@mui/material/Box";
import { dbFormatDate, formatDate } from "../components/pages/FormatDate";
import { formatMoney } from "../components/pages/FormatMoney";
import axios from "../api/axios";
import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { allCategoryItems } from "../components/pages/CategoryItems";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ja } from "date-fns/locale";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { nextMonth, prevMonth } from "../components/pages/CalcDate";
import { selectIcons } from "../components/pages/SelectIcons";

const REGISTER_URL = "/expenses/register";
const BUDGETS_LIST_URL = "/expenses/index";
const TOTAL_MONTH_SPEND_URL = "/expenses/spend/month";
const TOTAL_MONTH_INCOME_URL = "/expenses/income/month";
const USER_LIST_URL = "/user/index";

export const InputPage = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorList, setErrorList] = useState([]);

  const [dateFocus, setDateFocus] = useState(false);
  const [validDate, setValidDate] = useState(false);

  const [budgets, setBudgets] = useState([]);

  const [users, setUsers] = useState([]);
  const [userIdFocus, setUserIdFocus] = useState(false);
  const [validUserId, setValidUserId] = useState(false);

  const [categoryFocus, setCategoryFocus] = useState(false);
  const [validCategory, setValidCategory] = useState(false);

  const [moneyFocus, setMoneyFocus] = useState(false);
  const [validMoney, setValidMoney] = useState(false);

  const [totalSpend, setTotalSpend] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);

  const [values, setValues] = useState({
    types: "0",
    date: dbFormatDate(currentDate),
    user_id: "",
    category: "",
    money: "",
    note: "",
  });

  /*TODO: ここをレンダー処理前に更新したい。登録ボタンを押した後にも合計値を更新したい useEffectじゃダメっぽい？*/

  /**
   * 登録されているユーザー一覧を取得する
   */
  useEffect(() => {
    (async () => {
      await setLoading(true);
      const response = await axios
        .get(USER_LIST_URL, { withCredentials: true })
        .catch((error) => {
          console.error(error);
        });
      if (response) {
        await setUsers(response.data.user);
      }
      await setLoading(false);
    })();
  }, []);

  /**
   * 今月の支払合計額を取得する
   */
  useEffect(() => {
    (async () => {
      await setLoading(true);
      const response = await axios
        .get(TOTAL_MONTH_SPEND_URL, {
          params: {
            year: year,
            month: month,
          },
          withCredentials: true,
        })
        .catch((error) => {
          console.error(error);
        });
      if (response) {
        await setTotalSpend(response.data.spend);
      }
      await setLoading(false);
    })();
  }, [success, month]);

  /**
   * 今月の支出合計額を取得する
   */
  useEffect(() => {
    (async () => {
      await setLoading(true);
      const response = await axios
        .get(TOTAL_MONTH_INCOME_URL, {
          params: {
            year: year,
            month: month,
          },
          withCredentials: true,
        })
        .catch((error) => {
          console.error(error);
        });
      if (response) {
        await setTotalIncome(response.data.income);
      }
      await setLoading(false);
    })();
  }, [success, month]);

  /**
   * 指定した月の収支履歴を取得する
   */
  useEffect(() => {
    (async () => {
      await setLoading(true);
      const response = await axios
        .get(BUDGETS_LIST_URL, {
          params: {
            year: year,
            month: month,
          },
          withCredentials: true,
        })
        .catch((error) => {
          console.error(error);
        });
      console.log(response.data);
      if (response) {
        await setBudgets(response.data.list);
      }
      await setLoading(false);
    })();
  }, [success, month]);

  /**
   * 次月を表示する
   */
  const handleNextMonth = () => {
    const resultDate = nextMonth(new Date(year, month - 1));
    setYear(resultDate.getFullYear());
    setMonth(resultDate.getMonth() + 1);
  };

  /**
   * 前月を表示する
   */
  const handlePrevMonth = () => {
    const resultDate = prevMonth(new Date(year, month - 1));
    setYear(resultDate.getFullYear());
    setMonth(resultDate.getMonth() + 1);
  };

  /**
   * handle change function
   * @param prop
   * @returns {(function(*): void)|*}
   */
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  /**
   * submit function
   * @param event
   * @returns {Promise<void>}
   */
  const handleSubmit = async (event) => {
    setSubmitLoading(true);
    setSuccess(false);
    console.log(values.date);
    event.preventDefault();
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ ...values }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response) {
        setSuccess(true);
        setSuccessMessage(response.data.message);
        setOpen(true);
      }
    } catch (error) {
      console.log(error.response);
      if (!error?.response) {
        setErrorMessage("サーバーの応答がありません。");
        setSuccess(false);
        setOpen(true);
      } else if (error.response?.status === 422) {
        setSuccess(false);
        setErrorList(error.response.data.errors);
      } else {
        setErrorMessage("登録に失敗しました。");
        setSuccess(false);
        setOpen(true);
      }
    }
    setSubmitLoading(false);
  };

  /**
   * handle close
   */
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <GenericTemplate title="収支の入力">
      <CssBaseline />
      <Snackbar
        open={open}
        autoHideDuration={5000}
        severity="success"
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
      <Typography variant="h3" sx={{ mb: 2 }}>
        <IconButton
          color="primary"
          aria-label="back button"
          component="title"
          onClick={handlePrevMonth}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        {year}年{month}月
        <IconButton
          color="primary"
          aria-label="forward button"
          component="title"
          onClick={handleNextMonth}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
      >
        <Grid item sm={12} md={12} lg={6}>
          <Paper sx={{ p: 2 }} style={{ height: "100%" }}>
            <Title>収支の入力・編集</Title>
            <form onSubmit={handleSubmit}>
              <Box sx={{ mt: 1, mb: 2 }}>
                <ToggleButtonGroup
                  color="primary"
                  value={values.types}
                  exclusive
                  onChange={handleChange("types")}
                >
                  <ToggleButton value="0">支出</ToggleButton>
                  <ToggleButton value="1">収入</ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <Box sx={{ mt: 1, mb: 2 }}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={ja}
                >
                  <DatePicker
                    label="日時"
                    value={values.date}
                    onChange={(date) => {
                      setValues({ ...values, ["date"]: date });
                    }}
                    inputFormat="yyyy/MM/dd"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{
                          mt: 1,
                          mr: 2,
                          width: 230,
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
                <FormControl margin="dense" sx={{ width: 230 }}>
                  <InputLabel id="userid-label">
                    {values.types === "0" ? "支払人" : "受取人"}
                  </InputLabel>
                  <Select
                    labelId="userid-label"
                    id="userid-select"
                    error={
                      !!errorList?.user_id || (userIdFocus && !validUserId)
                    }
                    value={values.user_id}
                    label={values.types === "0" ? "支払人" : "受取人"}
                    onChange={handleChange("user_id")}
                    onFocus={() => setUserIdFocus(true)}
                    onBlur={() => setUserIdFocus(false)}
                  >
                    {users.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error={true}>
                    {errorList?.user_id}
                  </FormHelperText>
                </FormControl>
              </Box>
              <Box sx={{ mt: 1, mb: 1 }}>
                <FormControl margin="dense" sx={{ width: 230, mr: 2 }}>
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
                    onFocus={() => setCategoryFocus(true)}
                    onBlur={() => setCategoryFocus(false)}
                  >
                    {allCategoryItems.map((category, index) => {
                      return (
                        <MenuItem key={index} value={category}>
                          {category}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText error={true}>
                    {errorList?.category}
                  </FormHelperText>
                </FormControl>
                <TextField
                  margin="dense"
                  label="金額"
                  error={!!errorList?.money || (moneyFocus && !validMoney)}
                  defaultValue={values.money}
                  helperText={errorList?.money}
                  onChange={handleChange("money")}
                  onFocus={() => setMoneyFocus(true)}
                  onBlur={() => setMoneyFocus(false)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">￥</InputAdornment>
                    ),
                  }}
                  sx={{
                    width: 230,
                  }}
                />
              </Box>
              <Box>
                <TextField
                  margin="dense"
                  label="メモ"
                  defaultValue={values.note}
                  onChange={handleChange("note")}
                  sx={{ width: 480 }}
                />
              </Box>
              <Box>
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  endIcon={
                    (!submitLoading && <CreateIcon />) ||
                    (submitLoading && (
                      <CircularProgress size={22} color={"inherit"} />
                    ))
                  }
                  sx={{ mt: 1, width: 480 }}
                >
                  登録
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ fontSize: 42 }}>
              <Title>支出合計</Title>
              {formatMoney(totalSpend)} 円
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ fontSize: 42 }}>
              <Title>収入合計</Title>
              {formatMoney(totalIncome)} 円
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Paper>
            {budgets.map((values) => {
              return (
                <List key={values.id}>
                  <ListItem component="div" button>
                    <ListItemAvatar>
                      <Avatar>{selectIcons(values.category)}</Avatar>
                    </ListItemAvatar>
                    <Box
                      textAlign="right"
                      sx={{ pr: 3, fontSize: 12 }}
                      style={
                        values.types === 0
                          ? { color: "red", fontWeight: "bold" }
                          : { color: "green", fontWeight: "bold" }
                      }
                    >
                      {values.types === 0 ? "支出" : "収入"}
                    </Box>
                    <Box textAlign="right" sx={{ pr: 3 }}>
                      {formatDate(values.date)}
                    </Box>
                    <Box textAlign="right" sx={{ pr: 3 }}>
                      {values.category}
                    </Box>
                    <Box textAlign="right" sx={{ pr: 3 }}>
                      {formatMoney(values.money)} 円
                    </Box>
                    <Box textAlign="right" sx={{ pr: 3 }}>
                      {values.name}
                    </Box>
                    <ListItemText
                      secondary={values.note}
                      secondaryTypographyProps={{
                        fontSize: 12,
                        align: "left",
                      }}
                    />
                  </ListItem>
                </List>
              );
            })}
          </Paper>
        </Grid>
      </Grid>
    </GenericTemplate>
  );
};
