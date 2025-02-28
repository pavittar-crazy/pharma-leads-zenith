
import React from "react";
import { Plus, Target, Edit, Trash, LineChart, ArrowUpDown, Info, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const CompetitorTracking: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Competitor Intelligence</CardTitle>
            <CardDescription>Track and analyze competitor information for leads</CardDescription>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Competitor
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="md:w-2/3">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Competitor Database</CardTitle>
                  <Input placeholder="Search competitors..." className="max-w-[300px]" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <Button variant="ghost" className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium">
                            Company
                            <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                          </Button>
                        </TableHead>
                        <TableHead>Products</TableHead>
                        <TableHead>Market Share</TableHead>
                        <TableHead>Threat Level</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">MediStar Pharma</div>
                          <div className="text-xs text-muted-foreground">Top 5 competitor</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline">Antibiotics</Badge>
                            <Badge variant="outline">Painkillers</Badge>
                            <Badge variant="outline">+2 more</Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                            18%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="badge-danger">High</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <LineChart className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">GenCure Pharmaceuticals</div>
                          <div className="text-xs text-muted-foreground">Direct competitor</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline">Antibiotics</Badge>
                            <Badge variant="outline">Supplements</Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                            12%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="badge-warning">Medium</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <LineChart className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Vitality Biotech</div>
                          <div className="text-xs text-muted-foreground">Regional player</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline">Dermatology</Badge>
                            <Badge variant="outline">Ophthalmics</Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                            7%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="badge-info">Low</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <LineChart className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">ClearHealth Pharma</div>
                          <div className="text-xs text-muted-foreground">New entrant</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline">Painkillers</Badge>
                            <Badge variant="outline">Supplements</Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                            4%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="badge-info">Low</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <LineChart className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Competitor Details</CardTitle>
                <CardDescription>MediStar Pharma</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Company Overview</Label>
                  <p className="text-sm">
                    MediStar Pharma is a leading pharmaceutical company with a strong presence in antibiotics and painkillers. They have a nationwide distribution network and aggressive pricing strategies.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Key Products</Label>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline">StarCillin (Amoxicillin)</Badge>
                    <Badge variant="outline">RelievX (Paracetamol)</Badge>
                    <Badge variant="outline">PainEase (Diclofenac)</Badge>
                    <Badge variant="outline">ImmunoBoost (Multivitamin)</Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Strengths</Label>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    <li>Strong distribution network</li>
                    <li>Competitive pricing strategy</li>
                    <li>High brand recognition</li>
                    <li>Wide product range</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Weaknesses</Label>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    <li>Quality concerns in some product lines</li>
                    <li>Limited research and development</li>
                    <li>Poor customer service reputation</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Recent Activity</Label>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Price reduction on antibiotics</span>
                      <span className="text-xs text-muted-foreground">2 weeks ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>New distribution partner in South</span>
                      <span className="text-xs text-muted-foreground">1 month ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Launched marketing campaign</span>
                      <span className="text-xs text-muted-foreground">2 months ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">
                  <LineChart className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Details
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Competitor Insights for Leads</CardTitle>
            <CardDescription>Track competitor information for each lead</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lead</TableHead>
                    <TableHead>Current Supplier</TableHead>
                    <TableHead>Products Using</TableHead>
                    <TableHead>Price Point</TableHead>
                    <TableHead>Pain Points</TableHead>
                    <TableHead>Win Strategy</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">MediCorp Pharmaceuticals</div>
                      <div className="text-xs text-muted-foreground">Amit Sharma</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Badge className="badge-danger">MediStar Pharma</Badge>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>3+ years relationship</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                    <TableCell>Antibiotics, Painkillers</TableCell>
                    <TableCell>₹4.8L monthly</TableCell>
                    <TableCell>Inconsistent supply, variable quality</TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                        <ShieldCheck className="h-3 w-3 mr-1" />
                        Quality Guarantee
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">LifeCare Drugs</div>
                      <div className="text-xs text-muted-foreground">Priya Patel</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Badge className="badge-warning">GenCure Pharma</Badge>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>1 year relationship</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                    <TableCell>Supplements, Antibiotics</TableCell>
                    <TableCell>₹2.5L monthly</TableCell>
                    <TableCell>High prices, delays in delivery</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                        <Target className="h-3 w-3 mr-1" />
                        Competitive Pricing
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Wellness Pharma</div>
                      <div className="text-xs text-muted-foreground">Rajiv Mehta</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Badge className="badge-info">Vitality Biotech</Badge>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>2 years relationship</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                    <TableCell>Dermatology products</TableCell>
                    <TableCell>₹3.2L monthly</TableCell>
                    <TableCell>Limited product range</TableCell>
                    <TableCell>
                      <Badge className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
                        <Target className="h-3 w-3 mr-1" />
                        Product Diversity
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                A Rishul Chanana Production for Pavittar Pharmaceuticals
              </p>
            </div>
            <Button>Add Competitor Info</Button>
          </CardFooter>
        </Card>
      </CardContent>
    </Card>
  );
};

export default CompetitorTracking;
