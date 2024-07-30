document
  .getElementById("loginButton")
  .addEventListener("click", function (event) {
    event.preventDefault(); // منع السلوك الافتراضي للزر

    // جميع الحقول
    var username = document.getElementById("clientCode").value;
    var code = document.getElementById("newField").value;
    var password = document.getElementById("password").value;

    // التحقق من ملء جميع الحقول
    if (
      username.trim() === "" ||
      code.trim() === "" ||
      password.trim() === ""
    ) {
      alert("يجب اختيار المستخدم وكتابة كلمة المرور أولا...");
      return;
    }

    var password = document.getElementById("password").value.trim(); // الحصول على قيمة كلمة المرور وإزالة الفراغات الزائدة

    if (password === "12") {
      window.location.href = "home.html"; // فتح صفحة index.html إذا كانت كلمة المرور صحيحة
    } else {
      alert("كلمة المرور غير صحيحة , يرجى التأكد منها جيدا..."); // عرض رسالة خطأ إذا كانت كلمة المرور غير صحيحة
    }
  });
