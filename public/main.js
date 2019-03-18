// autocomplete search field
var xhReq = new XMLHttpRequest();
xhReq.open("GET", "/inklist", false);
xhReq.send(null);
var jsonObject = JSON.parse(xhReq.responseText);

$( function() {
  var availableInks = jsonObject;
  $( "#autocompleteInks" ).autocomplete({
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

//LOAD SEARCH RESULTS
$('.searchsubmit').click(function(e){
  var query = $("#autocompleteInks").val().replace(/ /g, '+')
  e.preventDefault();
  if (query == null || query == undefined || query == "") {
    return;
  } else {
    $('#searchresults').load('/?search=' + query);
    $("#searchresults").css('border', 'none');
    $('#ui-id-1').css('display', 'none');
  }
});

 //CLEAR SEACHBOX
$( '.searchform' ).each(function(){
  this.reset();
});

$( function() {
  $( ".sortable" ).sortable({
    placeholder: "ui-state-highlight"
  });
  $( ".sortable" ).disableSelection();
} );