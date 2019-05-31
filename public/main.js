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
    $('.search-result-placeholder').load('/?search=' + query);
    $('.search-result-placeholder').css('border', 'none');
    $('#ui-id-1').css('display', 'none');
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