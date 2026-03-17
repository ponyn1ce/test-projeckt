const initTestItemsPagination = () => {
    const wrapper = document.querySelector('.test-items');
    const pagination = document.querySelector('.test-items-pagination');

    if (!wrapper || !pagination) {
        return;
    }

    const tbody = wrapper.querySelector('tbody');
    if (!tbody) {
        return;
    }

    const rows = Array.from(tbody.querySelectorAll('tr'));
    const perPage = 8;
    const totalPages = Math.ceil(rows.length / perPage);

    if (totalPages <= 1) {
        pagination.style.display = 'none';
        return;
    }

    pagination.style.display = '';

    const pageList = pagination.querySelector('.page-list');
    const prevBtn = pagination.querySelector('[data-action="prev"]');
    const nextBtn = pagination.querySelector('[data-action="next"]');
    let currentPage = 1;

    const renderPageButtons = () => {
        pageList.innerHTML = '';
        for (let i = 1; i <= totalPages; i += 1) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'page-number';
            btn.textContent = String(i);
            btn.addEventListener('click', () => {
                renderPage(i);
            });
            pageList.appendChild(btn);
        }
    };

    const updateControls = () => {
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;

        const buttons = pageList.querySelectorAll('.page-number');
        buttons.forEach((btn, index) => {
            btn.classList.toggle('active', index + 1 === currentPage);
        });
    };

    const renderPage = (page) => {
        currentPage = page;
        const start = (page - 1) * perPage;
        const end = start + perPage;

        rows.forEach((row, index) => {
            row.classList.remove('is-last-visible');
            row.style.display = index >= start && index < end ? '' : 'none';
        });

        const visibleRows = rows.filter((row) => row.style.display !== 'none');
        const lastVisibleRow = visibleRows[visibleRows.length - 1];
        if (lastVisibleRow) {
            lastVisibleRow.classList.add('is-last-visible');
        }

        updateControls();
    };

    prevBtn.onclick = () => {
        if (currentPage > 1) {
            renderPage(currentPage - 1);
        }
    };

    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            renderPage(currentPage + 1);
        }
    };

    renderPageButtons();
    renderPage(1);
};

window.refreshTestItemsPagination = initTestItemsPagination;
window.addEventListener('DOMContentLoaded', initTestItemsPagination);