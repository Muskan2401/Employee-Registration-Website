  function toggleGenderSection() {
    var genderSection = document.querySelector('.gender-section');
    var toggleButton = document.getElementById('toggleGender');

    if (genderSection.style.display === 'none') {
      genderSection.style.display = 'block';
      toggleButton.textContent = '-';
    } else {
      genderSection.style.display = 'none';
      toggleButton.textContent = '+';
    }
  }
        function toggleFieldState() {
      var nameField = document.getElementById('name');
      var ageField = document.getElementById('age');
      var mobileField = document.getElementById('mobileno');
      var salaryField = document.getElementById('salary');
      var dobField = document.getElementById('dob');
    

      
      if (nameField.value !== '') {
        ageField.disabled = false;
      } else {
        ageField.disabled = true;
        mobileField.disabled = true;
        salaryField.disabled = true;
        dobField.disabled = true;
        return;

      }

      
      if (ageField.value !== '') {
        mobileField.disabled = false;
      } else {
        mobileField.disabled = true;
        salaryField.disabled = true;
        dobField.disabled = true;
        return;
      
      }


      if (mobileField.value !== '') {
        salaryField.disabled = false;
      } else {
        salaryField.disabled = true;
        dobField.disabled = true;
        return;
      
      }

    
      if (salaryField.value !== '') {
        dobField.disabled = false;
      } else {
        dobField.disabled = true;
        return;
      }

    
    }

  function reset(){
        document.getElementById("myForm").reset();
        var errorMesg = document.getElementById('error');
        errorMesg.style.display = 'none';

        var errormobile=document.getElementById('error2')
        errormobile.style.display='none'
    
  }
  reset()
           function handleDataSubmit() {
             success=document.getElementById("success")
             failure=document.getElementById("failure")
             success.style.display='none'
             failure.style.display='none'
        
        const loaderOverlay = document.getElementById('loader-overlay');
        const loadingElement = document.getElementById('loader');

         let name = document.getElementById("name").value;
        let age = document.getElementById("age").value;
        let mobileno = document.getElementById("mobileno").value;
        let salary = document.getElementById("salary").value;
        let genderElement = document.querySelector('input[name="gender"]:checked');
        let gender = genderElement ? genderElement.value : "";
        let dobElement = document.getElementById("dob");
        let dob = dobElement ? dobElement.value : ""; 
        const mobilePattern = /^[6-9]\d{9}$/;

        errormessage=document.getElementById("error")
        var error2=document.getElementById("error2");
        var error3=document.getElementById("error3");

        const today = new Date();
  const dobDate = new Date(dob);

        if (name.length===0 || age.length===0 || gender.length===0 || dob.length===0 || salary.length===0){
            errormessage.style.display='block'
            if (dobDate.getTime() > today.getTime()) {
      error3.style.display = 'block';

    }
            if (mobileno.length!=10 || !mobilePattern.test(mobileno)){
              error2.style.display='block'
            }
            else{
              error2.style.display='none'
            }

            return;
          }
          errormessage.style.display='none'
  
        if (mobileno.length!=10 || !mobilePattern.test(mobileno)){
          if (dobDate.getTime() > today.getTime()) {
      error3.style.display = 'block';

    }
              error2.style.display='block'
              return;
            }
            else{
              error2.style.display='none'
              
            }
            if (dobDate.getTime() > today.getTime()) {
      error3.style.display = 'block';
      return 
    }
    else{
      error3.style.display = 'none';

    }
            

      
            

 
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        loaderOverlay.style.display = 'block';
        loadingElement.style.display = 'block';

        var raw = JSON.stringify({
          Name: name,
          Age: age,
          Salary:salary,
          DOB:dob,
          Gender:gender,
          Mobileno: mobileno
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
       
        fetch("https://prod-25.centralindia.logic.azure.com:443/workflows/af38fd99588149c7b441b86d03460fe9/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=OKChk3WWqTfQ7XmgV6-HBBxsGj8iDyrWoF9tygpE-EY", requestOptions)
        .then((response) => response.json())
          .then((result) => {
            console.log(result.status, "++++");
            if (result.status === 200) {
              loaderOverlay.style.display = 'none';
        loadingElement.style.display = 'none';
        success.style.display="block"
        failure.style.display='none'    
        reset()
             
            } 
            else { 
              loaderOverlay.style.display = 'none';
        loadingElement.style.display = 'none';
               success.style.display='none'
               failure.style.display='block'
            
            
            }
          })
          .catch((error) => console.log("error", error));
        
      }