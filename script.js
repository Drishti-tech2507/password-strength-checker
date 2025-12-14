function checkStrength() {
    const password = document.getElementById("password").value;
    const strengthText = document.getElementById("strengthText");
    const progress = document.getElementById("progress");
    const crackTime = document.getElementById("crackTime");
    const tips = document.getElementById("tips");

    tips.innerHTML = "";
    crackTime.textContent = "";

    if (password.length === 0) {
        strengthText.textContent = "";
        progress.style.width = "0%";
        return;
    }

    const commonPasswords = [
        "password", "123456", "12345678", "qwerty",
        "admin", "letmein", "welcome", "password123"
    ];

    if (commonPasswords.includes(password.toLowerCase())) {
        strengthText.textContent = "Very Weak (Common Password)";
        strengthText.style.color = "crimson";
        progress.style.width = "20%";
        progress.style.background = "crimson";
        crackTime.textContent = "Easily cracked in seconds";
        return;
    }

    let strength = 0;
    let possibleChars = 0;

    if (password.length >= 8) strength++;
    else tips.innerHTML += "<li>Use at least 8 characters</li>";

    if (/[A-Z]/.test(password)) {
        strength++;
        possibleChars += 26;
    } else tips.innerHTML += "<li>Add uppercase letters</li>";

    if (/[a-z]/.test(password)) {
        strength++;
        possibleChars += 26;
    }

    if (/[0-9]/.test(password)) {
        strength++;
        possibleChars += 10;
    } else tips.innerHTML += "<li>Add numbers</li>";

    if (/[^A-Za-z0-9]/.test(password)) {
        strength++;
        possibleChars += 32;
    } else tips.innerHTML += "<li>Add special characters</li>";

    if (strength <= 2) {
        strengthText.textContent = "Weak Password";
        strengthText.style.color = "red";
        progress.style.width = "30%";
        progress.style.background = "red";
    } else if (strength <= 4) {
        strengthText.textContent = "Medium Password";
        strengthText.style.color = "orange";
        progress.style.width = "60%";
        progress.style.background = "orange";
    } else {
        strengthText.textContent = "Strong Password";
        strengthText.style.color = "limegreen";
        progress.style.width = "100%";
        progress.style.background = "limegreen";
    }

    const guessesPerSecond = 1e9;
    const combinations = Math.pow(possibleChars || 1, password.length);
    const seconds = combinations / guessesPerSecond;

    crackTime.textContent = "Estimated crack time: " + formatTime(seconds);
}

function formatTime(sec) {
    if (sec < 60) return `${sec.toFixed(1)} seconds`;
    if (sec < 3600) return `${(sec/60).toFixed(1)} minutes`;
    if (sec < 86400) return `${(sec/3600).toFixed(1)} hours`;
    if (sec < 31536000) return `${(sec/86400).toFixed(1)} days`;
    return `${(sec/31536000).toFixed(1)} years`;
}