export interface MoveInfo {
  id: number;
  name: string;
  accuracy: number;
  power: number;
  pp: number;
  type: string;
  damageClass: DamageClass;
  learnedAtLevel: number;
}

export interface MoveInfoRaw {
  accuracy: number;
  contest_combos: ContestCombos;
  contest_effect: ContestEffect;
  contest_type: ContestType;
  damage_class: DamageClassRaw;
  effect_chance: any;
  effect_changes: any[];
  effect_entries: EffectEntry[];
  flavor_text_entries: FlavorTextEntry[];
  generation: Generation;
  id: number;
  learned_by_pokemon: LearnedByPokemon[];
  machines: Machine[];
  meta: Meta;
  name: string;
  names: Name[];
  past_values: PastValue[];
  power: number;
  pp: number;
  priority: number;
  stat_changes: any[];
  super_contest_effect: SuperContestEffect;
  target: Target;
  type: Type;
}

export interface ContestCombos {
  normal: Normal;
  super: Super;
}

export interface Normal {
  use_after: UseAfter[];
  use_before: any;
}

export interface UseAfter {
  name: string;
  url: string;
}

export interface Super {
  use_after: any;
  use_before: any;
}

export interface ContestEffect {
  url: string;
}

export interface ContestType {
  name: string;
  url: string;
}

export interface DamageClassRaw {
  name: string;
  url: string;
}

export interface EffectEntry {
  effect: string;
  language: Language;
  short_effect: string;
}

export interface Language {
  name: string;
  url: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: Language2;
  version_group: VersionGroup;
}

export interface Language2 {
  name: string;
  url: string;
}

export interface VersionGroup {
  name: string;
  url: string;
}

export interface Generation {
  name: string;
  url: string;
}

export interface LearnedByPokemon {
  name: string;
  url: string;
}

export interface Machine {
  machine: Machine2;
  version_group: VersionGroup2;
}

export interface Machine2 {
  url: string;
}

export interface VersionGroup2 {
  name: string;
  url: string;
}

export interface Meta {
  ailment: Ailment;
  ailment_chance: number;
  category: Category;
  crit_rate: number;
  drain: number;
  flinch_chance: number;
  healing: number;
  max_hits: number;
  max_turns: any;
  min_hits: number;
  min_turns: any;
  stat_chance: number;
}

export interface Ailment {
  name: string;
  url: string;
}

export interface Category {
  name: string;
  url: string;
}

export interface Name {
  language: Language3;
  name: string;
}

export interface Language3 {
  name: string;
  url: string;
}

export interface PastValue {
  accuracy: any;
  effect_chance: any;
  effect_entries: any[];
  power: number;
  pp: any;
  type: any;
  version_group: VersionGroup3;
}

export interface VersionGroup3 {
  name: string;
  url: string;
}

export interface SuperContestEffect {
  url: string;
}

export interface Target {
  name: string;
  url: string;
}

export interface Type {
  name: string;
  url: string;
}

export type DamageClass = "special" | "physical" | "status";
