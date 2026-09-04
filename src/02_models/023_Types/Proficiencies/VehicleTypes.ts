import {AttributeType} from "../Attributes/AttributeTypes";

export const ALL_VEHICLE_TYPES = {
    'land': 'NONE',
    'water': 'NONE',
    'air': 'NONE'
} as const;

export type VehicleType = keyof typeof ALL_VEHICLE_TYPES;

export type AllVehicleDict = Record<VehicleType, AttributeType>;