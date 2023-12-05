import * as Yup from "yup";

const MOBILE_REGEX = /^09[0-9]{9}$/;

export const contactSchema = Yup.object().shape({
  fullname: Yup.string().required("نام و نام خانوادگی الزامی میباشد"),
  photo: Yup.string().url("آدرس معتبر نیست").required("تصویر الزامی میباشد"),
  mobile: Yup.string()
    .test(
      "mobile-validation",
      "شماره موبایل باید با 09 شروع شود و 11 رقم باشد",
      (value) => {
        return MOBILE_REGEX.test(value);
      }
    )
    .required("شماره موبایل الزامی می باشد"),
  email: Yup.string()
    .email("آدرس ایمیل معتبر نیست")
    .required("آدرس ایمیل الزامی میباشد"),
  job: Yup.string().nullable(),
  group: Yup.string().required("انتخاب گروه الزامی میباشد"),
});
