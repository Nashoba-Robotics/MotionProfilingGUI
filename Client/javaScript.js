var cols = 2;
var keys = [];
var chosenGraph = 0;
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
	self.div.id = 'hoverDiv';
/*
var plotDiv = document.getElementById('plotDiv');
var t1 = {
	x: [ new Date().getTime() / 1000 ],
	y: [0]
}
var t2 = {
	x: [0],
	y: [ new Date().getTime() / 1000 ]
}
var data = [t1, t2];
Plotly.plot(plotDiv, data, { title: 'Random Over Time'});
while(1==1){
	console.log('entered loop');
	var update = {
		x: [[ new Date().getTime() / 1000 ]],
		y: [[ Math.random() ]]
	};	
	console.log('bout to plot');
	Plotly.extendTraces(plotDiv, update, [0], 50);
	console.log('plotted');
}
*/
	self.button.onclick = function() {
		self.aliveness = 2;
		self.graphDiv = document.createElement('div');
		//self.div.style.border = "4px solid #000000";
		self.graphName = self.input.value;
		self.form.parentNode.removeChild(self.form);
		//the graph
		self.traces = [{
			x: [0],
			y: [0],
			mode: 'lines'},
			{
				x: [1],
				y: [1],
				mode: 'lines'
		}];
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
		Plotly.newPlot(self.graphDiv, self.traces, self.layout);

		self.div.appendChild(self.graphDiv);
		document.getElementById('graphContainer').appendChild(self.div);

		//Initializes delete, hide, show, create CSV, and input data buttons above graph
		self.show = document.createElement('button');
		self.delete = document.createElement('button');

		function makeModeBut(glyph, toolTip, toAppend) {
			var glyphSpan = document.createElement('span');
			var buttA = document.createElement('a');
			glyphSpan.className = 'glyphicon glyphicon-' + glyph;
			buttA.className = 'modebar-btn';
			buttA.setAttribute('data-title', toolTip);
			buttA.style.backgroundColor = '#3A3';
			buttA.appendChild(glyphSpan);
			toAppend.appendChild(buttA);
			return buttA;			
		}

		self.positionButtons = document.createElement('div');
		self.positionButtons.className = 'modebar-group';

		self.dlte = makeModeBut('trash', 'Delete Graph', self.positionButtons);
		self.hide = makeModeBut('minus-sign', 'Hide Graph', self.positionButtons);
		self.csv = makeModeBut('download-alt', 'Save CSV', self.positionButtons);
		self.upload = makeModeBut('upload', 'Upload Data', self.positionButtons);

		self.addPnt = function() {
			update = {
			};
			Plotly.extendTraces(self.graphDiv, update, [0]/**/, 10);
			console.log('added x');
		}

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
			self.aliveness = 3;
			self.hide.style.display = 'none';
			self.show.style.display = 'inline';
			self.delete.style.display = 'inline';
			self.graphDiv.style.display = 'none';
		}
		
		self.csv.onclick = function() {
			var failed = downloadCSV({ filename: (self.graphName + ".csv")}, self.traces[0]);
			if (failed) {
				alert("No data to download");
			}
		}

		self.upload.onclick = function() {
			loadDoc(self)
		}

		//Function for show graph
		self.show.innerHTML = 'Show graph';
		self.show.onclick = function() {
			self.aliveness = 2;
			self.graphDiv.style.display = 'inline';
			self.hide.style.display = 'inline';
			self.show.style.display = 'none';
			self.delete.style.display = 'none';
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

		graphHolder.updateSize(document.getElementById('graphContainer').clientWidth / cols, (document.getElementById('graphContainer').clientWidth / cols) / 1.5);
	}

	self.form = document.createElement('div');
	self.form.appendChild(self.input);
	self.form.appendChild(self.button);
	self.div.appendChild(self.form);
	document.getElementById('graphContainer').appendChild(self.div);

	function isHover(e) {
  		return (e.parentElement.querySelector(':hover') === e);
	}

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
		graphHolder.updateSize(document.getElementById('graphContainer').clientWidth / cols, (document.getElementById('graphContainer').clientWidth / cols) / 1.5);
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
	this.updateBorder = function() {
		if(graphHolder.graphs.length > 0) {
			for(graph = 0; graph < graphHolder.graphs.length; graph++) {
				graphHolder.graphs[graph].div.style.border = "none";
			}
			if(chosenGraph >= graphHolder.graphs.length) {
				chosenGraph = graphHolder.graphs.length - 1;
			}
			graphHolder.graphs[chosenGraph].div.style.border = "4px solid #000000";
		}
	}
}

var graphHolder = new GraphMaster();

function showValue(newValue) {
	document.getElementById("loadingAnimat").style.display = "block";
	document.getElementById("range").innerHTML = newValue;
	cols = parseInt(newValue);
	graphHolder.updateSize(document.getElementById('graphContainer').clientWidth / cols, (document.getElementById('graphContainer').clientWidth / cols) / 1.5);
	var millisecondsToWait = 0;
	setTimeout(function() {
		document.getElementById("loadingAnimat").style.display = "none";
	}, millisecondsToWait);
}

