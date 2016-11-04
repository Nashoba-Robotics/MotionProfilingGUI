var cols = 2;

var Graph = function() {
	//Button to name graph
	this.input = document.createElement('input');
	this.button = document.createElement('button');
	button.innerHTML = 'Enter';
	button.onclick = function insertPlot() {
		this.graphName = input.value;
		form.parentNode.removeChild(form);
		this.graphDiv = document.createElement('div');
		this.div = document.createElement('div');
		graphDiv.class = 'graphDiv';
		//the graph
		this.t1 = {
			x:[],
			y:[],
			mode:'lines'
		};
		this. data = [t1];
		this.layout = {
			width: document.getElementById('graphContainer').clientWidth / cols,
			height: (document.getElementById('graphContainer').clientWidth / cols) / 1.5,
			title: graphName
		};
		Plotly.newPlot(graphDiv, data, layout);

		div.appendChild(graphDiv);
		document.getElementById('graphContainer').appendChild(div);

		//Initializes delete, hide, and show buttons above graph
		dlte = document.createElement('button');
		hide = document.createElement('button');
		show = document.createElement('button');
		
		//Function for delete button
		dlte.innerHTML = 'Delete Graph';
		dlte.onclick = function deletes() {
			Plotly.purge(graphDiv);
			div.parentNode.removeChild(div);
		}
		
		//Function for hide graph
		hide.innerHTML = 'Hide Graph';
		hide.onclick = function() {
			hide.style.display = 'none';
			graphDiv.style.display = 'none';
			show.style.display = 'inline';
		}
		
		//Function for show graph
		show.innerHTML = 'Show graph';
		show.onclick = function() {
			graphDiv.style.display = 'inline';
			hide.style.display = 'inline';
			show.style.display = 'none';
		}

		//Add buttons to graph div
		div.appendChild(dlte);
		div.appendChild(show);
		div.appendChild(hide);

		//Hides show button to start
		show.style.display = 'none';
	}

	this.form = document.createElement('div');
	form.appendChild(input);
	form.appendChild(button);
	document.getElementById('graphContainer').appendChild(form);
}

var GraphMaster = function() {
	this.graphs = [];

	document.getElementById('addGraphButton').addEventListener('click', function() {
		document.write('asdsad');//GraphMaster.graphs.push(new Graph());
	});
}

function showValue(newValue) {
	document.getElementById("range").innerHTML = newValue;
	cols = newValue;//need to add graph size refresh on slide bar change
}