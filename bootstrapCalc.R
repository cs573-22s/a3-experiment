# https://www.geeksforgeeks.org/bootstrap-confidence-interval-with-r-programming/

library(boot)
library(ggplot2)

# load result data
# 1 = Yes; 0 = No
data <- read.csv(file = 'expResults.csv', header = TRUE)
correlation <- function(data, index)
{
  df <- data[index, ]
  # Find the spear man correlation between the value columns of data set
  c(cor(df[, 1], df[, 2], df[,3], method = 'spearman'))
}

# bootstrap w/ data set and rounds
bootstrap <- boot(data, correlation, Rounds = 100)
bootstrap

# Plot sampling
plot(bootstrap)

# Confidence Intervals
boot.ci(boot.out = bootstrap, type = c("norm","basic","perc","bca"))