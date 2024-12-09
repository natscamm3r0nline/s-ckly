document.addEventListener('DOMContentLoaded', function() {
    const firebaseConfig = {
        apiKey: "AIzaSyC3_Th-0rdXJ9ITSMIWIcdVhHbwpC4veuw",
        authDomain: "tables-8089d.firebaseapp.com",
        databaseURL: "https://tables-8089d-default-rtdb.firebaseio.com",
        projectId: "tables-8089d",
        storageBucket: "tables-8089d.firebasestorage.app",
        messagingSenderId: "114753601871",
        appId: "1:114753601871:web:8e9ec7c82e5ce4a045053a"
    };

    firebase.initializeApp(firebaseConfig);

    //project form
    let messagesRef = firebase.database().ref('Collected Data');
    let NewMessagesRef = firebase.database().ref('Answer Two Data');

    document.getElementById('contactForm').addEventListener('submit', submitForm);
    document.getElementById('contactForm2').addEventListener('submit', submitForm2);

    function submitForm(e) {
        e.preventDefault();

        // Get values
        let answer = getInputVal('answer');

        saveMessage(answer);
        document.getElementById('contactForm').reset();
    }

    function submitForm2(e) {
        e.preventDefault();

        // Get values
        let answer2 = getInputVal('answer2');

        saveMessage2(answer2);
        document.getElementById('contactForm2').reset();
    }

    // Function to get form values
    function getInputVal(id) {
        return document.getElementById(id).value;
    }

    // Function to save the message to firebase
    function saveMessage(answer) {
        let newMessageRef = messagesRef.push();
        newMessageRef.set({
            answer: answer
        });
    }

    function saveMessage2(answer2) {
        let newMessageRef = NewMessagesRef.push();
        newMessageRef.set({
            answer2: answer2
        });
    }

    // Function to display data
    function displayData() {
        messagesRef.on('value', function (snapshot) {
            let dataDisplay = document.getElementById('dataDisplay');
            dataDisplay.innerHTML = ''; 
            snapshot.forEach(function (childSnapshot) {
                let childData = childSnapshot.val();
                dataDisplay.innerHTML +=
                    `<p>Answer: ${childData.answer}</p>`;
            });
        });

        NewMessagesRef.on('value', function (snapshot) {
            let dataDisplay = document.getElementById('dataDisplay2');
            dataDisplay.innerHTML = ''; 
            snapshot.forEach(function (childSnapshot) {
                let childData = childSnapshot.val();
                dataDisplay.innerHTML +=
                    `<p>Answer: ${childData.answer2}</p>`;
            });
        });
    }

    // Call displayData to show data on page load
    displayData();
});