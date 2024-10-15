import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from '@adminjs/mongoose';
import User from "../src/models/userModel.js";
import DeliveryBoy from "../src/models/deliveryBoy.js";
import Admin from "../src/models/adminModel.js";
import Store from "../src/models/storeModel.js";
import Category from "../src/models/categoryModel.js";
import Product from "../src/models/product.js";
import Order from "../src/models/orderModel.js";
import Counter from "../src/models/counterModel.js";
import { COOKIE_PASSWORD, sessionStore, authenticate } from "./adminConfig.js";

AdminJS.registerAdapter(AdminJSMongoose);


export const admin = new AdminJS({
  resources: [
    {
      resource: User,
      options: {
        listProperties: ["name", "phone", "role"],
        filterProperties: ["name", "phone", "role"]
      }
    },
    {
      resource: DeliveryBoy,
      options: {
        listProperties: ["name", "phone", "role"],
        filterProperties: ["name", "phone", "role"]
      }
    },
    {
      resource: Admin,
      options: {
        listProperties: ["name", "phone", "role"],
        filterProperties: ["name", "phone", "role"]
      }
    },
    {
      resource: Store,
      options: {
        listProperties: ["name"],
        filterProperties: ["name"]
      }
    },
    {
      resource: Category,
      options: {
        listProperties: ["name", "image"],
        filterProperties: ["name", "image"]
      }
    },
    {
      resource: Product,
      options: {
        listProperties: ["name", "image", "category", "stocks", "price"],
        filterProperties: ["name", "image", "category", "stocks", "price"]
      }
    },

    {
      resource: Order,
      options: {
        listProperties: ["orderId", "customer", "items", "totalPrice", "address", "status"],
        filterProperties: ["status", "orderId", "address"]
      }
    },
    {
      resource: Counter, // Register the Order model
    },
  ],
  branding: {
    companyName: "Grocery",
    //loginWelcome: "Welcome to Grocery Management System",
    //logo:"https://img.freepik.com/free-vector/flat-design-shop-local-logo-template_23-2149555647.jpg?ga=GA1.1.844141304.1727195335&semt=ais_hybrid",
    withMadeWithLove: false,
    softwareBrothers: false,
    favicon: "https://img.freepik.com/free-vector/flat-design-shop-local-logo-template_23-2149555647.jpg?ga=GA1.1.844141304.1727195335&semt=ais_hybrid"
  },
  rootPath: "/admin"
});

//refer to adminJS documentation for this configuration
export const buildAdminRouter = (app) => {
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookiePassword: COOKIE_PASSWORD,
    },
    null,
    {
      store: sessionStore,
      saveUninitialized: false,
      resave: false,
      secret: COOKIE_PASSWORD,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24,
      },
    }
  );

  app.use(admin.options.rootPath, adminRouter);
};
