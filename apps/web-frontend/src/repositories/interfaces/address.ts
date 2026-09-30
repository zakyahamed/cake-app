import type { Address } from "@/domain/types";

export type AddressInput = Pick<
  Address,
  "line1" | "line2" | "city" | "postalCode"
> & { state?: string; country?: string };

export interface AddressRepository {
  getAddresses(): Promise<Address[]>;
  createAddress(input: AddressInput): Promise<Address>;
  deleteAddress(id: string): Promise<void>;
}
