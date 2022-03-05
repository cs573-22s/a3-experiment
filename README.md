Assignment 3 - Replicating a Classic Experiment  
===
Members: James Plante and Alicia Howell-Munson
Group: fNIRS

([Link to the survey]())

- Name your submission using the following scheme: 
```
a3-FirstLastnameMember1-FirstLastnameMember2-FirstLastnameMember3-...
```

## Scope
For this assignment, we wanted to investigate which type of chart was best for interpreting brain data, such as that collected from functional near-infrared spectroscopy (fNIRS) studies. We found ([this paper](https://www.sciencedirect.com/science/article/pii/S0010027707002053?casa_token=a_abt9TJ1CEAAAAA:M-2qbKQcLnV26FrTPTFUMCSMnQci638uNQdnM93zlVpePp3G2ajHLRf4L5tYsxFOyMm-c6VW)) by McCabe & Castel that investigated how much a reader trusted the results of brain data experiments based upon how the visualizations were presented. We will use the same chart types they had used: bar chart, topographic brain chart, and an outlined brain chart. These chart types are typical for the domain and thus would emulate what would be presented in papers for interpretation. Below is an example of each chart type that the participants saw:
![Bar chart](https://github.com/jwplante/a3-experiment/tree/main/img/bar.PNG "Example of the bar chart")
![Topographic chart](https://github.com/jwplante/a3-experiment/tree/main/img/topo.PNG "Example of the topographic brain chart")
![Brain chart](https://github.com/jwplante/a3-experiment/tree/main/img/brain.PNG "Example of the outlined brain chart")

The participants were asked the following questions about each chart:
* Which region-condition combination is most active?
* Which region-condition combination is least active?
* Which regions have similar activation, regardless of condition?
* Which conditions have similar activation, regardless of region?
* Summarize the activation patterns in this set of data.

Can either calculate scores by correctness or margin of error (what was the signal of correct answer and what was the signal of the answer they chose)

## Results

- Scale this error using Cleveland and McGill’s log-base-2 error equation. For details, see the background section (there’s a figure with the equation). This becomes your “Error” column in the output. Make sure you use whole percentages (not decimal) in the log-base-2 equation. Make sure you handle the case of when a person gets the exact percentage correct (log-base-2 of 1/8 is -3, it is better to set this to 0). 
- Produce a README with figures that shows the visualizations you tested and results, ordered by best performance to worst performance. Follow the modern Cleveland-McGill figure below -- though note that using names instead of icons is fine.
- To obtain the ranking, calculate and report the average log2Error for each visualization across all trials and participants. This should be straightforward to do in a spreadsheet.
- Use Bootstrapped 95\% confidence intervals for your error upper and lower bounds. Include these in your figures. Bootstrapped confidence intervals are easily implemented in R + ggplot2 using the `stat_summary` geom. You can also use Excel, Python, or many many other tools. Bootstrapped 95% CIs are **very** useful in modern experiment practice.

## Design Achievements

## Technical Achievements

## Resources
We used the code from ([Link to the survey](https://www.d3-graph-gallery.com/graph/barplot_button_data_simple.html)) as the foundation for building the bar chart in d3.