/* =====================================================
   DATA
===================================================== */

const data = {
    option: "",
    movie: "",
    place: "",
    date: "",
    time: "",
    address: "",
    food: "",
    drink: "",
    restaurantFood: "",
    activityTips: ""
};


/* =====================================================
   SCREEN FUNCTION
===================================================== */

function showScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
        screen.classList.remove("active");
    });

    const screen = document.getElementById(id);

    screen.classList.remove("hidden");
    screen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =====================================================
   ENVELOPE
===================================================== */

const envelope = document.getElementById("envelope");

envelope.addEventListener("click", () => {

    envelope.classList.add("open");

    setTimeout(() => {
        showScreen("letterScreen");
    }, 1100);

});


/* =====================================================
   NO BUTTON
===================================================== */

const noButton = document.getElementById("noButton");
const noMessage = document.getElementById("noMessage");

noButton.addEventListener("click", () => {

    noMessage.textContent = "Maybe another time 💗";

});


/* =====================================================
   YES BUTTON
===================================================== */

document.getElementById("yesButton").addEventListener("click", () => {

    showScreen("optionsScreen");

});


/* =====================================================
   OPTION SELECTION
===================================================== */

document.getElementById("netflixOption").addEventListener("click", () => {

    data.option = "Netflix&Chill";

    showScreen("netflixScreen");

});


document.getElementById("restaurantOption").addEventListener("click", () => {

    data.option = "Go somewhere";

    showScreen("restaurantQuestionScreen");

});


/* =====================================================
   NETFLIX MOVIE
===================================================== */

document.getElementById("movieSend").addEventListener("click", () => {

    const movie = document.getElementById("movieInput").value.trim();

    if (!movie) {
        alert("Please choose a movie or series.");
        return;
    }

    data.movie = movie;

    document.getElementById("netflixNext").classList.remove("hidden");

    document.getElementById("movieSend").textContent = "Saved ✓";

});


/* =====================================================
   NETFLIX PLACE
===================================================== */

document.getElementById("myPlaceButton").addEventListener("click", () => {

    data.place = "At my place";

    showScreen("netflixDateScreen");

});


document.getElementById("yourPlaceButton").addEventListener("click", () => {

    data.place = "At your place";

    showScreen("netflixDateScreen");

});


/* =====================================================
   DATE RULES
===================================================== */

function validateDate(dateValue, timeValue, messageElement) {

    if (!dateValue || !timeValue) {

        messageElement.textContent =
            "Please choose both a date and a time.";

        return false;
    }


    const date = new Date(dateValue + "T12:00:00");

    const day = date.getDay();

    /*
        Sunday = 0
        Monday = 1
        Tuesday = 2
        Wednesday = 3
        Thursday = 4
        Friday = 5
        Saturday = 6
    */


    /* TUESDAY NOT AVAILABLE */

    if (day === 2) {

        messageElement.textContent =
            "Tuesday is not available.";

        return false;
    }


    /* WEDNESDAY / THURSDAY = ONLY 14:20 */

    if (day === 3 || day === 4) {

        if (timeValue !== "14:20") {

            messageElement.textContent =
                "On Wednesday and Thursday only 14:20 is available.";

            return false;
        }

        return true;
    }


    /* MONDAY AND FRIDAY = FROM 16:30 */

    if (day === 1 || day === 5) {

        if (timeValue < "16:30") {

            messageElement.textContent =
                "On this day you can choose a time from 16:30.";

            return false;
        }

        return true;
    }


    /* SATURDAY / SUNDAY */

    if (day === 0 || day === 6) {

        return true;
    }

    return false;
}


/* =====================================================
   NETFLIX DATE
===================================================== */

document.getElementById("netflixDateNext").addEventListener("click", () => {

    const date = document.getElementById("netflixDate").value;
    const time = document.getElementById("netflixTime").value;

    const message = document.getElementById("dateMessage");

    if (!validateDate(date, time, message)) {
        return;
    }

    data.date = date;
    data.time = time;

    showScreen("netflixAddressScreen");

});


