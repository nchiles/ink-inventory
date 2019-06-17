$( document ).ready(function() {
  $('#form').css("display","none");
});


// autocomplete search field
var xhReq = new XMLHttpRequest();
xhReq.open("GET", "/inklist", false);
xhReq.send(null);
var jsonObject = JSON.parse(xhReq.responseText);

$( function() {
  var availableInks = jsonObject;
  $( "#search" ).autocomplete({
    source: availableInks,
    minLength: 2,
    select: function(event, ui) { 
      $("#search").val(ui.item.label);
      $("#searchform").submit(); }
  });
});

//PRESS CHECKBOX LOGIC
//uncheck press checkbox if ntmd/shlf radio button checked
$(".select-checkbox").click(function(){
  $(':radio').each(function () {
    $(this).prop('checked');
    $('input[type="radio"]').prop('checked', false);
  })
});

//uncheck press checkbox if ntmd/shlf radio button checked
$(".select-radio").click(function(){
  $(':checkbox').each(function () {
    $(this).prop('checked');
    $('input[type="checkbox"]').prop('checked', false);
  })
});

//submit search
$('#searchform').submit(function(e){
  e.preventDefault();

  $('#form').css("display", "flex");

  $("#resultloc0").html(''), 
  $("#resultloc1").html(''), 
  $("#resultloc2").html(''),
  $("#resultloc3").html(''),
  $("#resultloc4").html(''),
  $("#resultloc5").html(''),
  $("#resultloc6").html(''),
  $("#resultloc7").html(''),
  $("#resultloc8").html(''),
  $("#resultloc9").html(''),
  $('input[type="checkbox"]').prop('checked', false);
  $('input[type="radio"]').prop('checked', false);
  
  inkInput = $("#search").val().replace(/ /g, '+')

  $.ajax({
    url: "/search?q=" + inkInput
  }).done(function(r) {
    
    //bucket name
    const ink = r.data;

    if (ink) {
      $("#result").html(r.data.ink);
      $("#form").attr('data-id', r.data._id);
       //current location(s)
      var locArray = [
        $("#resultloc0").html(r.data.location[0]).html(), 
        $("#resultloc1").html(r.data.location[1]).html(), 
        $("#resultloc2").html(r.data.location[2]).html(),
        $("#resultloc3").html(r.data.location[3]).html(),
        $("#resultloc4").html(r.data.location[4]).html(),
        $("#resultloc5").html(r.data.location[5]).html(),
        $("#resultloc6").html(r.data.location[6]).html(),
        $("#resultloc7").html(r.data.location[7]).html(),
        $("#resultloc8").html(r.data.location[8]).html(),
        $("#resultloc9").html(r.data.location[9]).html()
      ]
  
      for (var i = 0; i < locArray.length; i++) {     //loop through current locations of ink 
        if (locArray[i] == 'NTMD') {                  //if locArray is press 
          $('#select-ntmd').prop('checked', true);    //check checkbox
        } 
        if (locArray[i] == 'SHLF') {            
          $('#select-shlf').prop('checked', true); 
        } 
        if (locArray[i] == 'C218') {            
          $('#select-c218').prop('checked', true); 
        } 
        if (locArray[i] == "C312") {           
          $('#select-c312').prop('checked', true);
        }
        if (locArray[i] == "C318") {           
          $('#select-c318').prop('checked', true);
        }
        if (locArray[i] == "GA18") {           
          $('#select-ga18').prop('checked', true);
        }
        if (locArray[i] == "MANL") {           
          $('#select-manl').prop('checked', true);
        }
        if (locArray[i] == "SMPL") {           
          $('#select-smpl').prop('checked', true);
        }
        if (locArray[i] == "SP10") {           
          $('#select-sp10').prop('checked', true);
        }
        if (locArray[i] == "SP14") {           
          $('#select-sp14').prop('checked', true);
        }
      }
    } else
      $("#result").html('No match found');
  }).fail(function(err) {
    console.error(err); 
  }); 
});

 //CLEAR SEACHBOX
