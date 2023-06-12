Структура приложения представлена в виде клиент-сервер.  
Серверная часть кода находится в ./backend, клиентская часть в ./frontend.  
Для запуска серверного приложение необходимо установить dontet sdk 7. Серверная часть взаимодействует с базой данных postgresql, потому необходимо указать путь к базе данных в строке connection string в appsettings.json и применить миграции с помощью dotnet ef tools.  
Для второго модуля необходимо настроить и подключить firebase. Создать коллекции и перенести в них данные из расписания.  
Для запуска и тестирования приложения необходимо утсановить npm и expo tools, затем запустить npx expo start.