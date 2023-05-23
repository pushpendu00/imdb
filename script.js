            // CODE HERE........

const home=document.getElementById("home");
const inp=document.getElementById("search-box");
const fav_movie_list=document.getElementById("fav-movie-list");

inp.addEventListener('keyup',()=>{
        if(inp.value!=='')
        {
            fetchFun(inp.value);
        }
        else{
            console.log("please enter movie Name");
            return;
        }
})


// fetch data using api
async function fetchFun(movieName)
{
    // cadad84
    let url=`http://www.omdbapi.com/?t=${movieName}&apikey=b556766c`;

    let fetchData=await fetch(`${url}`);

    let temp=await fetchData.json();
   
        update_and_display(temp);
}


var fav_arr_id=[];
let id;
function update_and_display(data){

    home.innerHTML="";
    var create_div = document.createElement("div");

    id=data.imdbID;
    create_div.innerHTML=`
    <div class="single-movie">
            <div class="for-image">
                <img src="${data.Poster}" alt="pic">
            </div>
            <div class="description">
                <h2><a href="#fav-movie">${data.Title}</a></h2>
                <div class="rating">
                    <div>
                        <i class="fa fa-sharp fa-light fa-star" style="color: #ffd500;"></i>
                        <h4>&nbsp;${data.imdbRating}</h4>
                    </div>
                    <span>
                        <i class="fa fa-sharp fa-regular fa-heart fa-xl" onclick="addFavourite()"></i>
                    </span>
                </div>
            </div>
        </div>
    `
    home.appendChild(create_div);
}


// favourite movie list
async function addFavourite()
{
    console.log("id = ",fav_arr_id);
    $(".rating span i").css({
        "color":"rgb(255, 27, 171)",
    })
    for(let i=0;i<fav_arr_id.length;i++)
    {
        if(fav_arr_id[i]==id)
        {
            alert("Already added your favourite movies");
            return;
        }
    }
    fav_arr_id.push(id);
    let url= `http://www.omdbapi.com/?i=${id}&apikey=cadad84`;

    let fetchData=await fetch(`${url}`);

    let temp=await fetchData.json();
    
    var fav_div=document.createElement("div");
    fav_div.innerHTML=`
        <div class="single-movie" id="${temp.imdbID}">
            <div class="for-image">
                <img src="${temp.Poster}" alt="pic">
            </div>
            <div class="description">
                <h2><a href="#fav-movie">${temp.Title}</a></h2>
                <div class="rating">
                    <div>
                        <i class="fa fa-sharp fa-light fa-star" style="color: #ffd500;"></i>
                        <h4>&nbsp;${temp.imdbRating}</h4>
                    </div>
                    <span>
                        <i class="fa fa-sharp fa-regular fa-heart fa-xl" style="color:rgb(255, 27, 171)" onclick="removeFavourite(${temp.imdbID})"></i>
                    </span>
                </div>
            </div>
        </div>
    `
    fav_movie_list.appendChild(fav_div);
}


// Remove movie from favourite monie list
function removeFavourite(temp_id)
{   
    var new_arr=[];
    for(let i=0;i<fav_arr_id.length;i++)
    {
        if(fav_arr_id[i]!=temp_id.id)
        {
            new_arr.push(fav_arr_id[i]);
        }
    }
    fav_arr_id=new_arr;
    temp_id.remove();
}

            // ========== END ========== //