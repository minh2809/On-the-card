const Vietnamese = {
  validate: {
    serialRegistered: "Mã Số Thẻ đã được đăng ký bởi 1 tài khoản khác",
    serialNotExist: "Mã Số Thẻ không có trong hệ thống.",
    userName: "Tên Truy Cập đã được đăng ký. Vui lòng chọn Tên Truy Cập khác",
    validatingError:
      "Có vấn đề xảy ra khi đang xác nhận thông tin. Vui lòng thử lại ! (error BE validation)",
    serialInvalid: "Mã Số Thẻ Không Hợp Lệ (Incorrect Partner Name)",
  },
  registerError: "Có vấn đề xảy ra khi đăng ký thông tin: ",
  emailRegistered:
    "Email này đã được đăng ký bởi 1 tài khoản khác ! Vui Lòng đăng ký với Email khác.",
  defaultBio: "Thông tin của bạn",
  fetchData: {
    serialNotExist: "Mã Số Thẻ không có trong hệ thống.",
    notRegistered: "Thẻ chưa được đăng ký. Vui lòng đăng ký thẻ để sử dụng.",
    error: "Vui lòng thử lại !",
    systemError:
      "Lỗi Hệ Thống. Vui lòng liên lạc đội ngũ OnTheCard với thông tin ở đường link dưới đây: \n onthecard.me/me \n (no matching username for serial no)",
    noUserName: "Đường Link không tồn tại. Vui lòng thử đường link khác !",
    errorHappens: "Đã có lỗi xảy ra: ",
    notUploaded: "Thông tin chưa được lưu. Vui lòng thử lại !",
    noTokenFound:
      "Đã có vấn đề xảy ra (no token). Vui lòng tải lại trang này và thử lại",
    invalidToken:
      "Đã có vấn đề xảy ra (invalid token). Vui lòng tải lại trang này và thử lại",
    invalidTokenView: "Đã có vấn đề xảy ra (invalid token). Vui lòng thử lại",
    noTokenFoundMsg:
      "Đã có vấn đề xảy ra (no token). Vui lòng tải lại trang này và thử lại",
    invalidTokenMsg:
      "Đã có vấn đề xảy ra (invalid token). Vui lòng tải lại trang này và thử lại",
    noAnalyticData:
      "Không tìm thấy dữ liệu analytic. Vui lòng liên hệ chúng tôi: onthecard.me/me",
    errorHappened: "Đã có lỗi xảy ra. Vui lòng thử lại. ",
  },
  addSerialNo: {
    success: " mã số thẻ đã được thêm vào hệ thống !",
    noSerial: "Không có mã số thẻ nào được thêm",
    error: "Có lỗi xảy ra khi thêm mã số thẻ. Vui lòng thử lại ! ",
    pleaseAdd: "Đã hết mã số thẻ. Vui lòng thêm mã số thẻ vào hệ thống !",
    errorFetch: "Đã có lỗi xảy ra (BE error). Vui lòng thử lại !",
    registerSuccess: "Đăng ký thành công ",
    registerError: "Vui lòng thử lại. Đã có lỗi xảy ra khi lấy mã số thẻ: ",
    errorFetchData: "Đã có lỗi xảy ra khi lấy dữ liệu: ",
  },
  login: {
    userNameNotFound: "Tên Truy Cập không có trong hệ thống. Vui lòng thử lại",
  },
  other: {
    storePageTitle: "Store Page",
    alreadyActivated:
      "Trang Bán Hàng đã được mở trước đây. Bạn có thể chỉnh sửa Trang Bán Hàng của mình",
    galleryActivated:
      "Trang Hình Ảnh đã được kích hoạt trước đây. Bạn có thể chỉnh sửa Trang Hình Ảnh của mình",
  },
};

const English = {
  validate: {
    serialRegistered: "Serial Number was registered by a different account",
    serialNotExist: "Serial Number is not in our system",
    userName: "Username was taken. Please choose a different Username",
    validatingError:
      "Có vấn đề xảy ra khi đang xác nhận thông tin. Vui lòng thử lại ! (error BE validation)",
  },
  backendErrors: {
    takenEmailMsg: "The email address is already in use by another account.",
    takenEmailAlert:
      "Email này đã được đăng ký bởi 1 thẻ khác. Vui lòng chọn email khác !",
    invalidPasswordMsg:
      "The password is invalid or the user does not have a password.",
    invalidPasswordAlert: "Mật khẩu không đúng, vui lòng nhập lại mật khẩu !",
    noEmailMsg:
      "There is no user record corresponding to this identifier. The user may have been deleted.",
    noEmailAlert:
      "Email không đúng hoặc chưa được đăng ký trong hệ thống. Vui lòng nhập lại email !",
    otherError: "Lỗi đăng nhập: ",
    noRecord: "Cannot read property 'serialNo' of undefined",
    noRecordAlert:
      "Lỗi đăng nhập. Vui lòng liên hệ OnTheCard để được hỗ trợ. Thông tin liên lạc: onthecard.me/me",
  },
  defaultBio: "Your Info",
};

export { Vietnamese, English };
