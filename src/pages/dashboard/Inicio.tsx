import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Button,
  Grid,
  Typography
} from '@material-ui/core';
import gtm from '../../lib/gtm';
import Logo from 'src/components/Logo';
import Intruduction from '../../components/dashboard/introduction/Introduction'
import Contact from 'src/components/dashboard/contact/Contact';

const Inicio: FC = () => {
  const [currentTab, setCurrentTab] = useState("introduction");
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Página Inicial</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          mt: '100px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Logo
            sx={{
              height: '160px',
              width: '880px'
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: '60px'
          }}
        >
          <Grid container spacing={2} justifyContent="center">
            <Grid item >
              <Button
                onClick={() => setCurrentTab('introduction')}
                sx={{
                  background: 'linear-gradient(#EA916B, #E05A4D)',
                  color: 'white',
                  height: '40px',
                  width: '221px',
                  borderRadius: '10px'

                }}
              >
                <Typography fontFamily={'Montserrat'} fontSize='12px'>INTRODUÇÃO</Typography>
              </Button>
            </Grid>
            <Grid item >
              <Button
                onClick={() => setCurrentTab('contact')}
                sx={{
                  background: 'linear-gradient(#EA916B, #E05A4D)',
                  color: 'white',
                  height: '40px',
                  width: '221px',
                  borderRadius: '10px'
                }}
              >
                <Typography fontFamily={'Montserrat'} fontSize='12px'>CONTATO</Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box marginTop="45px">
          {currentTab === 'introduction'
            && <Intruduction />
          }
          {currentTab === 'contact'
            && <Contact />
          }

        </Box>
      </Box>
    </>
  );
};

export default Inicio;
