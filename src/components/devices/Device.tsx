"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function DeviceForm() {
  // State to track which checkboxes are selected
  const [selectedDevices, setSelectedDevices] = useState({
    cargadorOBC: false,
    adaptadorOBC: false,
    beacon: false,
    cargadorVictima: false,
  });

  // State to store serial numbers
  const [serialNumbers, setSerialNumbers] = useState({
    cargadorOBC: "",
    adaptadorOBC: "",
    beacon: "",
    cargadorVictima: "",
  });

  // Handle checkbox changes
  const handleCheckboxChange = (device: keyof typeof selectedDevices) => {
    setSelectedDevices({
      ...selectedDevices,
      [device]: !selectedDevices[device],
    });
  };

  // Handle serial number input changes
  const handleSerialChange = (
    device: keyof typeof serialNumbers,
    value: string
  ) => {
    setSerialNumbers({
      ...serialNumbers,
      [device]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Selected devices with serials:", {
      selectedDevices,
      serialNumbers,
    });
    // Here you would typically send this data to your backend
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>Dispositivos de Agresor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="cargadorOBC"
                checked={selectedDevices.cargadorOBC}
                onCheckedChange={() => handleCheckboxChange("cargadorOBC")}
              />
              <Label htmlFor="cargadorOBC">Cargador OBC</Label>
            </div>
            {selectedDevices.cargadorOBC && (
              <div className="ml-6">
                <Label htmlFor="serialCargadorOBC">Número de Serie</Label>
                <Input
                  id="serialCargadorOBC"
                  value={serialNumbers.cargadorOBC}
                  onChange={(e) =>
                    handleSerialChange("cargadorOBC", e.target.value)
                  }
                  placeholder="Ingrese el número de serie"
                  className="mt-1"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="adaptadorOBC"
                checked={selectedDevices.adaptadorOBC}
                onCheckedChange={() => handleCheckboxChange("adaptadorOBC")}
              />
              <Label htmlFor="adaptadorOBC">Adaptador OBD</Label>
            </div>
            {selectedDevices.adaptadorOBC && (
              <div className="ml-6">
                <Label htmlFor="serialAdaptadorOBC">Número de Serie</Label>
                <Input
                  id="serialAdaptadorOBC"
                  value={serialNumbers.adaptadorOBC}
                  onChange={(e) =>
                    handleSerialChange("adaptadorOBC", e.target.value)
                  }
                  placeholder="Ingrese el número de serie"
                  className="mt-1"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="beacon"
                checked={selectedDevices.beacon}
                onCheckedChange={() => handleCheckboxChange("beacon")}
              />
              <Label htmlFor="beacon">BEACON</Label>
            </div>
            {selectedDevices.beacon && (
              <div className="ml-6">
                <Label htmlFor="serialBeacon">Número de Serie</Label>
                <Input
                  id="serialBeacon"
                  value={serialNumbers.beacon}
                  onChange={(e) => handleSerialChange("beacon", e.target.value)}
                  placeholder="Ingrese el número de serie"
                  className="mt-1"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dispositivos de la Víctima</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="cargadorVictima"
                checked={selectedDevices.cargadorVictima}
                onCheckedChange={() => handleCheckboxChange("cargadorVictima")}
              />
              <Label htmlFor="cargadorVictima">Cargador Víctima</Label>
            </div>
            {selectedDevices.cargadorVictima && (
              <div className="ml-6">
                <Label htmlFor="serialCargadorVictima">Número de Serie</Label>
                <Input
                  id="serialCargadorVictima"
                  value={serialNumbers.cargadorVictima}
                  onChange={(e) =>
                    handleSerialChange("cargadorVictima", e.target.value)
                  }
                  placeholder="Ingrese el número de serie"
                  className="mt-1"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
