const admin = require('firebase-admin');

// Path to your service account key JSON file
// const serviceAccount = require('../configs/maker-store-firebase-adminsdk-f7bw1-46c7d07d6a.json');
const serviceAccount = {
  type: "service_account",
  project_id: "maker-store",
  private_key_id: "46c7d07d6ac41b60a39747ba277d8918afca5685",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCqE/l1poVsZzYk\nL4wmet8V6byiKeeOVRHEfZ3VX5ijI36wpSnM52OhJDmkTPsQTNIxt0cYUSz7/UUk\nuld9xS9P/QxWzMu2c9rR4Wd/vYrYFh4NuvQ3G9hc7TC/NfN+C+xq9YIaK3whrY3h\nyeQhOnrgHp0dvr+05KTCrjRPE1L5QyXf9MzfhHjJAX5phP0E1rK36tHNYB7WhsGw\n3k+wC97KUPxDI/0HR/kzc5fx1uL3SemwId8Nt4lAZ0gx0ZD+K7s5GhLNCQKB9Vqb\nYJjlQ4hT7m1AgcjUr0sPRvVt8cj1ElAKbHZj5K8EsNobTYzV0YqUwvdEXu3Zdg4G\niZcLzRU1AgMBAAECggEAB4a/F9M+J/LApRpLjUULtpMI4Mjnm9dXjsabo550M+f1\nX8jMpZTUcQRC3r/0rknQABjjDF2Z7C7O5ACxBXpNN9t0CSqildjg+pULI6PWJJjZ\n90k/gb7O33yJlzSX1AtKs4hYxmKylA+eQzslcsj9OLTHcX0IS8TV0QhXfUEBf3vu\n6jyDZW/Q0sXqswd/CeJb/kpqJk4ByFU8caMQK07Z7/ImRM7THYQwU0FARuKbUHzz\n/IBJDCREMpIk2VR4KW0kGMlQqgc6t6oxk6Bvh6XSGhMaflbL2BWKHmcdylPKcOu9\n6jVnexgW5NpApK6KsBuahGws8Wf5TMQzTq7CpBhwUQKBgQDU6Z7a0sT4Y50fiD4t\nvX/cIi94SPHiLsuhJIieCmAg6nt3AyXpYJt3pKqym21d9RN0FBw7YxIDmWUuWxGE\nFXXSPYDWAPbdHYwsFYMXHNkruDZZaue+ElIJ+B5W2PnwLRYZW6fbob3uovAfv4FY\nNA7uaG1Fb4IXHfeQNy/GNay7rQKBgQDMfzh7FHP6RoUuLIojvCUq03xBjBEiCn1X\nsv8pWoz1Khs0wDKTQrHvG1WkDJ0FzVRire6F1mazwkD08ajOd3Y8QgvkEcUjNaKc\nKAhGadTxAC643Jf7Hc7xn1b5WA3cg5av8RNH/W8IF58zPIxWpaXWYq2FcFReYiY6\nll23Gn/wqQKBgDhvD/8aXMElzjDccPa4wto7aW+tjgeQtcKpp1iUkXRIEp+yAuuA\nAtVMnT4oOm3sFtLuvaj0EoNHtmz6EIN9GLS4Ppz6tnRXb58DuLJ4oAuZkTZUQsa7\nnmksDgahDmad3Lyt8akijvBg2drgbM1PRyHkJgqAiu/LrqHYLt6PvZAlAoGABO4c\nQntfwGzq0Q4p1mq2yq2GlV33G8b89pxOIoUYWODG/yKTFZHKEGWsTuQu9PDaU/a1\nhWyB1VudjUo2M6QVqaY9+yWihxLH9NPSP0BV7el/Nt26nEc/sfuRcTl6PBLAE0XQ\nnS+y+ZL4N5gCGiSsNtryLAFlR1E+crMlV0DATOECgYA8ObZ39mHPQPbxD+pIQUt9\n153boJws91spnvpFT11uX8LM7t9ejRF0yvZqzrHLDGoovJ4CnGI+XnDFgqP9vAru\nGdjJyvbzZtm3VQtuXM6nN8cUQz5FaGMYlLDegL9JCWQ4nAIFKOk6tnUFbWXZPmaU\nHpz122wRS4VVhq4yp4Tv4A==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-f7bw1@maker-store.iam.gserviceaccount.com",
  client_id: "102261332978198940405",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-f7bw1%40maker-store.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'maker-store.appspot.com' // Replace with your project ID
});

const bucket = admin.storage().bucket();

module.exports = { bucket };
