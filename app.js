import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) =>{
    res.status(200).send("Ok");
})

const carros = [
    {
        id: 1,
        marca:"FIAT",
        modelo: "Uno",
    },
    {
        id: 2,
        marca:"BMW",
        modelo: "Z4",
    },
    {
        id: 3,
        marca:"FORD",
        modelo: "Eco Sport",
    }
]

app.get("/carros", (req,res) =>{
    res.status(200).json(carros);
})

function findCar(id){
    return carros.findIndex(carro => carro.id === Number(id));
}


app.get("/carros/:id", (req, res) => {
    const id = findCar(req.params.id); 
    if (id !== -1) { // Verifica se o carro foi encontrado usando o índice retornado por findCar
        res.status(200).json(carros[id]); // Retorna o objeto do carro encontrado
    } else {
        res.status(404).json({ error: "Carro não encontrado" });
    }
});



app.post("/carros", (req,res) =>{
    carros.push(req.body);
    res.status(201).send("Cadastrado com sucesso");
});


app.put("/carros/:id", (req, res)=>{
    const id = findCar(req.params.id);
    carros[id].marca = req.body.marca;
    carros[id].modelo = req.body.modelo;
    res.status(200).json(carros[id]);
});

app.delete("/carros/:id", (req, res) => {
    const id = findCar(req.params.id);
    if (id !== -1) { // Verifica se o carro foi encontrado
        carros.splice(id, 1); // Remove o carro do array usando o índice encontrado
        res.status(200).send("Removido com sucesso");
    } else {
        res.status(404).json({ error: "Carro não encontrado" });
    }
});

export default app;