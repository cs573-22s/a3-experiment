Assignment 3 - Replicating a Classic Experiment  
===

Authors
---
- Jasmine Duerk
- Evelyn Tran
- Samantha Woodland
- Joseph Yuen

Experiment
===
Link to Experiment: https://jhyuen.github.io/03-experiment

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

### Circular Bar plot - Worst
Of all the visualizations tested, circular bar plots performed the worst with a log error of 2.432067109. If we compare it to T7 in Crowdsourced Results as it compares the size of radial objects, we see that the circular bar plot scored slightly lower.

![Circular Bar Plot](img/screencap5.PNG)

## Additional Experiment Screenshots
### Opener
![Opener](img/opener.png)
### Get Results
![Closer](img/closer.png)
### All 3 Visualizations
![Closer](img/screencapcombined.png)


Achievements
===
## Technical
1.  **Protected Fields with Error Messages** - Upon submitting an answer, our system checks if the inputted values is valid. For example, when inputting a percentage guess, the system checks if the number is a decimal value. If it is, then the system generates the next screen. If not, then an alert is triggered which tells the user that their answer is invalid.

    ![Error message](img/error-message.png)

2. **Button Animation** - When hovering over the button, it changes to a darker color to indicate what the mouse is selecting. When clicked, the button slightly moves down, as if a user was pushing the button.

    ![Button Animation](img/buttonAnimation.gif)

3. **Analyzed Gender and Age Distribution** - In addition to analyzing tester's guessing of percentages across the various visualizations, we also asked them for their age and gender in the hopes of additionally observing any significant trends or patterns. We found that between males and females in the analysis of radar charts, males had an average log error of 1.543975289 which was below the average, while females had an average log error of 2.152222824 which was above the average. For circular bar plots, males had an average log error of 2.183564587 which was below the average, while females had an average log error of 2.609568911 which was above the average. Lastly, for bar graphs, males scored an average log error of 1.195938747 which was below the average, while females scores an average log error of 1.500975974 which was above the average. Even though not statistically significant, we found it interesting that females had a higher log error than males on average for each of the visualizations.

## Design Achievements

1. **Use of Color** - We chose to use pastel blues and green to add some color while not distracting from the graphs themselves. The graphs had to be black and white, so it was important that the colors were not too intense or eye-catching, such as using red. The button is a darker teal from the background to draw attention to it. There is also a slight shadow behind the buttons for a more modern feel.

2. **Modern Font** - Open Sans and Raleway are both popular fonts for webpages because they're modern and minimal. The spacing between the letters in the main header adds to the minimal feel, but still stands out due to its larger font and slight shadow.

3. **Centered Layout** - For an easier viewing experience, we opted for a centered layout. Everything is condensed in a given width to avoid long lines of text and unnecessary eye movements.

References
===

## Circular Bar plot
https://www.d3-graph-gallery.com/graph/circular_barplot_label.html

## Radar Chart
https://yangdanny97.github.io/blog/2019/03/01/D3-Spider-Chart

## Bar Graph
https://www.tutorialsteacher.com/d3js/create-bar-chart-using-d3js