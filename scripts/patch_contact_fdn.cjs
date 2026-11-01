const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '../src/Locales');

// 1. FRA
const fraPath = path.join(LOCALES_DIR, 'fra.json');
const fra = JSON.parse(fs.readFileSync(fraPath, 'utf8'));
fra.contact.title = "Commençons une Conversation";
fra.contact.subtitle = "Que vous prépariez votre séjour, ayez besoin d'aide ou souhaitiez des conseils pour votre voyage, nous sommes à votre entière disposition.";
fra.contact.form.title = "Envoyer un Message";
fra.contact.form.data.name = "Nom Complet";
fra.contact.form.data.email = "Adresse E-mail";
fra.contact.form.data.msg = "Votre Message";
fra.contact.form.send = "Envoyer via WhatsApp";
fra.contact.form.send2 = "Envoi en cours...";
fs.writeFileSync(fraPath, JSON.stringify(fra, null, 2), 'utf8');
console.log('✓ Patched fra.json');

// 2. DE
const dePath = path.join(LOCALES_DIR, 'de.json');
const de = JSON.parse(fs.readFileSync(dePath, 'utf8'));
de.getInTouch.getIn = "Nehmen Sie";
de.getInTouch.touch = "Kontakt auf";
de.contact.form.data.email = "E-Mail-Adresse";
de.contact.form.send = "Über WhatsApp senden";
de.contact.form.send2 = "Wird gesendet...";
fs.writeFileSync(dePath, JSON.stringify(de, null, 2), 'utf8');
console.log('✓ Patched de.json');

// 3. NL
const nlPath = path.join(LOCALES_DIR, 'nl.json');
const nl = JSON.parse(fs.readFileSync(nlPath, 'utf8'));
nl.contact.title = "Laten we een Gesprek Beginnen";
nl.contact.subtitle = "Of u nu uw verblijf plant, hulp nodig heeft of vragen heeft over trekking: wij staan altijd voor u klaar in Thamel.";
nl.contact.form.title = "Bericht Versturen";
nl.contact.form.data.name = "Volledige Naam";
nl.contact.form.data.email = "E-mailadres";
nl.contact.form.data.msg = "Uw Bericht";
nl.contact.form.send = "Verstuur via WhatsApp";
nl.contact.form.send2 = "Verzenden...";
fs.writeFileSync(nlPath, JSON.stringify(nl, null, 2), 'utf8');
console.log('✓ Patched nl.json');
