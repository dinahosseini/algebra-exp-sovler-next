import Head from 'next/head';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';

export default function HomePage() {
  const theme = useTheme();
  const [a, setA] = useState<number | string>('');
  const [b, setB] = useState<number | string>('');
  const [result, setResult] = useState<number | string>('');

  const { enqueueSnackbar } = useSnackbar();

  const showErrorSnackbar = useCallback(
    (message: string): void => {
      enqueueSnackbar(message, {
        variant: 'error',
      });
    },
    [enqueueSnackbar],
  );

  const calculateValues = () => {
    if (a === '' || a === null || a === undefined || typeof a !== 'number') {
      showErrorSnackbar('Please specify a valid number for a');
      return;
    }
    if (b === '' || b === null || b === undefined || typeof b !== 'number') {
      showErrorSnackbar('Please specify a valid number for b');
      return;
    }

    if (a === 0) {
      showErrorSnackbar('This expression is not a first degree expression');
    } else {
      setResult((b * -1) / a);
    }
  };

  return (
    <>
      <Head>
        <title>Expression Solver</title>
      </Head>
      <main>
        <Container
          sx={{
            my: 10,
            py: 5,
            borderRadius: 10,
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <Typography variant="h4" gutterBottom mt={3} fontWeight={'bold'}>
            Welcome to My First Degree Expression Solver
          </Typography>

          <Typography variant={'subtitle2'} fontSize={'h6.fontSize'}>
            Enter the coefficient of the variables and then click the calculate
            button
          </Typography>

          <Typography variant={'subtitle2'} fontSize={'h6.fontSize'}>
            Acceptable format: AX + B = 0
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Grid container rowSpacing={10}>
              <Grid>
                <TextField
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  type={'number'}
                  sx={{
                    maxWidth: 100,
                  }}
                  placeholder={'A'}
                  value={a}
                  onChange={(e) => {
                    setA(e.target.value ? Number(e.target.value) : '');
                  }}
                />
              </Grid>

              <Grid>
                <Typography variant={'h3'} sx={{ mx: 3 }}>
                  x +
                </Typography>
              </Grid>

              <Grid>
                <TextField
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  type={'number'}
                  sx={{
                    maxWidth: 100,
                  }}
                  placeholder={'B'}
                  value={b}
                  onChange={(e) => {
                    setB(e.target.value ? Number(e.target.value) : '');
                  }}
                />
              </Grid>

              <Grid>
                <Typography variant={'h3'} sx={{ mx: 3 }}>
                  = 0
                </Typography>
              </Grid>
            </Grid>

            <Button
              variant={'contained'}
              sx={{ my: 3, width: 400 }}
              onClick={calculateValues}
            >
              Calculate
            </Button>
          </Box>

          {typeof result === 'number' ? (
            <Typography variant={'subtitle2'} fontSize={'h6.fontSize'}>
              Calculated value for x is:{' '}
              <Typography component={'span'} color={'error'} variant={'h6'}>
                {result}
              </Typography>
            </Typography>
          ) : null}
        </Container>
      </main>
    </>
  );
}
