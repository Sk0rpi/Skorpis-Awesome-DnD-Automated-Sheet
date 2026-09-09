import {ALL_LEVEL_TYPES} from "../Character/LevelTypes";
import {IStandardSpellSlots} from "../../021_Interfaces/Spells/IStandardSpellSlots";

export type StandardProgressionTable = Record<ALL_LEVEL_TYPES, IStandardSpellSlots>;