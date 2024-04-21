function setReminder() {
    var medication = document.getElementById('medication').value;
    var time = document.getElementById('time').value;

    if (medication && time) {
        var now = new Date();
        var reminderTime = new Date(now.toDateString() + ' ' + time);

        if (reminderTime < now) {
            reminderTime.setDate(reminderTime.getDate() + 1);
        }

        var timeDiff = reminderTime - now;

        setTimeout(function () {
            notifyUser(medication);
        }, timeDiff);

        alert('Recordatorio configurado para ' + time);
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

function notifyUser(medication) {
    if ('Notification' in window) {
        Notification.requestPermission().then(function (permission) {
            if (permission === 'granted') {
                var notification = new Notification('Hora de tomar medicación', {
                    body: 'Es hora de tomar ' + medication,
                    icon: 'notification-icon.png'
                });

                notification.onclick = function () {
                    window.focus();
                    notification.close();
                };
            }
        });
    }
}
