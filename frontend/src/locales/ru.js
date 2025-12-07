export default {
  translation: {
    navigation: {
      brand: 'Hexlet Chat',
      logout: 'Выйти',
    },
    login: {
      header: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      submit: 'Войти',
      noAcc: 'Нет аккаунта?',
      registration: 'Регистрация',
      error: {
        wrongData: 'Неверные имя пользователя или пароль',
        failed: 'Не удалось войти',
      },
    },
    signup: {
      header: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      submit: 'Зарегистрироваться',
      error: {
        required: 'Обязательное поле',
        username: {
          notInRange: 'От 3 до 20 символов',
        },
        email: {
          notInRange: 'От 3 до 20 символов',
        },
        password: {
          short: 'Не менее 6 символов',
        },
        confirmPassword: {
          notMatch: 'Пароли должны совпадать',
        },
        existingUser: 'Такой пользователь уже существует',
        failed: 'Не удалось зарегистрировать нового пользователя',
      },
    },
    channels: {
      title: 'Каналы',
      activeError: 'Ошибка',
      control: 'Управление каналом',
      add: '+',
      added: 'Канал создан',
      remove: 'Удалить',
      removed: 'Канал удалён',
      rename: 'Переименовать',
      renamed: 'Канал переименован',
      modalAdd: {
        title: 'Добавить канал',
        label: 'Имя канала',
        cancel: 'Отменить',
        submit: 'Отправить',
        error: {
          name: {
            notInRange: 'От 3 до 20 символов',
            required: 'Обязательное поле',
            notUniq: 'Должно быть уникальным',
          },
          failed: 'Не удалось добавить канал',
        },
      },
      modalRemove: {
        title: 'Удалить канал',
        body: 'Вы уверены?',
        cancel: 'Отменить',
        submit: 'Удалить',
        failed: 'Не удалось удалить канал',
      },
      modalRename: {
        title: 'Переименовать канал',
        label: 'Имя канала',
        cancel: 'Отменить',
        submit: 'Отправить',
        error: {
          name: {
            notInRange: 'От 3 до 20 символов',
            required: 'Обязательное поле',
            notUniq: 'Должно быть уникальным',
          },
          failed: 'Не удалось переименовать канал',
        },
      },
      error: {
        failed: 'Не удалось загрузить каналы',
      },
    },
    messages: {
      count_one: '{{count}} сообщение',
      count_few: '{{count}} сообщения',
      count_many: '{{count}} сообщений',
      send: 'Отправить',
      new: 'Новое сообщение',
      placeholder: 'Введите сообщение...',
      error: {
        failed: 'Не удалось загрузить сообщения',
      },
    },
    notFound: {
      title: 'Страница не найдена',
      redirectMessage: 'Но вы можете перейти',
      toMainPage: 'на главную страницу',
    },
    network: {
      loading: 'Загрузка...',
      error: {
        notAuth: 'Ошибка аутентификации',
      },
    },
  },
}
