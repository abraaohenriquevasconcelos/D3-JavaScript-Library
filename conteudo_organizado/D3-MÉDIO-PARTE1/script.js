
var dadosJson = []

function carregarDados(){
    d3.json('dados.json', function(err, data){
        dadosJson = data;
        //console.log(data[2]);
        //console.log(data[2].nome);
        graficar();
    })
   
}





function graficar(){
  var margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 40
  }
	var width = 500 - margin.right - margin.left;
	var height = 300 - margin.top - margin.bottom;


    var tooltip = d3.select("body")
                  .append("div")
                  .style("position", "absolute")
                  .style("background", "#f4f4f4")
                  .style("padding", "5 15px")
                  .style("border", "1px #333 solid")
                  .style("border-radius", "1px")
                  .style("opacity", "0")

    var yScale = d3.scale.linear()
                 //.domain([0, d3.max(dadosJson)])
                 .domain([0, 100])
                 .range([0, height]);

    var xScale = d3.scale.ordinal()
                 .domain(d3.range(0, dadosJson.length))
                 .rangeBands([0, width]);
   

    var colorsScale = d3.scale.linear()
                      .domain([0, dadosJson.length])
                      .range(["#FF1493",  "#20B2AA"]);

	var canvas = d3.select("#grafico")
				 .append("svg")
				 .attr("width", width + margin.right + margin.left)
				 .attr("height", height + margin.top + margin.bottom)
         .append("g")
         .attr("transform", "translate("+margin.left+","+margin.top+")")
                 //.append("g")
                 //.attr("transform", "translate(100, 0)");
    
    canvas.selectAll("rect")
    .data(dadosJson)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", xScale.rangeBand())
    .attr("height", 0)
    .attr("x", function(data, index){
    	//return index * 50;
        return xScale(index);
    })
    .attr("y", height) 
    .style("fill", function(data, index){
        return colorsScale(index);
    })
    .on("mouseover", function(data){
        tooltip.transition().style("opacity", 1)

        tooltip.html(data.pontuacao).style("left", (d3.event.pageX)+"px")
        .style("top", (d3.event.pageY+"px"))

        d3.select(this).style("opacity", 0.5)
    })
    .on("mouseout", function(data){
        tooltip.transition().style("opacity", 0)

        d3.select(this).style("opacity", 1)
    })
    .transition()
    .attr("height", function(data){
        return yScale(data.pontuacao);
    })
    .attr("y", function(data){
        return height - yScale(data.pontuacao);
    })
    .duration(1500)
    .delay(function(data, index){
        return index * 300;
    })
    .ease("elastic")






    var yAxisScale = d3.scale.linear()
                    .domain([0, 100])
                    .range([height, 0]);

    var xAxisScale = d3.scale.ordinal()
                     .domain(d3.range(0, dadosJson.length))
                     .rangeBands([0, width]);

    var yAxis = d3.svg.axis()
        .scale(yAxisScale)
        .orient("left")
        .ticks(10)
        .tickPadding(5)

    var yAxisGuide = d3.select("svg")
                     .append("g")
                        yAxis(yAxisGuide)
                        yAxisGuide.attr("transform", "translate("+margin.left+","+margin.top+")")
                        yAxisGuide.selectAll("path")
                          .style("fill", "none")
                          .style("stroke", "#000")
                        yAxisGuide.selectAll("line")
                          .style("stroke", "#000")


    var xAxis = d3.svg.axis()
                .scale(xAxisScale)
                .orient("bottom")
                .tickPadding(5)
                .tickValues(xAxisScale.domain().filter(function(data, index){
                    return !(index % (dadosJson.length/5));
                }));

    var xAxisGuide = d3.select("svg")
                     .append("g")
                        xAxis(xAxisGuide)
                        xAxisGuide.attr("transform", "translate("+margin.left+","+(height+margin.top)+")")
                        xAxisGuide.selectAll("path")
                          .style("fill", "none")
                          .style("stroke", "#000")
                        xAxisGuide.selectAll("line")
                          .style("stroke", "#000")
    /* ********************************************************************************************
       ********************************************************************************************
       ******************************************************************************************** */

 


    /*canvas.selectAll("text")
    .data(dadosJson)
    .enter()
    .append("text")
    .text(function(data){
        return data.nome;
    })
    .attr("x", function(data, index){
        return index * 50 +10;
    })
    .attr("y", function(data){
        return height - data.pontuacao -3;
    });*/

   
}