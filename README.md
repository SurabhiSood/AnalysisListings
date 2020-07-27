### Goal
I wanted to create an app which presents the exploratory data analysis for AirBnBs @ Asheville.To view the app,click [here](https://surabhisood-project2.herokuapp.com/). 

### Process
I started with sourcing the data from [insideairbnb](http://insideairbnb.com/get-the-data.html). Post data extraction, I had three major tasks at hand, one was to clean the data, second was to transform it into easy visualization and finaly to upload it on cloud.

Cleaning the data was done using Pandas. There were very few null values and post determining that null values will have very no effect on my analysis, I dropped those rows.

Next came merging the tables based on the type of visualizations, such as chloropleth, I wanted to create. This included changing datatypes for quite of few variables.

*Home Page* includes the basic html code, introducing the app and analysis details along with a fluid and interactive gradient animations with this small javascript library [granim.js](https://sarcadass.github.io/granim.js/).

*Ratings Page* contains an html table briefly introducing the count of AirBnBs in the sorrounding zip codes. It also contains an interactive leaflet map. This map upon selection of a particular zip-code from the drop down shows the AirBnBs and its details such as Listing Name, Host Name, Price of the property, Property Type, Room Type and Ratings.The markers appear to be of different colors based on the Ratings.There is a bar chart on the page indicating the best locality based on location review scores, this visualization uses charts.js library.

*Features Page* contains a chloropleth map displaying the regions based on the price variations. It also contains a pie chart listing the type of properties the the region along with a line chart on growth analysis of AirBnBs the region.

### Coding

*Flask app* contains 5 routes. Three of them renders the three html pages described above. However two of them returns a jsonify list obtained from the csv files from the cloud server (Heroku_Postgress_SQL)

*dropdown route* contains list of neighbourhoods in the area.

*map route* contains details of AirBnBs namely Listing Name, Host Name, Price of the property, Property Type, Room Type and Ratings

**The js scripts**
	
*charts.js* creates an instance of charts.js library and plots bar 	chart, post reading values from csv using d3.js. With the help of a 	for loop I extracted two lists for location and its score. These lists were then used as labels and its data in library instance to plot the bar chart.

*MapLogic.js* contain a function createMarkers() which reads data from the ('/map') route and takes in neighbour as an argument. If the zipcode matches with the argument its lists all the details of AirBnB and assigns pre-defined color to the Rating. The init() function binds the dropdown from the html page, using d3. it then reads data from ('/dropdown') route to populate the dropdown on html page. function optionChanged() calls upon the required functions on user input.

### Heroku

To deploy this dashboard on Heroku, I simply created a new app in Heroku and connected it to the corresponding GitHub repo. Then, I added a Procfile and requirements.txt file to my repo.



