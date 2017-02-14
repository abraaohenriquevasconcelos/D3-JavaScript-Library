
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
	var width = 500;
	var height = 300;

	var canvas = d3.select("body")
				 .append("svg")
				 .attr("width", width)
				 .attr("height", height);
    
    canvas.selectAll("rect")
    .data(dadosJson)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 20)
    //.attr("height", 100)
    .attr("x", function(data, index){
    	return index * 50;
    })
    .attr("height", function(data){
    	return data.pontuacao;
    })
    .attr("y", function(data){
    	return height - data.pontuacao;
    });







    canvas.selectAll("text")
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
    });

   
}