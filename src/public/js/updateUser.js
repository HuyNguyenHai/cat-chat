let userAvatar = null;
let userInfo = {};

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
    userInfo.username = $(this).val();
  });

  $("#input-change-username-male").bind("click", function() {
    userInfo.gender = $(this).val();
  });

  $("#input-change-username-female").bind("click", function() {
    userInfo.gender = $(this).val();
  });

  $("#input-change-address").bind("change", function() {
    userInfo.address = $(this).val();
  });

  $("#input-change-phone").bind("change", function() {
    userInfo.phone = $(this).val();
  });
}

$(document).ready(function () {
  let currentAvatar = $("#user-modal-avatar").attr("src");
  UpdateUserInfo();
  $("#input-btn-update-user").bind("click", function(){
    if ($.isEmptyObject(userInfo) && !userAvatar){
      alertify.notify("Ban can thay doi avatar hoac thong tin truoc khi luu.", "error", 7);
    }

    $.ajax({
      type: "put",
      url: "/user/update-avatar",
      cache: false,
      contentType: false,
      processType: false,
      data: userAvatar,
      success: function() {

      },
      error: fuunction() {
      }
    });

    console.log(userAvatar);
    console.log(userInfo);
  });
  $("#input-btn-cancel-update-user").bind("click", function(){
    userAvatar = null;
    userInfo = {};
    $("#user-modal-avatar").attr("src", currentAvatar);
  })
});
