
//импорт данных о клиентах из файла customers.js,
//почему то он не работает
import { customers } from "./customers.js";


// Получаем элементы из DOM
const table = document.getElementById("customers-table");


const qInput = document.getElementById("q");
const potentialSelect = document.getElementById("potential");
const statusSelect = document.getElementById("status");
const amountInput = document.getElementById("amount");

const dateFromInput = document.getElementById("dateFrom");
const dateToInput = document.getElementById("dateTo");
const resetBtn = document.getElementById("btnReset");



/* Фильтрация данных */


//
const parseCustomers = (valume) => {
    if (!valume){
        return null;
    }

    const parts = valume.split("-");
    if (parts.length !== 3) {
        return null;
    }

  let year;
  let month;
  let day;

  if (parts[0].length === 4) {
    year = Number(parts[0]);
    month = Number(parts[1]);
    day = Number(parts[2]);
  } else {
    day = Number(parts[0]);
    month = Number(parts[1]);
    year = Number(parts[2]);
  }

  if (!year || !month || !day) {
    return null;
  }

  const date = new Date(year, month - 1, day);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};

// Функция для вычисления потенциала по сумме расходов
const getPotentialInfo = (totalSpendStr) => {
    let numericSpend = 0;
    if (totalSpendStr) {
        // Удаляем все, кроме цифр
        const valueStr = totalSpendStr.replace(/[^0-9]/g, '');
        numericSpend = valueStr ? Number(valueStr) / 100 : 0; 
    }
    
    if (numericSpend >= 50) return { level: 'high', icon: '🌟' };
    if (numericSpend >= 25) return { level: 'medium', icon: '💕' };
    return { level: 'low', icon: '😢' };
};

// Функция для создания строки таблицы для каждого клиента
const buildRow = (customer) => {
    const row = document.createElement("tr");

    const lastOrder = customer.orders?.length
        ? customer.orders[customer.orders.length - 1]
        : "—";

    const potential = getPotentialInfo(customer.totalSpend);

    row.innerHTML = `
        <td>${customer.id}</td>
        <td>${customer.client}</td>
        <td>
            <div>${customer.contacts || '—'}</div>
            <div class="text-muted" style="font-size: 0.85em; opacity: 0.7;">${customer.email || '—'}</div>
        </td>
        <td>${customer.status || '—'}</td>
        <td>${customer.totalSpend || '—'} ${potential.icon}</td>
        <td>${customer.registrationDate || '—'}</td>
        <td>${lastOrder}</td>
        <td>
            <button class="details-btn" data-id="${customer.id}">
                ${customer.action || "Details"}
            </button>
        </td>
    `;

    return row;
};


// Функция для отображения клиентов в таблице
const renderCustomers = (customers) => {
    table.innerHTML = ""; // Очищаем таблицу перед рендерингом
    customers.forEach(customer => {
        const row = buildRow(customer);
        table.appendChild(row);
    });
}


// Функция фильтрации
const filterCustomers = () => {
    let result = customers;

    if (qInput && qInput.value.trim()) {
        const query = qInput.value.toLowerCase().trim();
        result = result.filter(c => {
            const idMatch = c.id.toString() === query;
            const nameMatch = c.client && c.client.toLowerCase().includes(query);
            const emailMatch = c.email && c.email.toLowerCase().includes(query);
            const phoneMatch = c.contacts && c.contacts.toLowerCase().includes(query);
            return idMatch || nameMatch || emailMatch || phoneMatch;
        });
    }

    if (amountInput && amountInput.value.trim()) {
        const amountQuery = amountInput.value.trim().replace(/[^0-9]/g, '');
        if (amountQuery) {
            result = result.filter(c => {
                const spend = c.totalSpend ? c.totalSpend.replace(/[^0-9]/g, '') : '0';
                return spend.includes(amountQuery);
            });
        }
    }

    if (potentialSelect && potentialSelect.value && potentialSelect.value !== 'all') {
        const pVal = potentialSelect.value;
        result = result.filter(c => {
            const pot = getPotentialInfo(c.totalSpend);
            return pot.level === pVal;
        });
    }

    if (statusSelect && statusSelect.value && statusSelect.value !== '') {
        const sVal = statusSelect.value;
        result = result.filter(c => {
            return c.status === sVal;
        });
    }

    if (dateFromInput && dateFromInput.value) {
        const dateFrom = new Date(dateFromInput.value).getTime();
        result = result.filter(c => {
            const regDate = parseCustomers(c.registrationDate);
            return regDate && regDate.getTime() >= dateFrom;
        });
    }

    if (dateToInput && dateToInput.value) {
        const dateTo = new Date(dateToInput.value).getTime();
        result = result.filter(c => {
            const regDate = parseCustomers(c.registrationDate);
            return regDate && regDate.getTime() <= dateTo;
        });
    }

    renderCustomers(result);
};

// Привязка событий (автоматическая фильтрация)
if (qInput) qInput.addEventListener("input", filterCustomers);
if (amountInput) amountInput.addEventListener("input", filterCustomers);
if (potentialSelect) potentialSelect.addEventListener("change", filterCustomers);
if (statusSelect) statusSelect.addEventListener("change", filterCustomers);
if (dateFromInput) dateFromInput.addEventListener("change", filterCustomers);
if (dateToInput) dateToInput.addEventListener("change", filterCustomers);

if (resetBtn) {
    resetBtn.addEventListener("click", () => {
        if (qInput) qInput.value = "";
        if (amountInput) amountInput.value = "";
        if (dateFromInput) dateFromInput.value = "";
        if (dateToInput) dateToInput.value = "";
        if (potentialSelect) potentialSelect.value = "all";
        if (statusSelect) statusSelect.value = "";
        renderCustomers(customers);
    });
}

// Инициализация
renderCustomers(customers);
