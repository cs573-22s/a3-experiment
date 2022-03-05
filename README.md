Assignment 3 - Replicating a Classic Experiment  
===

Team Name: MadMen

Team Member: Jiani Wang, Yujun Mao, Yan Zhang, Ziyang Xu

Link to Experiment: https://coldcode0214.github.io/a3-experiment/

Overview
===
- Hypothesis
- Charts
- Result
- Other Pages
- Technical Achievement
- Design Achievement
- References

# Hypothesis
The question we attempted to answer in this experiment was: How effective are radial visualizations compared to rectilinear visualizations, dot visualization, and line visualization in determining relative size? 

Our hypothesis was that radial visualizations are more effective for determining relative size among all other visualizations. 

To test our hypothesis, we created five different types of visualizations using our data generation function (see code for data generation function) and asked participants to look at instances of each visualization to determine the relative size. 
We created one rectilinear visualization (a bar graph), two radial visualizations (a radar chart and a circular bar plot), one bubble chart and one line chart. 

Our goal was to prove that the radar graph was the best for determining relative size.

# Charts

## Radar Chart
The radar charts produced a log error of 1.23590300142317. 

Radar charts performs the best out of all five types of visualizations. 
This observation may be due to radar chart's concentric radar lines as they act as markers for relative distances.

<img src="https://github.com/ColdCode0214/a3-experiment/blob/main/img/radar%20chart.png" width = "623" height = "584" alt="" align=center />


## Bar Chart
The bar graph is relatively easy to interpret since one can easily gauge the proportion by looking at the relative height of bars. 

We determined a log error of 2.47374647741578 which is higher than both the Cleveland & McGill and Crowdsourced Results. 

Even so, the bar graphs performed the 2nd best out of all 5 types of visualizations that we generated.

<img src="https://github.com/ColdCode0214/a3-experiment/blob/main/img/bar%20chart.png" width = "561" height = "539" alt="" align=center />


## Circular Bar Chart
Of all the visualizations tested, circular bar plot’s performance is in the middle with a log error of 3.22578935697085. 

For the circular bar plot, the proportion is gauged by looking at the area of the section of the graph. But the relative sizes of such fan shapes are harder to gauge than the bar charts, hence the higher error rate.

<img src="https://github.com/ColdCode0214/a3-experiment/blob/main/img/circular%20bar%20chart.png" width = "474" height = "420" alt="" align=center />


## Line Chart
The line chart has a log error of 3.59026382686615. 

It is relatively high since the audience cannot easily tell the relative proportions between data points by looking at individual dots.

<img src="https://github.com/ColdCode0214/a3-experiment/blob/main/img/line%20chart.png" width = "571" height = "538" alt="" align=center />


## Bubble Chart
Bubble chart has a log error of 4.21663185791238. 

It has the largest error of all 5 types of visualizations. 
By simply looking at the relative sizes of the bubbles, it is very difficult to tell the relative proportions of the sizes of the bubbles. 
Thus this type of visualization not ideal for presenting the relative sizes of data points.

<img src="https://github.com/ColdCode0214/a3-experiment/blob/main/img/bubble%20chart.png" width = "560" height = "422" alt="" align=center />


# Results

## Log Scale of Error
Based on our results, we see that radar graphs returns the lowest mean log error which confirming our hypothesis that radar visualizations are more effective for determining relative size. 

Our radar charts has the quantile line which give the participant a general ideal of what percentage it is, it helps the participant of our survey to determine the size and improved its result.

<img src="https://github.com/ColdCode0214/a3-experiment/blob/main/img/Log%20Scale%20of%20Error.png" width = "640" height = "564" alt="" align=center />

## Mean Score By Major
According to the graph, there is no significant difference of mean error rate in different major.

In fact, this result is beyond our expection. Before the experiment, we guessed that some major may make the students be good at observing the figures. However, according to the data we received, we couldn't draw that conclusion. One possible reason may be the data set size is too small and it only contained four majors.

<img src="https://github.com/ColdCode0214/a3-experiment/blob/main/img/Mean%20score%20by%20major.png" width = "515" height = "301" alt="" align=center />

## Mean Score By Age
According to the graph, there is no significant difference in mean error in term of age.

<img src="https://github.com/ColdCode0214/a3-experiment/blob/main/img/Mean%20score%20by%20age.png" width = "560" height = "326" alt="" align=center />

## Mean Score By Country
According to the graph, there is no significant difference of mean error rate in different country group.

<img src="https://github.com/ColdCode0214/a3-experiment/blob/main/img/Mean%20score%20by%20country.png" width = "508" height = "305" alt="" align=center />


# Other Pages

### Welcome Page
<img src="https://github.com/ColdCode0214/a3-experiment/blob/main/img/welcome%20page.png" width = "606" height = "495" alt="" align=center />

### Introduction Page
<img src="https://github.com/ColdCode0214/a3-experiment/blob/main/img/Introduction%20Page.png" width = "672" height = "928" alt="" align=center />

### Background Survey Page
<img src="https://github.com/ColdCode0214/a3-experiment/blob/main/img/Survey%20Page.png" width = "535" height = "942" alt="" align=center />

### Thank you Page
<img src="https://github.com/ColdCode0214/a3-experiment/blob/main/img/Thank%20You%20Page.png" width = "615" height = "841" alt="" align=center />


# Technical Achievements
### 1. Adding more visualizations

Increase the charts number from 3 to 5, including: Bar Chart, Line Chart, Bubble chart, Radar chart, Circle bar chart.

Overview of all the 5 charts

<img src="https://github.com/ColdCode0214/a3-experiment/blob/main/img/Overview%20of%20the%205%20charts.png" width = "914" height = "583" alt="" align=center />

### 2. Data Validation

When inputting data, the system will check if the information format is legal and if it violates the not-null constrains.

### 3. Adding more attributes to analyze 

We added new dimensions such as ages, majors and gender , in our analyze we can see our stats numbers from different dimensions.


# Design Achievements
### 1. Adding friendly interactive prompt

We add the example in the testing page, so that the participants can easily take the experiment.

### 2. Colored Background

We use pink as main background color to add humor and funny elements for the whole website. 
In addition, we also use gradient pink as the color style in order to avoid monotonous color problem.

### 3. Artistic Font

The font we are using is Jokerman, which adding the website more Halloween and more artistic. 
Moreover, the font matches the pink background well.

### 4. Adding the introduction page

The participations can know more about this experiment especially about its goal and aim by reading the introduction page.

### 5. Provide the connection information

We provide the connection information and the email in case the participants may have some problems when they taking the experiment.

### 6. Button

We make the button change the color when you move the mouse over it, in order to make it more attractive.


# References

- The link of the paper: https://info.luddy.indiana.edu/~katy/S637-S11/cleveland84.pdf
- How to draw a bar chart: https://blog.csdn.net/moon_sky1999/article/details/104740686
- How to draw a sector: https://blog.csdn.net/mr_poppy/article/details/81636751
- How to use form: https://www.cnblogs.com/mingerlcm/p/10637234.html
- How to draw a radar chart: https://www.cnblogs.com/zfyouxi/p/5274514.html


