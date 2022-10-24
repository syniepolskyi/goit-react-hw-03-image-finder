# goit-react-hw-03-image-finder

# Пошук зображень

Застосунок пошуку зображень за ключовим словом. Зроблено відповідно з [прев'ю робочого застосунку](https://drive.google.com/file/d/1oXCGyiq4uKwW0zzraZLKk4lh3voBlBzZ/view?usp=sharing).

Компоненти: `<Searchbar>`, `<ImageGallery>`, `<ImageGalleryItem>`,
`<Loader>`, `<Button>` і `<Modal>`. Були надані готові стилі [styles.css](./styles.css).

![preview](https://raw.githubusercontent.com/goitacademy/react-homework/master/homework-03/image-finder/mockup/preview.jpg)

## Інструкція Pixabay API

Для HTTP-запитів використовується публічний сервіс пошуку зображень [Pixabay](https://pixabay.com/api/docs/).

URL-рядок HTTP-запиту.

```bash
https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
```

Pixabay API підтримує пагінацію, за замовчуванням параметр `page` дорівнює `1`. У відповіді надходить по 12 об'єктів, встановлено в параметрі `per_page`. Під час пошуку за новим ключовим словом скидується значення `page` до `1`.

У відповіді від API приходить масив об'єктів, в яких використовуються лише наступні властивості.

- `id` – унікальний ідентифікатор
- `webformatURL` – посилання на маленьке зображення для списку карток
- `largeImageURL` – посилання на велике зображення для модального вікна

## Опис компонента `<Searchbar>`

Компонент приймає один проп `onSubmit` – функцію для передачі значення інпута під час сабміту форми. Створює DOM-елемент наступної структури.

```html
<header class="searchbar">
  <form class="form">
    <button type="submit" class="button">
      <span class="button-label">Search</span>
    </button>

    <input
      class="input"
      type="text"
      autocomplete="off"
      autofocus
      placeholder="Search images and photos"
    />
  </form>
</header>
```

## Опис компонента `<ImageGallery>`

Список карток зображень. Створює DOM-елемент наступної структури.

```html
<ul class="gallery">
  <!-- Набір <li> із зображеннями -->
</ul>
```

## Опис компонента `<ImageGalleryItem>`

Компонент елемента списку із зображенням. Створює DOM-елемент наступної структури.

```html
<li class="gallery-item">
  <img src="" alt="" />
</li>
```

## Опис компонента `<Button>`

При натисканні на кнопку `Load more` підвантажується наступна порція зображень і рендеритися разом із попередніми. Кнопка рендериться лише тоді, коли є якісь завантажені зображення. Якщо масив зображень порожній або кількість показаних зображень дорівнює кількості знайдених, кнопка не рендериться.

## Опис компонента `<Loader>`

Компонент спінера відображається, доки відбувається завантаження зображень. Використано компонент [react-loader-spinner](https://github.com/mhnpd/react-loader-spinner).

## Опис компонента `<Modal>`

Під час кліку на елемент галереї відкривається модальне вікно з темним оверлеєм і відображатися велика версія зображення. Модальне вікно повинно закриватися по натисканню клавіші `ESC` або по кліку на оверлеї.

Зовнішній вигляд схожий на функціонал цього [VanillaJS-плагіна](https://basiclightbox.electerious.com/), тільки замість білого модального вікна рендериться зображення.

```html
<div class="overlay">
  <div class="modal">
    <img src="" alt="" />
  </div>
</div>
```
