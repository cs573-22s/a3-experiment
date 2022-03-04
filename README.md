Assignment 3 - Replicating a Classic Experiment  
===
---
Data Visualization
Professor Harrison
A3 - 3/4/2022
Jules Cazaubiel, Elaine Chen, Johvanni Perez, & Nick Tourtillott
a3-JulesCazaubiel-ElaineChen-JohvanniPerez-NickTourtillott

LINK TO SURVEY SITE: https://wpi.qualtrics.com/jfe/form/SV_aVtNFyOlFsN68om
---

Description of Experiment:

The goal of our experiment is to test the effectiveness of word clouds and their capability of being utilized to identify main points and summarizations of written articles. The experiment utilized five different articles, all of different topics to see if the topic impacted how individuals would be able to identify the corresponding word cloud. Participants were asked to read an excerpt of an article, and we would present 3 different word clouds. The participants had to select the word cloud that was associated with the excerpt they just read. The word cloud choices were all about similar topics, but generated using different articles. The participants would be presented an excerpt of an article. After reading it, they would be presented the word cloud choices and select the correct one. This was done for each of the five articles. The participants were only informed that they would complete a study about word clouds, but they did not have any prior knowledge on what the articles would be about or what they were be expected to do.

In order to produce word clouds uncluttered by commonly used words that are ultimately not relevant to any theme (= stopwords), such as “the” or “and”, we decided to preprocess the texts. We used NLTK to do so (Natural Language Toolkit), a widely used python package used for natural language processing. We used the basic stopword list from NLTK to remove these unnecessary words, along with other functions to remove all punctuation and numbers from the texts. This left us with a list of all relevant words for each text, outputted to a csv/text file for ease of use. Utlizing these csv files, we were able to use the D3 library to create the word clouds for each article. 


Screenshots of experiment:

Visualization 1: COVID-19 Article

Correct Answer:
![covid-19 correct word cloud](DataVizProj3/covid_a_processed.PNG)
Incorrect Answers:
![covid-19 incorrect word cloud](DataVizProj3/covid_b_processed.PNG)

![covid-19 incorrect word cloud](DataVizProj3/covid_c_processed.PNG)

Visualization 2: Kardashian Drama Article

Correct Answer:
![kanye correct word cloud](DataVizProj3/kanye_c_processed_wc.PNG)

Incorrect Answers:
![kanye incorrect word cloud](DataVizProj3/kanye_a_processed.PNG)

![kanye incorrect word cloud](DataVizProj3/kanye_b_processed.PNG)

Visualization 3: Music Industry Trends Article

Correct Answer:
![music correct word cloud](DataVizProj3/music_a_processed.PNG)

Incorrect Answers:
![music incorrect word cloud](DataVizProj3/music_b_processed.PNG)

![music incorrect word cloud](DataVizProj3/music_c_processed.PNG)

Visualization 4: Plant Based Drug Discovery Article

Correct Answer:
![plant correct word cloud](DataVizProj3/plant_c_processed.PNG)


Incorrect Answers:
![plant incorrect word cloud](DataVizProj3/plant_a_processed.PNG)

![plant incorrect word cloud](DataVizProj3/plant_b_processed.PNG)


Visualization 5: Travel Trends Article

Correct Answer:
![travel correct word cloud](DataVizProj3/travel_b_processed.PNG)

Incorrect Answers:
![travel incorrect word cloud](DataVizProj3/travel_a_processed.PNG)

![travel incorrect word cloud](DataVizProj3/travel_c_processed.PNG)

Results from Experiment:

![accuracy_gender](results/accuracy_gender.PNG)
![accuracy_gender_distro](results/accuracy_gender_distro.PNG)
![accuracy_major](results/accuracy_major.PNG)
![accuracy_major_distro](results/accuracy_major_distro.PNG)
![accuracy_major_text](results/accuracy_major_text.PNG)
![accuracy_participants_text](results/accuracy_participants_text.PNG)
![accuracy_word_count](results/accuracy_word_count.PNG)

Technical Achievements: 
- utilized D3 to create word clouds presented in Qualtrics Survey
- utilized word processing software in Python to create CSV files for word clouds 

Design Achievements: 
- small multiple to portray the differences in the accuracies for different topics

potential idea: ? 
- accuracy based on number of texts or words in a word cloud