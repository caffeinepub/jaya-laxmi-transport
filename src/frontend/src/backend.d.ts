import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BusinessInfo {
    name: string;
    proprietor: string;
    phone: string;
    location: string;
}
export interface backendInterface {
    getBusinessInfo(): Promise<BusinessInfo>;
}
