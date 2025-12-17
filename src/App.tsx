import { useState } from 'react'
import './App.css'
import { Box, Button, Container, CssBaseline, Link, ListItem, ListItemText, Snackbar, TextField, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { generateHkid, generateHkidBatch } from './hkid-utils'
import { List, RowComponentProps } from 'react-window';
import SourceSansPro from './assets/font/source-sans-pro-latin-400-normal.woff2';
import SourceSansProBold from './assets/font/source-sans-pro-latin-600-normal.woff2';
import GithubMark from './assets/github-mark.svg';



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

  function renderHkidRow({
    index,
    hkidList,
    style
  }: RowComponentProps<{
    hkidList: string[];
}>){
    return (<Box sx={style}>
        <Typography key={index}  sx={{ fontSize: '2.188rem', letterSpacing: '6px', fontWeight: '700', margin:'0 15px'}} color='primary' >{hkidList[index]}</Typography>
      </Box>)}

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{position: 'absolute', top:'1em', right: '1em', display: 'flex'}}>
        <Typography color='primary' fontSize={'1.3rem'}>Credit: <Link href='https://pinkylam.me/playground/hkid/'>Ice Lam</Link></Typography>
        <Box sx={{ borderLeft: '1.5px solid white', margin: '0 7px'}} lineHeight={1.5}></Box>
        <Link href='https://github.com/carloschau/hkid-generator' sx={{ height:'1.75em'}} >{<img height={'100%'} src={GithubMark}></img>}</Link>
      </Box>
      <Container sx={{display:'flex', flexDirection:'column', alignItems:'center', marginTop: '30px' }}>
        <Typography sx={{ fontSize: '1.75rem', width: '360px', margin: '0 80px 30px 80px ', fontWeight: '300', maxWidth: '320px', lineHeight:'1.3'}} color='primary'>Hong Kong Identity Card Number Generator</Typography>
        <Box sx={{cursor: 'pointer' }} onClick={() =>{
          navigator.clipboard.writeText(hkidList.join("\n"));
          setOpenSnackBar(true);
        }} >                    
          <List 
            rowCount={hkidList.length} 
            rowProps={{hkidList}} 
            overscanCount={5} 
            rowHeight={60}
            rowComponent={renderHkidRow}
            style={{width:'300px', maxHeight:'500px'}}
          />
        </Box>
        <Box sx={{ marginTop: '40px'}}>
          <Box><TextField variant='standard'sx={{ input: {fontSize:'2.5rem', textAlign: 'center', color:'white'}, maxWidth: '200px'}} size='small' type='number' color='primary' onChange={e=> setNum(parseInt(e.target.value))} value={num}></TextField></Box>
        <Button variant='outlined' size='large' sx={{ textTransform:'none', borderWidth: '3px', borderColor: 'white', marginTop:'10px', fontSize: '1.25rem', padding:'15px 36px', minWidth:'70px', lineHeight: 1 }} onClick={() => {
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
