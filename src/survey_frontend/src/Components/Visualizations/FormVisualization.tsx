import React, { useEffect, useRef, useState } from 'react'
import { Button, ButtonGroup, Container } from '@mui/material'

import { Dataset } from 'Types/Dataset'
import { DatasetRow } from 'Types/DatasetRow'

type FormVisualizationProps = {
  data : Dataset // Data to be taken in by the bar chart
  visualizationFunction : (rootDOM : HTMLDivElement, data : DatasetRow[], condition : string) => void
}

export default function FormVisualization ({ data, visualizationFunction } : FormVisualizationProps) {
  // Root of the d3 svg component
  const rootDOM = useRef(null)
  const [condition, setCondition] = useState(data.data[0].Condition)

  // set the dimensions and margins of the graph
  useEffect(() => {
    if (rootDOM.current) {
      visualizationFunction(rootDOM.current, data.data, condition)
    }
  }, [data.id, condition])

  return (
    <Container fixed ref={rootDOM} maxWidth='xl' sx = { { alignItems: 'center', justifyContent: 'center', padding: 2, width: '100%', height: '100%' } }>
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
    </Container>
  )
}
