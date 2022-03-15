Assignment 3 - Replicating a Classic Experiment  
===
Members: James Plante and Alicia Howell-Munson

Group: fNIRS

([Link to the survey](http://66.175.208.236:5000/))

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

We were interested a the following metrics: 1) how often did the participant select the correct region/condition? 2) what was the difference in signal between their selected region/condition and the correct answer? 3) did the chart type affect their ability to correctly identfy brain region names? and 4) did the chart type affect their ability to make a response (i.e. specifying a region/condition or responding with "no region/condition"). 

## Results

From the ten participants who took our survey, two results needed to be discarded due to how the participants answered the questions (not fully answering them, responses that did not make sense). Participants were most correct across all questions with the topographic chart (77% accuracy), then the bar chart (76% accuracy), and finally the brain chart (75% accuracy). As the below figure shows, these results are not very different from each other and fall within similar confidence intervals.

![correctness](https://github.com/jwplante/a3-experiment/tree/main/img/correctness.png "Correctness based on chart type with 95% confidence intervals")

Participants' answers were most similar to the true answer with bar charts (+/- 0.92 amplitude), then the topographic chart (+/- 1.368 amplitude) and finally the brain chart (+/- 1.374 amplitude). The brain and topographic chart performed very similarily to each other and have similar ranges for their 95% confidence intervals, however, the bar chart is set apart from them, though it's upper bound of the confidence interval does overlap with the lower-bound confidence interval of the other two charts.

![margin of error](https://github.com/jwplante/a3-experiment/tree/main/img/diff.png "Margin of error based on chart type with 95% confidence intervals")

Because the x-axis of the bar chart is labeled with the region name, participants had no errors in identifying the region for the bar chart. The participants on average had less difficulty identifying the correct region with the brain chart (7.6% error rate) than the topographic chart (9.1% error rate), though the 95% confidence interval for these have a large amount of overlap as well.

![region accuracy](https://github.com/jwplante/a3-experiment/tree/main/img/diff_reg.png "Region accuracy based on chart type with 95% confidence intervals")

Finally, participants provided a "none" response the least frequently with the topographic chart (11.4% of responses) and then the brain chart and bar chart are equal (12.0% of responses). While the topographic chart is slightly less frequent than the other two, the confidence intervals once again overlap significantly across conditions. 

![response](https://github.com/jwplante/a3-experiment/tree/main/img/response.png "Frequency of none responses based on chart type with 95% confidence intervals")

## Conclusion

Based upon this study, there is not a large impact on the responses that participants provide based upon the chart type. The biggest difference is in the accuracy at identifying the correct region, which the bar chart inately has an advantage with because of its labeled x axis. If researchers prefer to display their results with either the topographic or brain chart, they could overlay region names for their areas of interest or add detailed descriptions of the regions in the caption of their figure. In terms of interpretting the activation on the charts, there is no significant difference across chart type. This is caveated by the small sample size, simplistic design of the drawings, and mental workload challenges of the survey. Future renditions of this survey should remove the open-response option and have participants match region-condition pairs with multiple choice boxes to reduce their workload (typing out complex region names) along with other changes suggested by participants. Finally, there are other results that could be obtained from this data, such as if a certain chart was more suited towards a particular question (i.e. are brain charts best for comparing regions to each other, and bar charts for overall distribution of signal?) so there is potential for future work with more interesting results from this survey. 

## Design Achievements

## Technical Achievements

## Resources
We used the code from ([Link to the survey](https://www.d3-graph-gallery.com/graph/barplot_button_data_simple.html)) as the foundation for building the bar chart in d3.
