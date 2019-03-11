//uncheck press checkbox if ntmd/shlf radio button checked
$(".select-checkbox").click(function(){
  $(':radio').each(function () {
    $(this).removeAttr('checked');
    $('input[type="radio"]').prop('checked', false);
  })
});

//uncheck press radio if ntmd/shlf radio button checked
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


$(".search-button").click(function(e){
  e.preventDefault();
  query = $('#autocompleteInks').val()
  $.ajax({  
    url: '/search' + '?search=' + query,
    type: 'GET',
    dataType: "json",
    success: function(data) {
      $('.inkresult').html(data.ink.ink);
      $('.locationresult').html(data.ink.location);
      $('.idresult').html(data.ink._id);
      console.log(data);
    },
    error: function(err) {
        console.log(err);
    }
  });
});

$(".update-location").click(function(e){
  e.preventDefault();
  query = $('.result1').val()
  $.ajax({  
    url: '/:id',
    type: 'PUT',
    dataType: "json",
    success: function(data) {
      console.log(data);
    },
    error: function(err) {
        console.log(err);
    }
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

$( function() {
  $( ".sortable" ).sortable({
    placeholder: "ui-state-highlight"
  });
  $( ".sortable" ).disableSelection();
} );