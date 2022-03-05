# https://www.geeksforgeeks.org/bootstrap-confidence-interval-with-r-programming/

library(boot)
library(ggplot2)

# load result data
# 1 = Yes; 0 = No

data<-read.csv(file = 'expResults.csv', header = TRUE) #read data 

x<-data[,c("Pie.chart","Bar.chart","Scatter.plot")] #relevant columns

i<-nrow(x) #count number of rows for re-sampling 

boot.mean<-function(x,i){
  boot.mean<-mean(x[i])} #bootstrapping function to get the mean

#bootstrap all columns
#gets bootstrap mean and confidence interval 
apply(x,2,function(y){ 
  b<-boot(y,boot.mean,R=50000); 
  c(mean(b$t),boot.ci(b,type="perc", conf=0.95)$percent[4:5])
})




#Other Attempt
data<-read.csv(file = 'expResults.csv', header = TRUE) 
correlation <- function(data, index)
{
  df <- data[index, ]
  # Find the spear man correlation between the value columns of data set
  c(cor(df[, 2], df[,3], method = 'spearman'))
}

# bootstrap w/ data set and rounds
bootstrap <- boot(data, correlation, R = 100)
bootstrap

# Plot sampling
plot(bootstrap)

# Confidence Intervals
boot.ci(boot.out = bootstrap, type = c("norm","basic","perc","bca"))