document.body.onkeydown = function(e){
	//console.log(e.key);
	if(e.key == '+'){
		document.getElementById('addGraphButton').click();
	}
	if (graphHolder.graphs.length > 0) {
		if(e.key == 'ArrowRight' && chosenGraph < graphHolder.graphs.length - 1){
			chosenGraph += 1;
		}
		else if(e.key == 'ArrowLeft' && chosenGraph > 0){
			chosenGraph -= 1;
		}
		else if(e.key == 'ArrowUp' && Math.floor(chosenGraph / cols) > 0) {
			chosenGraph -= cols;
			//console.log(chosenGraph);
		}
		else if(e.key == 'ArrowDown' && chosenGraph + cols < graphHolder.graphs.length) {
			chosenGraph += cols;
			//console.log(chosenGraph);
		}	
		else if(e.key == 'd' || e.key == 'Backspace' || e.key == 'Delete') {
			if(graphHolder.graphs[chosenGraph].aliveness == 2 || graphHolder.graphs[chosenGraph].aliveness == 3) {
				graphHolder.graphs[chosenGraph].delete.click();
			}
			else if(graphHolder.graphs[chosenGraph].aliveness == 1) {
				graphHolder.graphs[chosenGraph].button.click();
				graphHolder.graphs[chosenGraph].delete.click();
			}
		}
		else if (e.key == 'h'){
			if(graphHolder.graphs[chosenGraph].aliveness == 2) {
				graphHolder.graphs[chosenGraph].hide.click();
			}
		}
		else if(e.key == 's') {
			if(graphHolder.graphs[chosenGraph].aliveness == 3){
				graphHolder.graphs[chosenGraph].show.click();
			}
		}
		else if(e.key == 'Enter') {
			if(graphHolder.graphs[chosenGraph].aliveness == 1) {
				graphHolder.graphs[chosenGraph].button.click();
			}
		}
	}
	graphHolder.updateBorder();
}

function loadDoc(graph) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		loadTrace(this, graph);
		}
  	};
	xhttp.open("GET", "Graph.xml", true);
	xhttp.send();
}

function loadTrace(xml, graph) {
	var xmlDoc = xml.responseXML;
	var trace = xmlDoc.getElementsByTagName("TRACE");
	var t;
	for(t = 0; t < trace.length; t++) {
		graph.traces.push({x:[], y:[], mode:'lines'})
		var point = trace[t].getElementsByTagName("X");
		var p;
		for(p = 0; p < point.length; p++) {
			graph.traces[t].x.push(parseInt(traces[t].getElementsByTagName("X")[p].childNodes[0].nodeValue));
			graph.traces[t].y.push(parseInt(traces[t].getElementsByTagName("Y")[p].childNodes[0].nodeValue));	
		}
	}
	graphHolder.updateSize(document.getElementById('graphContainer').clientWidth / cols, (document.getElementById('graphContainer').clientWidth / cols) / 1.5);
}

//Following two functions deal with downloading CSV
/*
function convertArrayOfObjectsToCSV(args) {  
	var result, ctr, keys, columnDelimiter, lineDelimiter, data;

	data = [args.x, args.y] || null;
	if (data == null || !data.length) {
		return null;
	}

	columnDelimiter = args.columnDelimiter || ',';
	lineDelimiter = args.lineDelimiter || '\n';

	keys = Object.keys(data[0]);

	result = '';

	data.forEach(function(item) {
		ctr = 0;
		keys.forEach(function(key) {
			if (ctr > 0) result += columnDelimiter;

			result += item[key];
			ctr++;
		});
		result += lineDelimiter;
	});

	return result;
}

//Saves CSV
function downloadCSV(args, dataSet) {  
	var data, filename, link;
	var csv = convertArrayOfObjectsToCSV(dataSet);
	if (csv == null) {
		return true;
	}

	filename = args.filename || 'export.csv';

	if (!csv.match(/^data:text\/csv/i)) {
		csv = 'data:text/csv;charset=utf-8,' + csv;
	}
	
	data = encodeURI(csv);

	link = document.createElement('a');
	link.setAttribute('href', data);
	link.setAttribute('download', filename);
	link.click();
}
*/


/*
websocket stuff
-Data(input*empty div*)
--self.text
--self.reset
--self.submit
---.onclick = initialize stream
----initstream*begin a websocket*
----**self.socket should append to a dictionary of sockets
----send initialization message to server
----tempsocket
-----.onerror
-----.onerror
*/

var Data =  function(inputForm) {
	self = this;
	self.input = inputForm;
	self.sockets = [];
	self.infoTableBod = document.getElementById('socketDispBod');//localize calls to classes outside of functions scope maybe?

	self.text = document.createElement("input");
	self.text.type = 'text';
	self.text.value = 'ws://localhost/MPGUI:1768';
	self.input.appendChild(self.text);//input text box
	
	self.reset = document.createElement('button');
	self.reset.innerHTML = 'Reset';
	self.reset.onclick = function() {
		self.text.value = 'ws://localhost:80';
	}
	self.input.appendChild(self.reset);

	self.submit = document.createElement('button');
	inputForm.addEventListener("keyup", function(event) {
	    if (event.keyCode == 13) {
	        self.submit.click();
	    }
	});
	self.submit.innerHTML = 'Submit';
	self.submit.onclick = function() {//needed in submit button
		self.sockets[self.sockets.length] = new WebSocket(self.text.value);
		var tempSocket = self.sockets[self.sockets.length-1];
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
			td1.innerHTML = tempSocket.readyState;
		}
		tempSocket.onerror = function(error) {
			alert(error + "\ncouldn't connect to: " + tempSocket.url);
			//console.log(self.sockets);
			td1.style.color = '#F00';
			td1.innerHTML = tempSocket.readyState;
		}
		tempSocket.onclose = function() {
			//self.sockets.splice(self.sockets.indexOf(tempSocket), 1);
			//alert('Socket closed');
			//console.log(self.sockets + '\n------');
			td1.style.color = '#F00';
			td1.innerHTML = tempSocket.readyState;
		}
		tempSocket.onmessage = function(event) {
			console.log(event);
			console.log('message recieved');
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
