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

// $('input[type=checkbox]').each(function(){
//   if($(this).prop('checked')) {
//       $(this).parent().removeClass("press-buttons");
//       $(this).parent().addClass("press-buttons-checked");
//   } 
// });

// $("label").change(function() {
//   var checkBoxes = $("input[type=checkbox]");
//   checkBoxes.prop("checked", !checkBoxes.prop("checked"));
// });

// $("label").change(function() {
//   var radioBoxes = $("input[type=radio]");
//   var checkBoxes = $("input[type=checkbox]");
//   if (radioBoxes.prop("checked")) {
//     !checkBoxes.prop("checked");
//   }
// });

// $('label').change(function(e) {
//   $(this).toggleProp("btn-outline-secondary");
//   e.preventDefault();
// });

//LOAD SEARCH RESULTS
$('.searchsubmit').click(function(e){
  var query = $("#autocompleteInks").val().replace(/ /g, '+')
  e.preventDefault();
  $('#searchresults').load('/?search=' + query);
});

// $( function() {
//   $( ".sortable" ).sortable({
//     placeholder: "ui-state-highlight"
//   });
//   $( ".sortable" ).disableSelection();
// } );