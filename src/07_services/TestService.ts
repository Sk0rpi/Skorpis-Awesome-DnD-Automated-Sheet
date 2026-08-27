import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { CharacterImportService } from './CharacterImportService';

function testCharacterImport() {
    console.log('⏳ Starte Testlauf...');

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, 'test.json');
    const jsonString = fs.readFileSync(filePath, 'utf-8');

    const importer = new CharacterImportService();
    const hero = importer.importFromJson(jsonString);

    console.log('✅ Import erfolgreich!');

    // 🔍 Gibt das komplette Objekt aus, falls Name immer noch undefined ist
    console.log('Komplette Info:', hero.info);
    console.log('Name:', hero.info.name);
    console.log('Stärke Gesamt (Getter):', hero.attributes['STR'].base);

    // 👑 Korrigiert von hero.notes auf hero.character_notes:
    console.log('Items', hero.notes.items);
}

testCharacterImport();
