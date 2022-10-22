psql -f install.sql -U postgres
PGPASSWORD=Qwerty123 psql -d application -f database.sql -U admin
