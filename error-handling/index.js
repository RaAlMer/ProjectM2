module.exports = (app)=>{
    app.use((req,res)=>{
        res.status(404).render("notFound")
    });

    app.use((err,req,res)=>{
        console.error("ERROR",req.method.req.path.err)
        if(!res.headersSent){
            res.status(500).render("error")
        }
    })
}