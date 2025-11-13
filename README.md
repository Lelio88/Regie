# Regie 24h Prototype

## Description

Application web de régie vidéo en temps réel permettant de diffuser et contrôler plusieurs flux vidéo depuis des smartphones vers un dashboard centralisé. Le système utilise WebRTC pour la transmission vidéo peer-to-peer et Socket.IO pour la signalisation.

## Fonctionnalités

- **Streaming multi-sources** : Connexion de plusieurs téléphones diffusant simultanément leur flux vidéo
- **Dashboard de contrôle** : Interface centralisée pour visualiser et sélectionner les différents flux
- **Vidéo principale** : Sélection du flux à afficher en grand format
- **Replay instantané** : Fonction de replay des 10 dernières secondes de la vidéo principale
- **Communication temps réel** : Synchronisation instantanée entre les clients via WebSocket

## Technologies utilisées

- **Backend** : Node.js, Express
- **Communication** : Socket.IO
- **Streaming vidéo** : WebRTC (RTCPeerConnection)
- **Enregistrement** : MediaRecorder API
- **Frontend** : HTML5, JavaScript vanilla

## Architecture

```
regie-24h-prototype/
├── server.js                    # Serveur de signalisation WebRTC
├── package.json                 # Dépendances Node.js
└── public/
    ├── dashboard.html           # Interface de régie
    ├── phone_client.html        # Client mobile pour streaming
    └── style.css                # Styles
```

## Installation

1. Cloner le repository :
```bash
git clone https://github.com/Lelio88/regie-24h-prototype.git
cd regie-24h-prototype
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer le serveur :
```bash
npm start
```

4. Accéder à l'application :
   - Dashboard : `http://localhost:3000/dashboard.html`
   - Client téléphone : `http://localhost:3000/phone_client.html`

## Utilisation

1. Ouvrir le dashboard sur un ordinateur
2. Ouvrir le client téléphone sur un ou plusieurs smartphones
3. Cliquer sur "Start stream" sur chaque téléphone pour commencer la diffusion
4. Sélectionner le flux à afficher en vidéo principale depuis le dashboard
5. Utiliser "Replay Last 10s" pour revoir les 10 dernières secondes

## Note technique

Ce projet nécessite une connexion HTTPS en production pour accéder aux API MediaDevices. En développement local, HTTP fonctionne sur localhost.

---

*Prototype de système de régie vidéo multi-caméras*