import TopMenuBar from 'Components/TopMenuBar'
import SurveyForm from 'Pages/SurveyPage/SurveyForm'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Splitter, { SplitDirection } from '@devbookhq/splitter'
import Paper from '@mui/material/Paper'

export default function SurveyPage () {
  const navigate = useNavigate()

  return (
    <>
      <TopMenuBar back onBack = { () => navigate('/') }/>
      <Box component="div"
        sx={ {
          width: '100vw',
          height: '90vh'
        } }>
        <Splitter minHeights={[100, 100]} direction={ SplitDirection.Vertical }>
          <Box sx={ { width: '100%', height: '100%', overflow: 'auto' } }>
            <Paper elevation={5} sx = { { margin: 3, padding: 3 } }>
              hello
            </Paper>
          </Box>
          <Box sx= { { width: '100%', height: '100%', overflow: 'auto' } } >
            <SurveyForm questionNum={0} questionType={'bar'} datasetID={'foo'} />
          </ Box>
        </Splitter>
      </Box>
    </>
  )
}
