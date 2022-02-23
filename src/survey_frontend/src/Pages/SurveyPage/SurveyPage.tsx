import TopMenuBar from 'Components/TopMenuBar'
import SurveyForm from 'Pages/SurveyPage/SurveyForm'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Splitter, { SplitDirection } from '@devbookhq/splitter'
import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material'

export default function SurveyPage () {
  const navigate = useNavigate()
  const [questionNum, setQuestionNum] = useState(0)

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
              <Typography variant="h2" component="div" gutterBottom>
                {`Question ${questionNum}`}
              </Typography>
            </Paper>
          </Box>
          <Box sx= { { width: '100%', height: '100%', overflow: 'auto' } } >
            <SurveyForm questionNum={questionNum} onPrevious={() => setQuestionNum(questionNum - 1)} onNext={() => setQuestionNum(questionNum + 1)} questionType={'bar'} datasetID={'foo'} />
          </ Box>
        </Splitter>
      </Box>
    </>
  )
}
