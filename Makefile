run:
	@mongod &
	@./node_modules/nodemon/bin/nodemon.js app.js