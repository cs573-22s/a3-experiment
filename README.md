Assignment 3 - Replicating a Classic Experiment  
===

Team Name: MadMen

Team Member: Jiani Wang, Yujun Mao, Yan Zhang, Ziyang Xu

Experiment
===
Link to Experiment: https://coldcode0214.github.io/a3-experiment/

## Error Barchart with 95% CIs
![Log Error](img/logError.png)

## Reference Charts
![Cleveland & McGill](img/Cleveland&McGill.png)
![Crowdsourced](img/Crowdsourced.png)

## Discussion
The question we attempted to answer in this experiment was: How effective are radial visualizations compared to rectilinear visualizations in determining relative size? Our hypothesis was that rectilinear visualizations are more effective for determining relative size than radial visualizations. To test our hypothesis, we created three different types of visualizations using our data generation function (see code for data generation function) and asked participants to look at instances of each visualization to determine the relative size. We created one rectilinear visualization (a bar graph) and two radial visualizations (a radar chart and a circular bar plot). Our goal was to prove that the bar graph was better for determining relative size than both the radar chart and the circular bar plot.

Based on our results, we see that rectilinear visualizations like bar graphs result in a lower log error than radial visualizations like radar charts and circular bar plots confirming our hypothesis that rectilinear visualizations are more effective for determining relative size than radial visualizations. Between radar charts and circular bar plots, radar charts did better than circular bar plots possibly due to having radar lines.

### Bar Graph - Best
As our points of comparisons were randomized, our results relate more with T3 than T1 as used in the Cleveland & McGill study and Crowdsourced Results. We determined a log error of 1.373877129 which is lower than both the Cleveland & McGill and Crowdsourced Results. Even so, bar graphs performed the best compared to its radial counter parts which was also found in the Crowdsourced results.

![Bar Graph](img/screencap3.PNG)

### Radar Chart - Middle
We see in the Crowdsourced Results that T7 measures the radius of circles which is most related to our radial style visualizations. We see that radar charts produced a log error of 1.898786351 that was lower than T7 which had a log error above 2.5. Radar charts scored in the middle of pack doing better than circular bar plots and worse than bar graphs. This observation may be due to radar chart's radar lines as they acts as markers for relative distance.

![Radar Chart](img/screencap4.PNG)

### Bubble Chart - Worst


![Circular Bar Plot](img/screencap5.PNG)

## Additional Experiment Screenshots
## Other Pages

### Welcome Page
+图

### Introduction Page

### Background Survey Page

### Thank you Page

### Opener
![Opener](img/opener.png)
### Get Results
![Closer](img/closer.png)
### All 3 Visualizations
![Closer](img/screencapcombined.png)


Achievements
===
## Technical Achievements
1. **增加不合法数据校验** - 提交结果时如有不合法数据，例如‘-0.5’, 'abc'， ‘100’等，将  有弹窗提醒


## Design Achievements
1. **增加背景颜色**

References
===

## Circular Bar plot
https://www.d3-graph-gallery.com/graph/circular_barplot_label.html

## Radar Chart
https://yangdanny97.github.io/blog/2019/03/01/D3-Spider-Chart

## Bar Graph
https://www.tutorialsteacher.com/d3js/create-bar-chart-using-d3js