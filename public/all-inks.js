//SCROLL TO TOP BUTTON
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("scrollTopBtn").style.display = "block";
  } else {
    document.getElementById("scrollTopBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  $("html, body").animate({ scrollTop: 0 })
  // document.body.scrollTop = 0;
  // document.documentElement.scrollTop = 0;
}

//SEARCH-SCROLL TO INK
$('#scrollform').on('submit', function(e){  
  e.preventDefault(); 
  var ink = '#' + $('#search').val();
  window.scrollTo(0, $(ink).offset().top - $(window).height()/10);
});

//ADD INK DROPDOWN
/* When the user clicks on the button,toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
  $("#inktoadd").focus();
}

// Close the dropdown menu if the user clicks outside of it
// window.onclick = function(event) {
//   if (!event.target.matches('.dropbtn')) {
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }

//add ink ajax
$('#addform').on('submit', function(e){
  e.preventDefault(); 

  ink = $("#inktoadd").val()

  $.ajax({
    type: "POST",
    url: 'add-ink',
    data: {
      ink: ink,
    }
  }).done (function(r) {
      if (ink) {
        $("#addResult").html('<i class="fa fa-check"></i>');
      } else {
        $("#addResult").html("error");
      }
  }).fail(function(err) {
    console.error(err);
    $("#addResult").html('<i class="fa fa-times"></i>'); 
    // $("#duplicate").html("Duplicate Ink"); 
  });
  $('#addform').each(function(){
    this.reset();
  });
});

//PRESS CHECKBOX LOGIC
//uncheck press checkbox if ntmd/shlf radio button checked
$(".select-checkbox").click(function(){
  $(this).prop('checked');
  $(this).parent().parent().siblings().children().children('input[type="radio"]').prop('checked', false);
});
  
//uncheck press checkbox if ntmd/shlf radio button checked
$(".select-radio").click(function(){
  $(this).prop('checked');
  $(this).parent().parent().siblings().children().children('input[type="checkbox"]').prop('checked', false);
});

$(".update-form").click(function() {
  var inkid = $(this).parent().parent().parent().parent().attr('data-id');
  $.ajax({
    type: "POST",
    url: '/all-inks/' + inkid + '?_method=PUT',
    data: $(this).parent().parent().parent().parent().serialize(),
    success: function() {
    }
  });
});

// var dupform = 0;
// $('.dupform').each(function(){
//     dupform++;
//     var newID='dupform' + dupform;
//     $(this).attr('id', newID);
// });

// $(document).on('click','.submit-duplicate',function(e){
//   e.preventDefault();
//   $.ajax({
//     type: 'POST',
//     dataType : 'html',
//     url: $(this).parent().attr('action'),
//     data: $(this).parent().serialize(),
//     success: function (data) {
//         alert('ok');
//     }
//   });
// });

// var form = 0;
$('.form').each(function(){
    // form++;
    var newID = $(this).find(".bucket-name").text();
    $(this).attr('id', newID);
});

var a = 0;
$('.select-ntmd-input').each(function(){
    a++;
    var newID='select-ntmd-input' + a;
    $(this).attr('id', newID);
});

var b = 0;
$('.select-shlf-input').each(function(){
  b++;
  var newID='select-shlf-input' + b;
  $(this).attr('id', newID);
});

var c = 0;
$('.select-c218-input').each(function(){
  c++;
  var newID='select-c218-input' + c;
  $(this).attr('id', newID);
});

var d = 0;
$('.select-c312-input').each(function(){
  d++;
  var newID='select-c312-input' + d;
  $(this).attr('id', newID);
});

var e = 0;
$('.select-c318-input').each(function(){
  e++;
  var newID='select-c318-input' + e;
  $(this).attr('id', newID);
});

var f = 0;
$('.select-ga18-input').each(function(){
  f++;
  var newID='select-ga18-input' + f;
  $(this).attr('id', newID);
});

var g = 0;
$('.select-manl-input').each(function(){
  g++;
  var newID='select-manl-input' + g;
  $(this).attr('id', newID);
});

var h = 0;
$('.select-smpl-input').each(function(){
  h++;
  var newID='select-smpl-input' + h;
  $(this).attr('id', newID);
});

var i = 0;
$('.select-sp10-input').each(function(){
  i++;
  var newID='select-sp10-input' + i;
  $(this).attr('id', newID);
});

var j = 0;
$('.select-sp14-input').each(function(){
  j++;
  var newID='select-sp14-input' + j;
  $(this).attr('id', newID);
});



var aa = 0;
$('.select-ntmd-label').each(function(){
    aa++;
    var newID='select-ntmd-input' + aa;
    $(this).attr('for', newID);
});

var bb = 0;
$('.select-shlf-label').each(function(){
  bb++;
  var newID='select-shlf-input' + bb;
  $(this).attr('for', newID);
});

var cc = 0;
$('.select-c218-label').each(function(){
  cc++;
  var newID='select-c218-input' + cc;
  $(this).attr('for', newID);
});

var dd = 0;
$('.select-c312-label').each(function(){
  dd++;
  var newID='select-c312-input' + dd;
  $(this).attr('for', newID);
});

var ee = 0;
$('.select-c318-label').each(function(){
  ee++;
  var newID='select-c318-input' + ee;
  $(this).attr('for', newID);
});

var ff = 0;
$('.select-ga18-label').each(function(){
  ff++;
  var newID='select-ga18-input' + ff;
  $(this).attr('for', newID);
});

var gg = 0;
$('.select-manl-label').each(function(){
  gg++;
  var newID='select-manl-input' + gg;
  $(this).attr('for', newID);
});

var hh = 0;
$('.select-smpl-label').each(function(){
  hh++;
  var newID='select-smpl-input' + hh;
  $(this).attr('for', newID);
});

var ii = 0;
$('.select-sp10-label').each(function(){
  ii++;
  var newID='select-sp10-input' + ii;
  $(this).attr('for', newID);
});

var jj = 0;
$('.select-sp14-label').each(function(){
  jj++;
  var newID='select-sp14-input' + jj;
  $(this).attr('for', newID);
});

