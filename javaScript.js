var cols = 2;

function showValue(newValue) {
	document.getElementById("range").innerHTML = newValue;
	cols = newValue;//need to add graph size refresh on slide bar change

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
		graphDiv.class = 'graphDiv';
		//the graph
		div.style.width = '50%';
		var t1 = {
			x:[1, 2, 3],
			y:[3, 2, 1],
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
		var dlte = document.createElement('button');
		var hide = document.createElement('button');
		var show = document.createElement('button');
		
		//Function for delete button
		dlte.innerHTML = 'Delete Graph';
		dlte.onclick = function() {
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

	var form = document.createElement('div');
	form.appendChild(input);
	form.appendChild(button);
	document.getElementById('graphContainer').appendChild(form);
	
}