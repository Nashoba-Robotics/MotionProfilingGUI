function addGraph() {

	//Button to name graph
	var input = document.createElement('input');
	var button = document.createElement('button');
	button.innerHTML = 'Enter';
	button.onclick = function() {
		var graphName = input.value;
		form.parentNode.removeChild(form);
		var div = document.createElement('div');
		div.style.width = '50%';
		var t1 = {
			x:[],
			y:[],
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

	//Initializes delete, hide, and show buttons above graph
	var button = document.createElement('dlte');
	var button = document.createElement('hide');
	var button = document.createElement('show');

	//Function for delete button
	dlte.innerHTML = 'Delete Graph';
	dlte.onclick = function() {

	}
	
	//Function for hide graph
	hide.innerHTML = 'Hide Graph';
	hide.onclick = function() {

	}
	
	//Function for show graph
	show.innerHTML = 'Show graph';
	show.onclick = function() {
		
	}
}