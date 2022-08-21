import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CalculateIcon from "@mui/icons-material/Calculate";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import axios from "../api/axios";
import { Alert, CircularProgress, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuthUserContext } from "../providers";

const REGISTER_URL = "/login";

export function LoginPage() {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [errorList, setErrorList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const authUser = useAuthUserContext();

  const handleLogin = async (event) => {
    setOpen(false);
    setLoading(true);
    event.preventDefault();
    let cleanedUp = false;
    try {
      await axios.get("/sanctum/csrf-cookie", { withCredentials: true });
      await axios.post(REGISTER_URL, JSON.stringify({ email, password: pwd }), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const response = await axios.get("/user/me", { withCredentials: true });
      cleanedUp = true;
      authUser.login(response?.data.user, () => {
        navigate("/", { replace: true });
      });
    } catch (error) {
      if (!error?.response) {
        setErrorMessage("サーバーの応答がありません");
        setOpen(true);
      } else if (error.response?.status === 422) {
        setErrorList(error.response.data.errors);
        setOpen(true);
      } else {
        setErrorMessage("メールアドレスまたはパスワードが違います。");
        setOpen(true);
      }
    }
    if (!cleanedUp) {
      setLoading(false);
    }
  };

  return (
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
          <CalculateIcon />
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
          ログイン
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
        <form onSubmit={handleLogin}>
          <TextField
            required
            error={!!errorList?.email}
            fullWidth
            margin="normal"
            label="メールアドレス"
            defaultValue={email}
            helperText={errorList?.email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            autoComplete="off"
            required
            error={!!errorList?.password}
            fullWidth
            type="password"
            margin="normal"
            label="パスワード"
            defaultValue={pwd}
            helperText={errorList?.password}
            onChange={(event) => setPwd(event.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="パスワードを記憶する"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: "10px" }}
          >
            ログイン
          </Button>
          <Grid container sx={{ mt: "10px" }}>
            <Grid item>
              <Link href="#" variant="body2">
                パスワードを忘れた場合
              </Link>
            </Grid>
            <Grid item sx={{ ml: "180px" }}>
              <Link component={RouterLink} to="/register" variant="body2">
                新規作成
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
