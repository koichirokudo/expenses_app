import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export function Initial() {
  const [name, setName] = useState('');

  const handleInitSetting = () => {
    alert('test');
  };

  return (
    <Container component="main" maxWidth="sm">
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
        <Typography component="h1" variant="h5">
          初期設定
        </Typography>
        <Typography component="subtitle1" sx={{mt: 2}}>
          ニックネームを入力してください。
        </Typography>
        <form onSubmit={handleInitSetting}>
          <TextField
            required
            fullWidth
            margin="normal"
            label="ニックネーム"
            defaultValue={name}
            onChange={event => setName(event.target.value)}
          />
          <Typography sx={{my: 2}}>
            お好みの設定を選んでください。
          </Typography>
          <FormControl component="fieldset" fullWidth>
            <RadioGroup row aria-label="setting" name="row-radio-buttons">
              <FormControlLabel value="separate" control={<Radio/>} label="個別設定"/>
              <FormControlLabel value="share" control={<Radio/>} label="共有設定"/>
            </RadioGroup>
          </FormControl>
          <Box sx={{my: 2}}>
            <Typography component="subtitle1">
              個別設定<br/>
            </Typography>
            <Typography component="body1" sx={{fontSize: '14px'}}>
              共有したい項目のみ共有することができます。<br/>
              共有相手には共有した項目のみ閲覧することが可能です。<br/>
            </Typography>
          </Box>
          <Box sx={{mt: 2, mb: 3}}>
            <Typography component="subtitle1">
              共有設定<br/>
            </Typography>
            <Typography component="body1" sx={{fontSize: '14px'}}>
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