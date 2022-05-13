import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {green, red} from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import {CircularProgress, InputAdornment} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import axios from '../api/axios';
import {Alert, Collapse, IconButton} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {Visibility, VisibilityOff} from '@mui/icons-material';

const EMAIL_REGEX = /^[a-zA-Z\d.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z\d-]+(?:\.[a-zA-Z\d-]+)*$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!-/:-@\[-`{-~]).{10,24}$/;
const REGISTER_URL = '/register';

export function Register() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [showMatchPwd, setShowMatchPwd] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [errorList, setErrorList] = useState([]);
  const [success, setSuccess] = useState(false);

  const msg = '10桁以上、英大文字、英小文字、数字、記号を' +
    'それぞれ最低1文字ずつ含む必要があります。';

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrorMessage('');
  }, [email, pwd, matchPwd]);

  const handleSubmit = async event => {
    setLoading(true);
    event.preventDefault();
    try {
      await axios.post(REGISTER_URL,
        JSON.stringify({email, password: pwd}),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          // TODO: CORS
          // withCredentials: true,
        },
      );
      setOpen(false);
      setSuccess(true);
    } catch (err) {
      console.error(err.response.data);
      if (!err?.response) {
        setErrorMessage('サーバーの応答がありません。');
        setOpen(true);
      } else if (err.response?.status === 422) {
        setErrorList(err.response.data.errors);
      } else {
        setErrorMessage('登録に失敗しました。');
        setOpen(true);
      }
    }
    setLoading(false);
  };

  const handleClickShowPwd = () => {
    setShowPwd(!(showPwd));
  };

  const handleClickShowMatchPwd = () => {
    setShowMatchPwd(!(showMatchPwd));
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

  const iconMatchPwdAdornment = matchPwd ? {
    endAdornment:
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle confirm password visibility"
          onClick={handleClickShowMatchPwd}
          onMouseDown={handleMouseDownPwd}
          edge="end"
          sx={{
            marginRight: '1px',
          }}
        >
          {showMatchPwd ? <VisibilityOff/> : <Visibility/>}
        </IconButton>
        {validMatch ? <CheckCircleOutlineIcon sx={{color: green[500]}}/> :
          <CloseIcon sx={{color: red[500]}}/>}
      </InputAdornment>,
  } : {};

  return (
    <>
      {success ? (
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
            <CheckCircleOutlineIcon
              fontSize="large"
              sx={{color: green[500]}}
            />
            <Typography component="h1" variant="h6">
              登録が完了しました。
            </Typography>
            <Link component={RouterLink} to="/login" variant="p">ログイン画面</Link>
          </Box>
        </Container>
      ) : (
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
              <AppRegistrationIcon/>
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
                sx={{
                  mb: 2,
                  fontSize: "small"
                }}
              >
                {errorMessage}
              </Alert>
            </Collapse>
            <Typography component="h1" variant="h5">
              新規登録{loading &&
              <CircularProgress
                size={32}
                sx={{
                  position: 'absolute',
                  marginLeft: '10px',
                  zIndex: 1,
                }}
              />}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                autoComplete="off"
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
                type={showPwd ? 'text' : 'password'}
                fullWidth
                margin="normal"
                label="パスワード"
                defaultValue={pwd}
                helperText={errorList?.password || msg}
                onChange={event => setPwd(event.target.value)}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                InputProps={iconPwdAdornment}
              />
              <TextField
                autoComplete="off"
                required
                error={matchFocus && !validMatch}
                type={showMatchPwd ? 'text' : 'password'}
                fullWidth
                margin="normal"
                label="確認用パスワード"
                defaultValue={matchPwd}
                onChange={event => setMatchPwd(event.target.value)}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                InputProps={iconMatchPwdAdornment}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{mt: '10px', mb: '10px'}}
                disabled={!validEmail || !validPwd || !validMatch}
              >
                新規登録
              </Button>
              <Link
                component={RouterLink}
                to="/login"
                variant="body2"
              >
                ログイン画面
              </Link>
            </form>
          </Box>
        </Container>
      )}
    </>
  );
}
