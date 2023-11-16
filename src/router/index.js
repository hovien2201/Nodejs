const homerouter = require('./homerouter')
function router(app){
app.use("/",homerouter)
app.use("/delete/:id",homerouter)
app.use("/create" ,homerouter)
app.use("/saveCreate",homerouter)
app.use("/edit/:id",homerouter)
app.use("/saveEdit/:id",homerouter)
}
module.exports = router;