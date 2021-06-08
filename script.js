//Улучшить приложение из прошло домашнего задания:
//1. Добавить ещё несколько полей для формы получения данных
//4. Сортировка по нескольким параметрам
//2. Создать форму для фильтра
//3. Поиск по одному текстовому параметру

//лучше реверс и фильтр сразу после добавления задачи
//сделать так, чтобы не было пустой тудушки
//раскидать конст элемент по функциям, если они используются один раз
//раскидать адд эвент, если они никак не связаны с другими событиями
//правильно ли написана важности, может просто заменить на приоритет
//визульное обозначение приоритета цветом или звёздочкой
//спаны в тудушке на разных уровнях
//посмотреть норм ли название хэндл сёрчинг клик
//дизайн лишек
//может поиск через регулярные выражения
//добавить кнопку для отражения разных приоритетов
//нормальный фильтр

//добавить комментарии
//перевод комментов на англ
//проверить всё ли работает


//хранение данных
const data = []; //хранение всего массива туду
let filteredData= []; //отфильтрованная дата
let fromMax = []; //реверс отфильтрованной даты 

//обращение к элементам начала работы (контейнеры форм, основная форма и кнопки)
const formContainer = document.querySelector('#form_container');
const filterContainer = document.querySelector('#filter_container');
filterContainer.classList.add('hidden')
const searchContainer = document.querySelector('#searching_container');

const startButtonEl = document.querySelector('#start');
const filterButtonEl = document.querySelector('#filter');
const searchingButtonEl = document.querySelector('#searching');

const formEl = document.querySelector('#form');

startButtonEl.addEventListener('click', handleStartClick);
filterButtonEl.addEventListener('click', handleFilterClick);
searchingButtonEl.addEventListener('click', handleStartSearchingClick);
formEl.addEventListener('submit', handleSubmit);

//открываем блок с формой
function handleStartClick() {
    const cancelButtonEl = document.querySelector('#cancel');
    cancelButtonEl.addEventListener('click', handleCancelClick);

    formContainer.classList.remove('hidden');
    filterContainer.classList.add('hidden');
    searchContainer.classList.add('hidden');

    if (data.length > 0) {
        renderList(data);
    }
}

//сбор данных из формы, добавление в массив и отрисовка актуального списка
function handleSubmit(e) {
    e.preventDefault();

    const inputEl = document.querySelector('#input');
    const inputDetailsEl = document.querySelector('#input_details');
    const selectImportanceEl = document.querySelector('#select_importance');

    const valueTodo = inputEl.value.trim();
    const valueDetails = inputDetailsEl.value;
    const valueImportance = selectImportanceEl.value;
    const formValue = {
        todo: valueTodo, 
        todoDetails: valueDetails,
        todoImportance: valueImportance,
    };
    
    if (formValue.todo.length > 0) {
        data.push(formValue);
    } else {
        showWarning();
        return;
    } 
    
    formEl.reset();
    filterElements(data);
    renderList(data);
    hideWarning();
}

//показать предупреждение
function showWarning() {
    const warningEl = document.querySelector('#warning');
    warningEl.classList.remove('hidden');
}

//скрыть предупреждение
function hideWarning() {
    const warningEl = document.querySelector('#warning');
    warningEl.classList.add('hidden');
}

//отрисовка списка
function renderList(array) {
    const listEl = document.querySelector('#wrap_list');
    listEl.innerHTML = '';
    array.forEach((item, index) => {
        const listItemEl = document.createElement('li');
        const todoTitleEl = document.createElement('h4');
        const detailsSpanEl = document.createElement('span');
        const importaceSpanEl = document.createElement('span');
        const buttonDeleteEl = createDeleteButton(index);
        const containerTextInfo = document.createElement('div');
        const containerGraphInfo = document.createElement('div');

        containerTextInfo.classList.add('text_info');
        containerGraphInfo.classList.add('graph_info');

        todoTitleEl.textContent = item.todo;
        detailsSpanEl.textContent = item.todoDetails;
        importaceSpanEl.textContent = item.todoImportance; 

        switch (item.todoImportance) {
            case '1':
                importaceSpanEl.classList.add('importance_one');
              break;
            case '2':
                importaceSpanEl.classList.add('importance_two');
              break;
            case '3':
                importaceSpanEl.classList.add('importance_three');
              break;
        }

        containerTextInfo.append(todoTitleEl, detailsSpanEl);
        containerGraphInfo.append(importaceSpanEl, buttonDeleteEl);

        listItemEl.append(containerTextInfo, containerGraphInfo);
        listEl.append(listItemEl);
    })
}

