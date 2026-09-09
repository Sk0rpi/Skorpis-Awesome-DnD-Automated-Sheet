import {StandardProgressionTable} from "./StandardProgressionTableTypes";
import {PactMagicProgressionTable} from "./PactProgressionTableType";

export type AnySpellProgressionTable = StandardProgressionTable | PactMagicProgressionTable | null;
