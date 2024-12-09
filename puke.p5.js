let drips=[]
let colors=['#000000',"#707C46",'#530000','#A80000','#FF065B']
let colorPicker=1

function setup() {
	createCanvas(windowWidth, windowHeight);
	drips.push(new drip(colorPicker%5, -height*0.65))
	colorPicker+=1
}

function draw() {
if(frameCount%100==0){
drips.push(new drip(colorPicker%5, -height))	
	colorPicker+=1
}
	
for(let i=drips.length-1; i>=0; i-=1){
	drips[i].drop();
	//drips[i].display();
}
for(let drip of drips){
	//drip.drop();
	drip.display();
}
}


class drip{
	constructor(colorIndex, start){
		this.points=[];
		this.progress= start
		// this.acc=0.003
		// this.vel=0
		this.extent=height
		this.color= colors[colorIndex]
		this.changeOffset=random(1000)
		
	}
	drop(){

	this.progress+=1.2	
		
		if (this.progress > height+ 30) {
      let index = drips.indexOf(this);
      drips.splice(index, 1);
    }
	this.changeOffset+=0.001
		this.points=[];
		for(let x=-30; x<=width+30; x+=10){
		let y= this.progress+ noise(x/(width/3), this.changeOffset) * this.extent
		let pointer=createVector(x, y)
		this.points.push(pointer)
		}
		//also need to delete of course
	}
	display(){
		noStroke()
		fill(this.color)
		beginShape();
		curveVertex(-20, -20)
		curveVertex(-20, -10)
		for(let i=0; i<this.points.length; i++){
			curveVertex(this.points[i].x, this.points[i].y)
		}
		curveVertex(width+20, this.progress-20)
		curveVertex(width+20, -10)
		curveVertex(width+20, -20)
		endShape(CLOSE);
		
		fill(255, 200);
		beginShape()
		for(let i=0; i<this.points.length; i++){
			curveVertex(this.points[i].x, this.points[i].y-2)
		}
	
		for(let i=this.points.length-1; i>0; i--){
		curveVertex(this.points[i].x, this.points[i].y-7)
		}
		endShape();
		
		fill(255, 70);
		beginShape()
		for(let i=0; i<this.points.length; i++){
			curveVertex(this.points[i].x, this.points[i].y-7)
		}
	
		for(let i=this.points.length-1; i>0; i--){
		curveVertex(this.points[i].x, this.points[i].y-17)
		}
		endShape();
	}
}