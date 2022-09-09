import express from "express";
import multer  from "multer";

//const upload = multer({ dest: 'uploads/' })


//Iniciando o app
const app = express();

//habilitando o json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



//configurando as rotas
import AlunoRoutes from "./routes/AlunoRoutes";
import EscolaRoutes from "./routes/EscolaRoutes"
import ProfessoresRoutes from    "./routes/ProfessorRoutes"
import EstadoRoutes from "./routes/EstadoRoutes"
import CidadeRoutes from"./routes/CidadeRoutes"


app.use("/aluno", AlunoRoutes)
app.use("/escola", EscolaRoutes)
app.use("/professores", ProfessoresRoutes)
app.use("/estado", EstadoRoutes)
app.use("/cidade", CidadeRoutes)



app.listen(8080, () =>{
    console.log("Server running!")
})