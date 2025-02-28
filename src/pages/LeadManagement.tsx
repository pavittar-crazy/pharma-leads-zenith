
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeadScoringRules from "@/components/leads/LeadScoringRules";
import TerritoryManagement from "@/components/leads/TerritoryManagement";
import CustomerSegmentation from "@/components/leads/CustomerSegmentation";
import CompetitorTracking from "@/components/leads/CompetitorTracking";

const LeadManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("scoring");

  return (
    <div className="container py-6 space-y-8 max-w-7xl page-enter">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Lead Management</h1>
        <p className="text-muted-foreground">
          Advanced tools for lead scoring, segmentation, territory management, and competitor tracking
        </p>
      </div>

      <div className="rounded-md bg-muted/50 p-4 text-center">
        <p className="font-medium">Pavittar Pharmaceuticals CRM</p>
        <p className="text-sm text-muted-foreground">A Rishul Chanana Production</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex justify-center border-b overflow-auto">
          <TabsList className="bg-transparent h-auto p-0">
            <TabsTrigger
              value="scoring"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:bg-transparent px-4 py-2 rounded-none"
            >
              Lead Scoring
            </TabsTrigger>
            <TabsTrigger
              value="segments"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:bg-transparent px-4 py-2 rounded-none"
            >
              Customer Segmentation
            </TabsTrigger>
            <TabsTrigger
              value="territories"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:bg-transparent px-4 py-2 rounded-none"
            >
              Territory Management
            </TabsTrigger>
            <TabsTrigger
              value="competitors"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:bg-transparent px-4 py-2 rounded-none"
            >
              Competitor Tracking
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="scoring" className="space-y-6 mt-6">
          <LeadScoringRules />
        </TabsContent>

        <TabsContent value="segments" className="space-y-6 mt-6">
          <CustomerSegmentation />
        </TabsContent>

        <TabsContent value="territories" className="space-y-6 mt-6">
          <TerritoryManagement />
        </TabsContent>

        <TabsContent value="competitors" className="space-y-6 mt-6">
          <CompetitorTracking />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeadManagement;
