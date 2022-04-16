import React, {useEffect, useState} from 'react';
import GenericTemplate from '../components/genericTemplate';
import {
  CssBaseline,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField, ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {inputListItem} from './inputListItem';
import FormControl from '@mui/material/FormControl';
import Totals from './totals';
import {Title} from './title';
import Box from '@mui/material/Box';
import axios from 'axios';

export const InputPage = () => {
  const currentDate = new Date();
  const formatDate = (date) => {
    return date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate();
  };

  const [values, setValues] = useState({
    date: formatDate(currentDate),
    types: 'payments',
    payer: '',
    category: '',
    spend: '',
    income: '',
    memo: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({...values, [prop]: event.target.value});
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post(`http://localhost/api/create`, values)
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  return (
    <GenericTemplate title="収支の入力">
      <CssBaseline/>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item sm={12} md={12} lg={7}>
          <Paper sx={{p: 2}}>
            <Title>収支の入力・編集</Title>
            <form onSubmit={handleSubmit}>
              <Box sx={{mt: 1}}>
                <ToggleButtonGroup
                  color="primary"
                  value={values.types}
                  exclusive
                  onChange={handleChange('types')}
                >
                  <ToggleButton value="payments">支出</ToggleButton>
                  <ToggleButton value="income">収入</ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <Box>
                <TextField
                  id="date"
                  label="支払った日"
                  margin="dense"
                  type="date"
                  defaultValue={formatDate(currentDate)}
                  onChange={handleChange('date')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    style: {fontSize: 18},
                  }}
                  sx={{
                    mt: 2,
                    mr: 2,
                    width: '225px',
                    fontSize: '32px',
                  }}
                />
                <FormControl margin="dense" sx={{mt: 2, width: '25ch'}}>
                  <InputLabel id="payer-label">支払った人</InputLabel>
                  <Select
                    labelId="payer-label"
                    id="payer-select"
                    value={values.payer}
                    label="支払った人"
                    onChange={handleChange('payer')}
                  >
                    <MenuItem value={'工藤'}>工藤</MenuItem>
                    <MenuItem value={'佐藤'}>佐藤</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl margin="dense" sx={{width: '25ch', mr: 2}}>
                  <InputLabel id="category-label">カテゴリ</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category-select"
                    value={values.category}
                    label="カテゴリ"
                    onChange={handleChange('category')}
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

                </FormControl>
                <TextField
                  margin="dense"
                  label="支出"
                  defaultValue={values.spend}
                  onChange={handleChange('spend')}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">￥</InputAdornment>,
                  }}
                  sx={{
                    width: '25ch',
                    mr: 2,
                    display: values.types === 'payments' ? '' : 'none',
                  }}
                />
                <TextField
                  margin="dense"
                  label="収入"
                  defaultValue={values.income}
                  onChange={handleChange('income')}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">￥</InputAdornment>,
                  }}
                  sx={{
                    width: '25ch',
                    display: values.types === 'income' ? '' : 'none',
                  }}
                />
              </Box>
              <TextField
                margin="dense"
                label="メモ"
                defaultValue={values.memo}
                onChange={handleChange('memo')}
                sx={{width: 320}}
              />
              <Button
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<CreateIcon/>}
                sx={{mt: 2, mb: 1, ml: 2, width: 120}}
              >
                登録
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={5}>
          <Paper sx={{p: 2}}>
            <Totals/>
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
  )
    ;
};