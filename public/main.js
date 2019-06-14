// autocomplete search field
var xhReq = new XMLHttpRequest();
xhReq.open("GET", "/inklist", false);
xhReq.send(null);
var jsonObject = JSON.parse(xhReq.responseText);

$( function() {
  var availableInks = jsonObject;
  $( "#search" ).autocomplete({
    source: availableInks
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

$('#searchform').submit(function(e){
  e.preventDefault();
  inkInput = $("#search").val().replace(/ /g, '+')
  $.ajax({
    url: "/search?q=" + inkInput
  }).done(function(r) {
    const ink = r.data;

    if (ink)
      $("#result").html(r.data.ink) && 

      $("#resultloc0").html(r.data.location[0]) && 
      $("#resultloc1").html(r.data.location[1]) && 
      $("#resultloc2").html(r.data.location[2]) &&
      $("#resultloc3").html(r.data.location[3]) &&
      $("#resultloc4").html(r.data.location[4]) &&
      $("#resultloc5").html(r.data.location[5]) &&
      $("#resultloc6").html(r.data.location[6]) &&
      $("#resultloc7").html(r.data.location[7]) &&
      $("#resultloc8").html(r.data.location[8]) &&
      $("#resultloc9").html(r.data.location[9]);
      
      if ($("#resultloc0").html() == ("C312")) {
        // alert("hello")
        $('#select-c312').prop('checked', true);
      }
    else
      $("#result").html('No match found');
  }).fail(function(err) {
    console.error(err); 
  });;
});

$(".test").click(function(){
  // alert($("#resultloc0").html());
  if ($("#resultloc0").html() == ("C312")) {
    // alert("hello")
    $('#select-c312').prop('checked', true);
  }
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

$(".update-form").click(function() {
  var inkid = $(this).parent().parent().parent().attr('data-id');
  $.ajax({
    type: "POST",
    url: '/' + inkid + '?_method=PUT',
    data: $(this).parent().parent().parent().serialize(),
    success: function() {
    }
  });
  // location.reload();
  // $('.search-result-placeholder').load('/?search=' + '123');
});