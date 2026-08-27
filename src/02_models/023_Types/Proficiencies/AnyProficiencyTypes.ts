import {SkillType} from "./SkillTypes";
import {ArtisansToolType} from "./ArtisansToolTypes";
import {GamingSetType} from "./GamingSetTypes";
import {MusicalInstrumentType} from "./MusicalInstrumentTypes";
import {VehicleType} from "./VehicleTypes";

export type AnyProficiencyType =
    SkillType
    | ArtisansToolType
    | GamingSetType
    | MusicalInstrumentType
    | VehicleType;