var cols = 2;

var Graph = function() {
	this.aliveness = 1;//for delete function

	//Button to name graph
	var self = this;
	self.input = document.createElement('input');
	self.button = document.createElement('button');
	self.button.innerHTML = 'Enter';
	self.div = document.createElement('div');
	self.button.onclick = function() {
		self.graphDiv = document.createElement('div');
		self.graphName = self.input.value;
		self.form.parentNode.removeChild(self.form);
		//the graph
		self.t1 = {
			x:[1, 2, 3],
			y:[3, 2, 1],
			mode:'lines'
		};
		self.data = [self.t1];
		self.layout = {
			width: document.getElementById('graphContainer').clientWidth / cols,
			height: (document.getElementById('graphContainer').clientWidth / cols) / 1.5,
			title: self.graphName
		};
		Plotly.newPlot(self.graphDiv, self.data, self.layout);

		self.div.appendChild(self.graphDiv);
		document.getElementById('graphContainer').appendChild(self.div);

		//Initializes delete, hide, and show buttons above graph
		self.dlte = document.createElement('button');
		self.hide = document.createElement('button');
		self.show = document.createElement('button');

		//Function for delete button
		self.dlte.innerHTML = 'Delete Graph';
		self.dlte.onclick = function() {
			Plotly.purge(self.graphDiv);
			self.div.parentNode.removeChild(self.div);
			self.aliveness = 0;
		}
		
		//Function for hide graph
		self.hide.innerHTML = 'Hide Graph';
		self.hide.onclick = function() {
			self.hide.style.display = 'none';
			self.show.style.display = 'inline';
			self.graphDiv.style.display = 'none';
		}
		
		//Function for show graph
		self.show.innerHTML = 'Show graph';
		self.show.onclick = function() {
			self.graphDiv.style.display = 'inline';
			self.hide.style.display = 'inline';
			self.show.style.display = 'none';
		}

		//Add buttons to graph div
		self.div.appendChild(self.dlte);
		self.div.appendChild(self.show);
		self.div.appendChild(self.hide);

		//Hides show button to start
		self.show.style.display = 'none';
	}

	self.form = document.createElement('div');
	self.form.appendChild(self.input);
	self.form.appendChild(self.button);
	self.div.appendChild(self.form);
	document.getElementById('graphContainer').appendChild(self.div);

	return self;
}

var GraphMaster = function() {
	var self = this;
	self.graphs = [];

	document.getElementById('addGraphButton').addEventListener('click', function() {
		this.temp = new Graph();
		this.temp.div.style.position = 'absolute';
		this.temp.div.style.right = (((document.getElementById('graphContainer').clientWidth / cols) * (self.graphs.length - 1)) % (self.graphs.length / cols)) + 'px';
		self.graphs.push(this.temp);
	});

	this.updateSize = function(x, y) {
		for(i = 0; i < self.graphs.length; i++) {
			if(self.graphs[i].aliveness == 0) {
				self.graphs.splice[i];
			}else if(self.graphs[i].graphDiv != null) {
				console.log(self.graphs[i]);
				self.graphs[i].layout = {
					width: x,
					height: y
				};
				Plotly.relayout(self.graphs[i].graphDiv, self.graphs[i].layout);
				Plotly.redraw(self.graphs[i].graphDiv);
			}
		}
	};
}

var graphHolder = new GraphMaster();

function showValue(newValue) {
	document.getElementById("range").innerHTML = newValue;
	cols = newValue;
	graphHolder.updateSize(document.getElementById('graphContainer').clientWidth / cols, (document.getElementById('graphContainer').clientWidth / cols) / 1.5);
}