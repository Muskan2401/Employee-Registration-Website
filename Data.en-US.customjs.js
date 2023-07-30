
function generateListingHTML(listing) {
        let formattedDate = "";
  if (listing.DOB) {
    let date = new Date(listing.DOB);
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    formattedDate = `${year}-${month}-${day}`;
  }
     
        return `
        <tr>
          <td>${listing.Name}</td>
          <td>${listing.Age}</td>
          <td> ${listing.Salary}</td>
          <td> ${formattedDate}</td>
          <td> ${listing.Gender}</td>
          <td> ${listing.Mobileno}</td>

          <td><button type="button" style="background-color:red;" onclick="deleteListing('${listing.Name}','${listing.Age}','${listing.Mobileno}','${listing.Salary}','${listing.DOB}','${listing.Gender}')">Delete</button></td>
          <td><button type="button" onclick="populateUpdateForm('${listing.Mobileno}')">Update</button></td>
      
      `;
  
      
      }
      function deleteListing(name,age,listingId,salary,dob,gender) {
        if (confirm("Are you sure you want to delete the record?") == false){
          return;
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const loaderOverlay = document.getElementById('loader-overlay');

        const loadingElement = document.getElementById('loader');
        loaderOverlay.style.display = 'block';
  loadingElement.style.display = 'block';


        var raw = JSON.stringify({
          Name: name,
          Age: age,
          Salary:salary,
          DOB:dob,
          Gender:gender,
          Mobileno: listingId
      
        });


  var requestOptions = {
    method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
  };

  fetch("https://prod-17.centralindia.logic.azure.com:443/workflows/49a0e0dfaa704427a21ce25289a2de59/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=FZfuh0mH7Z_EPdLwFrmKGaTCFB_imkLaS-3UNJ-kX5Y", requestOptions)
    .then((response) => {
      if (response.ok) {
        document.getElementById("data").innerHTML = "";
        ListOfItems();
        loaderOverlay.style.display = 'none';
        loadingElement.style.display = 'none';
   
      } else {
        loaderOverlay.style.display = 'none';
        loadingElement.style.display = 'none';
         alert("Failed to delete listing");
         

      }
    })
    .catch((error) => console.log("Error:", error));
}
function populateUpdateForm(mobileNo) {
const updatePageUrl = `https://site-twyx4.powerappsportals.com/Update?mobileNo=${mobileNo}`;
window.open(updatePageUrl, "_blank");

  
}

function checkAdminAccess(name, mobileNo) {
  console.log("Checking admin access for:", name, mobileNo);

  // Check if the provided name and mobile number match the admin criteria
  if (name === "Muskan" && mobileNo === "9873694582") {
    console.log("Admin access granted.");
    return true;
  }

  console.log("Admin access denied.");
  return false;
}



async function handleModalSubmit() {
    const loaderOverlay = document.getElementById('loader-overlay');
        const loadingElement = document.getElementById('loader');
  try {
    const name = document.getElementById('name').value.trim();
    const mobileNo = document.getElementById('mobileNo').value.trim();
    const mobilePattern = /^[6-9]\d{9}$/;
    error=document.getElementById("error")
    error2=document.getElementById("error2")
    if (name.length===0 || mobileNo.length===0){
        error.style.display="block"
        return
    }
    else{
        error.style.display="none"

    }
    if(!mobilePattern.test(mobileNo)){
        error2.style.display="block"
        return
    }
    else{
        error2.style.display="none"
    }
    loaderOverlay.style.display = 'block';
        loadingElement.style.display = 'block';
    const isAdmin = checkAdminAccess(name, mobileNo);
    const response = await fetch("https://prod-07.centralindia.logic.azure.com:443/workflows/f295a6a929124db2b2e0f970115a33e3/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=r9v_DBoyBSNY17QNXFH0aVk3x0LTrtYSNZ5FgkwpLZ8");
    const myJson = await response.json();
    console.log(myJson);

    // Clear the existing records
    document.getElementById('data').innerHTML = '';

    if (isAdmin) {
      // Display all records for admin
      loaderOverlay.style.display = 'none';
        loadingElement.style.display = 'none';
      for (let i = 0; i < myJson.payload.length; i++) {
        const listing = myJson.payload[i];
        const listingHTML = generateListingHTML(listing);
        document.getElementById('data').innerHTML += listingHTML;
      }
    } else {
      // Display specific record for the user
      loaderOverlay.style.display = 'none';
        loadingElement.style.display = 'none';
      const listing = findListingByNameAndMobileNo(name, mobileNo, myJson);
      if (listing) {
        const listingHTML = generateListingHTML(listing);
        document.getElementById('data').innerHTML = listingHTML;
      } else {
        loaderOverlay.style.display = 'none';
        loadingElement.style.display = 'none';
        document.getElementById('data').innerHTML = 'No records found.';
      }
    }

    // Close the modal
    $('#myModal2').modal('hide');
  } catch (error) {
    console.error(error);
  }
}

function findListingByNameAndMobileNo(name, mobileNo,myJson) {
  for (let i = 0; i < myJson.payload.length; i++) {
    const listing = myJson.payload[i];
    if (listing.Name === name && listing.Mobileno === mobileNo) {
      return listing;
    }
  }
  return null; // No matching listing found
}
window.onload = function() {
  $('#myModal2').modal('show');
};
