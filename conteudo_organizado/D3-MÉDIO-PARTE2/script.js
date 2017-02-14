var margin = {top: 20, right: 10, bottom: 100, left: 40};

var width  = 700 - margin.right - margin.left;

var height = 500 - margin.top - margin.bottom;


/*The "g" element is used as a container for group objects. The SVG will be in "lightgray" background to help you visualize it. 

<svg>
	<g stroke="green" fill="white" stroke-width="5">
		<circle cx="25" cy="25" r="15" />
		<circle cx="50" cy="25" r="50" />
		<circle cx="100" cy="100" r="15" />
	</g>
</svg>

*/

/******************************************************************************************************************************
 ******************************************************************************************************************************
 ******************************************************************************************************************************
 ******************************************************************************************************************************/

var svg = d3.select("body")
		  .append("svg")
		  	.attr("width", width + margin.right + margin.left)
		  	.attr("height", height + margin.top + margin.bottom)
		  .append("g")
		  	.attr("transform", "translate("+margin.left+","+margin.right+")");

/******************************************************************************************************************************
 ******************************************************************************************************************************
 ******************************************************************************************************************************
 ******************************************************************************************************************************/

 /*1)Just like people, data comes in all shapes and sizes(perhaps even(talvez até mesmo) colors). No matter what, every unit of 
   your data needs to be represented desktop/tablet/mobile browser. 
   When you first start out drawing something using D3, you need to think about 2 main things: The size of your dataset and 
   the dimensions of the browser/svg on wich you(em que vc) want to render your data. The size of your dataset is known as the
   "domain" and the dimensions of the browser/svg is associated with range(intervalo).

   Domain: if I had an array of numbers with no number smaller than 1 and no number larger than 100, my "domain" would be 
   1 to 100.

   Range: if you are plotting(traçando) a graph of sales figures(número de vendas) and the sales is in tens of thousands(esti
   verem em dezenas de milhares), it is unlikely(improvável) that you will be able to have a bar graph with the same pixel
   height as the data. 

   Now that you know what a domain and range is, you need a way to convert your data into corresponding values in the domain. 
   And that is exactly what scales do

   Quantitative Scale(linear)
   Quantitative scale functions are those(aquelas) that translate one numeric value into another numeric value
   xScale = d3.scale.linear()
   .domain([0, 10])
   .range([0, 1000]);
   The above code can be read as: given any number between 0 and 10, convert it to a number between 0 and 1000 using a linear 
   scale.

   Ordinal Scales
   This is another type of scale that you will find yourself using quite(bastante) often. That is because our data may not 
   always consist of numbers. It may contain other things - the best example of which(disso) is alphabets. Alphabets are
   ordinal values, they can be arranged(organizados) in an order, but you cannot
   An ordinal scale convert can be defined as:
   var xScale = d3.scale.ordinal(); -> however, the difference between these two scales becomes evident when you define the 
   domain and range for an ordninal scale:
   var xScale = d3.scale.ordinal()
   				.domain(['a','b','c','d'])
   				.rangeBands([0, 1000)]
   	In the above snippet, we had to specify every possible value of the domain in the input. These values are then mapped to a
   	rangeBand instead of a regular range because each item in the domain will consume a certain(determinada) band(faixa) in
   	the range specified

	2)Ordinal Scale
	A scale maps visual space to data space. The visual space of a scale is the "range". The data space is the "domain".
	Let's mapping the domain to the range. The "range" is specified as bands(bandas) using "rangeRoundBands".This is 
	different than rangeBands in that all spaces are guaranteed to be integers 
   	*/
var xScale = d3.scale.ordinal()
 			 .rangeRoundBands([0,width], 0.2, 0.2);

var yScale = d3.scale.linear()
			 .range([height, 0]);

var xAxis = d3.svg.axis()
			.scale(xScale)
			.orient("bottom");

var yAxis = d3.svg.axis()
			.scale(yScale)
			.orient("left"); 			


/******************************************************************************************************************************
 ******************************************************************************************************************************
 ******************************************************************************************************************************
 ******************************************************************************************************************************/

d3.csv("dados.csv", function(error, data){
	if(error)console.log("Deu Errado!");

	console.log(data);

	data.forEach(function(datinha){
		console.log(datinha.country+" - "+datinha.gdp);

	});

	xScale.domain(data.map(function(d){return d.country;}) );
});			


/******************************************************************************************************************************
 ******************************************************************************************************************************
 ******************************************************************************************************************************
 ******************************************************************************************************************************/


