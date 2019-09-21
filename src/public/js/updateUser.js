let userAvatar = null;
let userInfo = {};
let currentAvatar;
let currentUserInfo;
let userUpdatePassword = {};

function UpdateUserInfo() {
  $("#input-change-avatar").bind("change", function(){
    let fileData = $(this).prop("files")[0];
    let math = ["image/png", "image/jpg", "image/jpeg"];
    let limitData = 1048576;//1Mb

    if ($.inArray(fileData.type, math) === -1) {
      alertify.notify("File is not valid!!!", "error", 5);
      $(this).val(null);
      return false;
    }

    if (fileData.size > limitData) {
      alertify.notify("Anh gi nang the, chon lai ngay!!!", "error", 5);
      $(this).val(null);
      return false;
    }

    if(typeof(FileReader) != "undefined"){
      let ReviewAvatar = $("#image-edit-profile");
      ReviewAvatar.empty();

      let fileReader = new FileReader();
      fileReader.onload = function(element){
        $("<img>", {
          "src": element.target.result,
          "class": "avatar img-circle",
          "id": "user-modal-avatar",
          "alt": "avatar"
        }).appendTo(ReviewAvatar);
      }
      ReviewAvatar.show();
      fileReader.readAsDataURL(fileData);

      let formData = new FormData();
      formData.append("avatar", fileData);

      userAvatar = formData;
    }else{
      alertify.notify("Trinh duyet cua ban khong ho tro!");
    }
  });

  $("#input-change-username").bind("change", function() {
    let username = $(this).val();
    let regexUsername = new RegExp("^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$");

    if(!regexUsername.test(username)  || username.length < 3 || username.length > 17){
      alertify.notify("Khong qua 17 ki tu va khong dung ky tu dac biet.", "error", 7);
      $(this).val(currentUserInfo.username);
      delete(userInfo.username);
      return false;
    }
    userInfo.username = username;
  });

  $("#input-change-gender-male").bind("click", function() {
    let gender = $(this).val();

    if(gender != "male"){
      alertify.notify("Gioi tinh sai, dung nghich inspect nua.", "error", 7);
      $(this).val("male");
      delete(userInfo.gender);
      return false;
    }
    userInfo.gender = $(this).val();
  });

  $("#input-change-gender-female").bind("click", function() {
    let gender = $(this).val();

    if(gender != "female"){
      alertify.notify("Gioi tinh sai, dung nghich inspect nua.", "error", 7);
      $(this).val("female");
      delete(userInfo.gender);
      return false;
    }
    userInfo.gender = $(this).val();
  });

  $("#input-change-address").bind("change", function() {
    let address = $(this).val();
    let regexAddress = new RegExp("^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$");

    if(!regexAddress.test(address) || address.length < 3 || address.length > 30){
      alertify.notify("Dia chi nha gioi han 30 kis tu.", "error", 7);
      $(this).val(currentUserInfo.address);
      delete(userInfo.address);
      return false;
    }
    userInfo.address = $(this).val();
  });

  $("#input-change-phone").bind("change", function() {
    let phone = $(this).val();
    let regexPhone = new RegExp("^[0-9]*$");

    if(!regexPhone.test(phone) || phone.length < 3 || phone.length > 12){
      alertify.notify("So dien thoai phai bao gom tu 3 den 12 chu so.", "error", 7);
      $(this).val(currentUserInfo.phone);
      delete(userInfo.phone);
      return false;
    }
    userInfo.phone = $(this).val();
  });

  $("#input_change_current_password").bind("change", function() {
    let currentPass = $(this).val();
    let regexPass = new RegExp("^[a-zA-Z0-9]{8,}$");
  
    if(!regexPass.test(currentPass)){
      alertify.notify("Hãy nhập mật khẩu với ít nhất 8 ký tự.", "error", 7);
      $(this).val(null);
      delete(userUpdatePassword.currentPassword);
      return false;
    }
    userUpdatePassword.currentPassword = $(this).val();
    console.log(userUpdatePassword.currentPassword, userUpdatePassword.newPass, userUpdatePassword.newPassConfirm);
  });

  $("#input_change_new_password").bind("change", function() {
    let newPass = $(this).val();
    let regexPass = new RegExp("^[a-zA-Z0-9]{8,}$");
  
    if(!regexPass.test(newPass)){
      alertify.notify("Hãy nhập mật khẩu moi với ít nhất 8 ký tự.", "error", 7);
      $(this).val(null);
      delete(userUpdatePassword.newPass);
      return false;
    }
    userUpdatePassword.newPass = $(this).val();
    console.log(userUpdatePassword.currentPassword, userUpdatePassword.newPass, userUpdatePassword.newPassConfirm);
    
  });

  $("#input_change_new_password_confirm").bind("change", function() {
    let newPassConfirm = $(this).val();
    if(newPassConfirm != userUpdatePassword.newPass){
      alertify.notify("Nhap lai mat khau khong khop", "error", 7);
      $(this).val(null);
      delete(userUpdatePassword.newPassConfirm);
      return false;
    }
    userUpdatePassword.newPassConfirm = $(this).val();
    console.log(userUpdatePassword.currentPassword, userUpdatePassword.newPass, userUpdatePassword.newPassConfirm);
  });
}

