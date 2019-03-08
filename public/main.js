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

//UPDATE VARIABLES WITH AJAX
$(() => {
  const $form = $('#form')
  $form.on('submit', handleForm)
  function handleForm(e) {
      e.preventDefault()
            
      const options = {
          method: $form.attr('method'),
          url: $form.attr('action'),
          data: $form.serialize(), 
          success: 
              $(document).ready (function(){
                  $('#form')[0].reset(); 
                  $('body').off().on('submit','#form', function() {  
                      $(".presses").load(location.href+" .presses>*",""); /* reload status bar */
                      // $(".status-bar-overlay").load(location.href+" .status-bar-overlay>*",""); /* reload status bar */
      
                      // $(".bg-overlay").fadeIn("fast").addClass("show-bg-overlay").delay(1200).fadeOut(1500); //background
                      // $(".overlay").fadeIn("fast").addClass("show-overlay").delay(1200).slideUp(800).fadeOut(1000); //words
                      // $(".status-bar-overlay").delay(1500).animate({"font-size":".5em"}).fadeOut(400).fadeIn().animate({"font-size":"2.5em"});
                  });
              }),
      }
      $.ajax(options).done(response => {
          console.log(response)
      })
  }    
})


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
  $( "#sortable" ).sortable({
    placeholder: "ui-state-highlight"
  });
  $( "#sortable" ).disableSelection();
} );