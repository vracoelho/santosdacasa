/* 
CHALLENGE: 
    Product page (1/3)
    1 - Page should have the id as parameter.
    2 - Fetch information from the server
    3 - Fill the html with the information responded by the API.
    Notes
    Sizes available should match the response.
    Stars rating should be rounded (2.5 should display 3 full stars)
*/

//Get Data
document.addEventListener ('DOMContentLoaded',  async () => { 

    let productId = window.location.href.split('id=')[1] 
    const urlAPI = `/api/getProduct?productId=${productId}`


    //Fetch - Return Promise
    const response = await fetch(urlAPI);
    const data = await response.json();
    const product = data 
    console.log('Produto geral:',product)

    //Destructuring
    const {id, name, partnership, brand, madeIn, description, image, price, score, sizes} = product;

    //Get parameterId
    productId = id;
    console.log('Parametros do produto:',id)

    //Get roundScoreValue
    productScore = Math.round(score)
    console.log('Dados do score:',score, 'arredondados para producto score:', productScore)

    //Get sizes
    productSizes = sizes
    console.log('Produtos disponíveis:',productSizes)    

    //Set HTML product info
    document.getElementById("name").innerText = name;
    document.getElementById("brand").innerText = brand;
    document.getElementById("partnership").innerText = partnership;
    document.getElementById("madeIn").innerText = madeIn;
    document.getElementById("description").innerText = description;
    document.getElementById("price").innerText = price;
    document.getElementById("image").src = image;

    //Set HTML product score
    const htmlScore = document.getElementsByClassName("score")[0].getElementsByTagName("span")[0]
    htmlScore.innerText = `score of ${score}`
    console.log(htmlScore)

    //Set HTML product stars
    const htmlStars = document.getElementsByClassName("score")[0].getElementsByTagName("i")
    console.log('Todas as estrelas:',htmlStars)

    for(i=0;i<productScore; i++){ 
        htmlStars[i].classList.add('primary')
    }

    //Set HTML product sizes
    const htmlSizes = document.getElementsByClassName("sizebtns")[0].getElementsByTagName("button")
    console.log('Tamanho de todos os botões:', htmlSizes)

    //Enabling available sizes
    for(i=0;i<=htmlSizes.length; i++){ 
        if(sizes[i] > 0){
        htmlSizes[i-1].removeAttribute('disabled')
        console.log('Conteúdo do htmlSizes:', + htmlSizes[i-1])
        }
    }
})
