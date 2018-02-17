exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    (process.env.NODE_ENV === 'production' ?
     'mongodb://addme:addme@ds139138.mlab.com:39138/shopping-list-capstone' :
     'mongodb://addme:addme@ds139138.mlab.com:39138/shopping-list-capstone');
exports.PORT = process.env.PORT || 5001;

