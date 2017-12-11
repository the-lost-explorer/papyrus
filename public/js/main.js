$(document).ready(function(){
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
    $("#blackboard").css('cursor','url('+String(cursorImage)+',auto)');
  });

  var canvasOffset = $('#blackboard').offset();

  function onResize(){
    board.width = window.innerWidth - 15;
    board.height = window.innerHeight - 120;
  }

  boardQ.mousemove(function(e){
    if (letsdraw === true) {
        draw.lineTo(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top);
        draw.stroke();
    }

    boardQ.mousedown(function(){
      letsdraw = true;
      draw.strokeStyle = currentColor;

      if(currentColor == 'black'){
        draw.lineWidth = 100;
      }else{
        draw.lineWidth = 2;
      }
      draw.lineCap = 'round';
      draw.beginPath();
      draw.moveTo(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top);
    });
  });
  

  

  $(window).mouseup(function() {
    letsdraw = false;
  });

});
