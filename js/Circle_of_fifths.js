$(function(){
  var options = {
	 mapKey: "title",	 
	 render_select: {
	   fillColor: 'eebb6e',
		fillOpacity: 0.5
	 }
  };
  
  $("#Major").mapster(options);
  
  $( "#nav li" ).on( "click", function() {
  	 var mode = $( this ).text();
    //console.log(mode);
    $("div[id^='mapster_wrap']").remove();
  	 $("center").append("<img>");
    $( "img" ).attr({
    	id: mode,
      src: "img/Circle-of-fifths-" + mode + ".gif",
      usemap: "#" + mode
    });

    $("#"+mode).mapster(options);
  });
  
  $("area").click(function(e){
  	 $('area').mapster('deselect');
  	 var id = $(e.target).attr("title");
  	 //console.log(id);
  	 setTimeout(function() {
      $( "area[title='"+id+"']" ).mapster('select');
    }, 0);
  	 renderChord(id);
  }); 

});

function renderChord(chordName) {
  var canvas = $("#grand_staff")[0];
  var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);

  var ctx = renderer.getContext();
  
  ctx.clear();
  
  // Create the staves
  var topStaff = new Vex.Flow.Stave(20, 0, 150);
  var bottomStaff = new Vex.Flow.Stave(20, 150, 150);

  topStaff.addClef('treble');
  bottomStaff.addClef('bass');
  
  topStaff.addKeySignature(chordName);
  bottomStaff.addKeySignature(chordName);
  
  topStaff.setText(chordName, Vex.Flow.Modifier.Position.RIGHT);

  var brace = new Vex.Flow.StaveConnector(topStaff, bottomStaff).setType(3);
  var lineLeft = new Vex.Flow.StaveConnector(topStaff, bottomStaff).setType(1);
  var lineRight = new Vex.Flow.StaveConnector(topStaff, bottomStaff).setType(6);

  topStaff.setContext(ctx).draw();
  bottomStaff.setContext(ctx).draw();

  brace.setContext(ctx).draw();
  lineLeft.setContext(ctx).draw();
  lineRight.setContext(ctx).draw();
}
  