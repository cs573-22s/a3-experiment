# https://www.geeksforgeeks.org/bootstrap-confidence-interval-with-r-programming/
# https://cran.r-project.org/web/packages/superb/superb.pdf

library(boot)
library(tidyverse)
library(superb)

# load result data
# 1 = Yes; 0 = No

data<-read.csv(file = 'expResults.csv', header = TRUE) #read data 

newData<-data[,c("Pie.chart","Bar.chart","Scatter.plot")] #relevant columns

i<-nrow(newData) #count number of rows for re-sampling 

boot.mean<-function(newData,i){
  boot.mean<-mean(newData[i])} #bootstrapping function to get the mean

#bootstrap all columns
#gets bootstrap mean and confidence interval 
apply(newData,2,function(y){ 
  b<-boot(y,boot.mean,R=50000); 
  c(mean(b$t),boot.ci(b,type="perc", conf=0.95)$percent[4:5])
})

# plotting bootstrap
dta <- data.frame(plot_type = c("Pie Chart","Bar Chart","Scatter Plot"), 
                  center= c(0.9161,0.4996,0.3335), 
                  lower = c(0.1661,0.2496,0.2502),
                  upper = c(0.0839,0.2504,0.2498))

# plot of error bars
ggplot(dta, aes_string(ymin="center-lower", ymax="center+upper", x = "plot_type" ) ) +
  geom_superberrorbar()
