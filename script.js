/* 
   ЛОГИКА САЙТА 
   (Не требует редактирования, если вы просто добавляете проекты)
*/

document.addEventListener("DOMContentLoaded", () => {
    
    /* 1. ГЕНЕРАЦИЯ КАРТОЧЕК ПРОЕКТОВ */
    // Проверяем, есть ли данные в HTML файле
    if (typeof projectsData !== 'undefined') {
        const grid = document.getElementById('grid-container');
        
        projectsData.forEach(p => {
            // Создаем HTML для тегов
            const tags = p.tags.map(t => `<span>${t}</span>`).join('');
            
            // Создаем элемент карточки
            const card = document.createElement('div');
            card.className = 'project-card';
            
            // Навешиваем открытие модалки
            card.onclick = () => openModal(p.id);
            
            // Заполняем внутренности
            card.innerHTML = `
                <div class="card-image-wrapper">
                    <div class="card-image" style="background-image: url('${p.image}')"></div>
                    <div class="card-overlay"></div>
                </div>
                <div class="card-info">
                    <span class="card-cat">${p.category}</span>
                    <h3>${p.title}</h3>
                    <p>${p.shortDesc}</p>
                    <div class="tags">${tags}</div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    /* 2. ЭФФЕКТ ПЕЧАТНОЙ МАШИНКИ (Typewriter) */
/* 2. ЭФФЕКТ ПЕЧАТНОЙ МАШИНКИ (Typewriter) */
    const typeWriterElement = document.getElementById('typewriter');
    
    // Фразы, которые будут меняться
    const texts = [
        "AI / ML INTELLIGENCE", 
        "OF ELECTRONICS"
    ];

    let count = 0; // Индекс текущей фразы
    let index = 0; // Индекс текущей буквы
    let currentText = "";
    let letter = "";
    let isDeleting = false;

    function type() {
        // Какую фразу сейчас обрабатываем (0 или 1)
        const currentPhase = count % texts.length;
        const fullText = texts[currentPhase];

        if (isDeleting) {
            // -- ЛОГИКА СТИРАНИЯ --
            // Добавляем класс для зеленого эффекта
            typeWriterElement.classList.add("erasing");
            
            // Убираем по одной букве
            currentText = fullText.substring(0, index - 1);
            index--;
        } else {
            // -- ЛОГИКА ПЕЧАТИ --
            // Убираем зеленый эффект, возвращаем голубой
            typeWriterElement.classList.remove("erasing");
            
            // Добавляем по одной букве
            currentText = fullText.substring(0, index + 1);
            index++;
        }

        // Выводим текст в HTML
        typeWriterElement.textContent = currentText;

        // Скорость печати
        let typeSpeed = 100; 

        if (isDeleting) {
            typeSpeed = 40; // Стираем быстро
        }

        // Если слово написано полностью
        if (!isDeleting && currentText === fullText) {
            typeSpeed = 3000; // Ждем 3 секунды перед стиранием
            isDeleting = true; // Включаем режим удаления
        } 
        // Если слово стерто полностью
        else if (isDeleting && currentText === "") {
            isDeleting = false; // Выключаем режим удаления
            count++; // Переходим к следующей фразе
            typeSpeed = 500; // Небольшая пауза перед началом новой фразы
        }

        // Запуск функции заново через заданное время
        setTimeout(type, typeSpeed);
    }

    // Запускаем только если элемент есть на странице
    if (typeWriterElement) {
        type();
    }
});

/* 3. ЛОГИКА МОДАЛЬНОГО ОКНА (Pop-up) */
const modal = document.getElementById('modal');

function openModal(id) {
    // Ищем проект по ID в массиве (который находится в HTML)
    const data = projectsData.find(p => p.id === id);
    
    if (data) {
        document.getElementById('m-img').src = data.image;
        document.getElementById('m-cat').innerText = data.category;
        document.getElementById('m-title').innerText = data.title;
        document.getElementById('m-desc').innerText = data.fullDesc;
        document.getElementById('m-link').href = data.link;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем скролл сайта
    }
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Возвращаем скролл
}

// Закрытие при клике на затемненный фон
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}