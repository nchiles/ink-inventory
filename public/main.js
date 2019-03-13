//uncheck press checkbox if ntmd/shlf radio button checked
$(".select-checkbox").click(function(){
  $(':radio').each(function () {
    $(this).removeAttr('checked');
    $('input[type="radio"]').prop('checked', false);
  })
});

//uncheck press checkbox if ntmd/shlf radio button checked
$(".select-radio").click(function(){
  $(':checkbox').each(function () {
    $(this).removeAttr('checked');
    $('input[type="checkbox"]').prop('checked', false);
  })
});

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

$('input[type=checkbox]').each(function(){
  if($(this).is(':checked')) {
      $(this).parent().removeClass("btn-secondary");
  } 
});

$('label').change(function(e) {
  $(this).toggleClass("btn-secondary"); //you can list several class names 
  e.preventDefault();
});

$('.searchsubmit').click(function(e){
  // var replaced = str.replace(/ /g, '+');
  var query = $("#autocompleteInks").val().replace(/ /g, '+')
  e.preventDefault();
  $('#searchresults').load('/?search=' + query);
});

$( function() {
  $( ".sortable" ).sortable({
    placeholder: "ui-state-highlight"
  });
  $( ".sortable" ).disableSelection();
} );