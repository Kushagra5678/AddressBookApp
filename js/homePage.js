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
        <img id="${contactData._id}" onclick="remove(this)" alt="delete" 
                src="../assets/delete-black-18dp.svg">
        <img id="${contactData._id}" alt="edit" onclick="update(this)"
                src="../assets/create-black-18dp.svg">
        </td>
    </tr>
    `;
    }
  document.querySelector('#table-display').innerHTML = innerHtml;
  } 

  const remove = (node) => {
    let contact = contactList.find(cont => cont._id == node.id);
    if(!contact) return;
    const index = contactList.map(cont => cont._id).indexOf(contact._id);
    contactList.splice(index, 1);
    document.querySelector(".person-count").textContent = contactList.length;
    localStorage.setItem('ContactDataList', JSON.stringify(contactList));
    createInnerHtml();
}