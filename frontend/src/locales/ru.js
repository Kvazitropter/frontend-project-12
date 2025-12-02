export default {
  translation: {
    navigation: {
      brand: 'Hexlet Chat',
      logoutBtn: 'Выйти',
    },
    login: {
      form: {
        header: 'Войти',
        username: 'Ваш ник',
        password: 'Пароль',
        submit: 'Войти',
        error: {
          wrongData: 'Неверные имя пользователя или пароль',
        },
      },
      footer: {
        message: 'Нет аккаунта?',
        registrationLink: 'Регистрация',
      },
      alert: {
        failed: 'Не удалось войти',
      },
    },
    signup: {
      header: 'Регистрация',
      form: {
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        submit: 'Зарегистрироваться',
        error: {
          username: {
            notInRange: 'От 3 до 20 символов',
            required: 'Обязательное поле',
          },
          email: {
            notInRange: 'От 3 до 20 символов',
            required: 'Обязательное поле',
          },
          password: {
            short: 'Не менее 6 символов',
            required: 'Обязательное поле',
          },
          confirmPassword: {
            notMatch: 'Пароли должны совпадать',
            required: 'Обязательное поле',
          },
          existingUser: 'Такой пользователь уже существует',
        },
      },
      alert: {
        failed: 'Не удалось зарегистрировать нового пользователя',
      },
    },
    channels: {
      title: 'Каналы',
      withTag: '# {{channel.name}}',
      activeError: 'Ошибка',
      add: {
        hidden: 'Создать канал',
        modal: {
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
          },
        },
        alert: {
          success: 'Канал создан',
          failed: 'Не удалось добавить канал',
        },
      },
      remove: {
        btn: 'Удалить',
        modal: {
          title: 'Удалить канал',
          body: 'Вы уверены?',
          cancel: 'Отменить',
          submit: 'Удалить',
        },
        alert: {
          success: 'Канал удалён',
          failed: 'Не удалось удалить канал',
        },
      },
      rename: {
        btn: 'Переименовать',
        modal: {
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
          },
        },
        alert: {
          success: 'Канал переименован',
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
      new: {
        hidden: 'Отправить',
        label: 'Новое сообщение',
        placeholder: 'Введите сообщение...',
      },
      error: {
        failed: 'Не удалось загрузить сообщения',
      },
    },
    notFoundPage: {
      title: 'Страница не найдена',
      redirectMessage: 'Но вы можете перейти',
      mainPageLink: 'на главную страницу',
    },
    network: {
      loading: 'Загрузка...',
      error: {
        notAuth: 'Ошибка аутентификации',
      },
    },
  },
};
