$(document).ready( () => {
document.getElementById('search-furny-submit').onclick = function(){
    console.log("pulsado!!")
    var val = $("#search-furny-value").val();
    console.log(val)
    axios.get("http://localhost:3000/catalog/api")
        .then(response => {
            console.log(response.data)
            var arrChar = []
            response.data.forEach(function(element){
                let words=element.title.split(" ");
                words.forEach(function(word){
                    if (word===val){
                        arrChar.push(element);
                    }
                })
            })
            console.log(arrChar)
            var content = ''
            arrChar.forEach(char => { 
                content += `
                <div class="furny-info">
                    <img class="item-image" src="${char.itemPic}">
                    <a href="/catalog/${char._id}"><strong>${char.title}</strong></a>
                    <p class="item-category">${char.category}</p>
                    <div class="price"><b>${char.price }</b></div>
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



                        
                        
  