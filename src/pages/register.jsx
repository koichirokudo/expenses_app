import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {green} from '@mui/material/colors';

import {Link as RouterLink} from 'react-router-dom';
import {Initial} from './initial';
import axios from 'axios';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleRegister = e => {
    e.preventDefault();
    axios.post(`http://localhost/api/user_create`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
    // setSubmitted(true);
  };

  if (submitted) {
    return <Initial/>;
  }

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
        noValidate
        autoComplete="off"
      >
        <Avatar sx={{bgcolor: green[500], mb: 2}}>
          <AppRegistrationIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          新規登録
        </Typography>
        <form onSubmit={handleRegister}>
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
            defaultValue={email}
            onChange={event => setPassword(event.target.value)}
          />
          <TextField
            required
            fullWidth
            type="password"
            margin="normal"
            label="もう一度パスワード"
            defaultValue={email}
            onChange={event => setConfirmPassword(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{mt: '10px', mb: '10px'}}
          >
            新規登録
          </Button>
          <Link
            component={RouterLink}
            to="/"
            variant="body2"
          >
            ログイン画面
          </Link>
        </form>
      </Box>
    </Container>
  );
}
