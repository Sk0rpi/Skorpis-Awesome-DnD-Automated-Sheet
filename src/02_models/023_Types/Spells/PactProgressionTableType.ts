import {ALL_LEVEL_TYPES} from "../Character/LevelTypes";
import {IPactMagicSlots} from "../../021_Interfaces/Spells/IPactMagicSlots";

export type PactMagicProgressionTable = Record<ALL_LEVEL_TYPES, IPactMagicSlots | null>;