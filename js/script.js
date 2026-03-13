const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");


// Show sidebar
menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
})
// Close sidebar
closeBtn.addEventListener('click', ()=>{
    sideMenu.style.display = 'none';
})


// Change theme
themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');
    
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
})

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


const THEME_KEY = 'user-theme';

// Функция установки темы
function setTheme(isDark) {
    document.body.classList.toggle('dark-theme-variables', isDark);

    // Обновляем активность спанов
    const span1 = themeToggler.querySelector('span:nth-child(1)');
    const span2 = themeToggler.querySelector('span:nth-child(2)');

    if (isDark) {
        span1.classList.add('active');
        span2.classList.remove('active');
    } else {
        span1.classList.remove('active');
        span2.classList.add('active');
    }
}

// Инициализация темы при загрузке страницы
function initTheme() {
    const storedTheme = localStorage.getItem(THEME_KEY);
    let isDark;

    if (storedTheme) {
        isDark = storedTheme === 'dark';
    } else {
        // Используем системную тему по умолчанию
        isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    setTheme(isDark);
}

// Переключение темы по клику
themeToggler.addEventListener('click', () => {
    // Получаем текущий статус после initTheme
    const isCurrentlyDark = document.body.classList.contains('dark-theme-variables');

    setTheme(!isCurrentlyDark);

    // Сохраняем выбор пользователя
    localStorage.setItem(THEME_KEY, !isCurrentlyDark ? 'dark' : 'light');
});

// Запуск при загрузке страницы
window.addEventListener('DOMContentLoaded', initTheme);

