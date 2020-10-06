const TAX_PERCENT = 13;

let choosenType = 'month';
let withoutTax = true;
let salary = 40_000;
let showTooltip = false;

const radioButton = document.querySelectorAll('input[name="radio"]');
const switcher = document.querySelector('input.apple-switch');
const salaryInput = document.querySelector('.input-wrapper input');
const infoBlock = document.querySelector('.info');
const tooltipTrigger = document.querySelector('.tooltip-icon');

switcher.addEventListener('change', event => {
  const { checked } = event.target;
  withoutTax = checked;
  toggleInfoVision();
  renderInfoBlock();
});

salaryInput.addEventListener('input', event => {
  const value = event.target.value.replace(/\s/g, '');
  if (/^\d+$/.test(value)) {
    salaryInput.value = numberFormat(value);
    salary = Number(value);
    renderInfoBlock();
  } else {
    salaryInput.value = numberFormat(value.slice(0, -1));
    salary = Number(value.slice(0, -1));
  }
  toggleInfoVision();
});

radioButton.forEach(el => {
  el.addEventListener('change', event => {
    const typeName = event.target.dataset.name;
    choosenType = typeName;
    toggleInfoVision();
    renderInfoBlock();
  });
});

tooltipTrigger.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
  showTooltip = true;
  toggleTooltip();
});

document.addEventListener('click', () => {
  if (showTooltip) {
    showTooltip = false;
    toggleTooltip();
  }
});

function toggleTooltip() {
  tooltipTrigger.classList.toggle('show', showTooltip);
}

function toggleInfoVision() {
  infoBlock.classList.toggle('hide', !showInfoBlock());
}

function showInfoBlock() {
  return choosenType === 'month' && salary > 0;
}

function renderInfoBlock() {
  if (!showInfoBlock()) return;
  const viewData = {};
  if (withoutTax) {
    viewData.pure = salary;
    viewData.tax = Math.round(salary * TAX_PERCENT / (100 - TAX_PERCENT));
    viewData.common = viewData.pure + viewData.tax;
  } else {
    viewData.tax = Math.round(salary * (TAX_PERCENT / 100));
    viewData.pure = salary - viewData.tax;
    viewData.common = salary;
  }
  infoBlock.querySelector('.pure').textContent = `${numberFormat(viewData.pure)} ₽`;
  infoBlock.querySelector('.tax').textContent = `${numberFormat(viewData.tax)} ₽`;
  infoBlock.querySelector('.common').textContent = `${numberFormat(viewData.common)} ₽`;
}

function numberFormat(string) {
  return Number(string).toLocaleString('ru-RU');
} 