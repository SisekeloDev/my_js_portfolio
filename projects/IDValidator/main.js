function Validate() {

    // clear error and result
    clearForm();

    // store the error div, to save typing
    var error = document.getElementById('error');

    var idNumber = document.getElementById('idnumber').value;

    // assume everything is correct and if it later turns out not to be, just set this to false
    var correct = true;

    //Ref: http://www.sadev.co.za/content/what-south-african-id-number-made
    // SA ID Number have to be 13 digits, so check the length
    if (idNumber.length != 13 || !isNumber(idNumber)) {
        error.innerHTML = 'ID number does not appear to be authentic - input not a valid number';
        correct = false;
    }

    // get first 6 digits as a valid date
    var tempDate = new Date(idNumber.substring(0, 2), idNumber.substring(2, 4) - 1, idNumber.substring(4, 6));

    var id_date = tempDate.getDate();
    var id_month = tempDate.getMonth();
    var id_year = tempDate.getFullYear();

    var fullDate = id_date + "-" + id_month + 1 + "-" + id_year;

    if (!((tempDate.getYear() == idNumber.substring(0, 2)) && (id_month == idNumber.substring(2, 4) - 1) && (id_date == idNumber.substring(4, 6)))) {
        error.innerHTML += '<br>ID number does not appear to be authentic - date part not valid';
        correct = false;
    }

    // get the gender
    var genderCode = idNumber.substring(6, 10);
    var gender = parseInt(genderCode) < 5000 ? "Female" : "Male";

    // get country ID for citzenship
    var citzenship = parseInt(idNumber.substring(10, 11)) == 0 ? "Yes" : "No";

    // apply Luhn formula for check-digits
    var tempTotal = 0;
    var checkSum = 0;
    var multiplier = 1;
    for (var i = 0; i < 13; ++i) {
        tempTotal = parseInt(idNumber.charAt(i)) * multiplier;
        if (tempTotal > 9) {
            tempTotal = parseInt(tempTotal.toString().charAt(0)) + parseInt(tempTotal.toString().charAt(1));
        }
        checkSum = checkSum + tempTotal;
        multiplier = (multiplier % 2 == 0) ? 1 : 2;
    }
    if ((checkSum % 10) != 0) {
        error.innerHTML += '<br>ID number does not appear to be authentic - check digit is not valid';
        correct = false;
    };


    // if no error found, hide the error message
    if (correct) {
        document.getElementById('error').style.display = 'none';
        // and put together a result message
        document.getElementById('result').innerHTML = 'South African ID Number: ' + idNumber + '<br>Birth Date: ' + fullDate + '<br>Gender: ' + gender + '<br>SA Citizen: ' + citzenship;
    }
    // otherwise, show the error
    else {
        document.getElementById('error').style.display = 'block';
    }

    return false;
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function clearForm(){
    document.getElementById('error').innerHTML = "";
    document.getElementById('result').innerHTML = "";
}
// document.theForm.submit(Validate);