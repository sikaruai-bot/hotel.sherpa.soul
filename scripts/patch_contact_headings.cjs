const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '../src/Locales');

// DE
const dePath = path.join(LOCALES_DIR, 'de.json');
const de = JSON.parse(fs.readFileSync(dePath, 'utf8'));
de.contactMap.title = "Hotel Sherpa Soul – Thamel, Kathmandu (Lage und Anfahrt)";
de.contact.form.title = "Nachricht Senden";
fs.writeFileSync(dePath, JSON.stringify(de, null, 2), 'utf8');
console.log('✓ Updated de.json');

// NL
const nlPath = path.join(LOCALES_DIR, 'nl.json');
const nl = JSON.parse(fs.readFileSync(nlPath, 'utf8'));
nl.contactMap.title = "Hotel Sherpa Soul – Thamel, Kathmandu (Locatie en Route)";
nl.contact.form.title = "Bericht Versturen";
fs.writeFileSync(nlPath, JSON.stringify(nl, null, 2), 'utf8');
console.log('✓ Updated nl.json');
