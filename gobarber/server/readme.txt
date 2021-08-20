TO CREATE A NEW MIGRATION
run yarn sequelize migration:create --name=create=-nameofchoice
once migration is created inside of o  migrations folder, specify properties  
create a model inside of models
run command  yarn sequelize db:migrate


/////
in case of mistake run
yarn sequelize db:migrate:undo

/// 
to create mongodb db in docker run
docker run --name mongobarber -p 27017:27017
mongodb is used to store the notifications
MONGO SCHEMA IN APP/SCHEMAS
POSTGRESS MODEL IN APP/models

// using handlebars for email templating