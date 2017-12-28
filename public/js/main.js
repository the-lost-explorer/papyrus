$(document).ready(function(){
  //Socket
  var socket = io();

  //Drawing
  window.addEventListener('resize', onResize, false);  
  //Resizing shit
  var letsdraw = false;
  var board = document.getElementById('blackboard');
  var boardQ = $('#blackboard');
  var colors = $('.colors');
  currentColor = 'white';
  var draw = board.getContext('2d');
  onResize();
  $('.color').on("click",function(){
    currentColor = this.id;
    cursorImage = 'http://localhost:8001/public/?filePath=img/'+currentColor+'.cur';
    console.log(cursorImage);
    boardQ.css('cursor','url('+cursorImage+'), auto');
  });

  var canvasOffset = $('#blackboard').offset();

  function onResize(){
    board.width = window.innerWidth - 15;
    board.height = window.innerHeight - 120;
  }

  boardQ.mousemove(function(e){
    socket.emit('drawing',[e.pageX,e.pageY])
    if (letsdraw === true) {
        socket.on('drawing',function(coordinates){
          draw.lineTo(coordinates[0] - canvasOffset.left, coordinates[1] - canvasOffset.top);
          draw.stroke();
        });
    }

    boardQ.mousedown(function(){
      socket.emit('drawing',[e.pageX,e.pageY])
      letsdraw = true;
      socket.on('drawing',function(coordinates){
        draw.strokeStyle = currentColor;
        if(currentColor == 'black'){
          draw.lineWidth = 45;
        }else{
          draw.lineWidth = 2;
        }
        draw.lineCap = 'round';
        draw.beginPath();
        draw.moveTo(coordinates[0] - canvasOffset.left, coordinates[1] - canvasOffset.top);
      });
    });
  });

  $(window).mouseup(function() {
    letsdraw = false;
  });

});
