document.addEventListener("DOMContentLoaded", function () {
  let currentPage = 1;

  function showPage(page) {
      const items = document.querySelectorAll('.tour-card-wrapper');
      items.forEach(item => item.classList.remove('active'));

      document.querySelectorAll('.page-link').forEach(link => link.classList.remove('active'));
      const currentLink = document.querySelector(`[data-page="${page}"]`);
      if (currentLink) {
          currentLink.classList.add('active');
      }

      const tourItems = document.querySelectorAll(`.tour-card-wrapper[data-page="${page}"]`);
      tourItems.forEach(item => item.classList.add('active'));
  }

  document.getElementById('pagination').addEventListener('click', function (e) {
      e.preventDefault();
      const page = e.target.getAttribute('data-page');

      if (page === 'prev' && currentPage > 1) {
          currentPage--;
      } else if (page === 'next' && currentPage < 3) {
          currentPage++;
      } else if (!isNaN(parseInt(page))) {
          currentPage = parseInt(page);
      }

      showPage(currentPage);

      // Tự động cuộn lên đầu trang
      window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Khởi tạo trang đầu tiên
  showPage(currentPage);
  
});