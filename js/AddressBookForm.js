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


const save = () => {
    try{
      let contact = saveData();
      createAndUpdateStorage(contact);
    }catch(e){
      return;
    }
 };
// const save = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     try {
//         setAddressBookContactObject();
//         window.location.replace(site_properties.home_page);
//     } catch (e) {
//         return;
//     }
// }
function saveData(){
    let contact = new AddressBookContact();
    contact._fullName = getInputValueById('#fullName');
    contact._address = getInputValueById('#address');
    contact._phoneNumber = getInputValueById('#tel');
    contact._city = getInputValueById('#city');
    contact._state = getInputValueById('#state');
    contact._zip = getInputValueById('#zip');
}
// const setAddressBookContactObject = () => {
//     addressBookContact._fullName = getInputValueById('#fullname');
//     addressBookContact._address = getInputValueById('#address');
//     addressBookContact._phoneNumber = getInputValueById('#tel');
//     addressBookContact._city = getInputValueById('#city');
//     addressBookContact._state = getInputValueById('#state');
//     addressBookContact._zip = getInputValueById('#zip');
// }

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}