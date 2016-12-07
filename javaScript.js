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

	self.button.click();

	self.button.onclick = function() {
		self.aliveness = 2;
		self.graphDiv = document.createElement('div');
		//self.div.style.border = "4px solid #000000";
		self.graphName = self.input.value;
		self.form.parentNode.removeChild(self.form);
		//the graph
		self.t1 = {
			x:[1, 2, 3],
			y:[1, 2, 3],
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

		//Initializes delete, hide, show, create CSV, and input data buttons above graph
		self.show = document.createElement('button');
		self.delete = document.createElement('button');

		self.trashGlyph = document.createElement('span');
		self.trashGlyph.className = 'glyphicon glyphicon-trash';

		self.hideGlyph = document.createElement('span');
		self.hideGlyph.className = 'glyphicon glyphicon-minus-sign';

		self.csvGlyph = document.createElement('span');
		self.csvGlyph.className = 'glyphicon glyphicon-download-alt';

		self.uploadGlyph = document.createElement('span');
		self.uploadGlyph.className = 'glyphicon glyphicon-upload';

		self.dlte = document.createElement('a');
		self.dlte.className = 'modebar-btn';
		self.dlte.setAttribute('data-title', 'Delete Graph');
		self.dlte.appendChild(self.trashGlyph);

		self.hide = document.createElement('a');
		self.hide.className = 'modebar-btn';
		self.hide.setAttribute('data-title', 'Hide Graph');
		self.hide.appendChild(self.hideGlyph);

		self.csv = document.createElement('a');
		self.csv.className = 'modebar-btn';
		self.csv.setAttribute('data-title', 'Save CSV');
		self.csv.appendChild(self.csvGlyph);

		self.upload = document.createElement('a');
		self.upload.className = 'modebar-btn';
		self.upload.setAttribute('data-title', 'Upload Data');
		self.upload.appendChild(self.uploadGlyph);

		self.positionButtons = document.createElement('div');
		self.positionButtons.className = 'modebar-group';
		self.positionButtons.appendChild(self.dlte);
		self.positionButtons.appendChild(self.hide);
		self.positionButtons.appendChild(self.csv);
		self.positionButtons.appendChild(self.upload);


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
		
		self.csv.onclick = function() {
			var failed = downloadCSV({ filename: (self.graphName + ".csv")}, self.t1);
			if (failed) {
				alert("No data to download");
			}
		}

		self.upload.onclick = function() {

		}

		//Function for show graph
		self.show.innerHTML = 'Show graph';
		self.show.onclick = function() {
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
		if(graphHolder.graphs.length > 0) {
			for(graph = 0; graph < graphHolder.graphs.length; graph++) {
				graphHolder.graphs[graph].div.style.border = "none";
			}
			graphHolder.graphs[chosenGraph].div.style.border = "4px solid #000000";
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
	if(e.key == '+'){
		document.getElementById('addGraphButton').click();
	}
	else if(e.key == 'ArrowRight' && chosenGraph < graphHolder.graphs.length - 1){
		chosenGraph += 1;
	}
	else if(e.key == 'ArrowLeft' && chosenGraph > 0){
		chosenGraph -= 1;
	}
	else if(e.key == 'ArrowUp' && Math.floor(chosenGraph / cols) > 0) {
		chosenGraph -= cols;
		console.log(chosenGraph);
	}
	
	if(e.key == 'ArrowDown' && (chosenGraph + parseInt(cols)) < (graphHolder.graphs.length )) {
		chosenGraph += parseInt(cols);
		console.log(chosenGraph);
	}
	graphHolder.updateSize(document.getElementById('graphContainer').clientWidth / cols, (document.getElementById('graphContainer').clientWidth / cols) / 1.5);
}

//Following two functions deal with downloading CSV
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

