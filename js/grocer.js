// grab all elements;
const startBtn = document.querySelector(".start"),
form = document.querySelector(".input"),
title = document.querySelector(".input-title"),
description = document.getElementById("disc"),
details = document.querySelector(".details"),
alert = document.querySelector(".message");

//grocer empty cart;
let grocerList = [];

// startBtn 
startBtn.addEventListener("click", () => {
    form.classList.add("active");
    startBtn.classList.add("remove");
    details.classList.remove("remove");
})

// form eventListner
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(title.value === "" || description.value === ""){
        UI.inputCondition("Pleas Fill The Inputs", "negative");
    }else{
        const id = Math.floor(Math.random() * 10000000);
        const grocerItems = new Grocer(id, title.value, description.value);
        UI.showData(grocerItems);
        Store.saveGrocery(grocerItems);
        UI.getFulltime();
        UI.clearInputs();
        UI.inputCondition("Item successFully Added", "positive")
    }
})

// making object 

class Grocer{
    constructor(id, title, description,){
        this.id = id;
        this.title = title;
        this.description = description;
    }
}

// add product

class UI{
    static displayProduct(){
        const grocerList = Store.addGrocer();
        grocerList.forEach((item) => UI.showData(item));
    }
    static showData(item){
        let div = document.createElement("div");
        div.classList.add("single-detail");
        div.innerHTML = `
        <h3 class="detail-title">
        ${item.title}
        </h3>
        <div class="detail-disc">
        ${item.description}
        </div>
        <div class="icons">
        <span class="delete"><i class="fa-solid fa-trash"></i></span>
        <p class="date">Sat 19 May</p>
        </div>
        `
        // <span class="edit"><i class="fa-solid fa-pen-to-square"></i></span>
        // <button class="see">See More</button>
        details.appendChild(div);
    }

    static removeItem(el){
        if(el.classList.contains('fa-trash')){
            el.parentElement.parentElement.parentElement.remove();
        }
    }

    static getFulltime(){
        const getTime = document.querySelector(".date");
        let months = ["Jan", "Fab", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
        let currentDate = new Date();
        let month = new Date().getMonth();
        let day = new Date().getDay();
        let date = ` ${days[day]} ${currentDate.getDay()} ${months[month]}`;
        getTime.innerText = date;
    }

    static clearInputs(){
        title.value = "";
        description.value = "";
    }

    static inputCondition(message, classNames){
        const span = document.createElement("span");
        span.innerHTML = `
        <p class="alert alert-${classNames}">${message}</p>
        `
        alert.appendChild(span);
        setTimeout(() => {
            span.remove()
        },2000)
    }

}

// delete listner 

details.addEventListener("click", (e) => {
    UI.removeItem(e.target);
    const id = e.target.dataset.id;
    Store.removeGrocerStorage(id);
})

// add to Storage

class Store{
    static addGrocer(){
        let grocery = localStorage.getItem("grocer") === null ? [] : JSON.parse(localStorage.getItem("grocer"));
        return grocery;
    }
    static saveGrocery(grocer){
        const shopList = Store.addGrocer();
        shopList.push(grocer);
        localStorage.setItem("grocer", JSON.stringify(shopList));
    }

    static removeGrocerStorage(id){
        grocerList = grocerList.filter((item) => item.id !== id);
        localStorage.setItem("grocer", JSON.stringify(grocerList));
    }
}

// once the page loads
window.addEventListener("DOMContentLoaded", () => {
    UI.displayProduct()
    details.classList.add("remove");
});


