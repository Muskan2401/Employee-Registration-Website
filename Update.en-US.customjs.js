      function reset(){
      
        var errorMesg = document.getElementById('error${listing.Mobileno}');
        errorMesg.style.display = 'none';
    
  }
  reset()
  const loaderOverlay = document.getElementById('loader-overlay');
  const loadingElement = document.getElementById('loader');
  loaderOverlay.style.display = 'block';
  loadingElement.style.display = 'block';
        const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('mobileNo');

  fetch("https://prod-07.centralindia.logic.azure.com:443/workflows/f295a6a929124db2b2e0f970115a33e3/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=r9v_DBoyBSNY17QNXFH0aVk3x0LTrtYSNZ5FgkwpLZ8")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch data');
      }
    })
    .then((data) => {
      // Find the listing with the matching ID
      const listing = data.payload.find((item) => item.Mobileno === id);


      if (listing) {
        // Update the input fields with the fetched listing data
        document.getElementById('updatedname${listing.Mobileno}').value = listing.Name;
          document.getElementById('updatedage${listing.Mobileno}').value = listing.Age;
          document.getElementById('updatedsalary${listing.Mobileno}').value = listing.Salary;
          const genderRadio = document.querySelector('input[name="updatedgender${listing.Mobileno}"][value="' + listing.Gender + '"]');
      if (genderRadio) {
        genderRadio.checked = true;
      }

         
      document.getElementById('updateddob${listing.Mobileno}').value = listing.DOB ? new Date(listing.DOB).toISOString().split('T')[0] : '';

      } else {
        throw new Error('Listing not found');
      }
      loaderOverlay.style.display = 'none';
      loadingElement.style.display = 'none';
     
    })
    .catch((error) => {
      console.log('Error:', error);
      loaderOverlay.style.display = 'none';
      loadingElement.style.display = 'none';
    
    });

    function updateListing(mobileNo) {
        const loaderOverlay = document.getElementById('loader-overlay');   
  const loadingElement = document.getElementById('loader');
  loaderOverlay.style.display = 'block';
  loadingElement.style.display = 'block';
  success.style.display='none'
  failure.style.display='none'

  const updatedName = document.getElementById('updatedname' + mobileNo).value;
      const updatedAge = document.getElementById('updatedage' + mobileNo).value;
      const updatedSalary = document.getElementById('updatedsalary' + mobileNo).value;
      let updatedgender = document.querySelector('input[name="updatedgender' + mobileNo + '"]:checked');
      const updateddob=document.getElementById('updateddob'+mobileNo).value

  let errorMesg = document.getElementById('error'+mobileNo);
  
    if (updatedName == '' || updatedAge == ''  || updateddob == '' || updatedSalary == '') {
      
    errorMesg.style.display = 'block';
    loaderOverlay.style.display = 'none';
    loadingElement.style.display = 'none';
    return;
    }
    else{
       errorMesg.style.display = 'none';
    }


  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestBody = {
    Name: updatedName,
    Age: updatedAge ,
    Salary: updatedSalary,
    Gender: updatedgender.value,
    DOB: updateddob,
    Mobileno: id
  };
  

  var requestOptions = {
    method: "POST",
    headers:myHeaders,
    body: JSON.stringify(requestBody),
    redirect: "follow"
  };

  fetch("https://prod-30.centralindia.logic.azure.com:443/workflows/e4e1454767704cb4816e883592038286/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=wKRe1x22OMN7sK7lDIcmsvyi9rOZXCY00zL84H5yPCw", requestOptions)
    .then((response) => {
      if (response.ok) {
     
        loaderOverlay.style.display = 'none';
        loadingElement.style.display = 'none';
        success.style.display='block'
        
      } else {
        loaderOverlay.style.display = 'none';
        loadingElement.style.display = 'none';
        failure.style.display='block'
        
        
      }
    })
    .catch((error) => console.log("Error:", error));
}
