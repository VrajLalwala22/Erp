import React, { useState } from "react";
import { Download, FileText, Mail, Calendar } from "lucide-react";

interface ExportableReportProps {
  data: any;
  dateRange: { from: string; to: string };
  reportType: string;
}

const ExportableReport: React.FC<ExportableReportProps> = ({
  data,
  dateRange,
  reportType,
}) => {
  const [exportFormat, setExportFormat] = useState<"pdf" | "excel" | "csv">(
    "pdf"
  );
  const [includeCharts, setIncludeCharts] = useState(true);
  const [scheduleReport, setScheduleReport] = useState(false);
  const [emailRecipients, setEmailRecipients] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">(
    "weekly"
  );

  const handleExport = async () => {
    // Simulate export process
    const exportData = {
      format: exportFormat,
      includeCharts,
      dateRange,
      reportType,
      data,
    };

    console.log("Exporting report:", exportData);

    // In a real application, this would trigger the actual export
    // For now, we'll just show a success message
    alert(`Report exported as ${exportFormat.toUpperCase()} successfully!`);
  };

  const handleScheduleReport = async () => {
    if (!emailRecipients.trim()) {
      alert("Please enter at least one email recipient");
      return;
    }

    const scheduleData = {
      recipients: emailRecipients.split(",").map((email) => email.trim()),
      frequency,
      reportType,
      format: exportFormat,
      includeCharts,
    };

    console.log("Scheduling report:", scheduleData);
    alert("Report scheduled successfully!");
    setScheduleReport(false);
    setEmailRecipients("");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-dark">Export Report</h3>
            <p className="text-sm text-gray-600 mt-1">
              Generate and download detailed reports for your records
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Export Options */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-dark mb-3">
                Export Format
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(["pdf", "excel", "csv"] as const).map((format) => (
                  <button
                    key={format}
                    onClick={() => setExportFormat(format)}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      exportFormat === format
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    <FileText className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm font-medium uppercase">
                      {format}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-dark">
                Report Options
              </label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeCharts}
                    onChange={(e) => setIncludeCharts(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary/20"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Include charts and graphs
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-gray-300 text-primary focus:ring-primary/20"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Include summary statistics
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-gray-300 text-primary focus:ring-primary/20"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Include detailed data tables
                  </span>
                </label>
              </div>
            </div>

            <button
              onClick={handleExport}
              className="w-full inline-flex items-center justify-center px-4 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Download className="h-5 w-5 mr-2" />
              Export Report
            </button>
          </div>

          {/* Schedule Reports */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-dark">
                Schedule Automated Reports
              </label>
              <button
                onClick={() => setScheduleReport(!scheduleReport)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  scheduleReport ? "bg-primary" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    scheduleReport ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {scheduleReport && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Email Recipients
                  </label>
                  <input
                    type="text"
                    placeholder="Enter email addresses separated by commas"
                    value={emailRecipients}
                    onChange={(e) => setEmailRecipients(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Example: john@example.com, jane@example.com
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Frequency
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) =>
                      setFrequency(
                        e.target.value as "daily" | "weekly" | "monthly"
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none bg-white"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <button
                  onClick={handleScheduleReport}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-success text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Schedule Report
                </button>
              </div>
            )}

            {/* Report Preview */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-dark mb-3">
                Report Preview
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Report Type:</span>
                  <span className="font-medium text-dark capitalize">
                    {reportType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Date Range:</span>
                  <span className="font-medium text-dark">
                    {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Format:</span>
                  <span className="font-medium text-dark uppercase">
                    {exportFormat}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Include Charts:</span>
                  <span className="font-medium text-dark">
                    {includeCharts ? "Yes" : "No"}
                  </span>
                </div>
                {data && (
                  <>
                    <div className="flex justify-between">
                      <span>Total Revenue:</span>
                      <span className="font-medium text-dark">
                        $
                        {data.overview?.totalRevenue?.toLocaleString() || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Orders:</span>
                      <span className="font-medium text-dark">
                        {data.overview?.totalOrders?.toLocaleString() || "N/A"}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Exports */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-dark mb-4">Recent Exports</h4>
          <div className="space-y-3">
            {[
              {
                name: "Sales Report - June 2024",
                date: "2024-06-13",
                format: "PDF",
                size: "2.4 MB",
              },
              {
                name: "Customer Analytics - Q2 2024",
                date: "2024-06-10",
                format: "Excel",
                size: "1.8 MB",
              },
              {
                name: "Product Performance - May 2024",
                date: "2024-06-01",
                format: "CSV",
                size: "845 KB",
              },
            ].map((exportItem, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dark">
                      {exportItem.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(exportItem.date)} • {exportItem.format} •{" "}
                      {exportItem.size}
                    </p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportableReport;
