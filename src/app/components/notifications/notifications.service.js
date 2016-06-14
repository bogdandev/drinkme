(function() {
    'use strict';

    angular
        .module('drinkme')
        .factory('notificationsFactory', notificationsFactory);

    /** @ngInject */
    function notificationsFactory($timeout) {
        // request permission on page load
        document.addEventListener('DOMContentLoaded', function () {
            if (Notification.permission !== "granted")
                Notification.requestPermission();
        });
        if (!Notification) {
            alert('Desktop notifications not available in your browser. Try Chromium.');
            return;
        }

        function create(title, body, onClick, onClose, icon, closeInterval){
            if (Notification.permission !== "granted")
                Notification.requestPermission();
            else {
                var notification = new Notification(title, {
                    icon: icon || "url",
                    body: body || "A reminder for your event!"
                });
                closeInterval = closeInterval || 5000;
                $timeout(notification.close.bind(notification), closeInterval);
                if(onClick){
                    notification.onclick = function () {
                        onClick();
                    };
                }

                if(onClose){
                    notification.onclose = function(){
                        onClose();
                    }
                }
            }
        }
        
        return {
            create: create
        };
    }
})();
