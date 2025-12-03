// document.addEventListener("DOMContentLoaded", function () {
//     const totalPages = 6; // Tổng số trang dựa vào data-page lớn nhất bạn có là 6
//     let currentPage = 1;

//     function showPage(page) {
//         // Ẩn tất cả tour
//         document.querySelectorAll('.tour-card-wrapper').forEach(item => item.style.display = 'none');

//         // Hiện tour thuộc trang hiện tại
//         document.querySelectorAll(`.tour-card-wrapper[data-page="${page}"]`).forEach(item => {
//             item.style.display = 'block'; // hoặc 'flex' / 'grid'
//         });

//         // Xóa trạng thái active của các link phân trang
//         document.querySelectorAll('.page-link').forEach(link => link.classList.remove('active'));

//         // Thêm active cho link hiện tại
//         const currentLink = document.querySelector(`.page-link[data-page="${page}"]`);
//         if (currentLink) {
//             currentLink.classList.add('active');
//         }
//     }

//     // Bắt sự kiện click phân trang
//     document.getElementById('pagination')?.addEventListener('click', function (e) {
//         e.preventDefault();
//         const target = e.target;
//         const page = target.getAttribute('data-page');

//         if (!page) return;

//         if (page === 'prev' && currentPage > 1) {
//             currentPage--;
//         } else if (page === 'next' && currentPage < totalPages) {
//             currentPage++;
//         } else if (!isNaN(parseInt(page))) {
//             currentPage = parseInt(page);
//         }

//         showPage(currentPage);

//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     });

//     // Hiển thị trang đầu tiên khi tải xong
//     showPage(currentPage);
// });



// Để hiển thị vượt qua Pagi
// document.querySelectorAll('a[href^="#"]').forEach(link => {
//     link.addEventListener("click", function (e) {
//       e.preventDefault();
  
//       const hash = this.getAttribute("href");
//       const targetElement = document.querySelector(hash);
  
//       if (targetElement) {
//         // Hiển thị phần tử (vượt qua pagination)
//         let parent = targetElement.closest("[data-page]");
//         if (parent) {
//           document.querySelectorAll(".tour-card-wrapper").forEach(wrapper => {
//             wrapper.style.display = "none";
//           });
//           parent.style.display = "block";
//         }
  
//         // Scroll mượt tới phần tử
//         targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
  
//         // Cập nhật URL (tùy chọn)
//         history.pushState(null, null, hash);
//       }
//     });
//   });


document.addEventListener("DOMContentLoaded", function () {
    const totalPages = 7; // Tổng số trang dựa vào data-page lớn nhất bạn có là 6
    let currentPage = 1;

    function showPage(page) {
        // Ẩn tất cả tour
        document.querySelectorAll('.tour-card-wrapper').forEach(item => item.style.display = 'none');

        // Hiện tour thuộc trang hiện tại
        document.querySelectorAll(`.tour-card-wrapper[data-page="${page}"]`).forEach(item => {
            item.style.display = 'block'; // hoặc 'flex' / 'grid'
        });

        // Xóa trạng thái active của các link phân trang
        document.querySelectorAll('.page-link').forEach(link => link.classList.remove('active'));

        // Thêm active cho link hiện tại
        const currentLink = document.querySelector(`.page-link[data-page="${page}"]`);
        if (currentLink) {
            currentLink.classList.add('active');
        }
    }

    // Hàm xử lý hash URL (#shirt, #trousers,...)
    function handleHash() {
        const hash = window.location.hash;
        if (!hash) return;

        const targetElement = document.querySelector(hash);
        if (targetElement) {
            const parentWrapper = targetElement.closest('.tour-card-wrapper');
            if (parentWrapper) {
                const pageToShow = parseInt(parentWrapper.getAttribute('data-page'));
                currentPage = pageToShow;
                showPage(pageToShow);

                // Scroll đến phần tử sau khi hiển thị
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100); // Đảm bảo DOM đã cập nhật
            }
        }
    }

    // Bắt sự kiện click phân trang
    document.getElementById('pagination')?.addEventListener('click', function (e) {
        e.preventDefault();
        const target = e.target.closest('.page-link'); // đảm bảo chọn đúng thẻ <a>
        if (!target) return;

        const page = target.getAttribute('data-page');

        if (!page) return;

        if (page === 'prev' && currentPage > 1) {
            currentPage--;
        } else if (page === 'next' && currentPage < totalPages) {
            currentPage++;
        } else if (!isNaN(parseInt(page))) {
            currentPage = parseInt(page);
        }

        showPage(currentPage);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Bắt sự kiện click vào các liên kết điều hướng (#shirt, #trousers,...)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            // Không chặn hành vi mặc định hoàn toàn, để hash thay đổi
            // Chỉ xử lý thêm nếu phần tử nằm ở trang khác
            const hash = this.getAttribute("href");
            const targetElement = document.querySelector(hash);

            if (targetElement) {
                const parentWrapper = targetElement.closest('.tour-card-wrapper');
                if (parentWrapper) {
                    const pageToShow = parseInt(parentWrapper.getAttribute('data-page'));
                    if (pageToShow !== currentPage) {
                        currentPage = pageToShow;
                        showPage(pageToShow);

                        // Sau khi chuyển trang, scroll tới phần tử
                        setTimeout(() => {
                            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                        }, 100);
                    }
                }
            }
        });
    });

    // Hiển thị trang đầu tiên + xử lý hash khi tải xong
    handleHash(); // ưu tiên hash trước
    if (!window.location.hash) {
        showPage(currentPage); // nếu không có hash, mới hiển thị trang mặc định
    }
});