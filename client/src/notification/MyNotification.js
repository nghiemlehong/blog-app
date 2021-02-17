import { NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css'


export class MyNotification {
    static login(message) {
        switch (message) {
            case "USER_NAME_EMPTY":
                NotificationManager.error("Tên đăng nhập không được bỏ trống !", "", 3000)
                break
            case "PASSSWORD_EMPTY":
                NotificationManager.error("Mật khẩu không được bỏ trống !", "", 3000)
                break
            case "INVALID_USER_INFO":
                NotificationManager.error("Tên đăng nhập không tồn tại !", "", 3000)
                break
            case "PASSWORD_INCORRECT":
                NotificationManager.error("Mật khẩu không chính xác !", "", 3000)
                break
            case true:
                NotificationManager.warning("Đăng nhập thành công !", "", 3000)
                break
            default:
                NotificationManager.warning("Server quá tải !", "", 3000)
        }
    }

    static signup(message) {
        switch (message) {
            case "CAN_NOT_FOUND":
                NotificationManager.error("Ảnh đại diện phải tồn tại!", "", 3000)
                break
            case "INVALID_PASSWORD":
                NotificationManager.error("Mật khẩu không được bỏ trống!", "", 3000)
                break
            case "CAN_NOT_UPLOAD_AVATAR":
                NotificationManager.error("File ảnh đại diện quá lớn!", "", 3000)
                break
            case "INVALID_NAME":
                NotificationManager.error("Tên không được bỏ trống", "", 3000)
                break
            case "INVALID_EMAIL":
                NotificationManager.error("Email không được bỏ trống", "", 3000)
                break
            case "CONFIRM_PASSWORD_DOESN'T_MATCH":
                NotificationManager.error("Xác nhận mật khẩu không đúng", "", 3000)
                break
            case "EMAIL_EXISTED":
                NotificationManager.error("Email đã tồn tại")
                break
            case true:
                NotificationManager.warning("Đăng kí thành công !", "", 3000)
                break
            default:
                NotificationManager.warning("Server quá tải !", "", 3000)
        }
    }
    static createPost(message) {
        switch (message) {
            case 'TITLE_MUST_BE_PROVIDED':
                NotificationManager.error("Tiêu đề không được bỏ trống")
                break;
            case 'CONTENT_MUST_BE_PROVIDED':
                NotificationManager.error("Nôi dung không được bỏ trống")
                break;
            case 'MAIN_CONTENT_MUST_BE_PROVIDED':
                NotificationManager.error("Nôi dung chính không được bỏ trống")
                break;
            case 'ID_TAG_MUST_BE_PROVIDED':
                NotificationManager.error("Chưa lựa chọn nhãn bài viết")
                break;
            case 'CAN_NOT_UPLOAD_IMAGE':
                NotificationManager.error("Không thể upload hình ảnh")
                break;
            case true:
                NotificationManager.info("Viêt bài thành công")
                break;
            default:

        }
    }
    static like(message) {
        switch (message) {
            case 'LIKE':
                NotificationManager.warning("Bạn đã thích bài viết")
                break
            case 'DISLIKE':
                NotificationManager.warning("Bạn đã bỏ thích bài viết")
                break
            default:
                NotificationManager.warning("Server quá tải !", "", 3000)
        }

    }
    static deletePost(message) {
        switch (message) {
            case true:
                NotificationManager.warning("Đã xóa bài viết !")
                break
            default:
                NotificationManager.warning("Server quá tải !", "", 3000)
        }
    }
    static updatePost(message) {
        switch (message) {
            case 'TITLE_MUST_BE_PROVIDED':
                NotificationManager.error("Tiêu đề không được bỏ trống")
                break;
            case 'CONTENT_MUST_BE_PROVIDED':
                NotificationManager.error("Nôi dung không được bỏ trống")
                break;
            case 'MAIN_CONTENT_MUST_BE_PROVIDED':
                NotificationManager.error("Nôi dung chính không được bỏ trống")
                break;
            case 'ID_TAG_MUST_BE_PROVIDED':
                NotificationManager.error("Chưa lựa chọn nhãn bài viết")
                break;
            case 'CAN_NOT_UPLOAD_IMAGE':
                NotificationManager.error("Không thể upload hình ảnh")
                break;
            case true:
                NotificationManager.info("Cập nhật bài viết thành công")
                break;
            default:

        }
    }
}