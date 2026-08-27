import {Character} from "../02_models/022_Classes/Character/Character";
import {ICharacter} from "../02_models/021_Interfaces/Character/ICharacter";

export class CharacterImportService {

    public importFromJson(jsonString: string): Character {
        try {
            const parsedData: ICharacter = JSON.parse(jsonString);
            return new Character(parsedData);

        } catch (error) {
            throw new Error(`Fehler beim Importieren des Charakters: ${error instanceof Error ? error.message : error}`);
        }
    }
}