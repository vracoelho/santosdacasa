# Challenge

## Product page (1/3)

* [Route](https://edit-shop-api.herokuapp.com//product.html)
* Page should have the id as parameter.
* Fetch information from the [server](https://edit-shop-api.herokuapp.com//docs/#/Product%20Operations/getProduct)
* Fill the html with the information responded by the API.

### Notes

* Sizes available should match the response.
* Stars rating should be rounded (2.5 should display 3 full stars)

## Listing page (1/3)

* [Route](https://edit-shop-api.herokuapp.com//productList.html)
* Apply sortBy, category and sizes.
    * Fetch information from the [server](https://edit-shop-api.herokuapp.com//docs/#/Product%20Operations/getProductsList)
    * Should reload product list
* I can unselect filters.
* All the products should have their route correct. 
    * e.g - https://edit-shop-api.herokuapp.com//product.html?id=1

### Notes #2

* Category ids available:
    * 1 - snickers
    * 2 - coats
    * 3 - pants
    * 4 - jackets

## Improvements (1/3)

* When i filter on the listing page (categories or sizes) i should highlight the selected values
* Support multiple filters applied
* Display multiple images via srcset ([images folders](https://github.com/moisessantos/shop-api/tree/master/client/imgs/products))
