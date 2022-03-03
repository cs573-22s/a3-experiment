import TopMenuBar from 'Components/TopMenuBar'
import SurveyForm, { FormAnswer } from 'Pages/SurveyPage/SurveyForm'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Splitter, { SplitDirection } from '@devbookhq/splitter'
import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material'
import { Dataset } from 'Types/Dataset'
import BarChart from 'Components/Visualizations/BarChart'

/**
 * Survey Page and related types
 * James Plante (jplante@wpi.edu)
 */

export default function SurveyPage () {
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

  // Handler to submit the form
  const handleSubmit = (formData : FormAnswer[]) => {
    console.log('Submitting form...')

    // We need to make each response map an Object
    const submitResponses = formData.map((question) => {
      const { questionNum, questionType, datasetID, answers } = question
      return { questionNum, questionType, datasetID, answers: Object.fromEntries(answers) }
    })

    fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submitResponses)
    })
      .then(() => {
        console.log('Form submitted!')
        navigate('/')
      })
      .catch((err) => {
        console.error('Unable to submit for reason:', err)
      })
  }

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
                    {(() => {
                      if (dataset.current[questionNum].type === 'bar') {
                        return <BarChart data={dataset.current[questionNum]} />
                      } else {
                        return (
                          <Typography variant="h2" component="div" gutterBottom>
                            {`Question ${questionNum}\n${JSON.stringify(dataset.current[questionNum - 1])}`}
                          </Typography>
                        )
                      }
                    })()}
                  </Paper>
                </Box>
                <Box sx= { { width: '100%', height: '100%', overflow: 'auto' } } >
                  <SurveyForm
                    questionNum={questionNum}
                    lastQuestion={questionNum === 2}
                    onPrevious={() => setQuestionNum(questionNum - 1)}
                    onNext={() => setQuestionNum(questionNum + 1)}
                    onSubmit={ handleSubmit }
                    questionType={ dataset.current[questionNum - 1].type }
                    datasetID={ dataset.current[questionNum - 1].id }
                  />
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
