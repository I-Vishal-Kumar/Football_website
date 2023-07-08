
const express  = require('express');
const hbs = require('hbs');
const path = require('path');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken' );
const cookieParser = require('cookie-parser');
const crypto = require("crypto");
const request = require("request");
const jssha = require("jssha");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const user_data = require('./userControler');
const admin_function = require('./bet_settle_controler');
const user_function =  require('./userFunctions');


module.exports = {express , hbs , path , mongoose , jwt , cookieParser , crypto , request , jssha , session , MongoDBStore , user_data , admin_function , user_function};
