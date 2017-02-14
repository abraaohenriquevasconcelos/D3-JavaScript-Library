var dataArray = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 98, 167];

function graficar(){
	var width = 500;
	var height = 300;

	var canvas = d3.select("body")
				 .append("svg")
				 .attr("width", width)
				 .attr("height", height);
    
    canvas.selectAll("rect")
    .data(dataArray)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 20)
    .attr("height", 100)
    .attr("x", function(data, index){
    	return index * 21;
    })
    .attr("height", function(data){
    	return data;
    })
    .attr("y", function(data){
    	return height - data;
    });

}