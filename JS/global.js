
function showForm(formId) {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById(formId).style.display = "block";
}

function hideForms() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "none";
}

/*Hotel*/
window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.style.height = "60px"; // Co nhỏ lại khi cuộn
    } else {
        navbar.style.height = "120px"; // Trở về bình thường
    }
});

// tour di tích 
document.addEventListener("DOMContentLoaded", function () {
    const tourCards = document.querySelectorAll(".tour-card");
    const paginationLinks = document.querySelectorAll(".pagination .page-link");
    let currentPage = 1;

    // Hàm để hiển thị tour theo trang
    function showPage(page) {
        currentPage = page;

        // Cập nhật active class trên pagination
        paginationLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("data-page") == page) {
                link.classList.add("active");
            }
        });

        // Ẩn/hiện tour card theo trang
        tourCards.forEach(card => {
            const cardPage = card.getAttribute("data-page");
            if (cardPage == page || !cardPage) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Xử lý sự kiện click trên pagination
    paginationLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetPage = this.getAttribute("data-page");

            if (targetPage === "prev") {
                if (currentPage > 1) {
                    showPage(parseInt(currentPage) - 1);
                }
            } else if (targetPage === "next") {
                const totalPages = paginationLinks.length - 2; // Bỏ qua Previous và Next
                if (currentPage < totalPages) {
                    showPage(parseInt(currentPage) + 1);
                }
            } else {
                showPage(parseInt(targetPage));
            }
        });
    });

    // Hiển thị trang đầu tiên khi tải trang
    showPage(1);
});