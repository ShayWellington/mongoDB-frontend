


//allUsers
app.get('/allUsers', (req,res)=>{
  User.find().then(results =>{
    res.send(result)
  })
});
