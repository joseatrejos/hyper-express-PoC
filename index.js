const HyperExpress = require("hyper-express");
const sequelize = require("./sequelize");
const Expediente = require("./models/Expediente");
const webserver = new HyperExpress.Server();


// Synchronize the database
sequelize.sync({ alter: true }).then(() => {
    console.log("Database synchronized");
}).catch((err) => console.error("Unable to synchronize the database:", err));

// Middleware
webserver.use((req, res, next) => {
    next();
});


// Get all expedientes route
webserver.get("/expedientes", async (req, res) => {
    try {
        const expedientes = await Expediente.findAll({
            order: [
                ['name', 'ASC'],
            ],
            attributes: [
                'id',
                'name',
                'description',
                'createdAt',
                'updatedAt'
            ]
        })
        res.json(expedientes);
    }
    catch (error) {
        res.status(500).json({ error: `Failed to fetch expediente because of error: ${error}` });
    }
});


// Get expediente by id route
webserver.get("/expedientes/:id", async (req, res) => {
    const id = req.path_parameters.id;
    try {
        const expediente = await Expediente.findByPk(id);
        if (expediente)
            res.json(expediente);
        else
            res.status(404).json({ error: "Expediente not found" });
    }
    catch (error) {
        res.status(500).json({ error: `Failed to fetch expediente because of error: ${error}` });
    }
});


// Create expediente route
webserver.post("/expedientes", async (req, res) => {
    const body = await req.json();
    try {
        const expediente = await Expediente.create(body);
        res.json(expediente);
    }
    catch (error) {
        res.status(500).json({ error: `Failed to create expediente because of error: ${error}` });
    }
});


// Update expediente by id route
webserver.put("/expedientes/:id", async (req, res) => {
    const id = req.path_parameters.id;
    const body = await req.json();
    try {
        const expediente = await Expediente.findByPk(id);
        if (expediente) {
            await expediente.update(body);
            res.json(expediente);
        }
        else {
            res.status(404).json({ error: "Expediente not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: `Failed to update expediente because of error: ${error}` });
    }
});


// Delete expediente by id route
webserver.delete("/expedientes/:id", async (req, res) => {
    const id = req.path_parameters.id;
    try {
        const expediente = await Expediente.findByPk(id);
        if (expediente) {
            await expediente.destroy();
            res.json({ message: "Expediente deleted" });
        }
        else
            res.status(404).json({ error: "Expediente not found" });
    }
    catch (error) {
        res.status(500).json({ error: `Failed to delete expediente because of error: ${error}` });
    }
});


// Activate webserver
webserver.listen(80)
.then((socket) => console.log("Webserver started on port 80"))
.catch((error) => console.log(`Failed to start webserver on port 80 due to error: ${error}`));
