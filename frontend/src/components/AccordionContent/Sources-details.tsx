import { Grid, Typography, Link } from '@mui/material'

export const Sources = ({ number, text1, text2 }: any) => {
  return (
    <Grid container mb="2rem">
      <Grid
        item
        borderRadius="50%"
        bgcolor="#DFF0D8"
        sx={{ width: '50px', height: '50px' }}
        textAlign="center"
        alignItems="center"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography
          variant="h6"
          fontWeight="500"
          fontSize="24px"
          lineHeight="26px"
        >
          {number}
        </Typography>
      </Grid>
      <Grid item sx={{ ml: '32px', width: '500px' }}>
        <div dangerouslySetInnerHTML={{ __html: text1 }} className="source-content"></div>
        <Link href={text2}
          display="inline"
          fontFamily="Public Sans"
          fontWeight="700"
          fontSize="16px"
          lineHeight="24px"
          color="#00653E"
          sx={{ ml: '10px', textDecoration: 'underline' }}
          >Source</Link>
      </Grid>
    </Grid>
  )
}
