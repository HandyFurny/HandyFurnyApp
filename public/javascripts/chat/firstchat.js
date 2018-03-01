$(document).ready( () => {
    console.log("HOLA estoy en")
                // BUSCO SI  ya existe chat y pongo lo que ya se ha escrito
                // Chat.findOne( { $or : [{ $and : [ { _Buyer : data.user1_id  }, { _Seller : data.user2_id } ] },{ $and : [ { _Buyer : data.user2_id  }, { _Seller : data.user1_id } ] } ] } ,(err,doc)=>{
                //      if (doc) {
                         let content='';
                        doc.messages.forEach(m=>{
                            content +=`
                            <li>${m}</li>
            
                        `})
                        $('#messages').html(content);
                    
                  //  }
                //   });         
   
});