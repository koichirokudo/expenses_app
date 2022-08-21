import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { green, red } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress, InputAdornment } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import axios from "../api/axios";
import { Alert, Collapse, IconButton } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const EMAIL_REGEX =
  /^[a-zA-Z\d.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z\d-]+(?:\.[a-zA-Z\d-]+)*$/;
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!-/:-@\[-`{-~]).{10,24}$/;
const REGISTER_URL = "/user/register";

export function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [showMatchPassword, setShowMatchPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [errorList, setErrorList] = useState([]);
  const [success, setSuccess] = useState(false);

  const msg =
    "10桁以上、英大文字、英小文字、数字、記号を" +
    "それぞれ最低1文字ずつ含む必要があります。";

  useEffect(() => {
    if (name.length >= 2 && name.length <= 10) {
      setValidName(true);
    } else {
      setValidName(false);
    }
  });

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password, matchPassword]);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      await axios.post(
        REGISTER_URL,
        JSON.stringify({ name, email, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setOpen(false);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      if (!error?.response) {
        setErrorMessage("サーバーの応答がありません。");
        setOpen(true);
      } else if (error.response?.status === 422) {
        setErrorList(error.response.data.errors);
      } else {
        setErrorMessage("登録に失敗しました。");
        setOpen(true);
      }
    }
    setLoading(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowMatchPassword = () => {
    setShowMatchPassword(!showMatchPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const iconNameAdornment = name
    ? {
        endAdornment: (
          <InputAdornment position="end">
            {validName ? (
              <CheckCircleOutlineIcon sx={{ color: green[500] }} />
            ) : (
              <CloseIcon sx={{ color: red[500] }} />
            )}
          </InputAdornment>
        ),
      }
    : {};

  const iconEmailAdornment = email
    ? {
        endAdornment: (
          <InputAdornment position="end">
            {validEmail ? (
              <CheckCircleOutlineIcon sx={{ color: green[500] }} />
            ) : (
              <CloseIcon sx={{ color: red[500] }} />
            )}
          </InputAdornment>
        ),
      }
    : {};

  const iconPasswordAdornment = password
    ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              sx={{
                marginRight: "1px",
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            {validPassword ? (
              <CheckCircleOutlineIcon sx={{ color: green[500] }} />
            ) : (
              <CloseIcon sx={{ color: red[500] }} />
            )}
          </InputAdornment>
        ),
      }
    : {};

  const iconMatchPasswordAdornment = matchPassword
    ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle confirm password visibility"
              onClick={handleClickShowMatchPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              sx={{
                marginRight: "1px",
              }}
            >
              {showMatchPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            {validMatch ? (
              <CheckCircleOutlineIcon sx={{ color: green[500] }} />
            ) : (
              <CloseIcon sx={{ color: red[500] }} />
            )}
          </InputAdornment>
        ),
      }
    : {};

  return (
    <>
      {success ? (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 4,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CheckCircleOutlineIcon
              fontSize="large"
              sx={{ color: green[500] }}
            />
            <Typography component="h1" variant="h6">
              登録が完了しました。
            </Typography>
            <Link component={RouterLink} to="/login" variant="p">
              ログイン画面
            </Link>
          </Box>
        </Container>
      ) : (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 4,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ bgcolor: green[500], mb: 2 }}>
              <AppRegistrationIcon />
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
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{
                  mb: 2,
                  fontSize: "small",
                }}
              >
                {errorMessage}
              </Alert>
            </Collapse>
            <Typography component="h1" variant="h5">
              新規登録
              {loading && (
                <CircularProgress
                  size={32}
                  sx={{
                    position: "absolute",
                    marginLeft: "10px",
                    zIndex: 1,
                  }}
                />
              )}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                autoComplete="off"
                error={!!errorList?.name || (nameFocus && !validName)}
                required
                fullWidth
                margin="normal"
                label="ニックネーム"
                defaultValue={name}
                helperText={errorList?.name}
                onChange={(event) => setName(event.target.value)}
                onFocus={() => setNameFocus(true)}
                onBlur={() => setNameFocus(false)}
                InputProps={iconNameAdornment}
              />
              <TextField
                autoComplete="off"
                required
                error={!!errorList?.email || (emailFocus && !validEmail)}
                fullWidth
                margin="normal"
                label="メールアドレス"
                defaultValue={email}
                helperText={errorList?.email}
                onChange={(event) => setEmail(event.target.value)}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                InputProps={iconEmailAdornment}
              />
              <TextField
                autoComplete="off"
                required
                error={
                  !!errorList?.password || (passwordFocus && !validPassword)
                }
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                label="パスワード"
                defaultValue={password}
                helperText={errorList?.password || msg}
                onChange={(event) => setPassword(event.target.value)}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                InputProps={iconPasswordAdornment}
              />
              <TextField
                autoComplete="off"
                required
                error={matchFocus && !validMatch}
                type={showMatchPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                label="確認用パスワード"
                defaultValue={matchPassword}
                onChange={(event) => setMatchPassword(event.target.value)}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                InputProps={iconMatchPasswordAdornment}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: "10px", mb: "10px" }}
                disabled={!validEmail || !validPassword || !validMatch}
              >
                新規登録
              </Button>
              <Link component={RouterLink} to="/login" variant="body2">
                ログイン画面
              </Link>
            </form>
          </Box>
        </Container>
      )}
    </>
  );
}
