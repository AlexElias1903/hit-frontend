import { FC } from 'react';
import {
    Box,
    Typography,
    SliderThumb,
    Slider,
    createStyles,
    makeStyles,
    Card,
    Grid,
    Button,
    TextField,
    CircularProgress
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import * as Yup from 'yup';
import { Formik } from 'formik';
import React from 'react';
import axios from 'axios';
import { requestConfig } from 'src/config';
import { useSnackbar } from 'notistack';

interface ComponentProps extends React.HTMLAttributes<unknown> { }

const useStyles = makeStyles((theme) =>
    createStyles({
        buttonProgress: {
            color: '#E26452',
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
        box: {
            width: "40%",
            [theme.breakpoints.down(1000)]: {
                width: "80%",
            },
        },
        root: {
            background: "white",
            borderRadius: '7px',
            transition: 'none',
            borderColor: 'white !important'
        },
        input: {
            color: "white"
        },

        notchedOutline: {
            color: 'black',
            borderColor: 'white !important'
        },
        noBorder: {
            border: "none",
            borderRadius: '0px',
            outline: 'none'
        },
    }),
);


const SliderHit = styled(Slider)(({ theme }) => ({
    color: '#3a8589',
    height: 0,
    padding: '13px 0',
    '& .MuiSlider-thumb': {
        height: 0,
        width: 0,
        backgroundColor: '#707070',
        border: '0px solid currentColor',
        '&:hover': {
            boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
        },
        '& .airbnb-bar': {
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    '& .MuiSlider-track': {
        height: 0,
    },
    '& .MuiSlider-rail': {
        color: "#707070",
        opacity: theme.palette.mode === 'dark' ? undefined : 1,
        height: 3,
    },
}));


function AirbnbThumbComponent(props: ComponentProps) {
    const { children, ...other } = props;
    return (
        <SliderThumb  {...other}>
            {children}
            <img
                alt="slider"
                width='28px'
                height='35px'
                src={`${process.env.PUBLIC_URL}/static/slider.svg`}
            />
        </SliderThumb>
    );
}

const Introduction: FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = React.useState(false);
    const classes = useStyles();

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Box>
                    <Typography color="white" fontFamily={'Montserrat'} fontSize='22px'>
                        Contato
                        <SliderHit
                            components={{ Thumb: AirbnbThumbComponent }}
                            disabled
                            defaultValue={[50, 50]}
                        />
                    </Typography>
                </Box>

            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Box
                    className={classes.box}
                    sx={{
                        backgroundColor: '#EA916B',
                        borderRadius: '8px'
                    }}
                >
                    <Formik
                        initialValues={{
                            nome: '',
                            email: '',
                            mensagem: ''
                        }}
                        validationSchema={
                            Yup
                                .object()
                                .shape({
                                    nome: Yup
                                        .string()
                                        .min(3, 'Insira mais de 3 caracteres')
                                        .max(255)
                                        .required('Insira seu nome'),
                                    email: Yup
                                        .string()
                                        .min(3, 'Insira mais de 3 caracteres')
                                        .max(255)
                                        .required('Insira uma breve descrição do problema'),
                                    mensagem: Yup
                                        .string()
                                        .min(3, 'Insira mais de 3 caracteres')
                                        .max(255)
                                        .required('Insira uma mensagem')
                                })
                        }
                        onSubmit={async (values, {
                            setErrors,
                            setStatus,
                            setSubmitting,
                            setValues
                        }): Promise<void> => {
                            try {
                                setLoading(true)
                                await axios.post(`${requestConfig.url}/sendForm`, {
                                    name: values.nome,
                                    email: values.email,
                                    message: values.mensagem
                                });
                                setStatus({ success: true });
                                values.email = ''
                                values.nome = ''
                                values.mensagem = ''
                                setSubmitting(true);
                                setLoading(false)
                                enqueueSnackbar('Formulário enviado com sucesso', {
                                    anchorOrigin: {
                                        horizontal: 'right',
                                        vertical: 'top'
                                    },
                                    variant: 'success'
                                });

                            } catch (err) {
                                console.error(err);
                                setLoading(false)
                                setStatus({ success: false });
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            values
                        }): JSX.Element => (
                            <form
                                onSubmit={handleSubmit}
                            >
                                <Card sx={{
                                    backgroundColor: '#EA916B',
                                    borderRadius: '8px'
                                }}>
                                    <Box m={5}>
                                        <Grid container spacing={2} width={'100%'}>
                                            <Grid item lg={6} xs={6} >
                                                <TextField
                                                    fullWidth
                                                    required
                                                    color='secondary'
                                                    className={classes.root}
                                                    variant="outlined"
                                                    onBlur={handleBlur}
                                                    InputProps={{
                                                        classes: {
                                                            notchedOutline: classes.notchedOutline,
                                                            colorSecondary: 'white'
                                                        },
                                                        color: 'secondary'
                                                    }}
                                                    focused={false}
                                                    id="nome"
                                                    name="nome"
                                                    placeholder='Nome*'
                                                    onChange={handleChange}
                                                    value={values.nome}
                                                />
                                            </Grid>
                                            <Grid item lg={6} xs={6}>
                                                <TextField
                                                    fullWidth
                                                    required
                                                    color='secondary'
                                                    className={classes.root}
                                                    variant="outlined"
                                                    focused={false}
                                                    onBlur={handleBlur}
                                                    InputProps={{
                                                        classes: {
                                                            notchedOutline: classes.notchedOutline,
                                                        }
                                                    }}
                                                    id="email"
                                                    name="email"
                                                    placeholder='Email*'
                                                    onChange={handleChange}
                                                    value={values.email}
                                                />
                                            </Grid>
                                            <Grid item lg={12} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    required
                                                    color='secondary'
                                                    className={classes.root}
                                                    variant="outlined"
                                                    focused={false}
                                                    InputProps={{
                                                        classes: {
                                                            notchedOutline: classes.notchedOutline,
                                                            colorSecondary: 'white'
                                                        },
                                                        color: 'secondary'
                                                    }}
                                                    onBlur={handleBlur}
                                                    id="mensagem"
                                                    name="mensagem"
                                                    placeholder='Mensagem*'
                                                    onChange={handleChange}
                                                    rows={10}
                                                    multiline
                                                    value={values.mensagem}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                mt: 2
                                            }}
                                        >
                                            <Box m={1}>
                                                <Button
                                                    sx={{
                                                        backgroundColor: '#373735',
                                                        color: 'white',
                                                        width: '160px',
                                                        borderRadius: '8px',
                                                        '&:hover': {
                                                            background: "#2D2D2D",
                                                        },
                                                    }}
                                                    disabled={loading}
                                                    type="submit"
                                                >
                                                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                                    Enviar
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Card>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </>
    );
};


export default Introduction;
