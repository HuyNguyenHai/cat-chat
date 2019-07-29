export const transValidation = {
  email_incorrect: "Hãy nhập lại một Emeow hợp lệ nhé! Meowww!",
  gender_incorrect: "Bạn không nằm trong 2 loại giới tính  này ư?",
  password_incorrect: "Hãy nhập mật khẩu với ít nhất 8 ký tự.",
  password_confirmation_incorrect: "Mật khẩu không khớp."
}

export const transErrors = {
  account_in_use: "Email này đã được sử dụng.",
  account_removed: "Tai khoan nay da bi go khoi he thong",
  account_not_active: "Tai khoan chua active vui long kiem tra email cua ban",
  token_undefined: "Token khong ton tai. Co the ban da active tai khoan roi.",
  login_fail: "Tên đăng nhập hoặc mật khẩu không đúng.",
  server_error: "Server có lỗi. Vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi để được hỗ trợ."
}

export const transSuccess = {
  userCreated: (userEmail) => {
    return `Tai khoan ${userEmail} da duoc dang ky nhung chua active. Vui long kiem tra email de active tai khoan.`;
  },

  account_active: "Kich hoat tai khoan thanh cong ban cos the dang nhap vao ung dung.",
  loginSuccess: (username) => {
    return `Xin chào ${username}. Ngày mới tốt lành.`;
  }
}

export const transMail = {
  subject: "Meow Group: Active your account",
  template: (linkVerify) => {
    return `
      <h2>Clich vao lien ket ben duoi de xac nhan kich hoat tai khoan</h2>
      <h2><a href="${linkVerify}" target="blank">${linkVerify}</a></h2>`;
  },
  send_email_fail: "Co loi trong qua trinh gui mail, vui long lien he lai."
}
