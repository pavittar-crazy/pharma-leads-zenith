
import React from "react";
import { Info, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const LeadScoringRules: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Lead Scoring Configuration</CardTitle>
            <CardDescription>Define rules to automatically score and prioritize leads</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Rule
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-scoring">Automatic Lead Scoring</Label>
              <Switch id="auto-scoring" defaultChecked />
            </div>
            <p className="text-sm text-muted-foreground">
              Automatically calculate lead scores based on the rules below
            </p>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Active Scoring Rules</h3>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rule</TableHead>
                    <TableHead>Criteria</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Company Size</TableCell>
                    <TableCell>More than</TableCell>
                    <TableCell>200 employees</TableCell>
                    <TableCell>+15</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Budget</TableCell>
                    <TableCell>More than</TableCell>
                    <TableCell>₹10,00,000</TableCell>
                    <TableCell>+20</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Location</TableCell>
                    <TableCell>Is in</TableCell>
                    <TableCell>Mumbai, Delhi, Bangalore</TableCell>
                    <TableCell>+10</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Engagement</TableCell>
                    <TableCell>Has opened</TableCell>
                    <TableCell>Product Catalog</TableCell>
                    <TableCell>+15</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Source</TableCell>
                    <TableCell>Is</TableCell>
                    <TableCell>Referral</TableCell>
                    <TableCell>+15</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Add New Rule</h3>
            
            <div className="grid gap-4 sm:grid-cols-5">
              <div className="space-y-2">
                <Label htmlFor="rule-field">Field</Label>
                <Select>
                  <SelectTrigger id="rule-field">
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="company-size">Company Size</SelectItem>
                    <SelectItem value="budget">Budget</SelectItem>
                    <SelectItem value="location">Location</SelectItem>
                    <SelectItem value="engagement">Engagement</SelectItem>
                    <SelectItem value="source">Source</SelectItem>
                    <SelectItem value="industry">Industry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rule-criteria">Criteria</Label>
                <Select>
                  <SelectTrigger id="rule-criteria">
                    <SelectValue placeholder="Select criteria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equal">Equals</SelectItem>
                    <SelectItem value="greater">More than</SelectItem>
                    <SelectItem value="less">Less than</SelectItem>
                    <SelectItem value="contains">Contains</SelectItem>
                    <SelectItem value="in">Is in</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rule-value">Value</Label>
                <Input id="rule-value" placeholder="Enter value" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rule-points">Points</Label>
                <div className="flex items-center">
                  <Select>
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="+" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add">+</SelectItem>
                      <SelectItem value="subtract">-</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input className="ml-2" type="number" min="1" max="100" placeholder="10" />
                </div>
              </div>
              
              <div className="flex items-end">
                <Button className="w-full">Add Rule</Button>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium">Score Thresholds</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>Define thresholds for lead categorization based on scores</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label className="flex justify-between">
                  <span>High Priority</span>
                  <span className="text-emerald-600">80+</span>
                </Label>
                <Input type="range" min="50" max="100" defaultValue="80" />
              </div>
              <div className="space-y-2">
                <Label className="flex justify-between">
                  <span>Medium Priority</span>
                  <span className="text-amber-600">50+</span>
                </Label>
                <Input type="range" min="25" max="80" defaultValue="50" />
              </div>
              <div className="space-y-2">
                <Label className="flex justify-between">
                  <span>Low Priority</span>
                  <span className="text-rose-600">Below 50</span>
                </Label>
                <Input type="range" min="0" max="50" defaultValue="0" disabled />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadScoringRules;
