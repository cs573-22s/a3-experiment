import { Button, ButtonGroup, Container, Paper, Stack } from '@mui/material'
import SurveyQuestion from 'Components/SurveyQuestion'
import React, { useState, useEffect, useReducer } from 'react'

/**
 * Survey Form component and related types
 * James Plante (jplante@wpi.edu)
 */

// Types
type Response = { response: string }

export type FormAnswer = {
    questionNum: number,
    questionType: string,
    datasetID: string,
    answers: Map<number, Response>
}

type UpdateAction = {
  type: 'update',
  taskNum: number,
  response: string
}

type DeleteAction = {
  type:'delete'
}

type FormAction = UpdateAction | DeleteAction

type SurveyFormProps = {
  questionNum: number,
  lastQuestion?: boolean,
  onPrevious: () => void,
  onNext: () => void,
  onSubmit?: (response : FormAnswer[]) => void,
  questionType: string,
  datasetID: string
}

// Questions
const tasks = [
  'Which region-condition combination is most active?',
  'Which region-condition combination is least active?',
  'Which regions have similar activation, regardless of condition?',
  'Which conditions have similar activation, regardless of region?'
]

export default function SurveyForm (props: SurveyFormProps) {
  /**
   * Updates the current state based on the provided action
   * @param state Current state
   * @param action Action to take
   */
  function reducer (state: FormAnswer[], action: FormAction) : FormAnswer[] {
    if (action.type === 'update') {
      // If key already exists, just update the array
      const currentAnswer = state.find((answer) => answer.questionNum === props.questionNum)
      if (currentAnswer) {
        currentAnswer.answers.set(action.taskNum, { response: action.response })
        return state
      // If key doesn't exist, make a new entry
      } else {
        const response = new Map<number, {response: string}>()
        response.set(action.taskNum, { response: action.response })
        return [...state, { questionNum: props.questionNum, datasetID: props.datasetID, questionType: props.questionType, answers: response }]
      }
    } else if (action.type === 'delete') {
      return state.filter(answer => answer.questionNum !== props.questionNum)
    } else {
      return state
    }
  }

  // Contains responses from users
  const [formData, dispatch] = useReducer(reducer, [])
  // State to indicate which question is complete
  const [completed, setCompleteArray] = useState(tasks.map(_ => false))
  // State for when the survey has finished
  const [submitting, setSubmitting] = useState(false)

  // Callback to submit the form and update UI
  const setComplete = (id: number) => {
    return (state: boolean) => {
      const completedCopy = completed.slice()
      completedCopy[id - 1] = state
      setCompleteArray(completedCopy)
    }
  }

  // Function to check whether a question is "completed"
  const isQuestionComplete = () : boolean => {
    return completed.reduce((prev, curr) => prev && curr, true as boolean)
  }

  const submitForm = () => {
    setSubmitting(true)
    if (props.onSubmit) {
      props.onSubmit(formData)
    }
  }

  // When moving to a new quesiton or going back, delete the entry
  useEffect(() => {
    dispatch({ type: 'delete' })
    setCompleteArray(tasks.map(_ => false))
    console.log(formData)
  }, [props.questionNum])

  return (
    <Container fixed sx = { { padding: 2, width: '100%', height: '100%' } }>
      <Paper elevation={5} sx = { { margin: 1, padding: 3 } }>
        <Stack spacing={3}>
          {tasks.map((task, index) => {
            const taskNum = index + 1
            return (
              <SurveyQuestion
                key={taskNum}
                id={`Question ${props.questionNum} Task ${taskNum}`}
                taskNum={taskNum}
                prompt={task}
                dispatch={dispatch}
                setComplete={setComplete(taskNum)}
              />
            )
          })}
          <ButtonGroup>
            <Button variant='contained' disabled={props.questionNum <= 1} onClick={props.onPrevious}>Previous Question</Button>
            {
              (props.lastQuestion)
                ? <Button variant='contained' color='success' onClick={submitForm} disabled={!isQuestionComplete() || submitting}>{(submitting) ? 'Submitting' : 'Submit'}</Button>
                : <Button variant='contained' onClick={props.onNext} disabled={!isQuestionComplete()}>Next Question</Button>
            }
          </ButtonGroup>
        </Stack>
      </Paper>
    </Container>
  )
}
