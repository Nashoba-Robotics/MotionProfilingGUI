function addGraph() {

	//Button to name graph
	var input = document.createElement('input');
	var button = document.createElement('button');
	button.innerHTML = 'Enter';
	button.onclick = function() {
		var graphName = input.value;
		form.parentNode.removeChild(form);
		var graphDiv = document.createElement('div');
		var div = document.createElement('div');
		//the graph
		div.style.width = '50%';
		var t1 = {
			x:[],
			y:[],
			mode:'lines'
		};
		var data = [t1];
		var layout = {
			title: graphName,
		};
		Plotly.newPlot(graphDiv, data, layout);

		div.appendChild(graphDiv);
		document.getElementById('graphContainer').appendChild(div);

		//Initializes delete, hide, and show buttons above graph
		var dlte = document.createElement('button');
		var hide = document.createElement('button');
		var show = document.createElement('button');
		//Function for delete button
		dlte.innerHTML = 'Delete Graph';
		dlte.onclick = function() {

		}
		
		//Function for hide graph
		hide.innerHTML = 'Hide Graph';
		hide.onclick = function() {
			hide.style.display = 'none';
			graphDiv.style.display = 'none';
		}
		
		//Function for show graph
		show.innerHTML = 'Show graph';
		show.onclick = function() {
			hide.style.display = 'block';
			graphDiv.style.display = 'block';
		}
		//add buttons to graph div
		div.appendChild(dlte);
		div.appendChild(hide);
		div.appendChild(show);
	};
	var form = document.createElement('div');
	form.appendChild(input);
	form.appendChild(button);
	document.getElementById('graphContainer').appendChild(form);

	
}