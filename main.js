document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("clientForm");
  const inputs = form.querySelectorAll(
    'input[type="text"], input[type="number"]'
  );
  const addButton = document.getElementById("addBtn");
  const searchButton = document.getElementById("searchBtn");
  const cancelButton = document.getElementById("cancelBtn");
  const editButton = document.getElementById("editBtn");
  const exitButton = document.getElementById("exitBtn");
  const printButton = document.getElementById("printBtn");
  const resultContainer = document.getElementById("resultContainer");
  const searchResult = document.getElementById("searchResult");

  let activeAction = null;
  let editingRow = null;

  function disableInputs() {
    inputs.forEach((input) => {
      input.disabled = true;
      input.style.pointerEvents = "none";
      input.style.backgroundColor = "#f0f0f0";
    });
  }

  function enableInputs() {
    inputs.forEach((input) => {
      input.disabled = false;
      input.style.pointerEvents = "auto";
      input.style.backgroundColor = "white";
    });
  }

  function disableButtons(...buttons) {
    buttons.forEach((button) => {
      button.disabled = true;
      button.classList.add("disabled");
    });
  }

  function enableButtons(...buttons) {
    buttons.forEach((button) => {
      button.disabled = false;
      button.classList.remove("disabled");
    });
  }

  disableInputs();
  disableButtons(printButton); // تأكد من تعطيل زر الطباعة عند تحميل الصفحة

  addButton.addEventListener("click", () => {
    enableInputs();
    disableButtons(addButton, searchButton);
    activeAction = "add";
  });

  searchButton.addEventListener("click", () => {
    enableInputs();
    disableButtons(addButton, searchButton);
    activeAction = "search";
  });

  cancelButton.addEventListener("click", () => {
    disableInputs();
    enableButtons(addButton, searchButton);
    form.reset();
    activeAction = null;
    searchResult.style.display = "none";
    editingRow = null;
    disableButtons(editButton, printButton); // تعطيل أزرار التعديل والطباعة

    // مسح أساليب الخطأ والرسائل
    inputs.forEach((input) => {
      clearError(input);
    });
  });
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (validateForm()) {
        clearError(input); // إزالة اللون الأحمر عندما يتم إدخال قيمة صحيحة
        addComment(input); // إضافة تعليق تلقائي إذا كان مطلوبًا
      }
    });
  });

  function addComment(input) {
    const comment = input.nextElementSibling; // العنصر الذي يلي حقل الإدخال
    if (!comment || !comment.classList.contains("comment")) {
      const commentElement = document.createElement("div");

      commentElement.classList.add("comment");
    }
  }

  exitButton.addEventListener("click", () => {
    checkStandardData();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (activeAction === "add") {
      if (validateForm()) {
        alert("تم إضافة العميل بنجاح");
        form.reset();
        disableInputs();
        enableButtons(addButton, searchButton);
      }
    } else if (activeAction === "search") {
      performSearch();
      disableInputs();
      enableButtons(printButton); // تفعيل زر الطباعة
      disableButtons(addButton, searchButton, editButton); // تعطيل أزرار الإضافة والبحث والتعديل
    }
  });

  function validateForm() {
    const clientCode = document.getElementById("clientCode");
    const clientNameAr = document.getElementById("clientNameAr");
    const taxNumber = document.getElementById("taxNumber");
    const cityName = document.getElementById("cityName");
    const postalCode = document.getElementById("postalCode");
    const districtName = document.getElementById("districtName");
    const street1 = document.getElementById("street1");
    const buildingNumber = document.getElementById("buildingNumber");

    let isValid = true;

    // التحقق من كود العميل واسم العميل
    if (!clientCode.value.trim()) {
      setError(clientCode, "يجب إدخال كود العميل");
      isValid = false;
    } else {
      clearError(clientCode);
    }

    if (!clientNameAr.value.trim()) {
      setError(clientNameAr, "يجب إدخال اسم العميل (عربي)");
      isValid = false;
    } else {
      clearError(clientNameAr);
    }

    // التحقق من الرقم الضريبي
    if (taxNumber.value.trim()) {
      if (
        taxNumber.value.length !== 15 ||
        !taxNumber.value.startsWith("3") ||
        !taxNumber.value.endsWith("3")
      ) {
        setError(taxNumber, "يرجي التحقق من صحة الرقم الضريبي");
        isValid = false;
      } else {
        clearError(taxNumber);
      }

      if (!cityName.value.trim()) {
        setError(cityName, "يجب إدخال اسم المدينة");
        isValid = false;
      } else {
        clearError(cityName);
      }

      if (
        !postalCode.value.trim() ||
        postalCode.value.length !== 5 ||
        isNaN(postalCode.value)
      ) {
        setError(postalCode, "يرجي التحقق من صحة الرمز البريدي");
        isValid = false;
      } else {
        clearError(postalCode);
      }

      if (!districtName.value.trim()) {
        setError(districtName, "يجب إدخال اسم الحي");
        isValid = false;
      } else {
        clearError(districtName);
      }

      if (!street1.value.trim()) {
        setError(street1, "يجب إدخال اسم الشارع 1");
        isValid = false;
      } else {
        clearError(street1);
      }

      if (!buildingNumber.value.trim()) {
        setError(buildingNumber, "يجب إدخال رقم المبنى");
        isValid = false;
      } else {
        clearError(buildingNumber);
      }
    } else {
      clearError(taxNumber);
      clearError(cityName);
      clearError(postalCode);
      clearError(districtName);
      clearError(street1);
      clearError(buildingNumber);
    }

    return isValid;
  }

  function setError(element, message) {
    const errorElement = element.nextElementSibling;
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = "block";
    } else {
      const errorMessage = document.createElement("div");
      errorMessage.textContent = message;
      errorMessage.className = "error-message";
      element.insertAdjacentElement("afterend", errorMessage);
    }
    element.style.borderColor = "red";
  }

  function clearError(element) {
    const errorElement = element.nextElementSibling;
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
    element.style.borderColor = "";
  }

  function performSearch() {
    const clientCode = document.getElementById("clientCode").value;
    const clientNameAr = document.getElementById("clientNameAr").value;
    const mobileNumber = document.getElementById("mobileNumber").value;
    const cityName = document.getElementById("cityName").value;
    const districtName = document.getElementById("districtName").value;
    const street1 = document.getElementById("street1").value;
    const buildingNumber = document.getElementById("buildingNumber").value;

    searchResult.innerHTML = `
      <table>
        <tr>
          <th>كود العميل</th>
          <th>اسم العميل</th>
          <th>رقم الجوال</th>
          <th>اسم المدينة</th>
          <th>اسم الحي</th>
          <th>اسم الشارع</th>
          <th>رقم المبنى</th>
          <th>التعليمات</th>
        </tr>
        <tr>
          <td>${clientCode}</td>
          <td>${clientNameAr}</td>
          <td>${mobileNumber}</td>
          <td>${cityName}</td>
          <td>${districtName}</td>
          <td>${street1}</td>
          <td>${buildingNumber}</td>
          <td class="action-buttons">
            <button class="delete-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zM5 5a.5.5 0 0 1 .5.5v7A.5.5 0 0 1 5 13v-7zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm-2.354 8.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708l1 1V4.5a.5.5 0 0 1 1 0v7.354zM3 14.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
              حذف
            </button>
            <button class="edit-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 1 .11.652l-10 12a.5.5 0 0 1-.174.146l-3-3a.5.5 0 0 1 0-.708l10-10a.5.5 0 0 1 .708 0zM11 3a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm-2.354 8.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708l1 1V4.5a.5.5 0 0 1 1 0v7.354zM3 14.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
              تعديل
            </button>
          </td>
        </tr>
      </table>
    `;

    searchResult.style.display = "block";

    const deleteButtons = document.querySelectorAll(".delete-btn");
    const editButtons = document.querySelectorAll(".edit-btn");

    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        button.closest("tr").remove();
      });
    });

    editButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const row = button.closest("tr");
        editingRow = row;
        editClient(row);
      });
    });

    enableButtons(editButton, printButton); // تفعيل أزرار التعديل والطباعة
    disableButtons(addButton, searchButton); // تعطيل أزرار الإضافة والبحث
  }

  function editClient(row) {
    const cells = row.getElementsByTagName("td");
    document.getElementById("clientCode").value = cells[0].textContent;
    document.getElementById("clientNameAr").value = cells[1].textContent;
    document.getElementById("taxNumber").value = cells[2].textContent;
    document.getElementById("cityName").value = cells[3].textContent;
    document.getElementById("districtName").value = cells[4].textContent;
    document.getElementById("street1").value = cells[5].textContent;
    document.getElementById("buildingNumber").value = cells[6].textContent;

    enableInputs();
    disableButtons(addButton, searchButton);
    enableButtons(editButton);
    activeAction = "edit";
    editButton.style.display = "inline-block"; // إظهار زر حفظ التعديل
  }

  editButton.addEventListener("click", () => {
    if (editingRow && validateForm()) {
      const cells = editingRow.getElementsByTagName("td");
      cells[0].textContent = document.getElementById("clientCode").value;
      cells[1].textContent = document.getElementById("clientNameAr").value;
      cells[2].textContent = document.getElementById("taxNumber").value;
      cells[3].textContent = document.getElementById("cityName").value;
      cells[4].textContent = document.getElementById("districtName").value;
      cells[5].textContent = document.getElementById("street1").value;
      cells[6].textContent = document.getElementById("buildingNumber").value;

      alert("تم تحديث بيانات العميل بنجاح");
      form.reset();
      disableInputs();
      enableButtons(addButton, searchButton);
      enableButtons(printButton);
      editingRow = null;
      activeAction = null;
      editButton.disabled = true; // جعل الزر حفظ التعديل غير نشط بعد الضغط
      editButton.classList.add("disabled"); // إضافة كلاس للزر ليكون في حالة الباهت
    }
  });

  addButton.addEventListener("click", () => {
    enableInputs();
    disableButtons(addButton, searchButton);
    activeAction = "add";
    // تفعيل الحقل الأول تلقائيًا بعد النقر على زر "إضافة"
    if (inputs.length > 0) {
      inputs[0].focus();
    }
  });

  form.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const currentIndex = Array.from(inputs).findIndex(
        (input) => input === document.activeElement
      );
      if (currentIndex > -1 && currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus();
      }
    }
  });

  printButton.addEventListener("click", () => {
    const contentToPrint = document.getElementById("searchResult").innerHTML;
    const originalContents = document.body.innerHTML;

    // فتح نافذة طباعة جديدة
    document.body.innerHTML = contentToPrint;
    window.print();

    // استعادة المحتويات الأصلية للصفحة
    document.body.innerHTML = originalContents;
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    form.reset();
    disableInputs();
    printWindow.print();
  });
});
