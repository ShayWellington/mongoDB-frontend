console.log("front-end");

$(document).ready(function(){
  $('#heading').click(function(){
    $(this).css('background', 'teal');
  });

  $('#adminBtn').click(function(){
    $('#adminPage').show();
    $('#homePage').hide();
  });

  $('#homeBtn').click(function(){
    $('#homePage').show();
    $('#adminPage').hide();
  });

  $('#viewUserBtn').click(function(){
    $.ajax({
      url : `${url}/allUsers`,
      type : 'GET',
      dataType : 'json',
      success : function(usersFromMongo){
        console.log(usersFromMongo);
      }, //success
      error : function(){
        console.log('error: cannot call api');
      } //error
    });
  }); //ajax

});
