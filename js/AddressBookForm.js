window.addEventListener('DOMContentLoaded', (event) => {
    const fullname = document.querySelector('#fullName');
    const textError = document.querySelector('.text-error');
    fullname.addEventListener('input', function () {
        if (fullname.value.length == 0) {
            textError.textContent = "";
            return
        }
        try {
            (new AddressBookContact()).fullName = fullname.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const phoneNo = document.querySelector('#tel');
    const phoneError = document.querySelector('.mobile-error');
    phoneNo.addEventListener('input', function () {
        if (phoneNo.value.length == 0) {
            phoneError.textContent = "";
            return
        }
        try {
            (new AddressBookContact()).phoneNumber = phoneNo.value;
            phoneError.textContent = "";
        } catch (e) {
            phoneError.textContent = e;
        }
    });

    const address = document.querySelector('#address');
    const addressError = document.querySelector('.address-error');
    address.addEventListener('input', function () {
        if (address.value.length == 0) {
            addressError.textContent = "";
            return
        }
        try {
            (new AddressBookContact()).address = address.value;
            addressError.textContent = "";
        } catch (e) {
            addressError.textContent = e;
        }
    });
});


const save = (event) => {
    try{
        alert("object created");
      let contact = saveData();
      //alert("saved");
      createAndUpdateStorage(contact);
      resetForm();
    }catch(e){
      return;
    }
 };

 function createAndUpdateStorage(addContactData) {

    let contactDataList = JSON.parse(localStorage.getItem("ContactDataList"));

    if(contactDataList != undefined) {
        contactDataList.push(addContactData);
    } else {
        contactDataList = [addContactData];
    }
    alert(contactDataList.toString());
    localStorage.setItem("ContactDataList", JSON.stringify(contactDataList));
}

 const saveData = () =>{
    let contact = new AddressBookContact();
    contact._fullName = getInputValueById('#fullName');
    contact._address = getInputValueById('#address');
    contact._phoneNumber = getInputValueById('#tel');
    contact._city = getInputValueById('#city');
    contact._state = getInputValueById('#state');
    contact._zip = getInputValueById('#zip');
    return contact;
}


const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const resetForm = () => {
    setValue('#fullName', '');
    setValue('#address', '');
    setValue('#tel', '');
    setValue('#city', '');
    setValue('#state', '');
    setValue('#zip', '');
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}