const drinks = [
        {name: "beer", price: 80},
        {name: "water", price: 8},
        {name: "watermelon", price: 35},
        {name: "pineapple", price: 65},
    ]

drinks.sort((a,b) =>{
    return a.price - b.price;
})

console.log(drinks)
