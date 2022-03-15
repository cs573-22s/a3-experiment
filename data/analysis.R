library(ggplot2)
library(rstatix)
library(nlme)
library(lme4)
library(dplyr)
library(boot)

# load files
dat <- read_csv("C:/Users/alici/OneDrive/Documents/GitHub/a3-experiment/data/r_compatible_csv.csv")

d <- ggplot(dat, aes(chart, No_Resp))
plot <- d + stat_summary(fun.data = "mean_cl_boot")
