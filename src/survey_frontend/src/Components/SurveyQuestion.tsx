import { TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'

/**
 * Task Textbox and related types
 * James Plante (jplante@wpi.edu)
 */

type SurveyQuestionProps = {
  id : string, // ID of question
  taskNum : number, // Task number
  prompt : string, // Prompt of Question
  dispatch: React.Dispatch<any>, // callback for updating the answer in the form
  setComplete: (state: boolean) => void, // Set the answer to complete
  required?: boolean, // Is the field required
}

/**
 * Component representing a Survey Question
 */
export default function SurveyQuestion (props : SurveyQuestionProps) {
  const [current, setCurrent] = useState('')

  useEffect(() => {
    setCurrent('')
  }, [props.id])

  useEffect(() => {
    props.setComplete(!ifInvalid())
  }, [current])

  const ifInvalid = () => {
    return current === ''
  }

  const handleChange = (evt : any) => {
    setCurrent(evt.target.value)
    props.dispatch({ type: 'update', taskNum: props.taskNum, response: evt.target.value })
  }

  return <TextField
    id={props.id}
    required={props.required}
    label={props.prompt}
    value={current}
    onChange={handleChange}
    error={ifInvalid()}
  />
}
