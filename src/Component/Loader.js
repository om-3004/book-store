import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <div
    style={{
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
        width:'95vw',
        height:'60vh',
        
    }}>
        
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
    </div>
  );
}