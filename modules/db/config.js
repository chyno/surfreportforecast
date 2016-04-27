var config = {}

config.host = process.env.HOST || "https://chynosurf.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "DSILv0gPPYt6O9mDNN0eX/sFf6ZTA13OaI9QYXwt0tYIzB//8R7IY8EcBClWfzI+wcGfliUsrF9ngkExyv8KNQ==";
config.databaseId = "chynosurf";
config.zipCollectionId = "zips";
config.userCollectionId = "user";
config.forcastKey = "0f9877d63b94697f985124d9cbb9c6cb";
module.exports = config;