var cols = 2;

var Graph = function() {
	//Button to name graph
	var input = document.createElement('input');
	this.button = document.createElement('button');
	this.button.innerHTML = 'Enter';
	this.button.onclick = function() {
		this.graphName = input.value;
		form.parentNode.removeChild(form);
		this.graphDiv = document.createElement('div');
		var div = document.createElement('div');
		this.graphDiv.class = 'graphDiv';
		//the graph
		this.t1 = {
			x:[],
			y:[],
			mode:'lines'
		};
		this.data = [this.t1];
		this.layout = {
			width: document.getElementById('graphContainer').clientWidth / cols,
			height: (document.getElementById('graphContainer').clientWidth / cols) / 1.5,
			title: this.graphName
		};
		Plotly.newPlot(this.graphDiv, this.data, this.layout);

		div.appendChild(this.graphDiv);
		document.getElementById('graphContainer').appendChild(div);

		//Initializes delete, hide, and show buttons above graph
		this.dlte = document.createElement('button');
		this.hide = document.createElement('button');
		this.show = document.createElement('button');

		//Lets buttons refer to Graph object rather than button objects
		var self = this;

		//Function for delete button
		this.dlte.innerHTML = 'Delete Graph';
		this.dlte.onclick = function() {
			Plotly.purge(self.graphDiv);
			div.parentNode.removeChild(div);
		}
		
		//Function for hide graph
		this.hide.innerHTML = 'Hide Graph';
		this.hide.onclick = function() {
			self.hide.style.display = 'none';
			self.show.style.display = 'inline';
			self.graphDiv.style.display = 'none';
		}
		
		//Function for show graph
		this.show.innerHTML = 'Show graph';
		this.show.onclick = function() {
			self.graphDiv.style.display = 'inline';
			self.hide.style.display = 'inline';
			self.show.style.display = 'none';
		}

		//Add buttons to graph div
		div.appendChild(this.dlte);
		div.appendChild(this.show);
		div.appendChild(this.hide);

		//Hides show button to start
		this.show.style.display = 'none';
	}

	var form = document.createElement('div');
	form.appendChild(input);
	form.appendChild(this.button);
	document.getElementById('graphContainer').appendChild(form);
}

var GraphMaster = function() {
	this.graphs = [];

	document.getElementById('addGraphButton').addEventListener('click', function() {
		var temp = new Graph();
		graphHolder.graphs.push(temp);
	});
}

function showValue(newValue) {
	document.getElementById("range").innerHTML = newValue;
	cols = newValue;//need to add graph size refresh on slide bar change
}

var graphHolder = new GraphMaster();