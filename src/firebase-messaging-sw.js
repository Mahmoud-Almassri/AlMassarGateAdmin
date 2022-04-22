importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');
firebase.initializeApp({
  type: "service_account",
  project_id: "almassar-a0920",
  private_key_id: "a763882351d05f8db9f71795663e6d87a657c4bc",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQCS7N8wXIKxN7/X\nKzsJyzcD4WKDHsWhmqn53QuBcSDsTpDfc7iz9LGzGCoZ9ZVY2J+ds23Ayn6Hf23p\ngNJ3CsnQyjiVtV8w+N7xr2hgDNFd9WvRHNXXOVC0AZvl9PqGlVMkwv1xb686Otus\nN8ecweWgFEorJyHjFQr+I8+X1yIZS20xt01iEpuw60Y0dyEXyNkjxQ2nVgsFVGVO\nRJnZTUIMLc1k7EivvnitqVfRWIuS9KdS6Fftg7tVw6rvs3gMG4L0OTKFQP9qpBPo\nGUh8GqN9Ippe+pGNbi/oN1vvWCd9lIU5+pcTX5QhdBl4Ylvacun4NNla3inaNChV\npKxvop5PAgMBAAECgf9+WKzC4lKQQJWD1SlCwtE5yMy5qbUsHdw7CgEAkwSXQLyQ\n1Seexk3rnphZq3TogWCFYoOOXWb5LYVt5bvMOZFimTh5Kw5eNFqxTmnzenu+OmUb\nSMdQVR8Y+A0B6AtMOFltHecCB4j7GTjtMyipnX2lI82VITdkzFHcZ3bKuokJJyRW\neRoi05Gm4i3aZUb2vy6EZKZimdQ/uKEOO/KSLGfLZQp7OgAZlR4eP70wKOmY6ga0\n19aXFz2GE97pK33eDG75fxkljM5IFgHZSNVbXzHXrf41PihtgBRVou7TExjJzsxg\nwNoO3XKD40qCDz7fzW/wXMPUA58sPIzjkRrVMAkCgYEAwgI7+atLf96rDZB7t+wf\nMSew8Y/L2vuirp9V9z/eZZA3DHRMh6XFQ3te4JLjh4UATv6S7E05JfUpju+HDDPp\nUBVYem0mWREcGW6/DRdqhBP1+FB7RJDdWfA7Hk2Ebk2PNOubh6D0Ea3pBdHeDbNq\nl8e9yBoP+SWY/bfE/APFZUcCgYEAwd8/X3SCbsBiag9+bEZ7sNgC4gkoMJ95N6Td\nZNFzm8cQW148wuHlL6lvDoXipvdX7wTUbYzygYKAnW75Xm2lJJTg1vLbZc05hpsl\nhT3NIlejXhd1ILPFf4cbooEWVlU9k89AdM0B9O1SdXOgmlzPY6AGVz9rrdZkJmaa\ntiWvIrkCgYB9OrH5+97VICbrr4qcctbDhOpLUtV0eZ9N9l2oJlro1gkiieNoX9GQ\nOI9KiKZDsM89LkgqLcKoxLJZqDVU5CFC5zRgehoZvdiUdg7uZWIE9Vl9On4HCTdI\nOa//ZGwKQxggQcD38CX7T3WtowUhdOFmLbFL+765xNIXW8rUHZ8KOwKBgDp3TPFI\nfZ1Qv10k1wdoKh0mx5fLEye2sCOrwGiLEcZEvhYP0VskLK229xr2HWgk54vZdQak\nnu2XoZnYwbNMdaUWkMfB7ZBB17tURnhsLtTQgR/7CwOVs1XGNPtI2qemhS9yLQoM\nWS6380ogWKq0moZ81+yv35VJNmKuRrHvo2VhAoGBALf+9B1RjeXisdrkC4L+COwK\nL1PyVPE4eNyFHN1yz1rVQQchzctGqYErSUWZAE1TbfBGGfIFT2U978O4RGxw8JFW\ngtnwDsKw7PfXOqo2KCuTzY5Te9qJuk95AOCvgCT2+T+JP0OLdg360Nxu3qlZRgcD\nJn7DLgevJQlw5kbbyjM/\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-maryu@almassar-a0920.iam.gserviceaccount.com",
  client_id: "116254513554957115148",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-maryu%40almassar-a0920.iam.gserviceaccount.com"
});
const messaging = firebase.messaging();
if ('serviceWorker' in navigator) {
    console.log('service');
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then(function (registration) {
            console.log("Service Worker Registered");
            messaging.useServiceWorker(registration);
        });
}
messaging.onMessage(function (payload) {
    console.log("Message received. ", payload);
    // ...
});
messaging.setBackgroundMessageHandler(function (payload) {
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});