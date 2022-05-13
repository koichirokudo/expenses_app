import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Alert, CircularProgress, Collapse, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from '../api/axios';

const MIN_CHAR = 3;
const MAX_CHAR = 20;
const REGISTER_URL = '/initial';

export function Initial() {
  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [setting, setSetting] = useState('separate');

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const result = (name.length >= MIN_CHAR && name.length <= MAX_CHAR);
    setValidName(result);
  }, [name]);

  const handleInitSetting = async event => {
    setLoading(true);
    event.preventDefault();
    try {
      await axios.post(REGISTER_URL,
        JSON.stringify({name, setting}),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
    } catch (err) {
      console.error(err.response.data);
      if (!err?.response) {
        setErrorMessage('サーバーの応答がありません。');
        setOpen(true);
      } else if (err.response?.status === 422) {
        setErrorMessage(err.response.data.errors);
      } else {
        setErrorMessage('登録に失敗しました。');
        setOpen(true);
      }
    }
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 4,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
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
              fontSize: 'small',
            }}
          >
            {errorMessage}
          </Alert>
        </Collapse>
        <Typography component="h1" variant="h5">
          初期設定{loading &&
          <CircularProgress
            size={32}
            sx={{
              position: 'absolute',
              marginLeft: '10px',
              zIndex: 1,
            }}
          />}
        </Typography>
        <form onSubmit={handleInitSetting}>
          <TextField
            autoComplete="off"
            error={!validName && nameFocus}
            required
            fullWidth
            margin="normal"
            label="ニックネーム"
            helperText="ニックネームを入力してください（3文字以上10文字未満）"
            defaultValue={name}
            onChange={event => setName(event.target.value)}
            onFocus={() => setNameFocus(true)}
            onBlur={() => setNameFocus(false)}
          />
          <Typography sx={{my: 2}}>
            お好みの設定を選んでください。
          </Typography>
          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              row
              aria-label="setting"
              name="row-radio-buttons"
              value={setting}
              onChange={event => setSetting(event.target.value)}
            >
              <FormControlLabel value="separate" control={<Radio/>} label="個別設定"/>
              <FormControlLabel value="share" control={<Radio/>} label="共有設定"/>
            </RadioGroup>
          </FormControl>
          <Box sx={{my: 2}}>
            <Typography sx={{fontSize: '14px'}}>
              共有したい項目のみ共有することができます。<br/>
              共有相手には共有した項目のみ閲覧することが可能です。<br/>
            </Typography>
          </Box>
          <Box sx={{mt: 2, mb: 3}}>
            <Typography sx={{fontSize: '14px'}}>
              共有設定は全ての項目を相手と共有することができます。<br/>
              共有相手は入力した内容を全て閲覧することができます。<br/>
            </Typography>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{mt: '10px', mb: '10px', fontSize: '20px'}}
          >
            登録
          </Button>
        </form>
      </Box>
    </Container>
  );
}