//создание и добавление кнопки для удаления элемента списка
function createDeleteButton(index) {
    const deleteButton = document.createElement('button');

    deleteButton.textContent = 'X';
    deleteButton.id = index;
    deleteButton.classList.add('delete_button')

    deleteButton.addEventListener('click', () => {
        data.splice(index, 1);
        renderList(data);
    });

    return deleteButton;
}

//отмена добавления элемента, очистка формы и её удаление
function handleCancelClick() {
    formEl.reset();
    formContainer.classList.add('hidden');
};

//отображение формы фильтра, фильтрация массива и добавление событий
function handleFilterClick() {
    filterContainer.classList.remove('hidden');
    formContainer.classList.add('hidden');
    searchContainer.classList.add('hidden');

    const fromMinButtonEl = document.querySelector('#from_min'); 
    const fromMaxButtonEl = document.querySelector('#from_max'); 
    const closeFilter = document.querySelector('#close_filter');

    fromMaxButtonEl.addEventListener('click', handleFromMaxClick);
    fromMinButtonEl.addEventListener('click', handleFromMinClick);
    closeFilter.addEventListener('click', handleCloseFilterClick);
}

//фильтр элементов массива
function filterElements(array) {
    const importance1 = [];
    const importance2 = [];
    const importance3 = [];

    array.forEach((item) => {
        if (item.todoImportance == 1) {
            importance1.push(item);
        } else if  (item.todoImportance == 2) {
            importance2.push(item);
        } else if  (item.todoImportance == 3) {
            importance3.push(item);
        }
    });
    filteredData = importance1.concat(importance2, importance3);
    fromMax = filteredData.slice().reverse();
}

//отрисовка по приоритету (от наибольшего к наименьшему)
function handleFromMaxClick() {
    renderList(fromMax);
}

//отрисовка по приоритету (от наименьшему к наибольшего)
function handleFromMinClick() {
    renderList(filteredData);
}

//скрыть окно фильтра и отрисовка первоначального списка
function handleCloseFilterClick() {
    filterContainer.classList.add('hidden');
    renderList(data);
}

//отображение формы поиска, добавление событий
function handleStartSearchingClick() {
    const startSearchingEl = document.querySelector('#start_searching');
    const closeSearchingEl = document.querySelector('#close_searching');

    startSearchingEl.addEventListener('click', handleSearchingClick);
    closeSearchingEl.addEventListener('click', handleStopSearchingClick);

    searchContainer.classList.remove('hidden');
    filterContainer.classList.add('hidden');
    formContainer.classList.add('hidden');
}

//поиск и отрисовка результата
function handleSearchingClick() {
    const searchingValue = document.querySelector('#searching_input').value;
    const seachingResult = [];

    console.log('searching');
    data.forEach((element) => {
        if (element.todo.includes(searchingValue)) {
            seachingResult.push(element);
        }
    });
    seachingResult.length > 0 ? renderList(seachingResult) : renderNoResult();
}

//отрисовка результата поиска
function renderNoResult() {
    const listEl = document.querySelector('#wrap_list');
    const listItemEl = document.createElement('li');

    listEl.innerHTML = '';
    listItemEl.textContent = 'no todo found';
    listEl.append(listItemEl);
}

//завершение поиска, удаление формы поиска и отрисовка списка дел
function handleStopSearchingClick() {
    const inputEl = document.querySelector('#searching_input');
    inputEl.value = '';
    searchContainer.classList.add('hidden');
    renderList(data);
}