function addGraph() {
	var form = document.createElement('div');
	var input = document.createElement('input');
	var button = document.createElement('button');
	button.class = 'btn btn-default';
	button.innerHTML = 'Enter';
	button.onclick = 'addGraph().buttonPressed()';//currently not calling function or function not working
	form.appendChild(input);
	form.appendChild(button);
	document.getElementById('graphContainer').appendChild(form);


	document.getElementById.appendChild(form);
	function buttonPressed() {
		createGraph(document.getElementsByName(graphName).value);
	}
	function createGraph(graphName) {
		var div = document.createElement('div');
		document.getElementById('graphContainer').appendChild(div);
		div.id = graphName;
		div.style.width = '50%';
		//div.style.backgroundColor = 'red';
		var t1 = {
			x:[1,2,3],
			y:[1,-2,3],
			mode:'lines'
		};
		var data = [t1];
		var layout = {
			title:'TestGraph',
			width:'100%',
		};
		Plotly.newPlot(graphName, data, layout);
	}
}

/*
<div>
	Graph Name: <input type='text' name='graphName'><br>
	<button onpress='addGraph.buttonPressed()' type='button' class='btn btn-default'>Enter</button>
</div>
*/