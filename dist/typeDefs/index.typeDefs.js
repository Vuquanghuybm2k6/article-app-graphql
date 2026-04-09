"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const article_typedefs_1 = require("./article.typedefs");
const category_typedefs_1 = require("./category.typedefs");
const user_typeDefs_1 = require("./user.typeDefs");
exports.typeDefs = [
    article_typedefs_1.typeDefsArticle,
    category_typedefs_1.typeDefsCategory,
    user_typeDefs_1.typeDefsUser
];
