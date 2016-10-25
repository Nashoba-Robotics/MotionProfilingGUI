function addGraph() {

	var input = document.createElement('input');
	var button = document.createElement('button');
	button.innerHTML = 'Enter';
	button.onclick = function() {
		var graphName = input.value;
		form.parentNode.removeChild(form);
		var div = document.createElement('div');
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
	};
	var form = document.createElement('div');
	form.appendChild(input);
	form.appendChild(button);
	document.getElementById('graphContainer').appendChild(form);

}