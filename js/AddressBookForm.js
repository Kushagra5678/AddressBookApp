let isUpdate = false;
let contactObj;
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
    checkForUpdate();
});


const save = (event) => {
    alert("saved");
    try {
        let newContact = createNewContact();
        createAndUpdateStorage(newContact);
    } catch (e)
    {
        alert(error);
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

const createNewContact = () => {
    let contactList = JSON.parse(localStorage.getItem('ContactDataList'));
    let max = 0;
    if(contactList) {
        for(const contactTemp of contactList){
            if(max < contactTemp._id) {
                max = contactTemp._id;
            }
        }
    }
    let contact = new AddressBookContact();
    contact.id = parseInt(max) + 1;
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

const checkForUpdate = () => {
    const contactJsonData = localStorage.getItem("editContact");
    isUpdate = contactJsonData ? true : false;
    if(!isUpdate) return;
    contactObj = JSON.parse(contactJsonData);
    setForm();
  }
  
  const setForm = () => {
    setValue('#fullName', contactObj._fullName);
    setValue('#address',contactObj._address);
    setValue('#city',contactObj._city);
    setValue('#state',contactObj._state);
    setValue('#zip',contactObj._zip);
    setValue('#tel',contactObj._phoneNumber);
  }

  const setValue = (id, value) => {
      const element = document.querySelector(id);
      element.value = value;      
  }