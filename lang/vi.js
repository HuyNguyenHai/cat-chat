export const transValidation = {
  email_incorrect: "Hãy nhập lại một Emeow hợp lệ nhé! Meowww!",
  gender_incorrect: "Bạn không nằm trong 2 loại giới tính  này ư?",
  password_incorrect: "Hãy nhập mật khẩu với ít nhất 8 ký tự.",
  password_confirmation_incorrect: "Mật khẩu không khớp."
}

export const transErrors = {
  account_in_use: "Email này đã được sử dụng.",
  account_removed: "Tai khoan nay da bi go khoi he thong",
  account_not_active: "Tai khoan chua active vui long kiem tra email cua ban"
}

export const transSuccess = {
  userCreated: (userEmail) => {
    return `Tai khoan ${userEmail} da duoc dang ky thanh cong`;
  }
}
