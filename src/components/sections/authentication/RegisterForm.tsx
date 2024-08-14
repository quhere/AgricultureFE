import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import IconifyIcon from 'components/base/IconifyIcon';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/path';

const authentication = async (role: string, email: string, password: string, name: string,  phone: string, address: string) =>
  await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/authentication/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      role: role,
      email: email,
      password: password,
      name: name,
      phoneNumber: phone,
      address: address,
    }),
  }).then((res) => {
    return res.json();
  });

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const register = useMutation({
    mutationFn: ({ role, email, password, name, phone, address }: { role: string; email: string; password: string; name: string; phone: string; address: string }) =>
      authentication(role, email, password,  name, phone, address),
    onSuccess: (data) => {
      // console.log('data', data);
      localStorage.setItem('user', JSON.stringify(data));
      navigate(paths.login);  
    },
  });

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    register.mutate({
      email: formJson.email.toString(),
      password: formJson.password.toString(),
      role: formJson.role.toString(),
      name: formJson.name.toString(),
      phone: formJson.phone.toString(),
      address: formJson.address.toString(),
    });
  };
  
  return (
    <Box
      component="form" 
      onSubmit={handleRegister} 
      sx={{
        mt: { sm: 3, xs: 1.5 },
      }}
    >
      <Stack spacing={1}>
        <TextField fullWidth variant="outlined" id="mail" type="text" label="Email" name='email'/>
        <TextField fullWidth variant="outlined" id="name" type="text" label="Name" name='name'/>
        <TextField fullWidth variant="outlined" id="phone" type="tel" label="Phone" name='phone'/>
        <TextField fullWidth variant="outlined" id="adress" type="text" label="Adress" name='address'/>
        <TextField
          fullWidth
          variant="outlined"
          name='password'
          id="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <IconifyIcon icon="el:eye-open" color="action.active" />
                  ) : (
                    <IconifyIcon icon="el:eye-close" color="action.focus" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControl
            variant="filled"
            required
            style={{
              marginTop: '10px',
            }}
            sx={{ mt: 1, minWidth: 80, color: 'text.secondary' }}
          >
            <InputLabel id="demo-dialog-select-label">Role</InputLabel>
            <Select
              fullWidth
              sx={{ whiteSpace: 'normal', wordWrap: 'break-all' }}
              style={{
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                textWrap: 'wrap',
                maxWidth: '500px',
              }}
              defaultValue={''}
              displayEmpty
              size="small"
              name="role"
              labelId="demo-dialog-select-label"
              id="demo-dialog-select"
            >
              <MenuItem style={{ whiteSpace: 'normal' }} value="">
                <em>None</em>
              </MenuItem>

            <MenuItem value="supplier">Supplier</MenuItem>
            <MenuItem value="distributor">Distributor</MenuItem>
            <MenuItem value="seller">Seller</MenuItem>
          </Select>
        </FormControl>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
        >
          Sign Up
        </Button>
        <Stack
          spacing={0.5}
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mb: 1,
          }}
        >
          <Typography variant="subtitle1">By creating account, you agree to our</Typography>
          <Link href="#!">
            <Typography color="primary" variant="subtitle1">
              Terms of Service
            </Typography>
          </Link>
        </Stack>
      </Stack>
      <Divider
        sx={{
          my: 3,
        }}
      />

      <Stack
        spacing={1.5}
        sx={{
          mt: 4,
        }}
      >
        <Typography textAlign="center" color="text.secondary" variant="subtitle1">
          Or create an account using:
        </Typography>
        <Button
          startIcon={<IconifyIcon icon="flat-color-icons:google" />}
          sx={{ typography: { sm: 'button', xs: 'subtitle1', whiteSpace: 'nowrap' } }}
          variant="outlined"
        >
          Continue with Google
        </Button>
        <Button
          startIcon={<IconifyIcon icon="logos:facebook" />}
          sx={{ typography: { sm: 'button', xs: 'subtitle1', whiteSpace: 'nowrap' } }}
          variant="outlined"
        >
          Continue with Facebook
        </Button>
      </Stack>
    </Box>
  );
};

export default RegisterForm;
