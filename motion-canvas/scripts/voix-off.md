# Voix off

`src/audio/voix-off.mp3` est une synthèse vocale **hors-ligne** (espeak-ng +
voix mbrola française `mb-fr4`), calée segment par segment sur la durée de
chaque scène de `project.ts`. Aucun service cloud de TTS n'a été utilisé
(réseau restreint dans l'environnement où ce fichier a été généré).

**La voix est robotique** (synthèse par formants/diphones, pas un TTS neuronal).
À remplacer par un vrai enregistrement ou un TTS de meilleure qualité dès que
possible : déposer le nouveau fichier dans `src/audio/` et mettre à jour
l'import `voixOff` dans `project.ts`.

## Texte, par scène

| Scène | Durée | Texte |
|---|---|---|
| introVegetale | 4,6 s | La Boulangerie des Merveilles. Artisan boulanger à Tende, depuis deux mille six. |
| defileProduits | 3,2 s | Notre pain de campagne, pétri chaque matin. Trois euros vingt. |
| annonce (Click & Collect) | 9,4 s | Envie de gagner du temps ? Scannez ce Q R code, commandez vos produits avant dix-neuf heures, et récupérez-les dès sept heures le lendemain, directement en boutique. |
| formuleSandwich | 5,7 s | Et pour un repas complet : la formule sandwich à neuf euros. Une boisson, un sandwich au choix, un dessert. |
| carteAdresse | 5,0 s | Retrouvez-nous au cinq, place de la République, à Tende. Merci pour votre fidélité, depuis deux mille six. |

## Régénérer (hors-ligne)

```bash
apt-get install -y espeak-ng espeak-ng-data mbrola mbrola-fr4
espeak-ng -v mb-fr4 -s 155 "Votre texte ici." -w segment.wav
# Caler chaque segment sur la durée de sa scène (silence de fin), puis
# concaténer (ffmpeg -f concat) et convertir en mp3 (libmp3lame).
```

Si le texte ou l'ordre des scènes change, la durée de chaque segment doit être
recalculée pour rester synchronisée.
