

import type React from "react"
import { useEffect, useState } from "react"
import { useFormContext } from "@/context/FormContext"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const LocationStep: React.FC = () => {
  const { formState, setFormState } = useFormContext()

  // Initialize state with values from formState or empty strings
  const [addressLine1, setAddressLine1] = useState(formState.location?.addressLine1 || "")
  const [addressLine2, setAddressLine2] = useState(formState.location?.addressLine2 || "")
  const [city, setCity] = useState(formState.location?.city || "")
  const [state, setState] = useState(formState.location?.state || "")
  const [pincode, setPincode] = useState(formState.location?.pincode || "")

  // Update form state when any address field changes
  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      location: {
        addressLine1,
        addressLine2,
        city,
        state,
        pincode,
      },
    }))
  }, [addressLine1, addressLine2, city, state, pincode, setFormState])

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Location Information</h2>
      <p className="text-muted-foreground mb-6">Please provide the location related to your complaint.</p>

      <div className="space-y-6">
        <div className="grid gap-3">
          <Label htmlFor="addressLine1">Address Line 1</Label>
          <Input
            id="addressLine1"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            placeholder="Street address, P.O. box, company name"
            className="transition-all focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="addressLine2">Address Line 2</Label>
          <Input
            id="addressLine2"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            placeholder="Apartment, suite, unit, building, floor, etc."
            className="transition-all focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State/Province/Region"
              className="transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              id="pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Postal/ZIP code"
              className="transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-2">
          Please provide complete address details for accurate processing of your complaint
        </p>
      </div>
    </div>
  )
}

export default LocationStep

