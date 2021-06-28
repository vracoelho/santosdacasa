/* 
CHALLENGE: 
    Listing page (2/3)
    Apply sortBy, category and sizes.
    Fetch information from the server
    Should reload product list
    
    I can unselect filters.
    All the products should have their route correct.
    e.g - https://edit-shop-api.herokuapp.com/product.html?id=1
    Notes #2
    Category ids available:
    1 - sneakers
    2 - coats
    3 - pants
    4 - jackets
    http://localhost:5000/productlist.html

    Improvements (1/3)
    When i filter on the listing page (categories or sizes) i should highlight the selected values
    Support multiple filters applied
    Display multiple images via srcset ([images folders](https://github.com/moisessantos/shop-api/tree/master/client/imgs/products))
*/

const selectSortby = document.getElementsByTagName('select')[0]
selectSortby.setAttribute('onchange', 'getSelectValue()')

let sortBy = "price"
let numberOfProduct = 10
let productSection = document.getElementById('mainproductlist')
const category = ['sneakers', 'coats', 'pants', 'jackets']
let categoriesToFilter = []
const sizes = ['1', '2', '3', '4']
let sizesToFilter = []

const builder = (a) => {
    productSection.innerHTML = ''

    for(i=0; i<a;i++){
        const sizeThumbs='240w'
        const sizeSmall='640w'
        const sizeMedium='720w'
        const sizeSrc='1200w'
        const imgThumbs=`/imgs/products/thumbs/thumb${productList[i]['id']}.jpg ${sizeThumbs}`
        const imgSmall=`/imgs/products/small/product${productList[i]['id']}.jpg ${sizeSmall}`
        const imgMedium=`/imgs/products/medium/product${productList[i]['id']}.jpg ${sizeMedium}`
        const imgScr=`/imgs/products/product${productList[i]['id']}.jpg ${sizeSrc}`

        let cardProduct = document.createElement('a')
        cardProduct.className = 'product-card col-6 col-d-4'
        cardProduct.href = `product.html?id=${productList[i]['id']}`
        cardProduct.title = 'View Product'

        let cardProductdetail = 
        `<div class="product-card-image">
            <img class="imgfit"
            src="${productList[i]['image']}"
            srcset="${imgThumbs}, ${imgSmall}, ${imgMedium}, ${imgScr}"
            sizes="(min-width: 1200px) 720px, (min-width: 750px) 640px, 240px">      
        </div>
        <p class="margintophalf marginbottomnone">${productList[i]['name']}</p>
        <p class="gray marginnone">${productList[i]['category'].map (i => category[i-1])}</p>
        <p class="secondary marginnone">${productList[i]['price']}</p>`

        cardProduct.innerHTML= cardProductdetail
        productSection.appendChild(cardProduct)
    }
    let loadMore = document.createElement('div')
    loadMore.className = 'central-link-light marginbottomdouble'
    loadMore.id = 'loadmore'
    //loadMore.setAttribute('onclick', 'addMore()')
    const loadMoredetail = `
    <a href="#" title="Load More">
    <i class="icn-reload"></i>
    Load More
    </div>`
    loadMore.innerHTML= loadMoredetail
    productSection.appendChild(loadMore)
    productSection.lastElementChild.addEventListener('click', addMore)

    if(productSection.childNodes.length-1 < numberOfProduct){
        loadMore.style='visibility:hidden'
    }
    else{
        loadMore.removeAttribute = 'style'
    }
}

// Display products
const refreshList = () => {
    let urlAPI = `/api/getProductsList?nProducts=${numberOfProduct}&sortBy=${sortBy}`
    productSection.innerHTML = ''
    fetch(urlAPI)
    .then(resp => resp.json())
    .then(({ data }) => { 
        productList = data
        builder(productList.length)

        if(categoriesToFilter.length > 0) {
            productList = productList.filter(product => 
                product.category.some(categoryId => 
                    categoriesToFilter.indexOf(categoryId) !== -1))
                    builder(productList.length)
        }

        for(i = 0; i < productList.length;i++){
            let  sizesAvailable = []
            Object.keys(productList[i].sizes).forEach(key => {
                if (productList[i].sizes[key] > 0) {
                    sizesAvailable.push(parseInt(key))
                    productList[i].sizesAvailable = sizesAvailable
                }
                return productList[i]
            })
        } 

        if(sizesToFilter.length > 0) {
            productList = productList.filter(product => 
                product.sizesAvailable.some(sizeId => 
                    sizesToFilter.indexOf(sizeId) !== -1))
                    builder(productList.length)
                    
            return productList
        }  
    })           
}

// EXECUTE - Filters PriceList
document.addEventListener("DOMContentLoaded", () => {
    refreshList()

    //SortBy
    getSelectValue = () => {
        sortBy = document.querySelector('div#sortbar select').value.toLowerCase()
        refreshList();
    }

    // Categories
    const catFilters = document.querySelectorAll('.categories ul > li')
    catFilters.forEach((li, i) => {
        li.addEventListener('click', () => {

            const categoryId = i+1;
            if(categoriesToFilter.indexOf(categoryId) === -1) {
                categoriesToFilter.push(categoryId);
                li.children[0].style = 'font-Weight:700; color:lightgrey'

            } else {
                categoriesToFilter = categoriesToFilter.filter( id => id !== categoryId)
                li.children[0].removeAttribute('style')
            }
        refreshList()
        })
    })

    // Sizes
    const sizeFilters = document.querySelectorAll('.sizebtns  button')
    sizeFilters.forEach((button, i) => {
        button.addEventListener('click', () => {

            const sizeId = i+1;
            if(sizesToFilter.indexOf(sizeId) === -1) {
                sizesToFilter.push(sizeId);
                button.style = 'background-color:lightgrey; border-color:darkgrey; font-weight:700'
            } 
            else {
                sizesToFilter = sizesToFilter.filter( id => id !== sizeId)
                button.removeAttribute('style')
            }
        refreshList()
        })
    })

    // LoadMore
    addMore = () => {
        numberOfProduct += 10 
        refreshList();
        window.scrollTo(0, document.getElementsByTagName('footer')[0].offsetTop)
    }
})




