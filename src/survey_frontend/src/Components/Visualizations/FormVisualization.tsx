import React, { useEffect, useRef, useState } from 'react'
import { Button, ButtonGroup, Container } from '@mui/material'

import { Dataset } from 'Types/Dataset'
import { DatasetRow } from 'Types/DatasetRow'

type FormVisualizationProps = {
  children? : React.ReactNode
  data : Dataset // Data to be taken in by the bar chart
  visualizationFunction : (rootDOM : HTMLDivElement, data : DatasetRow[], condition : string) => void
}

export default function FormVisualization ({ children, data, visualizationFunction } : FormVisualizationProps) {
  // Root of the d3 svg component
  const rootDOM = useRef(null)
  const [condition, setCondition] = useState(data.data[0].Condition)

  // Set the current button state to a valid choice
  useEffect(() => {
    setCondition(data.data[0].Condition)
  }, [data.id])

  // Update the visualization every time the condition or question changes
  useEffect(() => {
    if (rootDOM.current) {
      visualizationFunction(rootDOM.current, data.data, condition)
    }
  }, [data.id, condition])

  return (
    <Container ref={rootDOM} maxWidth='xl' sx={ { alignItems: 'center', justifyContent: 'center', padding: 2, width: '100%', height: '100%' } }>
      <ButtonGroup fullWidth>
        {(() => {
          const conditions = Array.from(new Set(data.data.map(elt => elt.Condition)))
          return conditions.map(cond => {
            return (
              <Button
                key={ cond }
                variant={ (cond === condition) ? 'contained' : 'outlined' }
                color='primary'
                onClick={() => setCondition(cond)}
                >
                  { `Condition: ${cond}` }
              </Button>
            )
          })
        })()}
      </ButtonGroup>
      { children }
    </Container>
  )
}
