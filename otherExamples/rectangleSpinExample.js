//вращение прямоугольника вокруг своей оси вслед за мышью

function Point(x, y) 
{
    this.x = x;
        this.y = y;
}

function RotatedRect() {
    this.canvas = document.getElementById("myCanvas");
    this.context = this.canvas.getContext("2d");
        this.leftTopPoint = new Point(this.canvas.width / 2, this.canvas.height / 2);
        this.mousePoint = new Point(this.canvas.width / 2, this.canvas.height / 2);
        this.width = 70;
        this.height = 10;
        
        this.init();
    this.reDraw();
}
 
RotatedRect.prototype.init = function()
{   
    var self = this;
        this.canvas.addEventListener("mousemove", function(event)
        {
            self.mousePoint = self.getPointByMouse(event);
            self.reDraw();
        });
}
 
RotatedRect.prototype.reDraw = function()
{   
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
 
        var angle = Math.atan2(this.mousePoint.y - this.leftTopPoint.y, this.mousePoint.x - this.leftTopPoint.x) * 180 / Math.PI;
        this.context.save();
        this.context.beginPath();
        this.context.translate(this.leftTopPoint.x, this.leftTopPoint.y);
        this.context.rotate(angle * Math.PI / 180);
        this.context.translate(-this.leftTopPoint.x, -this.leftTopPoint.y);
        this.context.rect(this.leftTopPoint.x, this.leftTopPoint.y, this.width, this.height);
        this.context.fill();
        this.context.restore();
}
 
 
RotatedRect.prototype.getPointByMouse = function(event)
{
    var rect = this.canvas.getBoundingClientRect();
        var x = (event.clientX - rect.left);
        var y = (event.clientY - rect.top);
    return new Point(x, y);
}
 
var rotatedRect = new RotatedRect();
