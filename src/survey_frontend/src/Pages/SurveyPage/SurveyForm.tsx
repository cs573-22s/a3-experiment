import { Button, ButtonGroup, Container, Paper, Stack } from '@mui/material'
import SurveyQuestion from 'Components/SurveyQuestion'
import React, { useEffect, useReducer } from 'react'

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
  questionNum : number,
  questionType : QuestionType,
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

  useEffect(() => {
    console.log(formData)
  }, [formData])

  return (
    <Container fixed sx = { { padding: 2, width: '100vw', height: '100%' } }>
      <Paper elevation={5} sx = { { margin: 1, padding: 3 } }>
        <Stack spacing={3}>
          <SurveyQuestion
            id='question1'
            taskNum={0}
            prompt='Which region-condition combination is most active?'
            dispatch={dispatch}
          />
          <SurveyQuestion
            id='question2'
            taskNum={1}
            prompt='Which region-condition combination is least active?'
            dispatch={dispatch}
          />
          <SurveyQuestion
            id='question3'
            taskNum={2}
            prompt='Which regions have similar activation, regardless of condition?'
            dispatch={dispatch}
          />
          <SurveyQuestion
            id='question4'
            taskNum={3}
            prompt='Which conditions have similar activation, regardless of region?'
            dispatch={dispatch}
          />
          <ButtonGroup>
            <Button variant='contained'>Previous Question</Button>
            <Button variant='contained'>Next Question</Button>
          </ButtonGroup>
        </Stack>
      </Paper>
    </Container>
  )
}
