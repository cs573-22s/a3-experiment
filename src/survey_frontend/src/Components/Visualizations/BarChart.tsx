import React, { useEffect, useRef, useState } from 'react'
import { Button, ButtonGroup, Container } from '@mui/material'

import * as d3 from 'd3'
import { Dataset } from 'Types/Dataset'
import { DatasetRow } from 'Types/DatasetRow'

type BarChartComponents = {
  data : Dataset // Data to be taken in by the bar chart
}

export default function BarChart ({ data } : BarChartComponents) {
  // Root of the d3 svg component
  const rootDOM = useRef(null)
  const [condition, setCondition] = useState(data.data[0].Condition)

  // set the dimensions and margins of the graph
  useEffect(() => {
    // Redraw the svg
    const filteredData = data.data.filter(row => row.Condition === condition)

    console.log(filteredData)
    d3.select(rootDOM.current).selectAll('svg').remove()

    const margin = { top: 30, right: 30, bottom: 70, left: 60 }
    const width = 460 - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom
    // append the svg object to the body of the page
    const svg = d3.select(rootDOM.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // X axis
    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.data.map(d => d.Region))
      .padding(0.2)

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 20])
      .range([height, 0])

    svg.append('g')
      .attr('class', 'Signal')
      .call(d3.axisLeft(y))

    // A function that create / update the plot for a given variable:
    function update (data : DatasetRow[]) {
      const u = svg.selectAll('rect')
        .data(data)

      if (u) {
        u.join('rect')
          .transition()
          .duration(1000)
          .attr('x', d => {
            const result = x(d.Region)
            if (result) {
              return result
            } else {
              return null
            }
          })
          .attr('y', d => {
            const result = y(d.Signal)
            if (result) {
              return result
            } else {
              return null
            }
          })
          .attr('width', x.bandwidth())
          .attr('height', d => height - y(d.Signal))
          .attr('stroke', '#69b3a2')
      }
    }

    // Initialize the plot with the first dataset
    update(filteredData)
  }, [data.id, condition])

  return (
    <Container fixed ref={rootDOM} maxWidth='xl' sx = { { padding: 2, width: '80%', height: '100%' } }>
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