/* =====================================================
   NETFLIX ADDRESS
===================================================== */

document.getElementById("netflixAddressNext").addEventListener("click", () => {

    const address =
        document.getElementById("netflixAddress").value.trim();

    if (!address) {
        alert("Please enter the address.");
        return;
    }

    data.address = address;

    showScreen("foodScreen");

});


/* =====================================================
   FOOD
===================================================== */

document.querySelectorAll(".food-card").forEach(card => {

    card.addEventListener("click", () => {

        document.querySelectorAll(".food-card").forEach(c => {
            c.classList.remove("selected");
        });

        card.classList.add("selected");

        data.food = card.dataset.food;

        document
            .getElementById("drinkSection")
            .classList.remove("hidden");

    });

});


/* =====================================================
   FINISH NETFLIX
===================================================== */

document.getElementById("finishNetflix").addEventListener("click", async () => {

    const drink =
        document.getElementById("drinkInput").value.trim();

    if (!drink) {

        alert("Please choose a drink.");

        return;
    }

    data.drink = drink;

    const success = await sendEmail();

    if (success) {
        showScreen("finalScreen");
    }

});


/* =====================================================
   RESTAURANT YES / NO
===================================================== */

document.getElementById("restaurantYes").addEventListener("click", () => {

    showScreen("restaurantYesScreen");

});


document.getElementById("restaurantNo").addEventListener("click", () => {

    showScreen("restaurantNoScreen");

});


/* =====================================================
   RESTAURANT NO
===================================================== */

document.getElementById("activityNext").addEventListener("click", () => {

    data.activityTips =
        document.getElementById("activityTips").value.trim();

    showScreen("restaurantDateScreen");

});


/* =====================================================
   RESTAURANT YES
===================================================== */

document.getElementById("restaurantFoodNext").addEventListener("click", () => {

    const food =
        document.getElementById("restaurantFood").value.trim();

    if (!food) {

        alert("Please write what you'd like to eat.");

        return;
    }

    data.restaurantFood = food;

    showScreen("restaurantDateScreen");

});


/* =====================================================
   RESTAURANT DATE
===================================================== */

document.getElementById("restaurantDateNext").addEventListener("click", () => {

    const date =
        document.getElementById("restaurantDate").value;

    const time =
        document.getElementById("restaurantTime").value;

    const message =
        document.getElementById("restaurantDateMessage");

    if (!validateDate(date, time, message)) {
        return;
    }

    data.date = date;
    data.time = time;

    showScreen("restaurantAddressScreen");

});


/* =====================================================
   RESTAURANT FINISH
===================================================== */

document.getElementById("restaurantFinish").addEventListener("click", async () => {

    const address =
        document.getElementById("restaurantAddress").value.trim();

    if (!address) {

        alert("Please enter the address.");

        return;
    }

    data.address = address;

    const success = await sendEmail();

    if (success) {
        showScreen("finalScreen");
    }

});


/* =====================================================
   SEND EMAIL
===================================================== */

async function sendEmail() {

    document.getElementById("emailOption").value = data.option;

    document.getElementById("emailMovie").value = data.movie;

    document.getElementById("emailPlace").value = data.place;

    document.getElementById("emailDate").value = data.date;

    document.getElementById("emailTime").value = data.time;

    document.getElementById("emailAddress").value = data.address;

    document.getElementById("emailFood").value = data.food;

    document.getElementById("emailDrink").value = data.drink;

    document.getElementById("emailRestaurantFood").value =
        data.restaurantFood;

    document.getElementById("emailActivityTips").value =
        data.activityTips;


    const form =
        document.getElementById("emailForm");


    try {

        const response = await fetch(form.action, {

            method: "POST",

            body: new FormData(form),

            headers: {
                "Accept": "application/json"
            }

        });


        if (response.ok) {

            return true;

        } else {

            alert(
                "Something went wrong while sending the information."
            );

            return false;
        }

    } catch (error) {

        alert(
            "There was a problem connecting to the email service."
        );

        return false;
    }
}