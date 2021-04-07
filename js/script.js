'use script';

window.addEventListener('DOMContentLoaded', () => {
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');





    function hideTabsContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');

        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }


    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabsContent();
    showTabContent();


    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabsContent();
                    showTabContent(i);
                }
            });
        }
    });

    console.log(new Date());



    //Timer

    const deadline = '2021-04-26';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - (1000 * 60 * 60 * 7) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);


        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };



    }



    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) { // функция по получению элементов со страницы
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() { // функция по обновлению таймера каждую секунду
            const t = getTimeRemaining(endtime); // получение показаний времени из функции getTimeRemaining с аргументом endtime, который передастся setClock

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

    }

    setClock('.timer', deadline);





    //Modal

    const btnModal = document.querySelectorAll('[data-modal]'),
        btnCloseModal = document.querySelector('[date-close]'),
        bodyModal = document.querySelector('.modal');



    function openModal() {
        bodyModal.classList.toggle('show');
        document.body.style.overflow = 'hidden'; // убираем вертикальную прокрутку
        bodyModal.classList.add('fade');
        clearInterval(modalTimerId); // очищает интервал ,если клиент уже открывал окно, то оно больше не выйдет само
    }

    btnModal.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        bodyModal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    btnCloseModal.addEventListener('click', closeModal);


    bodyModal.addEventListener('click', (e) => { // закрывает модалку если нажать не на нее
        if (e.target === bodyModal) {
            closeModal();
        }
    });


    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && bodyModal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 3000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();

            window.removeEventListener('scroll', showModalByScroll); // не дает появится вновь модалке если был полный скролл еще
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    // Использование классов для карточек


    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) { // создаем класс для карточки с агрументами
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.transfer = 75; // курс доллара к рублю
            this.parent = document.querySelector(parentSelector); // получение род-го элемента
            this.changeToRUB();
        }


        changeToRUB() {
            this.price = this.price * this.transfer; // метод конвертации
        }

        render() { // создание верстки
            const element = document.createElement('div'); // создание пустового дива в который поместим карточку
            if (this.classes.length === 0) { // условие чтобы у массива рест было значение по умолчанию
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(clasName => element.classList.add(clasName)); // перебираем массив метода рест и добавляем к элементу новый класс
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>

            `;
            this.parent.append(element); // помещаем переменную элемент в родителя
        }
    }


    new MenuCard( // создаем динамически новый класс
        "img/tabs/vegy.jpg",
        "КАРТИНКА1",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        45,
        '.menu .container'
    ).render(); // краткая запись если вызываем новый класс один раз

    new MenuCard(
        "img/tabs/elite.jpg",
        "КАРТИНКА2",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        405,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "КАРТИНКА3",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
        103,
        '.menu .container',
        'menu__item',
        'хуи'
    ).render();



});