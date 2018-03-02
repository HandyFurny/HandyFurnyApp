$(document).ready( () => {
document.getElementById('search-furny-submit').onclick = function(){
    var val = $("#search-furny-value").val();
    axios.get(`${env}/catalog/api`)
        .then(response => {
            var arrChar = []
            response.data.forEach(function(element){
                let words=element.title.split(" ");
                words.forEach(function(word){
                    if (word===val){
                        arrChar.push(element);
                    }
                })
            })
<<<<<<< HEAD
            var content = ''
=======
            console.log(arrChar)
            var content = '<div class="your-search"><h2 class="your-search">Your search:</h2></div>'
>>>>>>> 96633441b38a5855b7a57c66b468036fc0f1cdba
            arrChar.forEach(char => { 
                content += `
                <div class="furny-info">
                    <img class="resize item-image" src="${char.itemPic}">
                    <a class="title" href="/catalog/${char._id}"><strong>${char.title}</strong></a>
                    <p class="item-category">${char.category}</p>
                    <div class="price"><b>$ ${char.price }.00</b></div>
                    <div class="creator-info">
                        <img class="user-profile-pic" src="${char._creator.profilePic}">
                        <a href="/user/${char._creator._id}">${char._creator.username}</a>
                    </div>
                </div>`

            })

            $('#result-search-furny').html(content);
        });
   }

});



                        
                        
  