document.addEventListener("DOMContentLoaded", function () {
  var menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach(function (menuItem) {
    menuItem.addEventListener("click", function () {
      var target = document.querySelector(menuItem.dataset.target);
      if (target) {
        target.classList.toggle("submenu-open");
      }
    });
  });
});

function toggleMenu(menuId) {
  var menu = document.getElementById(menuId);
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}
$(document).ready(function () {
  $('.list-group-item[data-toggle="collapse"]').on("click", function () {
    var $icon = $(this).find(".fas");
    var isOpen = $icon.hasClass("fa-chevron-up");
    $(".fas").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    if (!isOpen) {
      $icon.removeClass("fa-chevron-down").addClass("fa-chevron-up");
    }
  });
});

document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("click", () => {
    const target = document.querySelector(item.getAttribute("data-target"));
    target.classList.toggle("submenu-open");

    // Remove active class from other menu items
    document.querySelectorAll(".menu-item").forEach((menuItem) => {
      menuItem.classList.remove("active");
    });

    // Add active class to the clicked menu item
    item.classList.add("active");
  });
});

document.querySelectorAll(".submenu li a").forEach((link) => {
  link.addEventListener("click", () => {
    // Remove active class from other submenu links
    document.querySelectorAll(".submenu li a").forEach((subLink) => {
      subLink.classList.remove("active");
    });

    // Add active class to the clicked submenu link
    link.classList.add("active");
  });
});
