import React, {useState} from 'react';
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
import {green} from '@mui/material/colors';

export function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = e => {
    e.preventDefault();
    console.log('email: ' + email + ' password: ' + password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        sx={{
          marginTop: 4,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        noValidate
        autoComplete="off"
      >
        <Avatar sx={{bgcolor: green[500], mb: 2}}>
          <CalculateIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            required
            fullWidth
            margin="normal"
            label="メールアドレス"
            defaultValue={email}
            onChange={event => setEmail(event.target.value)}
          />
          <TextField
            required
            fullWidth
            type="password"
            margin="normal"
            label="パスワード"
            defaultValue={password}
            onChange={event => setEmail(event.target.value)}
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
            <Grid item>
              <Link
                component={RouterLink}
                to='/register'
                variant="body2">
                新規作成
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
