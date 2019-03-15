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
  $( "#search" ).autocomplete({
    source: availableInks
  });
});

$(document).ready(function() {
  $("#search").keyup(function() {
      $.ajax({
          url: "/search?q=" + this.value
      }).done(function(r) {
          const ink = r.data;
          if (ink)
              $("#result-ink").html(r.data.ink) &&
              $("#result-location").html(r.data.location) &&
              $("#result-id").html(r.data._id);
          else
              $("#result-ink").html('No ink found') &&
              $("#result-location").html('') &&
              $("#result-id").html('');
      }).fail(function(err) {
          console.error(err); 
      });;
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