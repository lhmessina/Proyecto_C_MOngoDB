import express from "express";
import handlebars from "express-handlebars";
import _dirname from "./dirname.js";
import { Server } from "socket.io";


import producroute from "./router/products.router.js"
import cartroute from  "./router/carts.router.js"


import viewsRoutes from "./router/prod_views.routes.js"  // viewsRoutes : nombre generico al export default a prod_views.router
// prod_views  tiene el router.get que toma el producto desde productManager y lo renderiza segun productos.handlebars
import RealTimeviewsRoutes from "./router/realtime_p_views.routes.js"

import { connectMongoDB } from "./config/mongoDB.db.js";
import router from "./router/products.router.js";
const app = express();

connectMongoDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.engine("handlebars", handlebars.engine());
app.set("views", _dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.use("/api/products",producroute)



app.use("/", RealTimeviewsRoutes)  //import RealTimeviewsRoutes from "./router/realtime_p_views.routes.js"

app.use("/api/carts",cartroute)


const httpServer = app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");})
// Configuramos socket
export const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Nuevo usuario Conectado");
});

io.on("products", (data) => {
  console.log(data)
})
