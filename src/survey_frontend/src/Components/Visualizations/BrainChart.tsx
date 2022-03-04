import React, { useEffect, useRef, useState } from 'react'
import { Button, ButtonGroup, Container } from '@mui/material'

import * as d3 from 'd3'
import { Dataset } from 'Types/Dataset'

type BarChartComponents = {
  data : Dataset // Data to be taken in by the bar chart
}

type Coordinate = {
  x : number,
  y : number
}

// Thanks typescript lol

export default function BrainChart ({ data } : BarChartComponents) {
  // Root of the d3 svg component
  const rootDOM = useRef(null)
  const [condition, setCondition] = useState(data.data[0].Condition)

  // set the dimensions and margins of the graph
  useEffect(() => {
    const brainCoordinates = new Map<string, Coordinate>()
    brainCoordinates.set('A', { x: 300, y: 200 })
    brainCoordinates.set('B', { x: 240, y: 160 })
    brainCoordinates.set('C', { x: 120, y: 220 })
    brainCoordinates.set('D', { x: 260, y: 260 })
    brainCoordinates.set('E', { x: 220, y: 210 })
    // Redraw the svg
    const filteredData = data.data.filter(row => row.Condition === condition)

    console.log(filteredData)
    d3.select(rootDOM.current).selectAll('svg').remove()

    d3.select(rootDOM.current)
      .append('svg')
      .attr('height', 400)
      .attr('width', 460)

    // set the dimensions and margins of the graph
    d3.scaleLinear()
      .domain([0, 100]) // unit data
      .range([0, 1000]) // unit pixels

    // draw brain
    // make comments of coordinates for brain signal
    const selection = d3.select(rootDOM.current).select('svg')

    selection
      .append('path')
      .attr('d', 'M 220 230 C 240 210 290 250 300 260 C 290 270 270 300 260 290 C 200 270 190 280 130 280 C 120 290 110 290 80 270 C 100 80 320 80 360 260 C 330 280 330 280 300 260 C 290 250 240 210 220 230 Z')
      .attr('stroke', 'black')
      .attr('fill', 'white')

    selection
      .selectAll('circle')
      .data(filteredData)
      .join('circle')
      .attr('cx', d => {
        const xCoord = brainCoordinates.get(d.Region)
        console.log(xCoord)
        if (xCoord) {
          return xCoord.x
        } else {
          return null
        }
      })
      .attr('cy', d => {
        const xCoord = brainCoordinates.get(d.Region)
        console.log(xCoord)
        if (xCoord) {
          return xCoord.y
        } else {
          return null
        }
      })
      .attr('r', 20)
      .attr('fill', 'black')
      .attr('opacity', d => d.Signal / 10) // set to signal strength, Signal/10?

    selection
      .selectAll('text')
      .data(filteredData)
      .join('text')
      .attr('x', d => {
        const xCoord = brainCoordinates.get(d.Region)
        console.log(xCoord)
        if (xCoord) {
          return xCoord.x
        } else {
          return null
        }
      })
      .attr('y', d => {
        const xCoord = brainCoordinates.get(d.Region)
        console.log(xCoord)
        if (xCoord) {
          return xCoord.y + 40
        } else {
          return null
        }
      })
      .style('fill', 'black')
      .text(d => d.Region)
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
                color={ (cond === condition) ? 'secondary' : 'primary'}
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
