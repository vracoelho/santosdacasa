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

const constructor = (a) => {
    productSection.innerHTML = ''

    for(i=0; i<a;i++){
        let cardProduct = document.createElement('a')
        cardProduct.className = 'product-card col-6 col-d-4'
        cardProduct.href = `product.html?id=${productList[i]['id']}`
        cardProduct.title = 'View Product'

        let cardProductdetail = 
        `<div class="product-card-image">
            <img class="imgfit" src="${productList[i]['image']}">
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
    const loadMoredetail = `
    <a href="#" title="Load More">
    <i class="icn-reload"></i>
    Load More
    </div>`
    loadMore.innerHTML= loadMoredetail
    productSection.appendChild(loadMore)
}

// Display products
const refreshList = () => {
    let urlAPI = `/api/getProductsList?nProducts=${numberOfProduct}&sortBy=${sortBy}`
    productSection.innerHTML = ''
    fetch(urlAPI)
    .then(resp => resp.json())
    .then(({ data }) => { 
        productList = data
        constructor(productList.length)

        if(categoriesToFilter.length > 0) {
            productList = productList.filter(product => 
                product.category.some(categoryId => 
                    categoriesToFilter.indexOf(categoryId) !== -1))
                    console.log(productList);
                    constructor(productList.length)
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
                    constructor(productList.length)
                    
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
        console.log(sortBy)
    }

    // Categories
    const catFilters = document.querySelectorAll('.categories ul > li')
    catFilters.forEach((li, i) => {
        li.addEventListener('click', () => {

            const categoryId = i+1;
            console.log(categoryId)
            if(categoriesToFilter.indexOf(categoryId) === -1) {
                categoriesToFilter.push(categoryId);
                li.children[0].style.fontWeight = '700'


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
            console.log(sizeId)
            if(sizesToFilter.indexOf(sizeId) === -1) {
                sizesToFilter.push(sizeId);
                button.style = 'border-color:darkgrey; font-weight:700'
            } 
            else {
                sizesToFilter = sizesToFilter.filter( id => id !== sizeId)
                button.removeAttribute('style')
            }
        refreshList()
        })
    })
})

// LoadMore



