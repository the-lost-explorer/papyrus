$(document).ready(function(){
  var canvas = $('.blackboard');
  var colors = $('.colors');
  var current = {
    color: 'black'
  };

  window.addEventListener('resize', onResize, false);
  onResize();

  canvas.mousedown(function(e1){
      e1.currentX = e1.clientX, e1.currentY = e1.clientY;
    canvas.mousemove(function(e2){
         var msg = "Handler for .mousemove() called at ";
         msg += e2.clientX + ", " + e2.clientY;
         $( "#log" ).html( "<div>" + msg + "</div>" );

          canvas.drawLine({
      strokeStyle: '#000',
      strokeWidth: 1,
      x1: e1.currentX, y1: e1.currentY,
      x2: e2.clientX, y2: e2.clientY
      
          });
          e1.currentX = e2.clientX, e1.currentY = e2.clientY;
    });

   
});

  function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  
  
});
