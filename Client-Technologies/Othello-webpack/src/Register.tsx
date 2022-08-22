import { Button, Checkbox, Divider, FormControlLabel, Grid, TextField, Typography, useTheme } from "@mui/material";
import { FC, useState } from "react";

interface FormProps {
  username: string;
  email: string;
  password: string;
  validation: string;
}

const Register: FC = () => {
  const theme = useTheme();
  const [form, setForm] = useState<FormProps>({
    username: '',
    email: '',
    password: '',
    validation: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  } 

  const handleSubmit = () => {
    const newErrors = [];

    if (form.password === form.validation) { 
      
    } else {
      newErrors.push('validation');
    }

    setErrors(newErrors);
  }

  return (
    <form>
      <Grid container>
        <Grid 
          item 
          xs={6}
          sx={{
            p: 4
          }}>
          <Typography 
            variant="h3"
            color='white'
          >
            Register
          </Typography>
          <Divider
            sx={{
              mb: 2
            }}
          />
          <TextField
            required
            fullWidth
            id="username"
            name="username"
            label="Player name"
            value={form.username}
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            id="email"
            name="email"
            label="E-mail"
            type="email"
            value={form.email}
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={form.password}
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            required
            error={errors.includes('validation')}
            fullWidth
            id="validation"
            name="validation"
            label="Repeat Password"
            type="password"
            value={form.validation}
            variant="standard"
            onChange={handleChange}
          />
          <FormControlLabel 
            control={
              <Checkbox 
                name="tos"/>} 
            label="Terms of Service, bladibladibla" />
          <Button 
            variant='contained'
            onClick={handleSubmit}
          >
            Create
          </Button>
        </Grid>
        <Grid 
          item 
          xs={6}
          sx={{
            p: 4,
            backgroundColor: theme.palette.primary.dark
          }}
        >
          <TextField
            required
            id="standard-required"
            name="player_name"
            label="Required"
            defaultValue="Hello World"
            variant="standard"
          />
        </Grid>
      </Grid>
    </form>
  );
}

export default Register;