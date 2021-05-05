class Validation {
    constructor() {
        this.validateBtn = document.getElementById("validate");
    }

    validate() {
        this.validateBtn.addEventListener('click', () => {
            this.confirm();
        })
    }

    confirm() {
        const address = document.getElementById("address");
        const phone = document.getElementById("phone");
        const phoneRegexp = /^[\+373|373]*[0]*[0-9]{7,8}$/;
        const addressRegexp = /^[a-zA-Z0-9\s,'-]{4,}$/;
        const name = document.getElementById("name");

        if (!(new RegExp(addressRegexp).test(address.value) && address.value.length < 20)) {
            console.log("Wrong address");
            alert('Wrong address');
            return;
        }

        if (!(new RegExp(/^[a-zA-Z ]{2,30}$/).test(name.value))) {
            console.log("wrong name");
            alert('Wrong name');
            return;
        }

        if (!(new RegExp(phoneRegexp).test(phone.value))) {
            console.log("Wrong phone");
            alert('Wrong phone');
            return;
        }

        console.log("Data sent successfully!");
        alert('Data sent successfully!');
    }
}