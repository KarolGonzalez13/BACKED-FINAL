const rutas = require("express").Router();
const { buscarProductosPorNombre } = require("../DB/ProductoBD");
const {mostrarVentas, nuevaVenta, updateVentas, buscarPorId, borrarVenta, upEstatusVentas} = require("../DB/VentasBD");

rutas.get("/ventas", async (req, res) => {
    var ventasValidas = await mostrarVentas();
    res.json(ventasValidas);
});

rutas.get("/ventas/buscarPorId/:id", async (req, res) => {
    var ventaValida = await buscarPorId(req.params.id);
    res.json(ventaValida);
});

rutas.post("/ventas/nuevaVenta", async (req, res) => {
    var ventaNueva = await nuevaVenta(req.body);
    res.json(ventaNueva);
});

rutas.post("/ventas/updateVentas", async (req, res) => {
    var ventasUpdate = await updateVentas(req.body);
    res.json(ventasUpdate);
});

rutas.get("/ventas/upEstatusVentas/:id", async (req, res) => {
    var ventaUpdate = await upEstatusVentas(req.params.id);
    res.json(ventaUpdate);
});

rutas.delete("/ventas/borrarVenta/:id", async (req, res) => {
    var ventaBorrada = await borrarVenta(req.params.id);
    res.json(ventaBorrada);
});


rutas.get("/ventas/buscarProductos", async (req, res) => {
    const termino = req.query.search || ""; // Obtener el término de la consulta
    if (!termino.trim()) {
        return res.status(400).json({ error: "El término de búsqueda es requerido." });
    }

    try {
        const productos = await buscarProductosPorNombre(termino);
        res.json(productos); // Devuelve la lista de productos que coinciden
    } catch (error) {
        console.error("Error al buscar productos:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
});


module.exports = rutas;