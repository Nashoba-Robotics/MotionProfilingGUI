function addGraph() {

	var input = document.createElement('input');
	input.id = 'graphName';
	var button = document.createElement('button');
	button.class = 'btn btn-default';
	button.innerHTML = 'Enter';
	button.onclick = buttonPressed;
	var form = document.createElement('div');
	form.id = 'graphForm';
	form.appendChild(input);
	form.appendChild(button);
	document.getElementById('graphContainer').appendChild(form);


	document.getElementById.appendChild(form);

	function buttonPressed() {
		var name = document.getElementById('graphName').value;
		var indata = document.getElementById('graphForm');
		indata.parentNode.removeChild(indata);
		createGraph(name);
	}

	function createGraph(graphName) {
		var div = document.createElement('div');
		//div.id = graphName;
		div.style.width = '50%';
		var t1 = {
			x:[1,2,3],
			y:[1,-2,3],
			mode:'lines'
		};
		var data = [t1];
		var layout = {
			title: graphName,
			width:'100%',
		};
		Plotly.newPlot(div, data, layout);
		document.getElementById('graphContainer').appendChild(div);
	}
}