import React, { useState } from "react";
import Button from "../components/ui/Button";

interface Settings {
  currency: string;
  gstRate: number;
  invoicePrefix: string;
  contactEmail: string;
  invoiceFooter: string;
}

export const SettingsPage = () => {
  const [settings, setSettings] = useState<Settings>({
    currency: "USD",
    gstRate: 18,
    invoicePrefix: "INV-",
    contactEmail: "admin@company.com",
    invoiceFooter: "Thanks for doing business with us!",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: name === "gstRate" ? +value : value,
    }));
  };

  const handleSave = () => {
    alert("✅ Settings saved (mock)");
    // Replace with PUT/PATCH to /api/settings
  };

  return (
    <div className="p-6 ml-64 mt-16 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">System Settings</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Currency</label>
          <input
            className="border p-2 w-full rounded"
            name="currency"
            value={settings.currency}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            GST / Tax Rate (%)
          </label>
          <input
            type="number"
            className="border p-2 w-full rounded"
            name="gstRate"
            value={settings.gstRate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Invoice Prefix</label>
          <input
            className="border p-2 w-full rounded"
            name="invoicePrefix"
            value={settings.invoicePrefix}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Contact Email (per store)
          </label>
          <input
            className="border p-2 w-full rounded"
            name="contactEmail"
            value={settings.contactEmail}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Invoice Footer Text
          </label>
          <textarea
            className="border p-2 w-full rounded"
            rows={3}
            name="invoiceFooter"
            value={settings.invoiceFooter}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-6">
        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  );
};

export default SettingsPage;
