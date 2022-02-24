import TopMenuBar from 'Components/TopMenuBar'
import SurveyForm from 'Pages/SurveyPage/SurveyForm'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Splitter, { SplitDirection } from '@devbookhq/splitter'
import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material'

export default function SurveyPage () {
  type DatasetRow = {
    Region: string,
    Condition: string,
    Signal: number
  }

  // Schema of the entire dataset taken in
  type Dataset = {
    id: string,
    type: string,
    data: DatasetRow[]
  }

  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)
  const dataset = useRef([] as Dataset[])
  const [questionNum, setQuestionNum] = useState(1)

  // Load the dataset
  useEffect(() => {
    fetch('/api/dataset')
      .then(res => res.json())
      .then(data => {
        dataset.current = data as Dataset[]
        console.log('Dataset loaded!')
        setLoaded(true)
      })
  }, [])

  return (
    <>
      <TopMenuBar back onBack = { () => navigate('/') }/>
      {
        (() => {
          if (loaded) {
            return (
            <Box component="div"
              sx={ {
                width: '100vw',
                height: '90vh'
              } }>
              <Splitter minHeights={[100, 100]} direction={ SplitDirection.Vertical }>
                <Box sx={ { width: '100%', height: '100%', overflow: 'auto' } }>
                  <Paper elevation={5} sx = { { margin: 3, padding: 3 } }>
                    <Typography variant="h2" component="div" gutterBottom>
                      {`Question ${questionNum}\n${JSON.stringify(dataset.current[questionNum - 1])}`}
                    </Typography>
                  </Paper>
                </Box>
                <Box sx= { { width: '100%', height: '100%', overflow: 'auto' } } >
                  <SurveyForm questionNum={questionNum} lastQuestion onPrevious={() => setQuestionNum(questionNum - 1)} onNext={() => setQuestionNum(questionNum + 1)} questionType={'bar'} datasetID={'foo'} />
                </ Box>
              </Splitter>
            </Box>
            )
          } else {
            return (
            <Box component="div"
              sx={ {
                width: '100vw',
                height: '90vh'
              } }>
                <Paper elevation={5} sx = { { margin: 3, padding: 3 } }>
                    <Typography variant="h1" component="div" gutterBottom>
                      {'Loading Dataset...'}
                    </Typography>
                </Paper>
              </Box>
            )
          }
        })()
      }
    </>
  )
}
