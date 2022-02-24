import { Button, ButtonGroup, Container, Paper, Stack } from '@mui/material'
import SurveyQuestion from 'Components/SurveyQuestion'
import React, { useState, useEffect, useReducer } from 'react'

type Response = { response: string }

type QuestionType = 'bar' | 'topogrpah' | 'brain'

type FormAnswer = {
    questionNum: number,
    questionType: QuestionType,
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
  onSubmit?: () => void,
  questionType: QuestionType,
  datasetID: string
}

export default function SurveyForm (props: SurveyFormProps) {
  /**
   * Updates the current state based on the provided action
   * @param state Current state
   * @param action Action to take
   */
  function reducer (state: FormAnswer[], action: FormAction) : FormAnswer[] {
    console.log(state)
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

  const [formData, dispatch] = useReducer(reducer, [])
  const [completed, setCompleteArray] = useState([false, false, false, false])

  const setComplete = (id: number) => {
    return (state: boolean) => {
      const completedCopy = completed.slice()
      completedCopy[id - 1] = state
      setCompleteArray(completedCopy)
    }
  }

  const isQuestionComplete = () : boolean => {
    return completed.reduce((prev, curr) => prev && curr, true as boolean)
  }

  // When moving to a new quesiton or going back, delete the entry
  useEffect(() => {
    dispatch({ type: 'delete' })
    setCompleteArray([false, false, false, false])
    console.log(formData)
  }, [props.questionNum])

  return (
    <Container fixed sx = { { padding: 2, width: '100vw', height: '100%' } }>
      <Paper elevation={5} sx = { { margin: 1, padding: 3 } }>
        <Stack spacing={3}>
          <SurveyQuestion
            id={`Question ${props.questionNum} Task 1`}
            taskNum={1}
            prompt='Which region-condition combination is most active?'
            dispatch={dispatch}
            setComplete={setComplete(1)}
          />
          <SurveyQuestion
            id={`Question ${props.questionNum} Task 2`}
            taskNum={2}
            prompt='Which region-condition combination is least active?'
            dispatch={dispatch}
            setComplete={setComplete(2)}
          />
          <SurveyQuestion
            id={`Question ${props.questionNum} Task 3`}
            taskNum={3}
            prompt='Which regions have similar activation, regardless of condition?'
            dispatch={dispatch}
            setComplete={setComplete(3)}
          />
          <SurveyQuestion
            id={`Question ${props.questionNum} Task 4`}
            taskNum={4}
            prompt='Which conditions have similar activation, regardless of region?'
            dispatch={dispatch}
            setComplete={setComplete(4)}
          />
          <ButtonGroup>
            <Button variant='contained' disabled={props.questionNum <= 1} onClick={props.onPrevious}>Previous Question</Button>
            {
              (props.lastQuestion)
                ? <Button variant='contained' color='success' onClick={props.onSubmit} disabled={!isQuestionComplete()}>Submit</Button>
                : <Button variant='contained' onClick={props.onNext} disabled={!isQuestionComplete()}>Next Question</Button>
            }
          </ButtonGroup>
        </Stack>
      </Paper>
    </Container>
  )
}
