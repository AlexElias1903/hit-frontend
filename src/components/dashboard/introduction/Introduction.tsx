import { FC, useCallback, useEffect } from 'react';
import {
    Box,
    Typography,
    SliderThumb,
    Slider,
    CircularProgress,
    InputBase,
    Button,
    createStyles,
    makeStyles,
    Skeleton
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import React from 'react';
import axios from 'axios';
import { requestConfig } from 'src/config';
import { useSnackbar } from 'notistack';

interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> { }

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
            width: "50%",
            [theme.breakpoints.down(1000)]: {
                width: "80%",
            },
        },
    }),
);


const AirbnbSlider = styled(Slider)(({ theme }) => ({
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


function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
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
    const [value, setValue] = React.useState('');
    const { enqueueSnackbar } = useSnackbar();
    const [id, setId] = React.useState('');
    const [loadingSkeleton, setLoadingSkeleton] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const classes = useStyles();
    const [introduction, setIntroduction] = React.useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const getIntroductionRequest = useCallback(async () => {
        try {
            const response = await axios.get(`${requestConfig.url}/getIntroduction`);
            setValue(response.data.description)
            setIntroduction(response.data.description)
            setLoadingSkeleton(false)
            setId(response.data.id)
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        getIntroductionRequest();
    }, [getIntroductionRequest]);

    async function setIntroductionRequest() {
        try {
            setLoading(true)
            await axios.post(`${requestConfig.url}/setIntroduction`, {
                description: value,
                id: id
            });
            setIntroduction(value)
            enqueueSnackbar('Salvo com sucesso', {
                anchorOrigin: {
                    horizontal: 'right',
                    vertical: 'top'
                },
                variant: 'success'
            });
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.error(err);
            enqueueSnackbar('Ocorreu um erro', {
                anchorOrigin: {
                    horizontal: 'right',
                    vertical: 'top'
                },
                variant: 'error'
            });
        }
    };

    function sendVerify() {
        if (introduction !== value) {
            return true
        }
        return false
    }

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
                        Introdução
                        <AirbnbSlider
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
                    <Box m={5}>
                        {loadingSkeleton ? (
                            <>
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                            </>
                        ) : (
                            <>
                                <InputBase
                                    id="outlined-multiline-flexible"
                                    multiline={true}
                                    fullWidth
                                    value={value}
                                    onChange={handleChange}
                                    inputProps={{
                                        style: {
                                            fontSize: 15,
                                            fontFamily: 'Montserrat',
                                            color: 'white'
                                        }
                                    }}
                                />
                            </>
                        )
                        }
                    </Box>
                </Box>
            </Box>
            {sendVerify() &&
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Box m={5}>
                        <Button
                            onClick={setIntroductionRequest}
                            disabled={loading}
                        >
                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            Enviar
                        </Button>
                    </Box>
                </Box>
            }
        </>
    );
};


export default Introduction;
