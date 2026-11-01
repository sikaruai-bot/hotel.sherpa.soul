const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/Components/RoomsComponents/RoomsCard.jsx');
let file = fs.readFileSync(filePath, 'utf8');

file = file.replace('{amenity}', '{getAmenityLabel(amenity)}');
file = file.replace(
  '<span className="text-xs text-gray-500">/ night</span>',
  '<span className="text-xs text-gray-500">{t("roomsCard.perNight", "/ night")}</span>'
);
file = file.replace(
  '10% Direct OFF',
  '{t("roomsCard.directOff", "10% Direct OFF")}'
);

fs.writeFileSync(filePath, file, 'utf8');
console.log('Successfully patched RoomsCard.jsx');
