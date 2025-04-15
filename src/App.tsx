import { useState } from 'react'
import './App.css'
import { Box, Button, Container, CssBaseline, Snackbar, TextField, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { generateHkid, generateHkidBatch } from './hkid-utils'
import SourceSansPro from './assets/font/source-sans-pro-latin-400-normal.woff2';
import SourceSansProBold from './assets/font/source-sans-pro-latin-600-normal.woff2';



function App() {
  const theme = createTheme({    
    typography: {
      fontFamily: 'Source Sans Pro,sans-serif',
      fontWeightRegular: 300
    },    
    components: {
      MuiCssBaseline: {
        styleOverrides: `       
      @font-face {
        font-family: 'Source Sans Pro';
        src: local('SourceSansPro-Regular'), url(${SourceSansPro}) format('woff2');
        font-weight: normal;
        font-style: normal;

      }
        @font-face {
        font-family: 'Source Sans Pro';
        src:  url(${SourceSansProBold}) format('woff2');
        font-weight: 700;
        font-style: normal;

      }
      `,
      },
    },
    palette: {
      background: {
        default: "#55c185"
      },
      primary: {
        main: "#fff"
      }
    },
  });

  const [hkidList, setHkidList] = useState([generateHkid()])
  const [num, setNum] = useState(1)
  const [openSnackbar, setOpenSnackBar] = useState(false)

  const handleClose = () => {
    setOpenSnackBar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <Typography sx={{ fontSize: '28px', width: '360px', margin: '0 80px 30px 80px ', fontWeight: '300', maxWidth: '320px', lineHeight:'1.3'}} color='primary'>Hong Kong Identity Card Number Generator</Typography>
        <Box sx={{cursor: 'pointer', display:'flex', flexWrap: 'wrap'}} onClick={() =>{
          navigator.clipboard.writeText(hkidList.join("\n"));
          setOpenSnackBar(true);
        }} >
          {/* <Typography sx={{ fontSize: '45px', fontFamily: 'Source Sans Pro, sans-serif', letterSpacing: '6px', fontWeight: '700' }} color='primary' >{hkid}</Typography> */}
          {hkidList.map((hkid, i) => <Typography key={hkid+i} sx={{ fontSize: '35px', fontFamily: 'Source Sans Pro, sans-serif', letterSpacing: '6px', fontWeight: '700', margin:'0 20px'}} color='primary' >{hkid}</Typography>)}
        </Box>
        <Box sx={{ marginTop: '40px'}}>
          <Box><TextField variant='standard'sx={{ input: {fontSize:'40px', textAlign: 'center', color:'white'}, maxWidth: '200px'}} size='small' type='number' color='primary' onChange={e=> setNum(parseInt(e.target.value))} value={num}></TextField></Box>
        <Button variant='outlined' size='large' sx={{ textTransform:'none', borderWidth: '3px', borderColor: 'white', marginTop:'10px', fontSize: '20px', padding:'15px 36px', minWidth:'70px', lineHeight: 1 }} onClick={() => {
          setHkidList(generateHkidBatch(num))
        }}>
          Generate
        </Button>
        </Box>
      </Container>
      <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{vertical:'bottom', horizontal:'center'}}
        message="Copied to clipboard."        
        
      />
    </ThemeProvider>
  )
}

export default App
