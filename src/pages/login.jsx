import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CalculateIcon from '@mui/icons-material/Calculate';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import {Link as RouterLink} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {green, red} from '@mui/material/colors';
import axios from '../api/axios';
import {Alert, CircularProgress, Collapse, IconButton, InputAdornment} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import {Visibility, VisibilityOff} from '@mui/icons-material';

const EMAIL_REGEX = /^[a-zA-Z\d.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z\d-]+(?:\.[a-zA-Z\d-]+)*$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!-/:-@\[-`{-~]).{10,24}$/;
const REGISTER_URL = '/login';

export function Login() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [errorList, setErrorList] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
  }, [pwd]);


  const handleLogin = async (event) => {
    setOpen(false);
    setLoading(true);
    event.preventDefault();
    try {
      await axios.get('/sanctum/csrf-cookie', {withCredentials: true});
      await axios.post(REGISTER_URL,
        JSON.stringify({email, password: pwd}),
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      ).then((response) => {
        console.log(response);
        setOpen(false);
        setSuccess(true);
      });
    } catch (err) {
      if (!err?.response) {
        setErrorMessage('サーバーの応答がありません');
        setOpen(true);
      } else if (err.response?.status === 422) {
        setErrorList(err.response.data.errors);
        setOpen(true);
      } else {
        setErrorMessage('ログインに失敗しました');
        setOpen(true);
      }
    }
    setLoading(false);
  };

  const handleClickShowPwd = () => {
    setShowPwd(!(showPwd));
  };

  const handleMouseDownPwd = (event) => {
    event.preventDefault();
  };

  const iconEmailAdornment = email ? {
    endAdornment:
      <InputAdornment position="end">
        {validEmail ? <CheckCircleOutlineIcon sx={{color: green[500]}}/> :
          <CloseIcon sx={{color: red[500]}}/>}
      </InputAdornment>,
  } : {};

  const iconPwdAdornment = pwd ? {
    endAdornment:
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPwd}
          onMouseDown={handleMouseDownPwd}
          edge="end"
          sx={{
            marginRight: '1px',
          }}
        >
          {showPwd ? <VisibilityOff/> : <Visibility/>}
        </IconButton>
        {validPwd ? <CheckCircleOutlineIcon sx={{color: green[500]}}/> :
          <CloseIcon sx={{color: red[500]}}/>}
      </InputAdornment>,
  } : {};

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{bgcolor: green[500], mb: 2}}>
          <CalculateIcon/>
        </Avatar>
        <Collapse in={open}>
          <Alert
            variant="outlined"
            severity="error"
            action={
              <IconButton
                aria-label="閉じる"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit"/>
              </IconButton>
            }
            sx={{mb: 2}}
          >
            {errorMessage}
          </Alert>
        </Collapse>
        <Typography component="h1" variant="h5">
          ログイン{loading &&
          <CircularProgress
            size={32}
            sx={{
              position: 'absolute',
              marginLeft: '10px',
              zIndex: 1,
            }}
          />}
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            required
            error={!!errorList?.email || emailFocus && !validEmail}
            fullWidth
            margin="normal"
            label="メールアドレス"
            defaultValue={email}
            helperText={errorList?.email}
            onChange={event => setEmail(event.target.value)}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            InputProps={iconEmailAdornment}
          />
          <TextField
            autoComplete="off"
            required
            error={!!errorList?.password || pwdFocus && !validPwd}
            fullWidth
            type={showPwd ? 'text' : 'password'}
            margin="normal"
            label="パスワード"
            defaultValue={pwd}
            helperText={errorList?.password}
            onChange={event => setPwd(event.target.value)}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            InputProps={iconPwdAdornment}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary"/>}
            label="パスワードを記憶する"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{mt: '10px'}}
          >
            ログイン
          </Button>
          <Grid container sx={{mt: '10px'}}>
            <Grid item>
              <Link href="#" variant="body2">
                パスワードを忘れた場合
              </Link>
            </Grid>
            <Grid item sx={{ml: '180px'}}>
              <Link
                component={RouterLink}
                to="/register"
                variant="body2">
                新規作成
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};
