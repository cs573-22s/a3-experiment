import React from 'react'

import * as d3 from 'd3'
import { Dataset } from 'Types/Dataset'
import { DatasetRow } from 'Types/DatasetRow'
import FormVisualization from './FormVisualization'

type BrainChartProps = {
  data : Dataset // Data to be taken in by the bar chart
}

type Coordinate = {
  x : number,
  y : number
}

export default function BrainChart ({ data } : BrainChartProps) {
  const drawBrainChart = (rootDOM : HTMLDivElement, data : DatasetRow[], condition : string) => {
    const brainCoordinates = new Map<string, Coordinate>()
    brainCoordinates.set('A', { x: 300, y: 200 })
    brainCoordinates.set('B', { x: 240, y: 160 })
    brainCoordinates.set('C', { x: 120, y: 220 })
    brainCoordinates.set('D', { x: 260, y: 260 })
    brainCoordinates.set('E', { x: 220, y: 210 })
    // Redraw the svg
    const filteredData = data.filter(row => row.Condition === condition)

    d3.select(rootDOM).selectAll('svg').remove()

    d3.select(rootDOM)
      .append('svg')
      .attr('height', 400)
      .attr('width', 460)

    // set the dimensions and margins of the graph
    d3.scaleLinear()
      .domain([0, 100]) // unit data
      .range([0, 1000]) // unit pixels

    // draw brain
    // make comments of coordinates for brain signal
    const selection = d3.select(rootDOM).select('svg')

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
        if (xCoord) {
          return xCoord.x
        } else {
          return null
        }
      })
      .attr('cy', d => {
        const xCoord = brainCoordinates.get(d.Region)
        if (xCoord) {
          return xCoord.y
        } else {
          return null
        }
      })
      .attr('r', 20)
      .attr('fill', 'black')
      .attr('opacity', d => d.Signal / 100) // set to signal strength, Signal/10?
  }

  return (
    <FormVisualization
      data={data}
      visualizationFunction={drawBrainChart}
    >
      <img src='/assets/brain_regions.png' alt='Brain Regions' />
    </FormVisualization>
  )
}