// $( '.searchform' ).each(function(){
//   this.reset();
// });

$( function() {
  $( ".sortable" ).sortable({
    placeholder: "ui-state-highlight"
  });
  $( ".sortable" ).disableSelection();
} );

//update location
$(".update-loc").click(function() {
  var inkid = $(this).parent().parent().parent().attr('data-id');
  console.log(inkid);
  $.ajax({
    type: "POST",
    url: '/' + inkid + '?_method=PUT',
    data: $(this).parent().parent().parent().serialize(),
    // success: function() {
    // }
    success: function() {
      $('.inuse').load(location.href+" .inuse>*","");
    }
  });
});

//unique id for ink in use
// var inkInUse = 0;
// $('.ui-state-default').each(function(){
//   inkInUse++;
//     var newID='ui-state-default' + inkInUse;
//     $(this).attr('id', newID);
// });

//search from inuse
$('.ui-state-default').click("submit", function(e){
  e.preventDefault();

  $('#form').css("display", "flex");

  $("#resultloc0").html(''), 
  $("#resultloc1").html(''), 
  $("#resultloc2").html(''),
  $("#resultloc3").html(''),
  $("#resultloc4").html(''),
  $("#resultloc5").html(''),
  $("#resultloc6").html(''),
  $("#resultloc7").html(''),
  $("#resultloc8").html(''),
  $("#resultloc9").html(''),
  $('input[type="checkbox"]').prop('checked', false);
  $('input[type="radio"]').prop('checked', false);
  
  inkInput = $(this).html().replace(/ /g, '+')
  // alert(inkInput)
  $.ajax({
    url: "/search?q=" + inkInput
  }).done(function(r) {
    
    //bucket name
    const ink = r.data;

    if (ink) {
      $("#result").html(r.data.ink);
      $("#form").attr('data-id', r.data._id);
       //current location(s)
      var locArray = [
        $("#resultloc0").html(r.data.location[0]).html(), 
        $("#resultloc1").html(r.data.location[1]).html(), 
        $("#resultloc2").html(r.data.location[2]).html(),
        $("#resultloc3").html(r.data.location[3]).html(),
        $("#resultloc4").html(r.data.location[4]).html(),
        $("#resultloc5").html(r.data.location[5]).html(),
        $("#resultloc6").html(r.data.location[6]).html(),
        $("#resultloc7").html(r.data.location[7]).html(),
        $("#resultloc8").html(r.data.location[8]).html(),
        $("#resultloc9").html(r.data.location[9]).html()
      ]
  
      for (var i = 0; i < locArray.length; i++) {     //loop through current locations of ink 
        if (locArray[i] == 'NTMD') {                  //if locArray is press 
          $('#select-ntmd').prop('checked', true);    //check checkbox
        } 
        if (locArray[i] == 'SHLF') {            
          $('#select-shlf').prop('checked', true); 
        } 
        if (locArray[i] == 'C218') {            
          $('#select-c218').prop('checked', true); 
        } 
        if (locArray[i] == "C312") {           
          $('#select-c312').prop('checked', true);
        }
        if (locArray[i] == "C318") {           
          $('#select-c318').prop('checked', true);
        }
        if (locArray[i] == "GA18") {           
          $('#select-ga18').prop('checked', true);
        }
        if (locArray[i] == "MANL") {           
          $('#select-manl').prop('checked', true);
        }
        if (locArray[i] == "SMPL") {           
          $('#select-smpl').prop('checked', true);
        }
        if (locArray[i] == "SP10") {           
          $('#select-sp10').prop('checked', true);
        }
        if (locArray[i] == "SP14") {           
          $('#select-sp14').prop('checked', true);
        }
      }
    } else
      $("#result").html('No match found');
  }).fail(function(err) {
    console.error(err); 
  }); 
});

