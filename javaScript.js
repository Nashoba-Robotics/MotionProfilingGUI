var cols = 2;
var dlte;
var hide;
var show;

function addGraph() {
	//Button to name graph
	var input = document.createElement('input');
	var button = document.createElement('button');
	button.innerHTML = 'Enter';
	button.onclick = function insertPlot() {
		var graphName = input.value;
		form.parentNode.removeChild(form);
		var graphDiv = document.createElement('div');
		var div = document.createElement('div');
		graphDiv.class = 'graphDiv';
		//the graph
		div.style.width = '50%';
		var t1 = {
			x:[],
			y:[],
			mode:'lines'
		};
		var data = [t1];
		var layout = {
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

		function redraw() {
			Plotly.redraw(graphDiv);
		}

		//Add buttons to graph div
		div.appendChild(dlte);
		div.appendChild(show);
		div.appendChild(hide);

		//Hides show button to start
		show.style.display = 'none';
	}

	var form = document.createElement('div');
	form.appendChild(input);
	form.appendChild(button);
	document.getElementById('graphContainer').appendChild(form);	
}

function showValue(newValue) {
	document.getElementById("range").innerHTML = newValue;
	cols = newValue;//need to add graph size refresh on slide bar change

	redraw();

	var graphs = document.getElementsByClassName('graphDiv');
	var update = {
		width: document.getElementById('graphContainer').clientWidth / cols,
		height: (document.getElementById('graphContainer').clientWidth / cols) / 1.5
	};
	//use chrome debugger to find errors in code
	for(i in graphs) {
		Plotly.relayout(i, update);
	}
}