console.log("front-end");
console.log(sessionStorage);
let url;

$(document).ready(function(){
  if (sessionStorage['userName']) {
    console.log('You are logged in');
  } else {
    console.log('Please login');
  }

  $('#heading').click(function(){
  });

  $('#loginForm').hide();
  $('#loginBtn').click(function(){
    $('#loginForm').show();
    $('#registerForm').hide();
  });

  $('#registerForm').hide();
  $('#registerBtn').click(function(){
    $('#registerForm').show();
    $('#loginForm').hide();
    $()
  });

  $('#adminPage').hide();
  $('#adminBtn').click(function(){
    $('#adminPage').show();
    $('#homePage').hide();
  });

  $('#homeBtn').click(function(){
    $('#adminPage').hide();
    $('#homePage').show();
  });

//get url and port from config.json
  $.ajax({
    url :'config.json',
    type :'GET',
    dataType :'json',
    success : function(configData){
      console.log(configData);
      url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
      console.log(url);

    },//success
    error:function(){
      console.log('error: cannot call api');
    }//error
  });//ajax


  $('#viewUserBtn').click(function(){
    $.ajax({
      url :`${url}/allUsers`,
      type :'GET',
      dataType :'json',
      success : function(usersFromMongo){
        console.log(usersFromMongo);
      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error
    });//ajax
  });//viewUser button

  $('#viewProducts').click(function(){
    $.ajax({
      url :`${url}/allProductsFromDB`,
      type :'GET',
      dataType :'json',
      success : function(productsFromMongo){
        console.log(productsFromMongo);
        document.getElementById('productCards').innerHTML = "";

        for(let i=0; i<productsFromMongo.length; i++){
          document.getElementById('productCards').innerHTML +=
          `<div class="col">
          <h3 class=""> ${productsFromMongo[i].name}</h3>
          <h4 class="">${productsFromMongo[i].price}</h4>
          </div>`;

        }


      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error


    });//ajax
  });//viewUser button


  //update product

  $('#productForm').submit(function(){
    event.preventDefault();
    let productId = $('#productId').val();
    let productName = $('#productName').val();
    let productPrice = $('#productPrice').val();
    let userId = $('#userId').val();


    console.log(productId, productName, productPrice, userId);
    $.ajax({
      url :`${url}/updateProduct/${productId}`,
      type :'PATCH',
      data:{
        name : productName,
        price : productPrice,
        userId : userId
        },
      success : function(data){
        console.log(data);
      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error
    });//ajax
  });//submit function for login loginForm



    $('#loginForm').submit(function(){
      event.preventDefault();
      let username = $('#username').val();
      let password = $('#password').val();
      console.log(username,password);
      $.ajax({
        url :`${url}/loginUser`,
        type :'POST',
        data:{
          username : username,
          password : password
          },
        success : function(loginData){
          console.log(loginData);
          if (loginData === 'user not found. Please register') {
            alert ('Please register');
          } else {
            sessionStorage.setItem('userId', loginData['_id']);
            sessionStorage.setItem('userName', loginData['username']);
            sessionStorage.setItem('userEmail', loginData['email']);
            console.log(sessionStorage);
          }
        },//success
        error:function(){
          console.log('error: cannot call api');
        }//error
      });//ajax
    });//submit function for login loginForm


    //logout

    $('#logoutBtn').click(function(){
      sessionStorage.clear();
      console.log(sessionStorage);
    })


    // Register Form

    $('#registerForm').submit(function(){
      event.preventDefault();
      let username = $('#registerUsername').val();
      let email = $('#registerEmail').val();
      let password = $('#registerPassword').val();
      let confirmPassword = $('#confirmPassword').val();

      console.log(username,password);
      $.ajax({
        url :`${url}/registerUser`,
        type :'POST',
        data:{
          username : username,
          email : email,
          password : password
          },
        success : function(registerData){
          if (password !== confirmPassword ) {
              alert ('Passwords do not match')
          } else 
          console.log(registerData);
        },//success
        error:function(){
          console.log('error: cannot call api');
        }//error
      });//ajax
    });//submit function for login loginForm

    // Register confirm password



  });//document.ready
