import { orders } from "/js/orders.js";

const table = document.getElementById("ordersTable");
const emptyHint = document.getElementById("emptyHint");
const modal = document.getElementById("orderModal");
const modalTitle = document.getElementById("orderModalTitle");
const modalCloseBtn = document.getElementById("closeOrderModal");
const orderMeta = document.getElementById("orderMeta");
const orderItems = document.getElementById("orderItems");
const modalStatus = document.getElementById("modalStatus");
const modalPayment = document.getElementById("modalPayment");
const modalTotal = document.getElementById("modalTotal");

const qInput = document.getElementById("q");
const statusSelect = document.getElementById("status");
const paymentSelect = document.getElementById("payment");
const dateFromInput = document.getElementById("dateFrom");
const dateToInput = document.getElementById("dateTo");
const resetBtn = document.getElementById("btnReset");

const normalizeValue = (value) => String(value || "").toLowerCase().trim();

const parseDate = (value) => {
  if (!value) {
    return null;
  }

  const parts = value.split("-");
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

const buildRow = (order) => {
  const row = document.createElement("tr");
  const actionLabel = order.action || "Details";

  row.innerHTML = `
    <td>${order.id}</td>
    <td>${order.client}</td>
    <td>${order.contacts}</td>
    <td>${order.total}</td>
    <td>${order.status}</td>
    <td>${order.payment}</td>
    <td>${order.date}</td>
    <td><button class="order-details-btn" type="button" data-order-id="${order.id}">${actionLabel}</button></td>
  `;

  return row;
};

const setSelectValue = (selectEl, value) => {
  if (!selectEl || value === undefined || value === null) {
    return;
  }

  const normalized = normalizeValue(value);
  const options = Array.from(selectEl.options);
  const match = options.find((option) => normalizeValue(option.value) === normalized);

  if (match) {
    selectEl.value = match.value;
  }
};

const renderOrderMeta = (order) => {
  if (!orderMeta) {
    return;
  }

  orderMeta.innerHTML = `
    <div class="kv-row"><div class="kv-key">ID</div><div class="kv-value">${order.id}</div></div>
    <div class="kv-row"><div class="kv-key">Client</div><div class="kv-value">${order.client}</div></div>
    <div class="kv-row"><div class="kv-key">Contacts</div><div class="kv-value">${order.contacts}</div></div>
    <div class="kv-row"><div class="kv-key">Total</div><div class="kv-value">${order.total}</div></div>
    <div class="kv-row"><div class="kv-key">Status</div><div class="kv-value">${order.status}</div></div>
    <div class="kv-row"><div class="kv-key">Payment</div><div class="kv-value">${order.payment}</div></div>
    <div class="kv-row"><div class="kv-key">Date</div><div class="kv-value">${order.date}</div></div>
  `;
};

const openOrderModal = (order) => {
  if (!modal) {
    return;
  }

  if (modalTitle) {
    modalTitle.textContent = `Order #${order.id}`;
  }

  renderOrderMeta(order);
  setSelectValue(modalStatus, order.status);
  setSelectValue(modalPayment, order.payment);

  if (modalTotal) {
    modalTotal.value = order.total || "";
  }

  if (orderItems) {
    orderItems.innerHTML = "";
  }

  modal.classList.add("is-open");
  document.body.classList.add("modal-open");
};

const closeOrderModal = () => {
  if (!modal) {
    return;
  }

  modal.classList.remove("is-open");
  document.body.classList.remove("modal-open");
};

const getFilteredOrders = () => {
  const query = normalizeValue(qInput?.value);
  const status = normalizeValue(statusSelect?.value);
  const payment = normalizeValue(paymentSelect?.value);
  const fromDate = parseDate(dateFromInput?.value);
  const toDate = parseDate(dateToInput?.value);

  return orders.filter((order) => {
    const haystack = normalizeValue(
      [
        order.id,
        order.client,
        order.contacts,
        order.total,
        order.status,
        order.payment,
        order.date,
        order.action
      ].join(" ")
    );

    if (query && !haystack.includes(query)) {
      return false;
    }

    if (status && normalizeValue(order.status) !== status) {
      return false;
    }

    if (payment && normalizeValue(order.payment) !== payment) {
      return false;
    }

    if (fromDate || toDate) {
      const orderDate = parseDate(order.date);

      if (!orderDate) {
        return false;
      }

      if (fromDate && orderDate < fromDate) {
        return false;
      }

      if (toDate && orderDate > toDate) {
        return false;
      }
    }

    return true;
  });
};

const renderOrders = () => {
  if (!table) {
    return;
  }

  const filtered = getFilteredOrders();

  table.innerHTML = "";
  filtered.forEach((order) => {
    table.appendChild(buildRow(order));
  });

  if (emptyHint) {
    emptyHint.style.display = filtered.length === 0 ? "block" : "none";
  }

  if (window.refreshTestItemsPagination) {
    window.refreshTestItemsPagination();
  }
};

const attachModalListeners = () => {
  if (!table || !modal) {
    return;
  }

  table.addEventListener("click", (event) => {
    const target = event.target;
    const button = target.closest(".order-details-btn");
    if (!button) {
      return;
    }

    const orderId = Number(button.dataset.orderId);
    const order = orders.find((item) => item.id === orderId);
    if (order) {
      openOrderModal(order);
    }
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeOrderModal);
  }

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeOrderModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeOrderModal();
    }
  });
};

const attachFilterListeners = () => {
  if (qInput) {
    qInput.addEventListener("input", renderOrders);
  }

  if (statusSelect) {
    statusSelect.addEventListener("change", renderOrders);
  }

  if (paymentSelect) {
    paymentSelect.addEventListener("change", renderOrders);
  }

  if (dateFromInput) {
    dateFromInput.addEventListener("change", renderOrders);
  }

  if (dateToInput) {
    dateToInput.addEventListener("change", renderOrders);
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (qInput) qInput.value = "";
      if (statusSelect) statusSelect.value = "";
      if (paymentSelect) paymentSelect.value = "";
      if (dateFromInput) dateFromInput.value = "";
      if (dateToInput) dateToInput.value = "";
      renderOrders();
    });
  }
};

attachFilterListeners();
attachModalListeners();
renderOrders();