window.addEventListener('DOMContentLoaded',(event) => {
    contactList = getContactDataFromLocalStorage();
    document.querySelector(".person-count").textContent = contactList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
  });

  const getContactDataFromLocalStorage = () => {
      return localStorage.getItem('ContactDataList') ? 
                            JSON.parse(localStorage.getItem('ContactDataList')) : [];
  }

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
    if(contactList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for(const contactData of contactList)
    {
    innerHtml = `${innerHtml}
    <tr>
        <td>${contactData._fullName}</td>
        <td>${contactData._address}</td>
        <td>${contactData._city}</td>
        <td>${contactData._state}</td>
        <td>${contactData._zip}</td>
        <td>${contactData._phoneNumber}</td>
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