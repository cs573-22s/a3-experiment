import React, { useEffect } from 'react'
import Paper from '@mui/material/Paper'
import TopMenuBar from 'Components/TopMenuBar'
import { Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

/**
 * Home Page
 * James Plante (jplante@wpi.edu)
 */

function Home () {
  const navigate = useNavigate()

  return (
    <>
      <TopMenuBar />
      <Container fixed sx = { { padding: 2, width: '90vw' } }>
        <Paper elevation={5} sx = { { padding: 3 } }>
          <Typography variant="h1" component="div" gutterBottom>
            Welcome
          </Typography>
          <Typography variant="h2" component="div" gutterBottom>
            Instructions
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            Thank you for participating in this survey. You will be presented charts that depict brain data.
            Each chart will contain data from multiple regions in the brain along with data from multiple conditions.
            Each region will be displayed on the same chart, while you will need to use the buttons at the
            top of the charts to view each condition. You will be asked a series of questions about each chart.
            Please answer to the best of your ability.
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            The survey should take no longer than one hour. You can revisit previous questions using the back button on the survey page.
            Please do not use the back/forward button in your browser window. When you revisit previous questions, it will reset your
            responses for any question you pass through, so you will need to reanswer them. There is a submit button at the end of
            the survey to save your responses. Thank you again for participating in our survey!
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            If you have any problems or questions while taking the survey, please contact Ally Howell (anhowellmunson@wpi.edu)
            or Jim Plante (jplante@wpi.edu).
          </Typography>
          <Typography variant="subtitle1" component="div" gutterBottom>
            <strong>To start the survey, click the button below.</strong>
          </Typography>
          <Button variant="contained" color="success" onClick={ () => navigate('/survey') }>
            Start Survey
          </Button>
        </Paper>
      </Container>
    </>
  )
};

export default Home
