import React, { useEffect } from 'react'
import Paper from '@mui/material/Paper'
import TopMenuBar from 'Components/TopMenuBar'
import { Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Home () {
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/dataset').then(res => res.json()).then(data => console.log(data))
  }, [])

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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Eget nullam non nisi est sit amet facilisis magna.
            Orci nulla pellentesque dignissim enim sit amet. Est
            pellentesque elit ullamcorper dignissim cras. Sem et
            tortor consequat id porta nibh venenatis cras. Pretium
            nibh ipsum consequat nisl vel pretium lectus quam id.
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            Sit amet commodo nulla facilisi nullam vehicula ipsum.
            Lacinia quis vel eros donec ac odio tempor orci dapibus.
            Donec ac odio tempor orci dapibus ultrices. Vivamus at
            augue eget arcu dictum varius duis at consectetur. Semper
            viverra nam libero justo laoreet sit. Dis parturient montes
            nascetur ridiculus mus mauris vitae ultricies leo. Ut sem
            viverra aliquet eget sit amet tellus cras. Morbi tincidunt
            augue interdum velit euismod in pellentesque massa.
            Sit amet justo donec enim diam vulputate ut. Vitae congue eu consequat ac felis.
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