function callUpdateUserAvatar(){
  $.ajax({
    type: "put",
    url: "/user/update-avatar",
    cache: false,
    contentType: false,
    processData: false,
    data: userAvatar,
    success: function(result) {
      $("#user-alert-success").find("span").text(result.message);
      $("#user-alert-success").css("display", "block");
      $("#user-alert-error").css("display", "none");

      $("#navbar-avatar").attr("src", result.imgSrc);
      currentAvatar = result.imgSrc;

      $("#input-btn-cancel-update-user").click();
    },
    error: function(error) {
      $("#user-alert-error").find("span").text(error.responseText);
      $("#user-alert-error").css("display", "block");
      $("#user-alert-success").css("display", "none");

      $("#input-btn-cancel-update-user").click();
    }
  });
}

function callUpdateUserInfo(){
  $.ajax({
    type: "put",
    url: "/user/update-info",
    data: userInfo,
    success: function(result) {
      $("#user-alert-success").find("span").text(result.message);
      $("#user-alert-success").css("display", "block");
      $("#user-alert-error").css("display", "none");

      //Update user info
      currentUserInfo = Object.assign(currentUserInfo, userInfo);

      //Update username in navbar
      $("#username-navbar").text(currentUserInfo.username);

      $("#input-btn-cancel-update-user").click();
    },
    error: function(error) {
      $("#user-alert-error").find("span").text(error.responseText);
      $("#user-alert-error").css("display", "block");
      $("#user-alert-success").css("display", "none");

      $("#input-btn-cancel-update-user").click();
    }
  });
}

function callUpdateUserPassword(){
  $.ajax({
    type: "put",
    url: "/user/update-password",
    data: userUpdatePassword,
    success: function (result) {
      $("#alert-user-password-success").find("span").text(result.message);
      $("#alert-user-password-success").css("display", "block");  
      $("#alert-user-password-error").css("display", "none");

      $("#input-btn-cancel-update-user-password").click();
    },
    error: function (error) {
      $("#alert-user-password-error").find("span").text(error.responseText);
      $("#alert-user-password-error").css("display", "block");
      $("#alert-user-password-success").css("display", "none");
      $("#input-btn-cancel-update-user-password").click();
    }
  });
}

$(document).ready(function () {
  currentAvatar = $("#user-modal-avatar").attr("src");

  currentUserInfo = {
    user: $("#input-change-username").val(),
    gender:  ($("#input-change-gender-male").is(":checked"))?"male":"female",
    address: $("#input-change-address").val(),
    phone: $("#input-change-phone").val()
  };

  UpdateUserInfo();
  $("#input-btn-update-user").bind("click", function(){
    if(userInfo.gender === currentUserInfo.gender){
      delete(userInfo.gender);
    }

    if ($.isEmptyObject(userInfo) && !userAvatar){
      return alertify.notify("Ban can thay doi avatar hoac thong tin truoc khi luu.", "error", 7);
    }

    if(userAvatar){
      callUpdateUserAvatar();
    }

    if(!$.isEmptyObject(userInfo)){
      callUpdateUserInfo();
    }
  });
  $("#input-btn-cancel-update-user").bind("click", function(){
    userAvatar = null;
    userInfo = {};
    $("#input-change-avatar").val(null);
    $("#user-modal-avatar").attr("src", currentAvatar);

    //Reset Current User Info
    $("#input-change-username").val(currentUserInfo.username);
    (currentUserInfo.gender === "male")?$("#input-change-gender-male").click():$("#input-change-gender-female").click();
    $("#input-change-address").val(currentUserInfo.address);
    $("#input-change-phone").val(currentUserInfo.phone);
  });

  //Change User Password

  $("#input-btn-update-user-password").bind("click", function(){
    if(Object.values(userUpdatePassword).includes(undefined)){
      alertify.notify("Can nhap du cac thong tin ben duoi truoc khi thay doi mat khau.");
      return false;
    }

    callUpdateUserPassword();
  });

  $("#input-btn-cancel-update-user-password").bind("click", function(){
    userUpdatePassword = {};
    //Reset Current User Password
    $("#input_change_current_password").val(null);
    $("#input_change_new_password").val(null);
    $("#input_change_new_password_confirm").val(null);
    console.log(userUpdatePassword);
  });
});
