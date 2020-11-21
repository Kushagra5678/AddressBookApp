let isUpdate = false;
let contactObj = {};
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
    event.preventDefault();
  event.stopPropagation();	  
  try{
    setContactObject();	      
    createAndUpdateStorage();
    //resetForm();
    window.location.replace("../pages/homePage.html");
    }catch(e){
      console.log(e);
      return;
    }
  }

 

const setContactObject = () => {
    contactObj._fullName = getInputValueById('#fullName');
    contactObj._address = getInputValueById('#address');
    contactObj._phoneNumber = getInputValueById('#tel');
    contactObj._city = getInputValueById('#city');
    contactObj._state = getInputValueById('#state');
    contactObj._zip = getInputValueById('#zip');
  }
  const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

  const createAndUpdateStorage = () => {
    let contactList = JSON.parse(localStorage.getItem("ContactList"));
    if(contactList){
        let contactData = contactList.
                            find(contact => contact._id == contactObj._id);
        if(!contactData)
        contactList.push(createContactData());
        else{
            const index = contactList.map(cnt => cnt._id)
                                             .indexOf(contactData._id);
            contactList.splice(index,1,createContactData(contactData._id));
        }
    }
    else{
      contactList = [createContactData()];
    }
    localStorage.setItem("ContactList",JSON.stringify(contactList));
  }

  const createContactData = (id) => {
    let contactData = new AddressBookContact();
    if(!id)
    contactData.id = createNewContactId();
    else
    contactData.id = id;
    setContactData(contactData);
    return contactData;
  }
  
  const createNewContactId = () => {
    let cntID = localStorage.getItem("ContactID");
    cntID = !cntID ? 1 : (parseInt(cntID)+1).toString();
    localStorage.setItem("ContactID",cntID);
    return cntID;
  }

  const setContactData = (contactData) => {
    try{
      contactData.fullName = contactObj._fullName;
    }catch(e){
        setTextValue('.text-error',e);
    }
  
    try{
      contactData.address = contactObj._address;
    }catch(e){
        setTextValue('.address-error',e);
    }
  
    contactData.city = contactObj._city;
    contactData.state = contactObj._state;
    contactData.zip = contactObj._zip;
  
    try{
      contactData.phoneNumber = contactObj._phoneNumber;
    }catch(e){
        setTextValue('.mobile-error',e);
    }
  
    alert(contactData.toString());
  }
  
  const setTextValue = (id,value) => {
    const element = document.querySelector(id);
    element.textContent = value;
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