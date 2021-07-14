var firebaseConfig = {
    apiKey: "AIzaSyDJ1U0Ve34Qnl1MCLndahHk43YjrLMX7b8",
    authDomain: "daintree-fashion.firebaseapp.com",
    projectId: "daintree-fashion",
    storageBucket: "daintree-fashion.appspot.com",
    messagingSenderId: "536679017478",
    appId: "1:536679017478:web:0fbc4d10bc1423c2712787",
    measurementId: "G-C2341WF42X"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


function onLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(res => {
        var userEmail;
        userEmail = res.user.email;
        sessionStorage.setItem('userEmail', userEmail);
    });
    checkAuthState();

}

function showField() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            checkExist();
        }
        else {
            onLogin();

        }
    });
}

function checkAuthState() {
    var path = window.location.href;
    var page = path.split("/").pop();
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            location.href = "form.html";
        }
    });
}

function onLogout() {
    firebase.auth().signOut();
    document.getElementById('successfullySignedOut').style.display = 'block';
    setTimeout(function () {
        document.getElementById('successfullySignedOut').style.display = 'none';
        location.href = "index.html";
    }, 2000);
}


//  checkAuthState();

var dataRef = firebase.database().ref('userData');

function checkExist() {
    dataRef.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var signInEmail;
                signInEmail = sessionStorage.getItem('userEmail');
                var childData = childSnapshot.val();
                if (childData.email == signInEmail) {
                    document.getElementById('AlreadySubmitted').style.display = 'block';

                    // Hide alert after 3 seconds
                    setTimeout(function () {
                        document.getElementById('AlreadySubmitted').style.display = 'none';
                    }, 10000);
        
                    document.getElementById('name').value = childData.name;
                    document.getElementById('age').value = childData.age;
                    document.getElementById('gender').value = childData.gender;
                    document.getElementById('country').value = childData.country;
                    document.getElementById('next').style.display = "none";
                    if (childData.gender == "male") {
                        document.getElementById('maleTrigger').style.display = "block";
                    }
                    else {
                        document.getElementById('femaleTrigger').style.display = "block";
                    }
                    if (childData.gender == "male") {
                        ele = document.getElementsByName('maleFaceType');

                        for (i = 0; i < ele.length; i++) {
                            if (ele[i].value == childData.facetype) {
                                ele[i].checked = true;
                            }
                            else {
                                ele[i].disabled = true;
                            }
                        }
                        ele = document.getElementsByName('maleFaceTone');
                        for (i = 0; i < ele.length; i++) {
                            if (ele[i].value == childData.facetone) {
                                ele[i].checked = true;
                            }
                            else {
                                ele[i].disabled = true;
                            }
                        }
                        ele = document.getElementsByName('maleBodyType');

                        for (i = 0; i < ele.length; i++) {
                            if (ele[i].value == childData.bodytype) {
                                ele[i].checked = true;
                            }
                            else {
                                ele[i].disabled = true;
                            }
                        }

                    }
                    if (childData.gender == "female") {
                        ele = document.getElementsByName('femaleFaceType');

                        for (i = 0; i < ele.length; i++) {
                            if (ele[i].value == childData.facetype) {
                                ele[i].checked = true;
                            }
                            else {
                                ele[i].disabled = true;
                            }
                        }
                        ele = document.getElementsByName('femaleFaceTone');
                        for (i = 0; i < ele.length; i++) {
                            if (ele[i].value == childData.facetone) {
                                ele[i].checked = true;
                            }
                            else {
                                ele[i].disabled = true;
                            }
                        }
                        ele = document.getElementsByName('femaleBodyType');

                        for (i = 0; i < ele.length; i++) {
                            if (ele[i].value == childData.bodytype) {
                                ele[i].checked = true;
                            }
                            else {
                                ele[i].disabled = true;
                            }
                        }
                    }
                    document.getElementById('name').disabled = true;
                    document.getElementById('age').disabled = true;
                    document.getElementById('gender').disabled = true;
                    document.getElementById('country').disabled = true;

                }
                else {
                    document.getElementById('name').disabled = false;
                    document.getElementById('age').disabled = false;
                    document.getElementById('gender').disabled = false;
                    document.getElementById('next').disabled = false;
                    document.getElementById('country').disabled = false;
                }

            });
        });
}

function nextPage() {
    var name, gender, country, age;
    name=document.getElementById('name').value;
    age = document.getElementById('age').value;
    gender = document.getElementById('gender').value;
    country = document.getElementById('country').value;
    if (name == "" || age == "" || gender == "" || country == "") {
        alert('kindly fill all details');
    }

}

function submitData() {
    var name, gender, country, age;
    name = document.getElementById("name").value;
    var str, signInEmail;
    str = sessionStorage.getItem('userEmail');
    signInEmail = str;
    age = document.getElementById('age').value;
    gender = document.getElementById('gender').value;
    country = document.getElementById('country').value;
    var facetype, facetone, bodytype;
    if (gender == "male") {
        ele = document.getElementsByName('maleFaceType');

        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
                facetype = ele[i].value;
            }
        }
        ele = document.getElementsByName('maleFaceTone');
        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
                facetone = ele[i].value;
            }
        }
        ele = document.getElementsByName('maleBodyType');

        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
                bodytype = ele[i].value;
            }
        }

    }
    else {
        ele = document.getElementsByName('femaleFaceType');

        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
                facetype = ele[i].value;
            }
        }
        ele = document.getElementsByName('femaleFaceTone');
        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
                facetone = ele[i].value;
            }
        }
        ele = document.getElementsByName('femaleBodyType');

        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
                bodytype = ele[i].value;
            }
        }
    }
    if (facetype == null || facetone == null || bodytype == null) {
        alert("kindly fill all details");
    }
    else {
        saveData(signInEmail, name, age, gender, country, bodytype, facetype, facetone);
        document.getElementById('successfullySubmitted').style.display = 'block';

        // Hide alert after 3 seconds
        setTimeout(function () {
            document.getElementById('successfullySubmitted').style.display = 'none';
            location.href = "index.html";
        }, 3000);

       
    }
}

function reloadPage() {
    location.reload();
}

function checkGender(gender) {
  
    if (gender == "male") {
        document.getElementById('maleTrigger').style.display = "block";
    }
    else {
        document.getElementById('femaleTrigger').style.display = "block";
    }
}

function indexPage() {
    location.href = "index.html";
}


function saveData(email, name, age, gender, country, bodytype, facetype, facetone) {
    var newDataRef = dataRef.push();  
    newDataRef.set({
        email: email,
        name: name,
        age: age,
        gender: gender,
        country: country,
        bodytype: bodytype,
        facetype: facetype,
        facetone: facetone
    });
}
