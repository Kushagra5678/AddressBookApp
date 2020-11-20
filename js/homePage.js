window.addEventListener('DOMContentLoaded',(event) => {
    createInnerHtml();
  });

  const createInnerHtml = () => {
    const headerHtml = ` 
      <th>Full Name</th>
      <th>Address</th>
      <th>City</th>
      <th>State</th>
      <th>Zip Code</th>
      <th>Phone Number</th>
      <th>Actions</th>
    `;
    let contactList = createContactJSON();
    if(contactList.length == 0) return;
    document.querySelector(".person-count").textContent = contactList.length;
    let innerHtml = `${headerHtml}`;
    for(const contactData of contactList)
    {
    innerHtml = `${innerHtml}
    <tr>
        <td>${contactData._firstName}${contactData._lastName}</td>
        <td>${contactData._address}</td>
        <td>${contactData._city}</td>
        <td>${contactData._state}</td>
        <td>${contactData._zip}</td>
        <td>${contactData._phone}</td>
        <td>
        <img name="${contactData._id}" onclick="remove(this)" alt="delete" 
                src="../assets/delete-black-18dp.svg">
        <img name="${contactData._id}" alt="edit" onclick="update(this)"
                src="../assets/create-black-18dp.svg">
        </td>
    </tr>
    `;
    }
  document.querySelector('#table-display').innerHTML = innerHtml;
  }

  const createContactJSON = () => {
    let contactListLocal = [
    {
        _firstName: "Kushagra",
        _lastName: "Agarwal",
        _address: "street",
        _city: "Mumbai",
        _state: "Maharashtra",
        _phone: "9094587625",
        _zip: "212323",
    },
    {
        _firstName: "Kush",
        _lastName: "Agg",
        _address: "Gully",
        _city: "Meerut",
        _state: "Uttar Pradesh",
        _phone: "9435269513",
        _zip: "629161",
    }
    ];
    return contactListLocal;
  } 