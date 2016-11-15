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
		self.aliveness = 2;
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
			graphHolder.updateSize(document.getElementById('graphContainer').clientWidth / cols, (document.getElementById('graphContainer').clientWidth / cols) / 1.5);
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
		this.temp.div.style.left = ((document.getElementById('graphContainer').clientWidth / cols) * self.graphs.length) % document.getElementById('graphContainer').clientWidth + 'px';
		this.temp.div.style.top = (Math.floor(self.graphs.length / cols) * ((document.getElementById('graphContainer').clientWidth / cols) / 1.5)) + 35 + 'px';
		self.graphs.push(this.temp);
		self.updateSize();
	});

	this.updateSize = function(x, y) {
		//cleans up array containing dead graphs, should do somewhere else so they don't take up memory untill graphs are resized
		self.newGraphs = [];
		self.index = 0;
		for(i = 0; i < self.graphs.length; i++) {
			if(self.graphs[i].aliveness != 0) {
				//self.graphs.splice[i];//no working
				self.newGraphs[self.index] = self.graphs[i];
				self.index++;
			}
		}
		console.log(self.newGraphs);
		self.graphs = self.newGraphs;
		console.log(self.graphs);
		//only after all dead graphs are removed from array
		for(i = 0; i < self.graphs.length; i++) {
			if(self.graphs[i].aliveness == 2) {
				self.graphs[i].layout = {
					width: x,
					height: y
				};
				Plotly.relayout(self.graphs[i].graphDiv, self.graphs[i].layout);
				Plotly.redraw(self.graphs[i].graphDiv);
			}
			if(self.graphs[i].aliveness > 0) {
				//reposition
				self.graphs[i].div.style.position = 'absolute';
				self.graphs[i].div.style.left = ((document.getElementById('graphContainer').clientWidth / cols) * i) % document.getElementById('graphContainer').clientWidth + 'px';
				self.graphs[i].div.style.top = (Math.floor(i / cols) * ((document.getElementById('graphContainer').clientWidth / cols) / 1.5)) + 'px';
			}
		}
	};
}

var graphHolder = new GraphMaster();

function showValue(newValue) {
	document.getElementById("loadingAnimat").style.display = "block";
	document.getElementById("range").innerHTML = newValue;
	cols = newValue;
	graphHolder.updateSize(document.getElementById('graphContainer').clientWidth / cols, (document.getElementById('graphContainer').clientWidth / cols) / 1.5);
	document.getElementById("loadingAnimat").style.display = "none";
}