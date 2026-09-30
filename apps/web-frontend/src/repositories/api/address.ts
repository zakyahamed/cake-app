import type { Address } from "@/domain/types";
import type { AddressInput, AddressRepository } from "../interfaces/address";
import { apiClient } from "./client";

function mapAddress(address: any): Address {
  return {
    id: address.id,
    userId: address.userId,
    label: address.label || "Address",
    type: address.type || "OTHER",
    line1: address.line1 || "",
    line2: address.line2 || undefined,
    city: address.city || "",
    district: address.district || address.state || "",
    postalCode: address.postalCode || undefined,
    isDefault: Boolean(address.isDefault),
  };
}

export class ApiAddressRepository implements AddressRepository {
  async getAddresses() {
    return (await apiClient.get<any[]>("/users/me/addresses")).map(mapAddress);
  }
  async createAddress(input: AddressInput) {
    return mapAddress(await apiClient.post("/users/me/addresses", input));
  }
  async deleteAddress(id: string) {
    await apiClient.delete(`/users/me/addresses/${id}`);
  }
}
