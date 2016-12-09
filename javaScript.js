var cols = 4;
var keys = [];
$(document).keypress(function(e) {
	keys[e.which] = true;
});
$(document).keyup(function(e) {
	keys[e.which] = false;
});


var Graph = function() {
	this.aliveness = 1;//for delete function

	//Button to name graph
	var self = this;
	self.input = document.createElement('input');
	self.button = document.createElement('button');
	self.button.innerHTML = 'Enter';
	self.div = document.createElement('div');

	self.button.click();

	self.button.onclick = function() {
		self.aliveness = 2;
		self.graphDiv = document.createElement('div');
		self.div.style.border = "2px solid #000000";
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
			autosize: false,
			width: document.getElementById('graphContainer').clientWidth / cols,
			height: (document.getElementById('graphContainer').clientWidth / cols) / 1.5,
			title: self.graphName,
			margin: {
				l: 25,
   				r: 25,
				b: 25,
   				t: 25,
				pad: 4
 			 }
		};
		Plotly.newPlot(self.graphDiv, self.data, self.layout);

		self.div.appendChild(self.graphDiv);
		document.getElementById('graphContainer').appendChild(self.div);

		//Initializes delete, hide, and show buttons above graph
		self.show = document.createElement('button');
		self.delete = document.createElement('button');

		self.trash = document.createElement('span');
		self.trash.className = 'glyphicon glyphicon-trash';

		self.hideGlyph = document.createElement('span');
		self.hideGlyph.className = 'glyphicon glyphicon-minus-sign';

		self.dlte = document.createElement('a');
		self.dlte.className = 'modebar-btn';
		self.dlte.setAttribute('data-title', 'Delete Graph');
		self.dlte.appendChild(self.trash);

		self.hide = document.createElement('a');
		self.hide.className = 'modebar-btn';
		self.hide.setAttribute('data-title', 'Hide Graph');
		self.hide.appendChild(self.hideGlyph);

		self.positionButtons = document.createElement('div');
		self.positionButtons.className = 'modebar-group';
		self.positionButtons.appendChild(self.dlte);
		self.positionButtons.appendChild(self.hide);


		function searchClass(className, tempDiv) {
			this.tempArray = tempDiv.children;
			//console.log(this.tempArray, this.tempArray[0].class);
			for(i = 0; i < this.tempArray.length; i++) {
				//console.log("	", this.tempArray[i].className, className);
				if (this.tempArray[i].className == className) {
					return this.tempArray[i];
				}
			}
		}
		//console.log(self.graphDiv.children)
		self.temp1 = searchClass("plot-container plotly", self.graphDiv);
		//console.log(self.temp1)
		self.temp2 = searchClass("svg-container", self.temp1);
		self.temp3 = searchClass("modebar modebar--hover", self.temp2);

		self.temp3.appendChild(self.positionButtons);

		//Function for delete button
		//self.dlte.innerHTML = 'Delete Graph';
		self.dlte.onclick = function() {
			Plotly.purge(self.graphDiv);
			self.div.parentNode.removeChild(self.div);
			self.aliveness = 0;
			graphHolder.updateSize(document.getElementById('graphContainer').clientWidth / cols, (document.getElementById('graphContainer').clientWidth / cols) / 1.5);
		}
		
		//Function for hide graph
		//self.hide.innerHTML = 'Hide Graph';
		self.hide.onclick = function() {
			self.hide.style.display = 'none';
			self.show.style.display = 'inline';
			self.delete.style.display = 'inline';
			self.graphDiv.style.display = 'none';
		}
		
		//Function for show graph
		self.show.innerHTML = 'Show graph';
		self.show.onclick = function() {
			self.graphDiv.style.display = 'inline';
			self.hide.style.display = 'inline';
			self.show.style.display = 'none';
		}

		//Function for delete graph
		self.delete.innerHTML = 'Delete graph';
		self.delete.onclick = function() {
			Plotly.purge(self.graphDiv);
			self.div.parentNode.removeChild(self.div);
			self.aliveness = 0;
			graphHolder.updateSize(document.getElementById('graphContainer').clientWidth / cols, (document.getElementById('graphContainer').clientWidth / cols) / 1.5);
		}

		//Add buttons to graph div
		self.div.appendChild(self.show);
		self.div.appendChild(self.delete);

		//Hides show button to start
		self.show.style.display = 'none';
		self.delete.style.display = 'none';
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

	document.getElementById('addGraphButton').addEventListener('click', function addGraph() {
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
		//console.log(self.newGraphs);
		self.graphs = self.newGraphs;
		//console.log(self.graphs);
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
				self.graphs[i].div.style.top = (Math.floor(i / cols) * ((document.getElementById('graphContainer').clientWidth / cols) + 80) / 1.5) + 'px';
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
	var millisecondsToWait = 0;
	setTimeout(function() {
		document.getElementById("loadingAnimat").style.display = "none";
	}, millisecondsToWait);
}

document.body.onkeydown = function(e){
	//console.log(e.key);
	if(/*(e.key == 'Control') || */(e.key == '+')){
		document.getElementById('addGraphButton').click();
	}
}

/*
websocket stuff
HAVE:
-Data(input*empty div*)
--self.text
--self.reset
--self.submit
---.onclick = initialize stream
----initstream*begin a websocket*
----**self.socket should append to a dictionary of sockets
----send initialization message to server
TODO:
-use a dictionary to store connections
-overview of connections(table like?)
-close connection
-store/log data points publicly
-
*/

var Data =  function(inputForm) {
	self = this;
	self.input = inputForm;
	self.sockets = [];
	self.infoTableBod = document.getElementById('socketDispBod');//localize calls to classes outside of functions scope maybe?

	self.text = document.createElement("input");
	self.text.type = 'text';
	self.text.value = 'ws://192.168.1.1';
	self.input.appendChild(self.text);//input text box
	
	self.reset = document.createElement('button');
	self.reset.innerHTML = 'Reset';
	self.reset.onclick = function() {
		self.text.value = 'ws://192.168.1.1';
	}
	self.input.appendChild(self.reset);

	self.submit = document.createElement('button');
	self.submit.innerHTML = 'Submit';
	self.submit.onclick = function() {//needed in submit button
		self.sockets[self.sockets.length] = new WebSocket(self.text.value);
		var tempSocket = self.sockets[self.sockets.length-1];
		tempSocket.onerror = function(error) {
			alert(error + "\ncouldn't connect to: " + tempSocket.url);
			//console.log(self.sockets);

		}
		tempSocket.onclose = function() {
			//self.sockets.splice(self.sockets.indexOf(tempSocket), 1);
			//alert('Socket closed');
			//console.log(self.sockets + '\n------');
		}
		tempSocket.onmessage = function(event) {
/*working here*/			console.log(event.data);///////////////////////////////////////
		}
		self.reset.click();
		var tempRow = document.createElement('tr');
		var td0 = document.createElement('td');
		td0.innerHTML = tempSocket.url;
		tempRow.appendChild(td0);
		var td1 = document.createElement('td');
		td1.innerHTML = tempSocket.readyState;
		td1.style.color = '#F00';
		tempSocket.onopen = function() {
			td1.style.color = '#0F0';//possible bug point
		}
		tempRow.appendChild(td1);
		var td2 = document.createElement('td');

		var close = document.createElement('span');
		close.className = 'glyphicon glyphicon-remove-circle';
		close.onclick = function() {
			tempSocket.close();
			self.sockets.splice(self.sockets.indexOf(tempSocket), 1);
			document.getElementById('socketDispBod').removeChild(tempRow);
		}
		td2.appendChild(close);

		var privew = document.createElement('span');
		privew.className = 'glyphicon glyphicon-info-sign';
		privew.onclick = function() {
			alert('show some data, currently dowsn\'t');
		}
		td2.appendChild(privew);
		tempRow.appendChild(td2);
		document.getElementById('socketDispBod').appendChild(tempRow);//make it relative to inputform?
	};
	self.input.appendChild(self.submit);


}

var data = new Data( document.getElementById('socketInput') );//$("#socketInput") );