
# FAKE STORE

Fake Store - приложени для демонстрации навыков владения современными технологиями Frontend разработки. Fake Store представляет из себя интернет магазин различных вещей (конечно-же не настоящий).

##  Демо

Демонстрационную версию данного проекта вы можете посмотреть [здесь](https://fake-store-eta-six.vercel.app/).

##  Содержание
- [Технологии](#технологии)
- [Описание](#описание)
- [Установка проекта](#установка-проекта)
- [Использование](#использование)
- [Лицензия](#лицензия)

##  Технологии

<img src="https://github.com/user-attachments/assets/ebddbb83-a181-4c99-975e-1ddbbbaec959" width="14" height="14"/> [React](https://react.dev/)

<img src="https://github.com/user-attachments/assets/d7878d49-1b43-4413-9c63-fd118606d095" width="14" height="14"/> [TypeScript](https://www.typescriptlang.org/)

<img src="https://github.com/user-attachments/assets/c3e7462a-a3db-461e-b154-1bbeb6aec470" width="14" height="14"/> [Material UI](https://mui.com/material-ui/)

<img src="https://github.com/user-attachments/assets/f1cf50a2-ec78-4442-af05-e2eba31e9283" width="14" height="14"/> [Redux](https://redux.js.org/) ( [Redux Toolkit](https://redux-toolkit.js.org/) / [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) )

<img src="https://github.com/user-attachments/assets/f15d19c3-3599-43a7-a72c-f485d298f754" width="14" height="14"/> [Vite](https://vite.dev/)

<img width="14" height="14" alt="idAIaw26Q6_logos" src="https://github.com/user-attachments/assets/1268a723-ef55-46a8-89fb-4bedc6b8ea76" /> [DummyJSON](https://vite.dev/)

<img src="https://github.com/user-attachments/assets/37943f46-1069-47d9-a14c-1eb81409e889" width="14" height="14"/> [Vercel](https://vercel.com)

<img src="https://github.com/user-attachments/assets/70f9cefe-340d-4406-8415-8a042bb0c3f7" width="14" height="14"/> [GitHub](https://github.com/)

<img src="https://github.com/user-attachments/assets/5f54d77c-a9fa-485c-878f-fba4950d9506" width="14" height="14"/> [ESLint](https://eslint.org/)

<img src="https://github.com/user-attachments/assets/624b7ea3-6efe-4d90-9052-092e5e06642f" width="14" height="14"/> [Prettier](https://prettier.io/)

##  Описание

Данные проект разрабатывался в качестве демонстрационного, для отображения текущих знаний в Frontend разработке. Он представляет из себя онлайн магазин, использующий в качестве данных API от DummyJSON. В данном проекте реализован следующий функционал:
- Реализована авторизация через JWT и защита с использованием Bearer Auth Token;
- Динамическая пагинация;
- Поиск товаров;
- Просмотр карточки отдельного товара;
- Добавление товаров в корзину;
- Удаление товаров из корзины.

##  Установка проекта

Клонируйте репозиторий.
```bash
git clone https://github.com/KarpovDU/fake_store.git
```
Перейдите в корневую папку
```bash 
cd fake_store
```
Установите зависмости:
```bash
npm install
```
Запустите проект:
```bash
npm run dev
```

## Использование

При первом входе вас встретит страница аутентификации. В ней сразу же подставлены логин и пароль пользователя из DummyJSON. Также в нём есть генерация случайного пользователя (также взятого из DummyJSON):

![peek_1](https://github.com/user-attachments/assets/14406eb3-f135-4181-92b7-05aeb3c55e4a)

При попадании на главную страницу вы сразу же увидите список товаров:

![peek_2](https://github.com/user-attachments/assets/a5ba2eaa-ecb6-4799-8460-420f2befa614)

Вы можете переключать страницы, выбрав соответсвующую:

![peek_3](https://github.com/user-attachments/assets/4c5237cb-6594-4bd4-aa53-838503298b7c)

Можете искать товар по названию / описанию:

![peek_4](https://github.com/user-attachments/assets/d29d1f15-455e-47dd-9ddc-e98f6bdc08a3)

Просматривать карточку товара:

![peek_5](https://github.com/user-attachments/assets/da6fac5b-2eae-4c88-aeac-85eb177ee489)

Добавлять и удалять товары из корзины:

![peek_6](https://github.com/user-attachments/assets/14029311-627f-4e0a-98b9-531d7d159257)

## Лицензия

Данный проект лицензирован по лицензии MIT — подробности см. в файле [LICENSE.md](./LICENSE.md).
