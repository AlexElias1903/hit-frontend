import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  FormHelperText,
  TextField
} from '@material-ui/core';
import { requestConfig } from 'src/config';
import axios from 'axios'

const Login: FC = (props) => {
  return (
    <Formik
      initialValues={{
        usuario: '',
        senha: '',
        submit: null
      }}
      validationSchema={
        Yup
          .object()
          .shape({
            usuario: Yup
              .string()
              .max(255)
              .required('Insira seu usuário'),
            senha: Yup
              .string()
              .max(255)
              .required('Insira sua senha')
          })
      }
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }): Promise<void> => {
        try {
          console.log(requestConfig)
          const request = await axios.post(`${requestConfig.url}/login`, {
            user: values.usuario,
            password: values.senha
          })
          localStorage.setItem("usuario", request.data.user);
          localStorage.setItem("cargo", request.data.role);
          window.location.href = "/dashboard";

          setStatus({ success: true });
          setSubmitting(false);

        } catch (err) {
          console.error(err);

          setStatus({ success: false });
          setErrors({ submit: 'Senha incorreta'});
          setSubmitting(false);

        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }): JSX.Element => (
        <form
          noValidate
          onSubmit={handleSubmit}
          {...props}
        >
          <TextField
            autoFocus
            error={Boolean(touched.usuario && errors.usuario)}
            fullWidth
            helperText={touched.usuario && errors.usuario}
            label="Usuário"
            margin="normal"
            name="usuario"
            onBlur={handleBlur}
            onChange={handleChange}
            type="usuario"
            value={values.usuario}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.senha && errors.senha)}
            fullWidth
            helperText={touched.senha && errors.senha}
            label="Senha"
            margin="normal"
            name="senha"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.senha}
            variant="outlined"
          />
          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>
                {errors.submit}
              </FormHelperText>
            </Box>
          )}
          <Box sx={{ mt: 2 }}>
            <Button
              color="primary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Entrar
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Login;
